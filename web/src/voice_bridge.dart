part of '../main.dart';

// ════════════════════════════════════════════════════════════
// VOICE BRIDGE — polls localStorage for commands from JS
// ════════════════════════════════════════════════════════════

void _startVoiceBridge() {
  _voicePollTimer?.cancel();
  _voicePollTimer = Timer.periodic(const Duration(milliseconds: 300), (_) {
    _pollVoiceCommand();
  });
}

void _pollVoiceCommand() {
  try {
    String? raw = window.localStorage['mtg_voice_cmd'];
    if (raw == null || raw.isEmpty) return;

    Map<String, dynamic> cmd = jsonDecode(raw) as Map<String, dynamic>;
    String id = cmd['id']?.toString() ?? '';

    if (id == _lastVoiceCmdId) return;
    _lastVoiceCmdId = id;

    // Clear the command so it doesn't repeat
    window.localStorage.remove('mtg_voice_cmd');

    List<dynamic> actions = cmd['actions'] as List? ?? [];
    for (var action in actions) {
      _executeVoiceAction(action as Map<String, dynamic>);
    }

    if (gameStarted) {
      _commitState(view: _inCombat ? AppView.combat : null);
    }
  } catch (e) {
    // silent
  }
}

void _executeVoiceAction(Map<String, dynamic> a) {
  String type = (a['type'] ?? '').toString();

  switch (type) {
    case 'life_change':
      {
        String name = (a['player'] ?? '').toString();
        int delta = _parseInt(a['delta']);
        int idx = _findPlayer(name);
        if (idx >= 0) {
          _lastLifeValues[idx] = players[idx]['life'] as int;
          players[idx]['life'] = (players[idx]['life'] as int) + delta;
          if (delta > 0) _lifeGained[players[idx]['name']] = (_lifeGained[players[idx]['name']] ?? 0) + delta;
          _addLog(
            '${players[idx]['name']} ${delta > 0 ? "gains" : "loses"} ${delta.abs()} life → ${players[idx]['life']}',
            '${players[idx]['name']} ${delta > 0 ? "gained" : "lost"} ${delta.abs()} life. Now at ${players[idx]['life']}.',
          );
          checkElimination(idx);
        }
        break;
      }

    case 'add_card':
      {
        String name = (a['player'] ?? '').toString();
        String cardName = (a['cardName'] ?? '').toString();
        String zone = (a['zone'] ?? 'battlefield').toString();
        int idx = _findPlayer(name);
        if (idx >= 0 && cardName.isNotEmpty) {
          _fetchAndAddCard(idx, cardName, zone);
        }
        break;
      }

    case 'draw':
      {
        String name = (a['player'] ?? '').toString();
        int count = _parseInt(a['count'], def: 1);
        int idx = _findPlayer(name);
        if (idx >= 0) {
          drawCards(idx, count);
        }
        break;
      }

    case 'discard':
      {
        String name = (a['player'] ?? '').toString();
        int count = _parseInt(a['count'], def: 1);
        int idx = _findPlayer(name);
        if (idx >= 0) {
          discardCards(idx, count);
        }
        break;
      }

    case 'move_card':
      {
        String name = (a['player'] ?? '').toString();
        String cardName = (a['cardName'] ?? '').toString();
        String cardId = (a['cardId'] ?? '').toString();
        String toZone = (a['toZone'] ?? 'graveyard').toString();
        String fromZone = (a['fromZone'] ?? '').toString();
        int idx = _findPlayer(name);
        bool moved = false;
        if (idx >= 0) {
          List cards = players[idx]['cards'] as List;
          for (var c in cards) {
            if (_cardMatches(c as Map<String, dynamic>, cardId: cardId, cardName: cardName)) {
              final String previousZone = (c['zone'] ?? '').toString();
              c['zone'] = toZone;
              c['tapped'] = false;
              _addLog('${players[idx]['name']}: ${c['name']} → $toZone', '${c['name']} moved to $toZone.');
              _applyHandDeltaForZoneMove(idx, previousZone, toZone);
              moved = true;
              break;
            }
          }

          // Fallback when action references zones but card lookup fails.
          if (!moved && (fromZone.isNotEmpty || toZone.isNotEmpty)) {
            _applyHandDeltaForZoneMove(idx, fromZone, toZone);
          }
        }
        break;
      }

    case 'tap_card':
      {
        String name = (a['player'] ?? '').toString();
        String cardName = (a['cardName'] ?? '').toString();
        String cardId = (a['cardId'] ?? '').toString();
        bool tapped = a['tapped'] == true;
        int idx = _findPlayer(name);
        if (idx >= 0) {
          List cards = players[idx]['cards'] as List;
          for (var c in cards) {
            if (_cardMatches(c as Map<String, dynamic>, cardId: cardId, cardName: cardName)) {
              c['tapped'] = tapped;
              break;
            }
          }
        }
        break;
      }

    case 'next_turn':
      {
        if (!gameStarted) break;
        _moveToNextTurn();
        break;
      }

    case 'next_phase':
      {
        if (!gameStarted) break;
        _advanceTurnFlow();
        break;
      }

    case 'set_phase':
      {
        if (!gameStarted) break;
        String phase = (a['phase'] ?? '').toString();
        final int phaseIdx = _phaseIndexFromName(phase);
        if (phaseIdx >= 0) {
          _setTurnPhase(phaseIdx);
        }
        break;
      }

    case 'combat':
      {
        if (gameStarted) {
          _setTurnPhase(2, addLogEntry: false);
        }
        Map<String, dynamic> atk = (a['attacker'] as Map<String, dynamic>?) ?? {};
        Map<String, dynamic> def = (a['defender'] as Map<String, dynamic>?) ?? {};
        int damage = _parseInt(a['damage']);
        bool attackerDies = a['attackerDies'] == true;
        bool blockerDies = a['blockerDies'] == true;
        String blockerName = (a['blockerName'] ?? '').toString();

        int defIdx = _findPlayer((def['player'] ?? '').toString());
        int atkOwner = _findPlayer((atk['player'] ?? '').toString());

        String atkCardName = (atk['cardName'] ?? '').toString();

        // Deal damage
        if (defIdx >= 0 && damage > 0) {
          _lastLifeValues[defIdx] = players[defIdx]['life'] as int;
          players[defIdx]['life'] = (players[defIdx]['life'] as int) - damage;
          checkElimination(defIdx);
        }

        // Move attacker to graveyard if it dies
        if (attackerDies && atkOwner >= 0 && atkCardName.isNotEmpty) {
          List atkCards = players[atkOwner]['cards'] as List;
          for (var c in atkCards) {
            if ((c['name'] as String).toLowerCase().contains(atkCardName.toLowerCase())) {
              c['zone'] = 'graveyard';
              c['tapped'] = false;
              _addLog('$atkCardName dies in combat → graveyard', '$atkCardName was destroyed in combat.');
              break;
            }
          }
        }

        // Move blocker to graveyard if it dies
        if (blockerDies && blockerName.isNotEmpty && defIdx >= 0) {
          List defCards = players[defIdx]['cards'] as List;
          for (var c in defCards) {
            if ((c['name'] as String).toLowerCase().contains(blockerName.toLowerCase())) {
              c['zone'] = 'graveyard';
              c['tapped'] = false;
              _addLog('$blockerName dies blocking → graveyard', '$blockerName was destroyed while blocking.');
              break;
            }
          }
        }

        // Add to combat log in state
        if (defIdx >= 0) {
          String defName = players[defIdx]['name'] as String;
          String logMsg = '$atkCardName attacks $defName for $damage damage';
          if (blockerName.isNotEmpty) logMsg += ', blocked by $blockerName';
          _addLog(logMsg, logMsg + '.');

          // Update combatLog in spectator state
          _combatLog.insert(0, logMsg);
          if (_combatLog.length > 10) _combatLog.removeLast();
        }
        break;
      }

    case 'combat_start':
      {
        String attackerName = (a['attackerPlayer'] ?? '').toString();
        String defenderName = (a['defenderPlayer'] ?? '').toString();
        int attackerIdx = _findPlayer(attackerName);
        if (attackerIdx >= 0) currentPlayerIndex = attackerIdx;

        _clearCombatSelection();
        _inCombat = true;
        _combatPhase = 0;
        _setTurnPhase(2, addLogEntry: false);
        _addLog('Combat started: $attackerName attacks $defenderName', 'Entering combat. Declare attackers.');
        break;
      }

    case 'combat_add_attacker':
      {
        String attackerName = (a['attackerPlayer'] ?? '').toString();
        String defenderName = (a['defenderPlayer'] ?? '').toString();
        String cardName = (a['cardName'] ?? '').toString();
        String cardId = (a['cardId'] ?? '').toString();

        int attackerIdx = _findPlayer(attackerName);
        int defenderIdx = _findPlayer(defenderName);
        if (attackerIdx < 0 || defenderIdx < 0) break;

        Map<String, dynamic>? attackerCard = _findCardForPlayer(attackerIdx, cardId: cardId, cardName: cardName, zone: 'battlefield');
        if (attackerCard == null) break;

        bool exists = _combatAttackers.any((entry) => _cardMatches(entry['card'] as Map<String, dynamic>, cardId: attackerCard['id']?.toString() ?? '', cardName: attackerCard['name']?.toString() ?? ''));
        if (!exists) {
          attackerCard['attacking'] = true;
          _combatAttackers.add({
            'card': attackerCard,
            'targetIdx': defenderIdx,
            'blockers': <Map<String, dynamic>>[]
          });
          _addLog('${attackerName} sends ${attackerCard['name']} into combat', '${attackerCard['name']} is attacking $defenderName.');
        }
        _inCombat = true;
        if (_combatPhase < 0) _combatPhase = 0;
        break;
      }

    case 'combat_declare_attackers':
      {
        if (_combatAttackers.isEmpty) break;
        for (final attacker in _combatAttackers) {
          final card = attacker['card'] as Map<String, dynamic>;
          final kws = List<String>.from(card['keywords'] ?? []);
          if (!kws.contains('Vigilance')) card['tapped'] = true;
          card['attacking'] = true;
        }

        _inCombat = true;
        _combatPhase = 1;
        String defenderName = players[_combatAttackers.first['targetIdx'] as int]['name'] as String;
        _addLog('Attackers declared', 'Waiting for $defenderName to declare blockers.');
        break;
      }

    case 'combat_add_blocker':
      {
        String attackerCardId = (a['attackerCardId'] ?? '').toString();
        String attackerCardName = (a['attackerCardName'] ?? '').toString();
        String blockerPlayer = (a['blockerPlayer'] ?? '').toString();
        String blockerCardId = (a['blockerCardId'] ?? '').toString();
        String blockerCardName = (a['blockerCardName'] ?? '').toString();

        int blockerIdx = _findPlayer(blockerPlayer);
        if (blockerIdx < 0) break;

        Map<String, dynamic>? attackerEntry;
        for (final entry in _combatAttackers) {
          final card = entry['card'] as Map<String, dynamic>;
          if (_cardMatches(card, cardId: attackerCardId, cardName: attackerCardName)) {
            attackerEntry = entry;
            break;
          }
        }
        if (attackerEntry == null) break;

        Map<String, dynamic>? blockerCard = _findCardForPlayer(blockerIdx, cardId: blockerCardId, cardName: blockerCardName, zone: 'battlefield');
        if (blockerCard == null) break;

        List blockers = attackerEntry['blockers'] as List? ?? [];
        bool exists = blockers.any((entry) => _cardMatches(entry as Map<String, dynamic>, cardId: blockerCard['id']?.toString() ?? '', cardName: blockerCard['name']?.toString() ?? ''));
        if (!exists) {
          blockers.add(Map<String, dynamic>.from(blockerCard));
          attackerEntry['blockers'] = blockers;
          _combatPhase = 1;
          _addLog('${blockerCard['name']} blocks ${(attackerEntry['card'] as Map<String, dynamic>)['name']}', '${blockerCard['name']} is blocking ${(attackerEntry['card'] as Map<String, dynamic>)['name']}.');
        }
        break;
      }

    case 'combat_no_blockers':
      {
        _inCombat = true;
        _combatPhase = 2;
        _addLog('No blockers declared', 'No blockers. Combat damage will resolve.');
        break;
      }

    case 'combat_resolve':
      {
        if (_combatAttackers.isEmpty) break;
        _combatPhase = 2;
        _resolveCombat();
        break;
      }

    case 'combat_end':
      {
        _clearCombatSelection();
        _combatLog.clear();
        _combatPhase = 0;
        _inCombat = false;
        _setTurnPhase(turnPhases.length - 1);
        break;
      }

    case 'add_token':
      {
        String name = (a['player'] ?? '').toString();
        String tokenName = (a['tokenName'] ?? 'Token').toString();
        int qty = _parseInt(a['quantity'], def: 1);
        int power = _parseInt(a['power'], def: 1);
        int toughness = _parseInt(a['toughness'], def: 1);
        int idx = _findPlayer(name);
        if (idx >= 0) {
          for (int i = 0; i < qty; i++) {
            players[idx]['cards'].add({
              'id': 'tok_${DateTime.now().millisecondsSinceEpoch}_$i',
              'name': '$tokenName Token',
              'type': 'creature',
              'subtype': 'Token',
              'supertypes': [],
              'keywords': [],
              'oracleText': '',
              'triggers': [],
              'globalEffect': '',
              'tapped': false,
              'zone': 'battlefield',
              'counters': 0,
              'tempPtBonus': 0,
              'isToken': true,
              'power': power,
              'toughness': toughness,
            });
          }
          _addLog(
            '${players[idx]['name']} creates ${qty}x $tokenName Token ($power/$toughness)',
            '${players[idx]['name']} created ${qty == 1 ? "a" : qty.toString()} $tokenName token${qty > 1 ? "s" : ""}.',
          );
        }
        break;
      }

    case 'poison':
      {
        String name = (a['player'] ?? '').toString();
        int delta = _parseInt(a['delta']);
        int idx = _findPlayer(name);
        if (idx >= 0) {
          players[idx]['poison'] = ((players[idx]['poison'] as int? ?? 0) + delta).clamp(0, 99);
          _addLog(
            '${players[idx]['name']} gets $delta poison (${players[idx]['poison']}/10)',
            '${players[idx]['name']} now has ${players[idx]['poison']} poison counters.',
          );
          checkElimination(idx);
        }
        break;
      }

    case 'commander_damage':
      {
        String fromName = (a['from'] ?? '').toString();
        String toName = (a['to'] ?? '').toString();
        int damage = _parseInt(a['damage']);
        int fromIdx = _findPlayer(fromName);
        int toIdx = _findPlayer(toName);
        if (fromIdx >= 0 && toIdx >= 0) {
          Map<int, int> cmd = players[toIdx]['commanderDamage'] as Map<int, int>? ?? {};
          cmd[fromIdx] = (cmd[fromIdx] ?? 0) + damage;
          players[toIdx]['commanderDamage'] = cmd;
          _addLog(
            '${players[toIdx]['name']} takes $damage commander damage from ${players[fromIdx]['name']} (${cmd[fromIdx]})',
            '${players[toIdx]['name']} has taken ${cmd[fromIdx]} total commander damage from ${players[fromIdx]['name']}.',
          );
          checkElimination(toIdx);
        }
        break;
      }

    case 'set_monarch':
      {
        String name = (a['player'] ?? '').toString();
        for (var p in players) p['isMonarch'] = false;
        int idx = _findPlayer(name);
        if (idx >= 0) {
          players[idx]['isMonarch'] = true;
          _addLog('${players[idx]['name']} becomes the Monarch', '${players[idx]['name']} is now the Monarch.');
        }
        break;
      }

    case 'add_counter':
      {
        String name = (a['player'] ?? '').toString();
        String cardId = (a['cardId'] ?? '').toString();
        String cardName = (a['cardName'] ?? '').toString();
        int amount = _parseInt(a['amount'], def: 1);
        int idx = _findPlayer(name);
        if (idx >= 0) {
          Map<String, dynamic>? card = _findCardForPlayer(idx, cardId: cardId, cardName: cardName, zone: 'battlefield');
          if (card != null) {
            card['counters'] = (card['counters'] as int? ?? 0) + amount;
            _addLog('${players[idx]['name']} adds +$amount/+${amount} counter to ${card['name']}', '${card['name']} gets a +$amount/+${amount} counter.');
          }
        }
        break;
      }

    case 'set_active_player':
      {
        String name = (a['player'] ?? '').toString();
        int idx = _findPlayer(name);
        if (idx >= 0) {
          currentPlayerIndex = idx;
          _addLog('$name goes first', '$name will take the next turn.');
        }
        break;
      }

    case 'set_format':
      {
        String fmt = (a['format'] ?? '').toString().toLowerCase();
        int life = _parseInt(a['life'], def: 40);
        isCommander = fmt == 'commander';
        startingLife = life;
        for (int i = 0; i < players.length; i++) {
          players[i]['life'] = life;
        }
        _addLog('Format set to ${fmt == 'commander' ? 'Commander' : 'Normal'} ($life life)', 'Game format updated.');
        break;
      }

    case 'set_initiative':
      {
        String name = (a['player'] ?? '').toString();
        for (var p in players) p['hasInitiative'] = false;
        int idx = _findPlayer(name);
        if (idx >= 0) {
          players[idx]['hasInitiative'] = true;
          _addLog('${players[idx]['name']} takes the Initiative', '${players[idx]['name']} has the Initiative.');
        }
        break;
      }

    case 'eliminate':
      {
        String name = (a['player'] ?? '').toString();
        String reason = (a['reason'] ?? 'eliminated').toString();
        int idx = _findPlayer(name);
        if (idx >= 0 && players[idx]['eliminated'] != true) {
          players[idx]['eliminated'] = true;
          _addLog('${players[idx]['name']} eliminated ($reason)', '${players[idx]['name']} has been eliminated: $reason');
          showEliminationOverlay(players[idx]['name'] as String, reason);
          checkWinner();
        }
        break;
      }

    case 'log':
      {
        String msg = (a['message'] ?? '').toString();
        if (msg.isNotEmpty) _addLog(msg, msg);
        break;
      }
  }
}

