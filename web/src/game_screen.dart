part of '../main.dart';

// ════════════════════════════════════════════════════════════
// START GAME
// ════════════════════════════════════════════════════════════

void startGame() {
  loadManaSymbols();
  InputElement? countEl = querySelector('#player-count') as InputElement?;
  if (countEl == null) return;
  int count = int.tryParse(countEl.value ?? '2') ?? 2;

  InputElement? lifeEl = querySelector('#custom-life-input') as InputElement?;
  if (lifeEl != null) {
    int v = int.tryParse(lifeEl.value ?? '') ?? startingLife;
    if (v > 0) startingLife = v;
  }

  List<String> names = [];
  List<String> cmdNames = [];
  for (int i = 1; i <= count; i++) {
    InputElement? ni = querySelector('#player-name-$i') as InputElement?;
    if (ni == null) return;
    String name = (ni.value ?? '').trim();
    if (name.isEmpty) { showError('Please enter a name for Player $i'); return; }
    names.add(name);
    if (isCommander) {
      InputElement? ci = querySelector('#commander-name-$i') as InputElement?;
      cmdNames.add((ci?.value ?? '').trim());
    } else {
      cmdNames.add('');
    }
  }

  // Check for duplicate names
  Set<String> seen = {};
  for (int i = 0; i < count; i++) {
    String lower = names[i].toLowerCase();
    if (seen.contains(lower)) {
      names[i] = 'Dingus ${names[i]}';
      showError('Duplicate name! Renamed to ${names[i]}');
    } else {
      seen.add(lower);
    }
  }

  players.clear();
  _lifeGained = {};
  _cardsPlayed = {};
  _poisonDealt = {};
  _longestTurnSeconds = 0;
  _longestTurnPlayer = '';
  _lifeHistory = [];
  _tempEffects = [];
  _combatLog = [];

  for (int i = 0; i < count; i++) {
    Map<int, int> cmd = {};
    for (int j = 0; j < count; j++) {
      if (j != i) cmd[j] = 0;
    }

    players.add({
      'name': names[i],
      'commander': cmdNames[i],
      'colors': [],
      'life': startingLife,
      'poison': 0,
      'energy': 0,
      'exp': 0,
      'radiation': 0,
      'isMonarch': false,
      'hasInitiative': false,
      'commanderDamage': cmd,
      'cards': [],
      'eliminated': false,
      'manaPool': {'W': 0, 'U': 0, 'B': 0, 'R': 0, 'G': 0, 'C': 0},
    });

    _lifeGained[names[i]] = 0;
    _cardsPlayed[names[i]] = 0;
    _poisonDealt[names[i]] = 0;
    _lifeHistory.add([startingLife]);
  }
  _lastLifeValues = List.filled(count, startingLife);

  // Show animated roll to determine who goes first
  showWhoGoesFirstRoll(players, (int selectedIndex) {
    currentPlayerIndex = selectedIndex;
    gameStarted = true;
    turnCount = 1;
    currentPhaseIndex = 0;
    gameLog.clear();
    plainLog.clear();
    trackerNotes.clear();
    turnStartTime = DateTime.now();

    _addLog(
      '${players[currentPlayerIndex]['name']} goes first!',
      '${players[currentPlayerIndex]['name']} will take the first turn.',
    );
    _addLog(
      'Format: ${isCommander ? "Commander ($startingLife life)" : "Normal ($startingLife life)"}',
      'The game is starting in ${isCommander ? "Commander" : "Normal"} format with $startingLife life each.',
    );

    initializeHandTracking();
    querySelector('#setup-screen')?.style.display = 'none';
    querySelector('#game-screen')?.style.display = 'block';
    _addLog('${players[currentPlayerIndex]['name']} enters Draw phase', '${players[currentPlayerIndex]['name']} is now in the Draw phase.');
    _commitState(view: AppView.game);
  });
}

void _addLog(String technical, String plain) {
  gameLog.add(technical);
  plainLog.add(plain);
  if (gameLog.length > 100) gameLog.removeAt(0);
  if (plainLog.length > 100) plainLog.removeAt(0);
}

// ════════════════════════════════════════════════════════════
// LIFE CHANGE POPUP
// ════════════════════════════════════════════════════════════

