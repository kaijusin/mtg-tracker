part of '../main.dart';

enum AppView { setup, game, tracker, combat, history, stats }

const String _operatorStateStorageKey = 'mtg_operator_state';
const int _maxUndoSnapshots = 80;

AppView _currentView = AppView.setup;
AppView? _queuedCommitView;
bool _commitScheduled = false;
bool _isApplyingUndo = false;
final List<String> _undoSnapshots = <String>[];

void _renderCurrentView() {
  switch (_currentView) {
    case AppView.setup:
      buildSetupScreen();
      break;
    case AppView.game:
      buildGameScreen();
      break;
    case AppView.tracker:
      showTrackerScreen();
      break;
    case AppView.combat:
      showCombatScreen();
      break;
    case AppView.history:
      showGameTrackerScreen();
      break;
    case AppView.stats:
      showStatsScreen();
      break;
  }
}

void _commitState({AppView? view}) {
  if (view != null) {
    _queuedCommitView = view;
  }
  if (_commitScheduled) {
    return;
  }
  _commitScheduled = true;
  window.requestAnimationFrame((_) {
    _commitScheduled = false;
    if (_queuedCommitView != null) {
      _currentView = _queuedCommitView!;
      _queuedCommitView = null;
    }
    _saveSpectatorState();
    _renderCurrentView();
  });
}

Map<String, dynamic> _buildOperatorSnapshot() {
  return {
    'view': _currentView.name,
    'isCommander': isCommander,
    'startingLife': startingLife,
    'currentPlayerIndex': currentPlayerIndex,
    'gameStarted': gameStarted,
    'turnCount': turnCount,
    'currentPhaseIndex': currentPhaseIndex,
    'trackEnergy': trackEnergy,
    'trackExp': trackExp,
    'newPlayerMode': newPlayerMode,
    'trackerPlayerIndex': trackerPlayerIndex,
    'trackerZone': trackerZone,
    'trackerNotes': trackerNotes.map((key, value) => MapEntry(key.toString(), value)),
    'effectTarget': _effectTarget,
    'turnStartTime': turnStartTime?.toIso8601String(),
    'longestTurnSeconds': _longestTurnSeconds,
    'longestTurnPlayer': _longestTurnPlayer,
    'firstBloodPlayer': _firstBloodPlayer,
    'lifeGained': _lifeGained,
    'cardsPlayed': _cardsPlayed,
    'poisonDealt': _poisonDealt,
    'lastLifeValues': _lastLifeValues,
    'lifeHistory': _lifeHistory,
    'players': players,
    'gameLog': gameLog,
    'plainLog': plainLog,
    'tempEffects': _tempEffects,
    'combatAttackers': _combatAttackers,
    'combatLog': _combatLog,
    'combatPhase': _combatPhase,
    'inCombat': _inCombat,
  };
}

void _trackUndoSnapshot(Map<String, dynamic> snapshot) {
  if (_isApplyingUndo) {
    return;
  }
  final String encoded = jsonEncode(snapshot);
  if (_undoSnapshots.isNotEmpty && _undoSnapshots.last == encoded) {
    return;
  }
  _undoSnapshots.add(encoded);
  if (_undoSnapshots.length > _maxUndoSnapshots) {
    _undoSnapshots.removeAt(0);
  }
}

void _persistOperatorState({bool trackUndo = true}) {
  try {
    final Map<String, dynamic> snapshot = _buildOperatorSnapshot();
    window.localStorage[_operatorStateStorageKey] = jsonEncode(snapshot);
    if (trackUndo) {
      _trackUndoSnapshot(snapshot);
    }
  } catch (_) {
    // Best effort only.
  }
}

