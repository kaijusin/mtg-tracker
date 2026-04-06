part of '../main.dart';

// ════════════════════════════════════════════════════════════
// COMBAT SCREEN
// ════════════════════════════════════════════════════════════

void showCombatScreen() {
  _currentView = AppView.combat;
  _normalizeCombatTargets();
  final game = querySelector('#game-screen') as DivElement?;
  if (game == null) return;
  game.children.clear();

  final back = ButtonElement()..text = '← Back to Game'..className = 'btn-back';
  back.onClick.listen((_) {
    _clearCombatSelection();
    _combatLog.clear();
    _combatPhase = 0;
    _inCombat = false;
    _commitState(view: AppView.game);
  });
  game.append(back);
  game.append(HeadingElement.h2()..text = '⚔️ Combat'..className = 'tracker-title');

  // Phase stepper
  final phases = ['Attackers', 'Blockers', 'Damage', 'Results'];
  final stepper = DivElement()..className = 'combat-phase-stepper';
  for (int i = 0; i < phases.length; i++) {
    final dot = DivElement()
      ..className = i < _combatPhase ? 'combat-phase-dot combat-phase-done'
          : i == _combatPhase ? 'combat-phase-dot combat-phase-active'
          : 'combat-phase-dot';
    dot.append(SpanElement()..text = '${i + 1}'..className = 'combat-phase-num');
    dot.append(SpanElement()..text = phases[i]..className = 'combat-phase-label');
    stepper.append(dot);
    if (i < phases.length - 1) {
      stepper.append(DivElement()..className = i < _combatPhase ? 'combat-phase-line combat-phase-line-done' : 'combat-phase-line');
    }
  }
  game.append(stepper);

  final atkPlayer = players[currentPlayerIndex];
  final atkBanner = DivElement()..className = 'combat-player-banner combat-player-atk';
  atkBanner.innerHtml = '<span class="combat-player-role">⚔️ ATTACKING</span><span class="combat-player-name">${atkPlayer['name']}</span><span class="combat-player-life">♥ ${atkPlayer['life']}</span>';
  game.append(atkBanner);
  game.append(_buildCombatCommandHistoryPanel());

  if (_combatPhase == 0) {
    game.append(ParagraphElement()..text = 'Select creatures to attack with and choose their targets.'..className = 'combat-hint');
    final creatures = (atkPlayer['cards'] as List).where((c) => c['zone'] == 'battlefield' && c['type'] == 'creature' && c['tapped'] != true).toList();
    if (creatures.isEmpty) {
      game.append(ParagraphElement()..text = 'No untapped creatures to attack with.'..className = 'zone-empty');
    } else {
      final grid = DivElement()..className = 'combat-creature-grid';
      for (final card in creatures) {
        final isSelected = _combatAttackers.any((a) => a['card']['id'] == card['id']);
        grid.append(_buildAttackerCard(card, isSelected));
      }
      game.append(grid);
    }
    if (_combatAttackers.isNotEmpty) {
      final nextBtn = ButtonElement()..text = 'Declare ${_combatAttackers.length} Attacker${_combatAttackers.length > 1 ? "s" : ""} →'..className = 'combat-phase-btn';
      nextBtn.onClick.listen((_) {
        for (final a in _combatAttackers) {
          final kws = List<String>.from(a['card']['keywords'] ?? []);
          if (!kws.contains('Vigilance')) a['card']['tapped'] = true;
        }
        _combatPhase = 1;
        showCombatScreen();
      });
      game.append(nextBtn);
    }
  } else if (_combatPhase == 1) {
    final targetIdxs = _combatAttackers.map((a) => a['targetIdx'] as int).toSet();
    for (final defIdx in targetIdxs) {
      final defPlayer = players[defIdx];
      final defBanner = DivElement()..className = 'combat-player-banner combat-player-def';
      defBanner.innerHtml = '<span class="combat-player-role">🛡 DEFENDING</span><span class="combat-player-name">${defPlayer['name']}</span><span class="combat-player-life">♥ ${defPlayer['life']}</span>';
      game.append(defBanner);

      final attackersVsThis = _combatAttackers.where((a) => a['targetIdx'] == defIdx).toList();
      for (final attacker in attackersVsThis) {
        final atkCard = attacker['card'] as Map<String, dynamic>;
        final int atkPow = ((atkCard['power'] ?? 0) as int) + ((atkCard['counters'] ?? 0) as int);
        final int atkTou = ((atkCard['toughness'] ?? 0) as int) + ((atkCard['counters'] ?? 0) as int);
        final List<Map<String, dynamic>> blockers = List<Map<String, dynamic>>.from(attacker['blockers'] as List? ?? []);
        final List atkKws = atkCard['keywords'] ?? [];

        final attackerBlock = DivElement()..className = 'combat-attacker-block';
        final atkSummary = DivElement()..className = 'combat-attacker-summary';
        final atkInfo = DivElement()..className = 'combat-attacker-info';
        atkInfo.append(SpanElement()..text = atkCard['name']..className = 'combat-card-name');
        atkInfo.append(SpanElement()..text = '$atkPow/$atkTou'..className = 'combat-card-pt');
        if (atkKws.isNotEmpty) atkInfo.append(SpanElement()..text = atkKws.take(4).join(' · ')..className = 'combat-card-kws');
        atkSummary.append(atkInfo);

        if (blockers.isEmpty) {
          atkSummary.append(SpanElement()..text = '⚠️ Unblocked — deals $atkPow to ${defPlayer['name']}'..className = 'combat-unblocked-warning');
        }
        attackerBlock.append(atkSummary);

        // Add blocker
        final atkHasFly = atkKws.contains('Flying');
        final eligible = (defPlayer['cards'] as List).where((c) {
          if (c['zone'] != 'battlefield' || c['type'] != 'creature' || c['tapped'] == true) return false;
          if (blockers.any((b) => b['id'] == c['id'])) return false;
          if (atkHasFly) {
            final kws = List<String>.from(c['keywords'] ?? []);
            if (!kws.contains('Flying') && !kws.contains('Reach')) return false;
          }
          return true;
        }).toList();

        if (blockers.isNotEmpty) {
          final blockerRow = DivElement()..className = 'combat-blocker-chips';
          for (final blocker in blockers) {
            final chip = DivElement()..className = 'combat-blocker-chip';
            chip.text = '🛡 ${blocker['name']}';
            final rm = ButtonElement()..text = '✕'..className = 'combat-chip-remove';
            rm.onClick.listen((_) { (attacker['blockers'] as List).removeWhere((b) => b['id'] == blocker['id']); showCombatScreen(); });
            chip.append(rm);
            blockerRow.append(chip);
          }
          attackerBlock.append(blockerRow);
        }

        if (eligible.isNotEmpty) {
          final addRow = DivElement()..className = 'combat-add-blocker-row';
          final sel = SelectElement()..className = 'tracker-select combat-blocker-sel';
          sel.append(OptionElement(data: '— Add blocker —', value: ''));
          for (final c in eligible) {
            final bp = ((c['power'] ?? 0) as int) + ((c['counters'] ?? 0) as int);
            final bt = ((c['toughness'] ?? 0) as int) + ((c['counters'] ?? 0) as int);
            sel.append(OptionElement(data: '${c['name']} ($bp/$bt)', value: c['id']?.toString() ?? c['name']));
          }
          final addBtn = ButtonElement()..text = '+ Block'..className = 'combat-add-blocker-btn';
          addBtn.onClick.listen((_) {
            final cid = sel.value ?? '';
            if (cid.isEmpty) return;
            final creature = eligible.firstWhere((c) => (c['id']?.toString() ?? c['name']) == cid, orElse: () => eligible.first);
            (attacker['blockers'] as List).add(Map<String, dynamic>.from(creature as Map));
            showCombatScreen();
          });
          addRow..append(sel)..append(addBtn);
          attackerBlock.append(addRow);
        }
        game.append(attackerBlock);
      }
    }

    final btnRow = DivElement()..className = 'combat-btn-row';
    final backBtn2 = ButtonElement()..text = '← Back'..className = 'combat-phase-btn-secondary';
    backBtn2.onClick.listen((_) { for (final a in _combatAttackers) { a['card']['tapped'] = false; (a['blockers'] as List).clear(); } _clearCombatSelection(); _combatPhase = 0; showCombatScreen(); });
    final nextBtn = ButtonElement()..text = 'Resolve Damage →'..className = 'combat-phase-btn';
    nextBtn.onClick.listen((_) { _resolveCombat(); });
    btnRow..append(backBtn2)..append(nextBtn);
    game.append(btnRow);
  } else if (_combatPhase == 3) {
    game.append(ParagraphElement()..text = 'Combat resolved.'..className = 'combat-hint');
    final lifeRow = DivElement()..className = 'combat-life-row';
    for (final p in players) {
      final card2 = DivElement()..className = 'combat-life-card';
      card2.append(SpanElement()..text = p['name']..className = 'combat-life-name');
      card2.append(SpanElement()..text = '♥ ${p['life']}'..className = 'combat-life-val');
      lifeRow.append(card2);
    }
    game.append(lifeRow);

    if (_combatLog.isNotEmpty) {
      final logBox = DivElement()..className = 'combat-inline-log';
      for (final entry in _combatLog) {
        final p2 = ParagraphElement()..className = 'combat-result-entry'..text = '▸ $entry';
        if (entry.contains('dies') || entry.contains('graveyard')) p2.style.color = '#ff8888';
        else if (entry.contains('damage')) p2.style.color = '#ffcc44';
        else if (entry.contains('survives')) p2.style.color = '#88ff99';
        logBox.append(p2);
      }
      game.append(logBox);
    }

    final doneBtn = ButtonElement()..text = 'Done — Back to Game'..className = 'combat-resolve-btn';
    doneBtn.onClick.listen((_) {
      _combatLog.clear();
      _combatPhase = 0;
      _inCombat = false;
      _setTurnPhase(turnPhases.length - 1);
      _commitState(view: AppView.game);
    });
    game.append(doneBtn);
  }

  game.append(_buildBottomBar());
}