int _findPlayer(String name) {
  String lower = name.toLowerCase();
  for (int i = 0; i < players.length; i++) {
    if ((players[i]['name'] as String).toLowerCase() == lower) return i;
    if ((players[i]['name'] as String).toLowerCase().contains(lower)) return i;
  }
  return -1;
}

bool _cardMatches(Map<String, dynamic> card, {String cardId = '', String cardName = ''}) {
  if (cardId.isNotEmpty && (card['id']?.toString() ?? '') == cardId) return true;
  if (cardName.isEmpty) return false;
  return (card['name'] as String? ?? '').toLowerCase().contains(cardName.toLowerCase());
}

Map<String, dynamic>? _findCardForPlayer(int playerIdx, {String cardId = '', String cardName = '', String zone = ''}) {
  List cards = players[playerIdx]['cards'] as List? ?? [];
  for (final rawCard in cards) {
    final card = rawCard as Map<String, dynamic>;
    if (zone.isNotEmpty && (card['zone'] ?? '') != zone) continue;
    if (_cardMatches(card, cardId: cardId, cardName: cardName)) return card;
  }
  return null;
}

void _clearCombatSelection() {
  for (final player in players) {
    for (final rawCard in (player['cards'] as List? ?? [])) {
      final card = rawCard as Map<String, dynamic>;
      card['attacking'] = false;
    }
  }
  _combatAttackers.clear();
}