void _applyOperatorSnapshot(Map<String, dynamic> snapshot, {bool render = true}) {
  isCommander = snapshot['isCommander'] == true;
  startingLife = (snapshot['startingLife'] as num?)?.toInt() ?? 40;
  currentPlayerIndex = (snapshot['currentPlayerIndex'] as num?)?.toInt() ?? 0;
  gameStarted = snapshot['gameStarted'] == true;
  turnCount = (snapshot['turnCount'] as num?)?.toInt() ?? 1;
  currentPhaseIndex = (snapshot['currentPhaseIndex'] as num?)?.toInt() ?? 0;
  trackEnergy = snapshot['trackEnergy'] == true;
  trackExp = snapshot['trackExp'] == true;
  newPlayerMode = snapshot['newPlayerMode'] == true;
  trackerPlayerIndex = (snapshot['trackerPlayerIndex'] as num?)?.toInt() ?? 0;
  trackerZone = (snapshot['trackerZone'] as String?) ?? 'battlefield';
  _effectTarget = snapshot['effectTarget'] != null ? Map<String, dynamic>.from(snapshot['effectTarget'] as Map) : null;
  trackerNotes = {};
  final Map<String, dynamic> restoredNotes = Map<String, dynamic>.from(snapshot['trackerNotes'] as Map? ?? const {});
  restoredNotes.forEach((key, value) {
    final int? idx = int.tryParse(key);
    if (idx != null) {
      trackerNotes[idx] = value?.toString() ?? '';
    }
  });
  final String? restoredTurnStart = snapshot['turnStartTime'] as String?;
  turnStartTime = restoredTurnStart != null && restoredTurnStart.isNotEmpty ? DateTime.tryParse(restoredTurnStart) : null;
  _longestTurnSeconds = (snapshot['longestTurnSeconds'] as num?)?.toInt() ?? 0;
  _longestTurnPlayer = (snapshot['longestTurnPlayer'] as String?) ?? '';
  _firstBloodPlayer = (snapshot['firstBloodPlayer'] as String?) ?? '';
  _lifeGained = Map<String, int>.from((snapshot['lifeGained'] as Map? ?? const {}).map((key, value) => MapEntry(key.toString(), (value as num).toInt())));
  _cardsPlayed = Map<String, int>.from((snapshot['cardsPlayed'] as Map? ?? const {}).map((key, value) => MapEntry(key.toString(), (value as num).toInt())));
  _poisonDealt = Map<String, int>.from((snapshot['poisonDealt'] as Map? ?? const {}).map((key, value) => MapEntry(key.toString(), (value as num).toInt())));
  _lastLifeValues = List<int>.from((snapshot['lastLifeValues'] as List? ?? const []).map((value) => (value as num).toInt()));
  _lifeHistory = List<List<int>>.from((snapshot['lifeHistory'] as List? ?? const []).map((entry) => List<int>.from((entry as List).map((value) => (value as num).toInt()))));
  players = List<Map<String, dynamic>>.from((snapshot['players'] as List? ?? const []).map((entry) {
    final Map<String, dynamic> player = Map<String, dynamic>.from(entry as Map);
    player['cards'] = List<Map<String, dynamic>>.from((player['cards'] as List? ?? const []).map((card) => Map<String, dynamic>.from(card as Map)));
    player['commanderDamage'] = Map<int, int>.from((player['commanderDamage'] as Map? ?? const {}).map((key, value) => MapEntry(int.tryParse(key.toString()) ?? 0, (value as num).toInt())));
    player['manaPool'] = Map<String, int>.from((player['manaPool'] as Map? ?? const {}).map((key, value) => MapEntry(key.toString(), (value as num).toInt())));
    return player;
  }));
  gameLog = List<String>.from(snapshot['gameLog'] as List? ?? const []);
  plainLog = List<String>.from(snapshot['plainLog'] as List? ?? const []);
  _tempEffects = List<Map<String, dynamic>>.from((snapshot['tempEffects'] as List? ?? const []).map((entry) => Map<String, dynamic>.from(entry as Map)));
  _combatLog = List<String>.from(snapshot['combatLog'] as List? ?? const []);
  _combatPhase = (snapshot['combatPhase'] as num?)?.toInt() ?? 0;
  _inCombat = snapshot['inCombat'] == true;
  _combatAttackers = _rehydrateCombatAttackers(snapshot['combatAttackers'] as List? ?? const []);
  final String restoredView = (snapshot['view'] as String?) ?? AppView.game.name;
  _currentView = AppView.values.where((v) => v.name == restoredView).cast<AppView?>().firstWhere((v) => v != null, orElse: () => AppView.game)!;
  if (render) {
    _renderCurrentView();
  }
}

bool _restoreOperatorState() {
  try {
    final String? raw = window.localStorage[_operatorStateStorageKey];
    if (raw == null || raw.isEmpty) {
      return false;
    }

    final Map<String, dynamic> snapshot = Map<String, dynamic>.from(jsonDecode(raw) as Map);
    final bool hasGame = snapshot['gameStarted'] == true && (snapshot['players'] as List? ?? const []).isNotEmpty;
    if (!hasGame) {
      return false;
    }

    _applyOperatorSnapshot(snapshot);
    _undoSnapshots
      ..clear()
      ..add(jsonEncode(snapshot));
    return true;
  } catch (_) {
    return false;
  }
}

bool _undoLastAction({AppView? view}) {
  if (_undoSnapshots.length < 2) {
    return false;
  }
  _undoSnapshots.removeLast();
  final Map<String, dynamic> previous = Map<String, dynamic>.from(jsonDecode(_undoSnapshots.last) as Map);
  _isApplyingUndo = true;
  _applyOperatorSnapshot(previous, render: false);
  if (view != null) {
    _currentView = view;
  }
  _saveSpectatorState();
  _renderCurrentView();
  _isApplyingUndo = false;
  return true;
}

void _clearUndoHistory() {
  _undoSnapshots.clear();
}