void showLifeChangePopup(int playerIndex, int delta) {
  if (delta == 0) return;

  // Find the life number element for this player
  Element? lifeNum = querySelector('.player-board:nth-child(${playerIndex + 1}) .life-num');
  if (lifeNum == null) return;

  // Create the popup element
  DivElement popup = DivElement()
    ..className = 'life-change-popup ${delta > 0 ? 'positive' : 'negative'}'
    ..text = delta > 0 ? '+$delta' : delta.toString()
    ..style.position = 'absolute';

  // Position it relative to the life number
  Rectangle<num> rect = lifeNum.getBoundingClientRect();
  popup.style.left = '${rect.left + rect.width / 2}px';
  popup.style.top = '${rect.top + rect.height / 2}px';
  popup.style.transform = 'translate(-50%, -50%)';

  // Add to body and remove after animation
  document.body!.append(popup);
  Future.delayed(Duration(milliseconds: 1200), () {
    popup.remove();
  });
}

// ════════════════════════════════════════════════════════════
// GAME SCREEN
// ════════════════════════════════════════════════════════════

void buildGameScreen() {
  _currentView = AppView.game;
  _cancelTimer();
  DivElement? game = querySelector('#game-screen') as DivElement?;
  if (game == null) return;
  game.children.clear();

  // Back
  ButtonElement backBtn = ButtonElement()..className = 'btn-back'..text = '⬅ Setup';
  backBtn.onClick.listen((_) { _cancelTimer(); goBackToSetup(); });
  game.append(backBtn);

  // Top bar
  DivElement topBar = DivElement()..className = 'top-bar';
  DivElement leftGroup = DivElement()..className = 'top-left';

  ButtonElement resetBtn = ButtonElement()..text = 'Reset'..className = 'btn-main';
  resetBtn.onClick.listen((_) { _cancelTimer(); resetGame(); });

  ButtonElement settingsBtn = ButtonElement()..text = 'Settings'..className = 'btn-secondary';
  settingsBtn.onClick.listen((_) => showSettingsOverlay());

  ButtonElement undoBtn = ButtonElement()..text = 'Undo Last'..className = 'btn-secondary';
  undoBtn.onClick.listen((_) {
    final bool undone = _undoLastAction(view: AppView.game);
    if (!undone) {
      _addLog('No action to undo', 'There is no earlier game state to restore yet.');
      _commitState(view: AppView.game);
    }
  });

  ButtonElement npmBtn = ButtonElement()
    ..text = newPlayerMode ? 'Explain: ON' : 'Explain: OFF'
    ..className = newPlayerMode ? 'btn-secondary btn-npm-on' : 'btn-secondary';
  npmBtn.onClick.listen((_) {
    newPlayerMode = !newPlayerMode;
    npmBtn.text = newPlayerMode ? 'Explain: ON' : 'Explain: OFF';
    npmBtn.className = newPlayerMode ? 'btn-secondary btn-npm-on' : 'btn-secondary';
  });

  leftGroup..append(resetBtn)..append(undoBtn)..append(settingsBtn)..append(npmBtn);

  int elapsed = turnStartTime != null ? DateTime.now().difference(turnStartTime!).inSeconds : 0;
  int m = elapsed ~/ 60;
  int s = elapsed % 60;
  String timerTxt = elapsed > 0 ? (m > 0 ? '⏱ ${m}m ${s.toString().padLeft(2, '0')}s' : '⏱ ${s}s') : '';

  DivElement bannerCol = DivElement()..className = 'banner-col';
  bannerCol.append(ParagraphElement()..id = 'turn-banner'..text = 'Turn $turnCount — ${players[currentPlayerIndex]['name']}');
  bannerCol.append(SpanElement()..id = 'timer-banner'..className = 'timer-banner'..text = timerTxt);

  DivElement rightGroup = DivElement()..className = 'top-right';
  ButtonElement nextBtn = ButtonElement()..text = _advancePhaseButtonLabel()..className = 'btn-main';
  nextBtn.onClick.listen((_) => _advanceTurnFlow());
  rightGroup.append(nextBtn);

  topBar..append(leftGroup)..append(bannerCol)..append(rightGroup);
  game.append(topBar);
  game.append(_buildTurnPhasePanel());
  game.append(_buildTargetLockPanel());

  // Trigger reminders
  List<Map<String, String>> triggers = [];
  for (var c in (players[currentPlayerIndex]['cards'] as List)) {
    if (c['zone'] == 'battlefield') {
      List<dynamic> cTriggers = c['triggers'] as List<dynamic>? ?? [];
      for (var t in cTriggers) {
        Map<String, String> tm = Map<String, String>.from(t as Map);
        triggers.add({'card': c['name'] as String, 'phase': tm['phase'] ?? '', 'text': tm['text'] ?? '', 'plain': tm['plain'] ?? ''});
      }
    }
  }
  if (triggers.isNotEmpty) {
    DivElement trigBanner = DivElement()..className = 'trigger-banner';
    trigBanner.append(ParagraphElement()..text = 'TRIGGER REMINDERS'..className = 'trigger-banner-label');
    for (var t in triggers) {
      DivElement tRow = DivElement()..className = 'trigger-row';
      tRow.append(SpanElement()..text = '[${t['phase']}]'..className = 'trigger-phase');
      tRow.append(SpanElement()..text = ' ${t['card']}: '..className = 'trigger-card');
      tRow.append(SpanElement()..text = newPlayerMode ? (t['plain'] ?? '') : (t['text'] ?? '')..className = 'trigger-text');
      trigBanner.append(tRow);
    }
    game.append(trigBanner);
  }

  // Player grid
  DivElement grid = DivElement()..className = 'player-grid';
  game.append(grid);

  for (int i = 0; i < players.length; i++) {
    var player = players[i];
    bool isActive = i == currentPlayerIndex && player['eliminated'] != true;
    bool isElim = player['eliminated'] == true;

    DivElement board = DivElement()..className = 'player-board';
    if (isActive) board.classes.add('active-player');
    if (isElim) board.style.opacity = '0.4';

    // Header
    DivElement header = DivElement()..className = 'player-header';
    DivElement nameCol = DivElement();
    nameCol.append(HeadingElement.h3()..text = player['name']..className = 'player-name');
    String cmdName = player['commander'] ?? '';
    if (isCommander && cmdName.isNotEmpty) {
      nameCol.append(SpanElement()..text = cmdName..className = 'player-commander-sub');
    }
    header.append(nameCol);
    if (isElim) header.append(SpanElement()..text = 'eliminated'..className = 'elim-badge');
    board.append(header);

    // Monarch / Initiative
    DivElement statusRow = DivElement()..className = 'status-bubble-row';
    final monarchBubble = DivElement()
      ..className = (player['isMonarch'] == true) ? 'status-bubble status-bubble-active' : 'status-bubble';
    monarchBubble.innerHtml = '<span class="bubble-icon">👑</span><span class="bubble-label">Monarch</span>';
    monarchBubble.onClick.listen((_) {
      if (player['isMonarch'] == true) {
        player['isMonarch'] = false;
        _addLog('${player['name']} loses the Monarch', '${player['name']} is no longer the Monarch.');
      } else {
        for (var p in players) p['isMonarch'] = false;
        player['isMonarch'] = true;
        _addLog('${player['name']} becomes the Monarch', '${player['name']} is now the Monarch.');
      }
      _commitState(view: AppView.game);
    });
    statusRow.append(monarchBubble);

    final initiativeBubble = DivElement()
      ..className = (player['hasInitiative'] == true) ? 'status-bubble status-bubble-initiative status-bubble-active' : 'status-bubble status-bubble-initiative';
    initiativeBubble.innerHtml = '<span class="bubble-icon">⚔️</span><span class="bubble-label">Initiative</span>';
    initiativeBubble.onClick.listen((_) {
      if (player['hasInitiative'] == true) {
        player['hasInitiative'] = false;
        _addLog('${player['name']} loses the Initiative', '${player['name']} no longer has the Initiative.');
      } else {
        for (var p in players) p['hasInitiative'] = false;
        player['hasInitiative'] = true;
        _addLog('${player['name']} takes the Initiative', '${player['name']} now has the Initiative.');
      }
      _commitState(view: AppView.game);
    });
    statusRow.append(initiativeBubble);
    board.append(statusRow);

    // Life
    final int pi = i;
    DivElement ls = DivElement()..className = 'life-section';
    ls.append(HeadingElement.h2()..text = '${player['life']}'..className = 'life-num');
    DivElement lb = DivElement()..className = 'life-btns';
    for (var delta in [-5, -1, 1, 5]) {
      final int d = delta;
      ButtonElement btn = ButtonElement()
        ..text = d > 0 ? '+$d' : '−${d.abs()}'
        ..className = d < 0 ? 'life-btn life-btn-minus' : 'life-btn life-btn-plus';
      btn.onClick.listen((_) {
        _lastLifeValues[pi] = players[pi]['life'] as int;
        players[pi]['life'] += d;
        showLifeChangePopup(pi, d);
        if (d > 0) _lifeGained[players[pi]['name']] = (_lifeGained[players[pi]['name']] ?? 0) + d;
        if (pi < _lifeHistory.length) _lifeHistory[pi].add(players[pi]['life'] as int);
        _addLog(
          '${players[pi]['name']} ${d > 0 ? "gains" : "loses"} ${d.abs()} life → ${players[pi]['life']}',
          '${players[pi]['name']} ${d > 0 ? "gained" : "lost"} ${d.abs()} life. Now at ${players[pi]['life']}.',
        );
        checkElimination(pi);
        _commitState(view: AppView.game);
      });
      lb.append(btn);
    }
    ButtonElement undoBtn = ButtonElement()..text = '↩'..className = 'undo-btn';
    undoBtn.onClick.listen((_) {
      int prev = _lastLifeValues[pi];
      _lastLifeValues[pi] = players[pi]['life'] as int;
      players[pi]['life'] = prev;
      _addLog('${players[pi]['name']} life undone → $prev', '${players[pi]['name']}\'s life was undone to $prev.');
      _commitState(view: AppView.game);
    });
    lb.append(undoBtn);
    ls.append(lb);
    board.append(ls);

    // Stats row
    DivElement sr = DivElement()..className = 'stats-row';
    sr.append(_buildStatPill(
      label: 'Poison', value: player['poison'],
      warningAt: 7,
      onMinus: () { if ((player['poison'] as int) > 0) { player['poison']--; _commitState(view: AppView.game); } },
      onPlus: () {
        player['poison']++;
        _addLog('${player['name']} gains 1 poison (${player['poison']}/10)', '${player['name']} now has ${player['poison']} poison counters. At 10 they lose.');
        checkElimination(pi);
        _commitState(view: AppView.game);
      },
    ));
    sr.append(_buildStatPill(
      label: 'Rad', value: (player['radiation'] ?? 0) as int,
      warningAt: 7,
      onMinus: () { if ((player['radiation'] ?? 0) > 0) { player['radiation']--; _commitState(view: AppView.game); } },
      onPlus: () { player['radiation'] = (player['radiation'] ?? 0) + 1; _commitState(view: AppView.game); },
    ));
    if (trackEnergy) {
      sr.append(_buildStatPill(
        label: 'Energy', value: player['energy'] ?? 0,
        onMinus: () { if ((player['energy'] ?? 0) > 0) { player['energy']--; _commitState(view: AppView.game); } },
        onPlus: () { player['energy'] = (player['energy'] ?? 0) + 1; _commitState(view: AppView.game); },
      ));
    }
    if (trackExp) {
      sr.append(_buildStatPill(
        label: 'Exp', value: player['exp'] ?? 0,
        onMinus: () { if ((player['exp'] ?? 0) > 0) { player['exp']--; _commitState(view: AppView.game); } },
        onPlus: () { player['exp'] = (player['exp'] ?? 0) + 1; _commitState(view: AppView.game); },
      ));
    }
    board.append(sr);

    // Commander damage
    if (isCommander) {
      DivElement cs = DivElement()..className = 'cmd-section';
      cs.append(ParagraphElement()..text = 'Commander Damage'..className = 'cmd-section-label');
      Map<int, int> cmd = players[pi]['commanderDamage'];
      cmd.forEach((ei, dmg) {
        DivElement row = DivElement()..className = 'cmd-row';
        row.append(SpanElement()..text = 'From ${players[ei]['name']}'..className = 'cmd-from');
        row.append(SpanElement()..text = '$dmg'..className = 'cmd-val');
        DivElement btns = DivElement()..className = 'cmd-btns';
        ButtonElement mm = ButtonElement()..text = '−'..className = 'cmd-btn';
        mm.onClick.listen((_) { cmd[ei] = ((cmd[ei] ?? 0) - 1).clamp(0, 999); _commitState(view: AppView.game); });
        ButtonElement pp = ButtonElement()..text = '+'..className = 'cmd-btn';
        pp.onClick.listen((_) {
          cmd[ei] = (cmd[ei] ?? 0) + 1;
          _addLog(
            '${player['name']} takes cmd dmg from ${players[ei]['name']} (${cmd[ei]})',
            '${player['name']} has taken ${cmd[ei]} total commander damage from ${players[ei]['name']}. At 21 they lose.',
          );
          checkElimination(pi);
          _commitState(view: AppView.game);
        });
        btns..append(mm)..append(pp);
        row.append(btns);
        cs.append(row);
      });
      board.append(cs);
    }

    grid.append(board);
  }

  // Log
  DivElement logContainer = DivElement()..id = 'log-container'..className = 'game-log-box';
  _rebuildLog(logContainer);
  game.append(logContainer);
  game.append(_buildBottomBar());
  _startTurnTimer();
}