int _firstAvailableDefenderIndex(int attackerIdx) {
  for (int i = 0; i < players.length; i++) {
    if (i != attackerIdx && players[i]['eliminated'] != true) {
      return i;
    }
  }
  return -1;
}

void _normalizeCombatTargets() {
  if (_combatAttackers.isEmpty) return;
  final int fallbackDefender = _firstAvailableDefenderIndex(currentPlayerIndex);
  for (final attacker in _combatAttackers) {
    final int targetIdx = (attacker['targetIdx'] is int)
        ? attacker['targetIdx'] as int
        : int.tryParse('${attacker['targetIdx']}') ?? -1;
    final bool invalidTarget = targetIdx < 0 ||
        targetIdx >= players.length ||
        targetIdx == currentPlayerIndex ||
        players[targetIdx]['eliminated'] == true;
    if (invalidTarget && fallbackDefender >= 0) {
      attacker['targetIdx'] = fallbackDefender;
    }
  }
}

DivElement _buildAttackerCard(Map<String, dynamic> card, bool isSelected) {
  final int pw = ((card['power'] ?? 0) as int) + ((card['counters'] ?? 0) as int);
  final int tg = ((card['toughness'] ?? 0) as int) + ((card['counters'] ?? 0) as int);
  final List kws = card['keywords'] ?? [];
  final div = DivElement()..className = isSelected ? 'combat-selectable-card combat-selectable-selected' : 'combat-selectable-card';
  if (isSelected) div.append(SpanElement()..text = '✓ Attacking'..className = 'combat-selected-badge');
  div.append(SpanElement()..text = card['name']..className = 'combat-card-name');
  div.append(SpanElement()..text = '$pw/$tg'..className = 'combat-card-pt');
  if (kws.isNotEmpty) {
    final kwRow = DivElement()..className = 'combat-kw-badges';
    for (final kw in kws.take(3)) kwRow.append(SpanElement()..text = kw..className = 'combat-kw-badge');
    div.append(kwRow);
  }
  if (!isSelected) {
    final sel = SelectElement()..className = 'combat-target-sel';
    for (int i = 0; i < players.length; i++) {
      if (i == currentPlayerIndex || players[i]['eliminated'] == true) continue;
      sel.append(OptionElement(data: players[i]['name'], value: '$i'));
    }
    div.append(sel);
    final btn = ButtonElement()..text = 'Attack →'..className = 'combat-declare-btn';
    btn.onClick.listen((_) {
      final targetIdx = int.tryParse(sel.value ?? '') ?? -1;
      if (targetIdx < 0) return;
      _combatAttackers.add({'card': card, 'targetIdx': targetIdx, 'blockers': <Map<String, dynamic>>[]});
      showCombatScreen();
    });
    div.append(btn);
  } else {
    final attacker = _combatAttackers.firstWhere((a) => a['card']['id'] == card['id']);
    final targetIdx = attacker['targetIdx'] as int;
    div.append(SpanElement()..text = '→ ${players[targetIdx]['name']}'..className = 'combat-target-label');
    final rm = ButtonElement()..text = 'Remove'..className = 'combat-remove-btn';
    rm.onClick.listen((_) { _combatAttackers.removeWhere((a) => a['card']['id'] == card['id']); card['tapped'] = false; showCombatScreen(); });
    div.append(rm);
  }
  return div;
}