List<Map<String, dynamic>> _rehydrateCombatAttackers(List rawAttackers) {
  final List<Map<String, dynamic>> restored = [];
  for (final rawEntry in rawAttackers) {
    final Map<String, dynamic> entry = Map<String, dynamic>.from(rawEntry as Map);
    final Map<String, dynamic> rawCard = Map<String, dynamic>.from(entry['card'] as Map? ?? const {});
    final String cardId = rawCard['id']?.toString() ?? '';
    final String cardName = rawCard['name']?.toString() ?? '';
    Map<String, dynamic>? linkedCard;
    for (final player in players) {
      linkedCard = (player['cards'] as List<Map<String, dynamic>>).cast<Map<String, dynamic>?>().firstWhere(
        (card) => card != null && _cardMatches(card, cardId: cardId, cardName: cardName),
        orElse: () => null,
      );
      if (linkedCard != null) {
        break;
      }
    }
    if (linkedCard == null) {
      continue;
    }
    final List<Map<String, dynamic>> blockers = List<Map<String, dynamic>>.from((entry['blockers'] as List? ?? const []).map((blocker) => Map<String, dynamic>.from(blocker as Map)));
    restored.add({
      'card': linkedCard,
      'targetIdx': (entry['targetIdx'] as num?)?.toInt() ?? 0,
      'blockers': blockers,
    });
  }
  return restored;
}

void _clearPersistedOperatorState() {
  window.localStorage.remove(_operatorStateStorageKey);
  window.localStorage.remove('mtg_spectator');
  window.localStorage.remove('mtg_spectator_ts');
  _clearUndoHistory();
}

void _moveToNextTurn({bool addVoiceSuffix = false}) {
  if (turnStartTime != null && players.isNotEmpty) {
    final int elapsed = DateTime.now().difference(turnStartTime!).inSeconds;
    final String playerName = players[currentPlayerIndex]['name'] as String;
    final int minutes = elapsed ~/ 60;
    final int seconds = elapsed % 60;
    final String duration = minutes > 0 ? '${minutes}m ${seconds.toString().padLeft(2, '0')}s' : '${seconds}s';
    _addLog('$playerName\'s turn lasted $duration', '$playerName\'s turn took $duration.');
    if (elapsed > _longestTurnSeconds) {
      _longestTurnSeconds = elapsed;
      _longestTurnPlayer = playerName;
    }
  }

  for (var fx in _tempEffects) {
    final List<dynamic> targets = fx['targetIds'] as List<dynamic>? ?? const [];
    final int ptBonus = (fx['ptBonus'] as int?) ?? 0;
    final List<String> fxKeywords = List<String>.from(fx['keywords'] as List? ?? const []);
    for (var player in players) {
      for (var rawCard in (player['cards'] as List)) {
        final Map<String, dynamic> card = rawCard as Map<String, dynamic>;
        if (!targets.contains(card['id'])) {
          continue;
        }
        if (ptBonus != 0 && card['tempPtBonus'] != null) {
          card['tempPtBonus'] = (card['tempPtBonus'] as int) - ptBonus;
        }
        for (final kw in fxKeywords) {
          (card['keywords'] as List).remove(kw);
        }
      }
    }
  }
  _tempEffects.clear();

  for (var player in players) {
    (player['manaPool'] as Map<String, int>).updateAll((_, __) => 0);
  }

  _clearCombatSelection();
  _combatLog.clear();
  _combatPhase = 0;
  _inCombat = false;

  final int previousPlayer = currentPlayerIndex;
  do {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  } while (players[currentPlayerIndex]['eliminated'] == true && players.any((player) => player['eliminated'] != true));

  if (currentPlayerIndex <= previousPlayer) {
    turnCount++;
  }

  currentPhaseIndex = 0;
  int untapped = 0;
  for (var rawCard in players[currentPlayerIndex]['cards'] as List) {
    final Map<String, dynamic> card = rawCard as Map<String, dynamic>;
    if (card['zone'] == 'battlefield' && card['tapped'] == true) {
      card['tapped'] = false;
      untapped++;
    }
  }

  if (untapped > 0) {
    _addLog(
      '${players[currentPlayerIndex]['name']} untapped $untapped card${untapped > 1 ? "s" : ""}',
      '${players[currentPlayerIndex]['name']}\'s cards untapped.',
    );
  }

  if (currentPlayerIndex < _lifeHistory.length) {
    _lifeHistory[currentPlayerIndex].add(players[currentPlayerIndex]['life'] as int);
  }

  turnStartTime = DateTime.now();
  final String technical = '${players[currentPlayerIndex]['name']}\'s turn (Turn $turnCount)${addVoiceSuffix ? ' - voice' : ''}';
  _addLog(technical, 'It is now ${players[currentPlayerIndex]['name']}\'s turn.');
  _addLog('${players[currentPlayerIndex]['name']} enters Draw phase', '${players[currentPlayerIndex]['name']} is now in the Draw phase.');
}