void _advanceTurn() {
  _moveToNextTurn();
  _commitState(view: AppView.game);
}

void _rebuildLog(DivElement container) {
  container.children.clear();
  List<String> source = newPlayerMode ? plainLog : gameLog;
  for (var entry in source.reversed.take(20)) {
    container.append(ParagraphElement()..text = '▸ $entry'..className = 'log-entry');
  }
}

// ════════════════════════════════════════════════════════════
// BOTTOM BAR
// ════════════════════════════════════════════════════════════

DivElement _buildBottomBar() {
  DivElement bar = DivElement()..className = 'bottom-bar';

  ButtonElement gameTrackerBtn = ButtonElement()..className = 'bottom-btn';
  gameTrackerBtn.innerHtml = '<span class="bottom-btn-icon">📜</span><span class="bottom-btn-label">Tracker</span>';
  gameTrackerBtn.onClick.listen((_) { _cancelTimer(); showGameTrackerScreen(); });

  ButtonElement trackerBtn = ButtonElement()..className = 'bottom-btn';
  trackerBtn.innerHtml = '<span class="bottom-btn-icon">🃏</span><span class="bottom-btn-label">Library</span>';
  trackerBtn.onClick.listen((_) { _cancelTimer(); showTrackerScreen(); });

  ButtonElement combatBtn = ButtonElement()..className = 'bottom-btn';
  combatBtn.innerHtml = '<span class="bottom-btn-icon">⚔️</span><span class="bottom-btn-label">Battle</span>';
  combatBtn.onClick.listen((_) {
    _cancelTimer();
    _setTurnPhase(2, addLogEntry: false);
    showCombatScreen();
  });

  ButtonElement diceBtn = ButtonElement()..className = 'bottom-btn';
  diceBtn.innerHtml = '<span class="bottom-btn-icon">�</span><span class="bottom-btn-label">Dice</span>';
  diceBtn.onClick.listen((_) => showDiceOverlay());

  ButtonElement statsBtn = ButtonElement()..className = 'bottom-btn';
  statsBtn.innerHtml = '<span class="bottom-btn-icon">🏆</span><span class="bottom-btn-label">Records</span>';
  statsBtn.onClick.listen((_) { _cancelTimer(); showStatsScreen(); });

  ButtonElement homeBtn = ButtonElement()..className = 'bottom-btn bottom-btn-home';
  homeBtn.innerHtml = '<span class="bottom-btn-icon">🏠</span><span class="bottom-btn-label">Game</span>';
  homeBtn.onClick.listen((_) { _cancelTimer(); _commitState(view: AppView.game); });

  bar..append(gameTrackerBtn)..append(trackerBtn)..append(homeBtn)..append(combatBtn)..append(diceBtn)..append(statsBtn);
  return bar;
}