void _resolveCombat() {
  _combatLog.clear();
  _inCombat = true;

  for (final attacker in _combatAttackers) {
    final atkCard = attacker['card'] as Map<String, dynamic>;
    final List atkKws = atkCard['keywords'] ?? [];
    final int atkPow = ((atkCard['power'] ?? 0) as int) + ((atkCard['counters'] ?? 0) as int);
    final int atkTou = ((atkCard['toughness'] ?? 0) as int) + ((atkCard['counters'] ?? 0) as int);
    final int targetIdx = attacker['targetIdx'] as int;
    final List<Map<String, dynamic>> blockers = List<Map<String, dynamic>>.from(attacker['blockers'] as List? ?? []);

    if (blockers.isEmpty) {
      players[targetIdx]['life'] -= atkPow;
      showLifeChangePopup(targetIdx, -atkPow);
      _combatLog.add('${atkCard['name']} deals $atkPow damage to ${players[targetIdx]['name']} ♥ ${players[targetIdx]['life']}');
      if (atkKws.contains('Lifelink')) {
        players[currentPlayerIndex]['life'] += atkPow;
        showLifeChangePopup(currentPlayerIndex, atkPow);
        _combatLog.add('Lifelink: ${players[currentPlayerIndex]['name']} gains $atkPow life');
      }
      checkElimination(targetIdx);
    } else {
      int totalBlockerPow = 0;
      for (final blocker in blockers) {
        final int blkPow = ((blocker['power'] ?? 0) as int) + ((blocker['counters'] ?? 0) as int);
        final int blkTou = ((blocker['toughness'] ?? 0) as int) + ((blocker['counters'] ?? 0) as int);
        final List blkKws = blocker['keywords'] ?? [];
        totalBlockerPow += blkPow;
        final bool blkDies = !blkKws.contains('Indestructible') && (atkPow >= blkTou || atkKws.contains('Deathtouch'));
        if (blkDies) {
          for (final p in players) {
            for (final c in (p['cards'] as List)) {
              if ((c['id']?.toString() ?? c['name']) == (blocker['id']?.toString() ?? blocker['name'])) {
                c['zone'] = 'graveyard';
                c['tapped'] = false;
                break;
              }
            }
          }
          _combatLog.add('${blocker['name']} dies → graveyard');
        } else {
          _combatLog.add('${blocker['name']} survives');
        }
      }

      final bool atkDies = !atkKws.contains('Indestructible') &&
          (totalBlockerPow >= atkTou || blockers.any((b) => (b['keywords'] as List? ?? []).contains('Deathtouch')));
      if (atkDies) {
        atkCard['zone'] = 'graveyard';
        atkCard['tapped'] = false;
        _combatLog.add('${atkCard['name']} dies in combat → graveyard');
      } else {
        _combatLog.add('${atkCard['name']} survives');
      }

      if (atkKws.contains('Trample')) {
        final totalBlkTou = blockers.fold<int>(0, (s, b) => s + ((b['toughness'] ?? 0) as int) + ((b['counters'] ?? 0) as int));
        final trampleDmg = (atkPow - totalBlkTou).clamp(0, 9999);
        if (trampleDmg > 0) {
          players[targetIdx]['life'] -= trampleDmg;
          showLifeChangePopup(targetIdx, -trampleDmg);
          _combatLog.add('${atkCard['name']} tramples $trampleDmg damage to ${players[targetIdx]['name']} ♥ ${players[targetIdx]['life']}');
          checkElimination(targetIdx);
        }
      }

      if (atkKws.contains('Lifelink')) {
        players[currentPlayerIndex]['life'] += atkPow;
        showLifeChangePopup(currentPlayerIndex, atkPow);
        _combatLog.add('Lifelink: ${players[currentPlayerIndex]['name']} gains $atkPow life');
      }
    }
  }

  _clearCombatSelection();
  _combatPhase = 0;
  _inCombat = false;
  _setTurnPhase(turnPhases.length - 1);
  _commitState(view: AppView.game);
}

String _combatCommandHint() {
  if (_combatPhase == 0) {
    return 'Try: "attack with [creature]", "declare attackers", or "pass".';
  }
  if (_combatPhase == 1) {
    return 'Try: "no blockers", "block with [creature]", or "proceed".';
  }
  return 'Try: "resolve", "damage", or "done".';
}

DivElement _buildCombatCommandHistoryPanel() {
  final panel = DivElement()..className = 'combat-command-panel';
  panel.append(SpanElement()
    ..className = 'combat-command-title'
    ..text = 'Voice Command History');
  panel.append(ParagraphElement()
    ..className = 'combat-command-hint'
    ..text = _combatCommandHint());

  final list = DivElement()..className = 'combat-command-list';
  final recent = _voiceCommands.take(6).toList();
  if (recent.isEmpty) {
    list.append(DivElement()
      ..className = 'combat-command-item combat-command-item-muted'
      ..text = 'No recent commands yet.');
  } else {
    for (final cmd in recent) {
      list.append(DivElement()
        ..className = 'combat-command-item'
        ..text = cmd);
    }
  }

  panel.append(list);
  return panel;
}