int _parseInt(dynamic v, {int def = 0}) {
  if (v == null) return def;
  if (v is int) return v;
  if (v is double) return v.toInt();
  return int.tryParse(v.toString()) ?? def;
}

int _phaseIndexFromName(String phaseName) {
  final String p = phaseName.toLowerCase();
  if (p == 'draw') return 0;
  if (p == 'main') return 1;
  if (p == 'combat') return 2;
  if (p == 'end') return 3;
  return -1;
}

bool _zoneConsumesHand(String zone) {
  final z = zone.toLowerCase();
  return z == 'battlefield' || z == 'graveyard' || z == 'exile' || z == 'stack' || z == 'command';
}

void _applyHandDeltaForZoneMove(int playerIdx, String fromZone, String toZone) {
  final String from = fromZone.toLowerCase();
  final String to = toZone.toLowerCase();
  if (from == to) return;

  if (from == 'hand' && to != 'hand') {
    removeCardsFromHand(playerIdx, 1);
  } else if (to == 'hand' && from != 'hand') {
    drawCards(playerIdx, 1);
  }
}

Future<void> _fetchAndAddCard(int playerIdx, String cardName, String zone) async {
  Map<String, dynamic>? scryfallData = await _scryfallNamed(cardName);
  Map<String, dynamic> cardData;

  if (scryfallData != null) {
    cardData = _parseScryfall(scryfallData);
  } else {
    cardData = {
      'type': 'creature', 'subtype': '', 'supertypes': [],
      'keywords': [], 'oracleText': '', 'triggers': [], 'globalEffect': '',
      'power': null, 'toughness': null,
    };
  }

  cardData['id'] = 'voice_${DateTime.now().millisecondsSinceEpoch}_${Random().nextInt(9999)}';
  cardData['name'] = scryfallData?['name'] ?? cardName;
  cardData['tapped'] = false;
  cardData['zone'] = zone;
  cardData['counters'] = 0;
  cardData['tempPtBonus'] = 0;
  cardData['keywords'] ??= [];
  cardData['supertypes'] ??= [];
  cardData['triggers'] ??= [];

  players[playerIdx]['cards'].add(cardData);
  _cardsPlayed[players[playerIdx]['name']] = (_cardsPlayed[players[playerIdx]['name']] ?? 0) + 1;
  if (_zoneConsumesHand(zone)) {
    removeCardsFromHand(playerIdx, 1);
  }

  _addLog(
    '${players[playerIdx]['name']} plays ${cardData['name']} → $zone',
    '${players[playerIdx]['name']} played ${cardData['name']} onto the $zone.',
  );

  _commitState(view: _currentView == AppView.setup ? AppView.game : null);
}