// ════════════════════════════════════════════════════════════
// STAT PILL
// ════════════════════════════════════════════════════════════

DivElement _buildStatPill({
  required String label, required int value, int? warningAt,
  required void Function() onMinus, required void Function() onPlus,
}) {
  bool warn = warningAt != null && value >= warningAt;
  DivElement pill = DivElement()..className = 'stat-pill';
  ButtonElement m = ButtonElement()..text = '−'..className = 'stat-btn';
  m.onClick.listen((_) => onMinus());
  SpanElement lbl = SpanElement()..text = label..className = 'stat-label';
  SpanElement val = SpanElement()..text = '$value'..className = warn ? 'stat-val stat-val-warn' : 'stat-val';
  ButtonElement p = ButtonElement()..text = '+'..className = 'stat-btn';
  p.onClick.listen((_) => onPlus());
  pill..append(m)..append(lbl)..append(val)..append(p);
  return pill;
}

// ════════════════════════════════════════════════════════════
// TIMER
// ════════════════════════════════════════════════════════════

void _startTurnTimer() {
  _turnTimer?.cancel();
  _turnTimer = Timer.periodic(const Duration(seconds: 1), (_) {
    SpanElement? el = querySelector('#timer-banner') as SpanElement?;
    if (el == null || turnStartTime == null) return;
    int elapsed = DateTime.now().difference(turnStartTime!).inSeconds;
    int m = elapsed ~/ 60;
    int s = elapsed % 60;
    el.text = m > 0 ? '⏱ ${m}m ${s.toString().padLeft(2, '0')}s' : '⏱ ${s}s';
  });
}

String _currentTurnPhase() => turnPhases[currentPhaseIndex.clamp(0, turnPhases.length - 1)];

String _advancePhaseButtonLabel() {
  if (currentPhaseIndex >= turnPhases.length - 1) {
    return 'Pass Turn →';
  }
  return 'Next: ${turnPhases[currentPhaseIndex + 1]} →';
}

void _setTurnPhase(int phaseIndex, {bool addLogEntry = true}) {
  final int nextPhase = phaseIndex.clamp(0, turnPhases.length - 1);
  if (nextPhase == currentPhaseIndex) {
    return;
  }

  currentPhaseIndex = nextPhase;
  if (addLogEntry && gameStarted && players.isNotEmpty) {
    final String playerName = players[currentPlayerIndex]['name'] as String;
    final String phaseName = _currentTurnPhase();
    _addLog('$playerName enters $phaseName phase', '$playerName is now in the $phaseName phase.');
  }
}

void _advanceTurnFlow() {
  if (currentPhaseIndex >= turnPhases.length - 1) {
    _advanceTurn();
    return;
  }

  _setTurnPhase(currentPhaseIndex + 1);
  _commitState(view: AppView.game);
}

DivElement _buildTurnPhasePanel() {
  final DivElement card = DivElement()..className = 'turn-flow-card';

  final DivElement header = DivElement()..className = 'turn-flow-header';
  header.append(SpanElement()..text = 'Turn $turnCount'..className = 'turn-flow-kicker');
  header.append(SpanElement()..text = '${players[currentPlayerIndex]['name']} · ${_currentTurnPhase()} Phase'..className = 'turn-flow-title');
  card.append(header);

  final DivElement stepper = DivElement()..className = 'turn-phase-stepper';
  for (int i = 0; i < turnPhases.length; i++) {
    final ButtonElement phaseBtn = ButtonElement()
      ..type = 'button'
      ..className = i < currentPhaseIndex
          ? 'turn-phase-chip turn-phase-chip-done'
          : i == currentPhaseIndex
              ? 'turn-phase-chip turn-phase-chip-active'
              : 'turn-phase-chip'
      ..text = turnPhases[i];
    phaseBtn.onClick.listen((_) {
      _setTurnPhase(i);
      _commitState(view: AppView.game);
    });
    stepper.append(phaseBtn);
  }
  card.append(stepper);

  card.append(ParagraphElement()
    ..className = 'turn-flow-hint'
    ..text = currentPhaseIndex >= turnPhases.length - 1
        ? 'End step reached. Pass the turn when ready.'
        : 'Advance in order so the game state, voice commands, and combat all stay grounded in the current phase.');

  return card;
}

DivElement _buildTargetLockPanel() {
  final DivElement panel = DivElement()..className = 'target-lock-panel';
  final bool hasTarget = _effectTarget != null;
  final String label = (_effectTarget?['label'] ?? 'No target locked').toString();
  final String source = (_effectTarget?['source'] ?? '').toString();
  final String zone = (_effectTarget?['zone'] ?? '').toString();

  final DivElement copy = DivElement()..className = 'target-lock-copy';
  copy.append(SpanElement()..text = 'Effect Target'..className = 'target-lock-kicker');
  copy.append(SpanElement()..text = label..className = 'target-lock-value');
  if (hasTarget && (source.isNotEmpty || zone.isNotEmpty)) {
    final String detail = [if (source.isNotEmpty) source, if (zone.isNotEmpty) zone].join(' · ');
    copy.append(SpanElement()..text = detail..className = 'target-lock-detail');
  } else if (!hasTarget) {
    copy.append(SpanElement()..text = 'Choose a player, permanent, or graveyard card for your next effect.'..className = 'target-lock-detail');
  }
  panel.append(copy);

  final DivElement actions = DivElement()..className = 'target-lock-actions';
  final ButtonElement changeBtn = ButtonElement()
    ..text = hasTarget ? 'Change Target' : 'Select Target'
    ..className = 'btn-secondary';
  changeBtn.onClick.listen((_) => showTargetSelectionOverlay(title: 'Choose Effect Target', sourceLabel: source.isNotEmpty ? source : null));

  actions.append(changeBtn);
  if (hasTarget) {
    final ButtonElement clearBtn = ButtonElement()
      ..text = 'Clear'
      ..className = 'btn-secondary';
    clearBtn.onClick.listen((_) {
      _effectTarget = null;
      _commitState(view: AppView.game);
    });
    actions.append(clearBtn);
  }
  panel.append(actions);
  return panel;
}

void _cancelTimer() {
  _turnTimer?.cancel();
  _turnTimer = null;
}

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════

void showError(String msg) => window.alert(msg);

void goBackToSetup() {
  _cancelTimer();
  gameStarted = false;
  turnCount = 1;
  currentPhaseIndex = 0;
  currentPlayerIndex = 0;
  players.clear();
  gameLog.clear();
  plainLog.clear();
  trackerNotes.clear();
  trackerPlayerIndex = 0;
  trackerZone = 'battlefield';
  _lifeGained = {};
  _cardsPlayed = {};
  _poisonDealt = {};
  _longestTurnSeconds = 0;
  _longestTurnPlayer = '';
  _lifeHistory = [];
  _lastLifeValues = [];
  _tempEffects = [];
  _combatLog = [];
  _combatPhase = 0;
  _inCombat = false;
  _effectTarget = null;
  turnStartTime = null;
  trackEnergy = false;
  trackExp = false;
  _clearPersistedOperatorState();
  querySelector('#game-screen')?.style.display = 'none';
  querySelector('#setup-screen')?.style.display = 'block';
  buildSetupScreen();
}

void resetGame() {
  _cancelTimer();
  turnCount = 1;
  currentPhaseIndex = 0;
  trackerNotes.clear();
  _lifeGained = {};
  _cardsPlayed = {};
  _poisonDealt = {};
  _longestTurnSeconds = 0;
  _longestTurnPlayer = '';
  _lifeHistory = [];
  _tempEffects = [];
  _combatLog = [];
  _combatPhase = 0;
  _inCombat = false;
  _effectTarget = null;
  _clearUndoHistory();
  for (int i = 0; i < players.length; i++) {
    players[i]['life'] = startingLife;
    players[i]['poison'] = 0;
    players[i]['energy'] = 0;
    players[i]['exp'] = 0;
    players[i]['radiation'] = 0;
    players[i]['eliminated'] = false;
    players[i]['cards'] = [];
    players[i]['isMonarch'] = false;
    players[i]['hasInitiative'] = false;
    _lifeGained[players[i]['name']] = 0;
    _cardsPlayed[players[i]['name']] = 0;
    _poisonDealt[players[i]['name']] = 0;
    _lifeHistory.add([startingLife]);
    if (isCommander) (players[i]['commanderDamage'] as Map).forEach((k, v) { players[i]['commanderDamage'][k] = 0; });
  }
  _lastLifeValues = List.filled(players.length, startingLife);
  Random rand = Random();
  currentPlayerIndex = rand.nextInt(players.length);
  gameLog.clear();
  plainLog.clear();
  turnStartTime = DateTime.now();
  _addLog('Game reset!', 'The game has been reset. Everyone starts fresh.');
  _addLog('${players[currentPlayerIndex]['name']} goes first!', '${players[currentPlayerIndex]['name']} will go first.');
  _addLog('${players[currentPlayerIndex]['name']} enters Draw phase', '${players[currentPlayerIndex]['name']} is now in the Draw phase.');
  _commitState(view: AppView.game);
}
