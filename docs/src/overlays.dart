part of '../main.dart';

// ════════════════════════════════════════════════════════════
// DICE OVERLAY
// ════════════════════════════════════════════════════════════

void showDiceOverlay() {
  DivElement overlay = DivElement()..className = 'overlay';
  DivElement box = DivElement()..className = 'overlay-box dice-overlay-box';
  box.append(HeadingElement.h2()..text = 'Dice Roller'..className = 'overlay-title');
  DivElement ra = DivElement()..className = 'dice-result-area';
  SpanElement rn = SpanElement()..text = '—'..className = 'dice-result-num';
  SpanElement rl = SpanElement()..text = ''..className = 'dice-result-label';
  ra..append(rn)..append(rl);
  box.append(ra);
  final DivElement controls = DivElement()..className = 'dice-controls-row';
  final InputElement qtyInput = InputElement(type: 'number')
    ..value = '1'
    ..min = '1'
    ..max = '10'
    ..className = 'form-input form-input-xs';
  final InputElement modInput = InputElement(type: 'number')
    ..value = '0'
    ..className = 'form-input form-input-xs';
  controls
    ..append(SpanElement()..text = 'Qty'..className = 'dice-control-label')
    ..append(qtyInput)
    ..append(SpanElement()..text = 'Modifier'..className = 'dice-control-label')
    ..append(modInput);
  box.append(controls);
  DivElement dg = DivElement()..className = 'dice-grid';

  final DivElement history = DivElement()..className = 'dice-history';
  history.append(SpanElement()..text = 'Roll History'..className = 'dice-history-label');

  void recordRoll(String label, String resultText) {
    final DivElement entry = DivElement()..className = 'dice-history-entry';
    entry.append(SpanElement()..text = label..className = 'dice-history-roll');
    entry.append(SpanElement()..text = resultText..className = 'dice-history-result');
    history.children.insert(1, entry);
    while (history.children.length > 7) {
      history.children.removeLast();
    }
  }

  for (var sides in [4, 6, 8, 10, 12, 20]) {
    ButtonElement btn = ButtonElement()..text = 'd$sides'..className = 'dice-face-btn';
    btn.onClick.listen((_) {
      final int qty = (int.tryParse(qtyInput.value ?? '1') ?? 1).clamp(1, 10);
      final int modifier = int.tryParse(modInput.value ?? '0') ?? 0;
      final List<int> rolls = List<int>.generate(qty, (_) => Random().nextInt(sides) + 1);
      final int total = rolls.fold<int>(0, (sum, roll) => sum + roll) + modifier;
      rn.text = '$total';
      rl.text = qty == 1 && modifier == 0 ? 'd$sides' : '${qty}d$sides ${modifier >= 0 ? '+' : '-'} ${modifier.abs()}';
      final bool criticalMax = rolls.every((roll) => roll == sides);
      final bool criticalLow = rolls.every((roll) => roll == 1);
      rn.style.color = criticalMax ? '#88ff88' : (criticalLow ? '#ff6666' : '#e2b96f');
      final String resultText = modifier == 0 ? rolls.join(', ') : '${rolls.join(', ')} ${modifier >= 0 ? '+' : '-'} ${modifier.abs()}';
      recordRoll('${qty}d$sides', '$resultText = $total');
      _addLog('Rolled ${qty}d$sides ${modifier == 0 ? '' : modifier >= 0 ? '+$modifier' : '$modifier'} → $total', 'Rolled ${qty}d$sides${modifier == 0 ? '' : modifier >= 0 ? ' plus $modifier' : ' minus ${modifier.abs()}'} for a total of $total.');
      _saveSpectatorState();
    });
    dg.append(btn);
  }
  final ButtonElement d100Btn = ButtonElement()..text = 'd100'..className = 'dice-face-btn';
  d100Btn.onClick.listen((_) {
    final int roll = Random().nextInt(100) + 1;
    rn.text = '$roll';
    rl.text = 'd100';
    rn.style.color = roll >= 95 ? '#88ff88' : (roll <= 5 ? '#ff6666' : '#e2b96f');
    recordRoll('d100', '$roll');
    _addLog('Rolled d100 → $roll', 'A d100 was rolled and landed on $roll.');
    _saveSpectatorState();
  });
  dg.append(d100Btn);
  box.append(dg);
  DivElement cr = DivElement()..className = 'coin-row';
  SpanElement cres = SpanElement()..text = ''..className = 'coin-result';
  ButtonElement cb = ButtonElement()..text = 'Flip Coin'..className = 'coin-btn';
  cb.onClick.listen((_) {
    bool h = Random().nextBool();
    cres.text = h ? 'Heads' : 'Tails';
    cres.style.color = h ? '#e2b96f' : '#aaaaff';
    _addLog('Coin flip → ${h ? "Heads" : "Tails"}', 'The coin landed on ${h ? "Heads" : "Tails"}.');
    recordRoll('Coin', h ? 'Heads' : 'Tails');
    _saveSpectatorState();
  });
  cr..append(cres)..append(cb);
  box.append(cr);
  final DivElement chooserRow = DivElement()..className = 'dice-player-chooser';
  chooserRow.append(SpanElement()..text = 'Random Player'..className = 'dice-history-label');
  final ButtonElement chooseBtn = ButtonElement()..text = 'Pick Active Player'..className = 'coin-btn';
  chooseBtn.onClick.listen((_) {
    final List<int> alive = [];
    for (int i = 0; i < players.length; i++) {
      if (players[i]['eliminated'] != true) alive.add(i);
    }
    if (alive.isEmpty) return;
    final int choice = alive[Random().nextInt(alive.length)];
    currentPlayerIndex = choice;
    currentPhaseIndex = 0;
    rn.text = players[choice]['name'];
    rl.text = 'Active Player';
    rn.style.color = '#c9a84c';
    _addLog('Random player selected → ${players[choice]['name']}', '${players[choice]['name']} was randomly chosen to act next.');
    recordRoll('Player', players[choice]['name']);
    _commitState();
  });
  chooserRow.append(chooseBtn);
  box.append(chooserRow);
  box.append(history);
  ButtonElement cl = ButtonElement()..text = 'Close'..className = 'overlay-continue-btn';
  cl.onClick.listen((_) => overlay.remove());
  box.append(cl);
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

const List<String> _counterTypes = ['+1/+1', 'Charge', 'Shield', 'Stun', 'Lore', 'Loyalty'];

Map<String, int> _ensureCounterData(Map<String, dynamic> card) {
  final Map<String, int> counterData = Map<String, int>.from((card['counterData'] as Map? ?? const {}).map((key, value) => MapEntry(key.toString(), (value as num).toInt())));
  final int plusCounters = (card['counters'] ?? 0) as int;
  if (plusCounters > 0) {
    counterData['+1/+1'] = plusCounters;
  }
  card['counterData'] = counterData;
  return counterData;
}

void _syncCounterState(Map<String, dynamic> card) {
  final Map<String, int> counterData = _ensureCounterData(card);
  card['counters'] = counterData['+1/+1'] ?? 0;
}

String _counterLabel(String type, int value) {
  if (type == '+1/+1') return '+$value/+${value}';
  return '$value $type';
}

String _cardCounterSummary(Map<String, dynamic> card) {
  final Map<String, int> counterData = _ensureCounterData(card);
  if (counterData.isEmpty) return 'No counters';
  final List<String> parts = [];
  counterData.forEach((type, value) {
    if (value > 0) parts.add(_counterLabel(type, value));
  });
  return parts.isEmpty ? 'No counters' : parts.join(' · ');
}

void _adjustCardCounter(Map<String, dynamic> card, String type, int delta) {
  final Map<String, int> counterData = _ensureCounterData(card);
  final int nextValue = ((counterData[type] ?? 0) + delta).clamp(0, 999);
  if (nextValue <= 0) {
    counterData.remove(type);
  } else {
    counterData[type] = nextValue;
  }
  _syncCounterState(card);
}

void _setEffectTarget(Map<String, dynamic> target) {
  _effectTarget = target;
}

void showTargetSelectionOverlay({String title = 'Choose Target', String? sourceLabel, int? ownerIdx}) {
  final DivElement overlay = DivElement()..className = 'overlay';
  final DivElement box = DivElement()..className = 'overlay-box target-selector-box';
  box.append(HeadingElement.h2()..text = title..className = 'overlay-title');
  if (sourceLabel != null && sourceLabel.isNotEmpty) {
    box.append(ParagraphElement()..text = 'Source: $sourceLabel'..className = 'overlay-sub');
  }

  void chooseTarget(Map<String, dynamic> target) {
    _setEffectTarget(target);
    _addLog('Target selected → ${target['label']}', '${target['label']} is now the active target${sourceLabel != null && sourceLabel.isNotEmpty ? ' for $sourceLabel' : ''}.');
    overlay.remove();
    _commitState();
  }

  final DivElement list = DivElement()..className = 'target-selector-list';
  list.append(ParagraphElement()..text = 'Players'..className = 'stats-section-label');
  for (int i = 0; i < players.length; i++) {
    final ButtonElement playerBtn = ButtonElement()
      ..text = '${players[i]['name']} · ${players[i]['life']} life'
      ..className = 'target-choice-btn';
    playerBtn.onClick.listen((_) => chooseTarget({
      'kind': 'player',
      'label': players[i]['name'],
      'source': sourceLabel ?? '',
      'zone': 'Player',
      'playerIndex': '$i',
    }));
    list.append(playerBtn);
  }

  final List<String> targetZones = ['battlefield', 'graveyard', 'exile'];
  for (final zone in targetZones) {
    list.append(ParagraphElement()..text = zone.toUpperCase()..className = 'stats-section-label');
    bool found = false;
    for (int playerIdx = 0; playerIdx < players.length; playerIdx++) {
      if (ownerIdx != null && ownerIdx >= 0 && zone != 'battlefield' && playerIdx != ownerIdx) {
        continue;
      }
      final List cards = players[playerIdx]['cards'] as List;
      for (final rawCard in cards) {
        final Map<String, dynamic> card = rawCard as Map<String, dynamic>;
        if (card['zone'] != zone) continue;
        found = true;
        final ButtonElement cardBtn = ButtonElement()
          ..text = '${card['name']} · ${players[playerIdx]['name']}'
          ..className = 'target-choice-btn';
        cardBtn.onClick.listen((_) => chooseTarget({
          'kind': 'card',
          'label': card['name'],
          'source': sourceLabel ?? '',
          'zone': zone,
          'playerIndex': '$playerIdx',
          'cardId': card['id']?.toString() ?? card['name'],
        }));
        list.append(cardBtn);
      }
    }
    if (!found) {
      list.append(ParagraphElement()..text = 'No valid targets here.'..className = 'zone-empty');
    }
  }

  box.append(list);
  final ButtonElement closeBtn = ButtonElement()..text = 'Close'..className = 'overlay-cancel-btn';
  closeBtn.onClick.listen((_) => overlay.remove());
  box.append(closeBtn);
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

void showCounterEditorOverlay(Map<String, dynamic> card, int playerIdx) {
  final DivElement overlay = DivElement()..className = 'overlay';
  final DivElement box = DivElement()..className = 'overlay-box counter-editor-box';
  box.append(HeadingElement.h2()..text = '${card['name']} Counters'..className = 'overlay-title');
  final ParagraphElement summary = ParagraphElement()..className = 'overlay-sub';
  final DivElement list = DivElement()..className = 'counter-editor-list';
  final InputElement customInput = InputElement()..placeholder = 'Custom counter name'..className = 'form-input';

  void refresh() {
    _syncCounterState(card);
    summary.text = _cardCounterSummary(card);
    list.children.clear();
    final Map<String, int> counterData = _ensureCounterData(card);
    final List<String> visibleTypes = [..._counterTypes];
    for (final key in counterData.keys) {
      if (!visibleTypes.contains(key)) visibleTypes.add(key);
    }
    for (final type in visibleTypes) {
      final int value = counterData[type] ?? 0;
      final DivElement row = DivElement()..className = 'counter-editor-row';
      row.append(SpanElement()..text = type..className = 'counter-editor-type');
      final DivElement controls = DivElement()..className = 'counter-editor-controls';
      final ButtonElement minus = ButtonElement()..text = '−'..className = 'counter-btn';
      final SpanElement amount = SpanElement()..text = '$value'..className = value > 0 ? 'counter-val counter-val-active' : 'counter-val';
      final ButtonElement plus = ButtonElement()..text = '+'..className = 'counter-btn';
      minus.onClick.listen((_) { _adjustCardCounter(card, type, -1); refresh(); });
      plus.onClick.listen((_) { _adjustCardCounter(card, type, 1); refresh(); });
      controls..append(minus)..append(amount)..append(plus);
      row.append(controls);
      list.append(row);
    }
  }

  refresh();
  box.append(summary);
  box.append(list);
  final DivElement customRow = DivElement()..className = 'tracker-add-row';
  final ButtonElement customAdd = ButtonElement()..text = 'Add Counter Type'..className = 'tracker-add-btn btn-secondary';
  customAdd.onClick.listen((_) {
    final String custom = (customInput.value ?? '').trim();
    if (custom.isEmpty) return;
    _adjustCardCounter(card, custom, 1);
    customInput.value = '';
    refresh();
  });
  customRow..append(customInput)..append(customAdd);
  box.append(customRow);
  final ButtonElement done = ButtonElement()..text = 'Done'..className = 'overlay-done-btn';
  done.onClick.listen((_) {
    _addLog('${players[playerIdx]['name']} updated counters on ${card['name']}', '${card['name']} counters are now ${_cardCounterSummary(card)}.');
    overlay.remove();
    _commitState(view: AppView.tracker);
  });
  box.append(done);
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

void showZoneInteractionOverlay(Map<String, dynamic> card, int playerIdx) {
  final DivElement overlay = DivElement()..className = 'overlay';
  final DivElement box = DivElement()..className = 'overlay-box graveyard-action-box';
  box.append(HeadingElement.h2()..text = card['name']..className = 'overlay-title');
  box.append(ParagraphElement()..text = 'Zone: ${(card['zone'] ?? '').toString().toUpperCase()} · Owner: ${players[playerIdx]['name']}'..className = 'overlay-sub');

  void finish(String technical, String plain) {
    _addLog(technical, plain);
    overlay.remove();
    _commitState(view: AppView.tracker);
  }

  final DivElement actionGrid = DivElement()..className = 'graveyard-action-grid';
  final ButtonElement targetBtn = ButtonElement()..text = 'Choose Target'..className = 'tracker-add-btn';
  targetBtn.onClick.listen((_) {
    overlay.remove();
    showTargetSelectionOverlay(title: 'Choose Target for ${card['name']}', sourceLabel: card['name']?.toString(), ownerIdx: playerIdx);
  });
  actionGrid.append(targetBtn);

  final String zone = (card['zone'] ?? '').toString();
  if (zone != 'battlefield') {
    final ButtonElement battlefieldBtn = ButtonElement()..text = 'Return to Battlefield'..className = 'tracker-add-btn';
    battlefieldBtn.onClick.listen((_) {
      card['zone'] = 'battlefield';
      finish('${players[playerIdx]['name']}: ${card['name']} returns to battlefield', '${card['name']} returned to the battlefield.');
    });
    actionGrid.append(battlefieldBtn);
  }

  if (zone != 'exile') {
    final ButtonElement exileBtn = ButtonElement()..text = 'Move to Exile'..className = 'tracker-add-btn btn-secondary';
    exileBtn.onClick.listen((_) {
      card['zone'] = 'exile';
      card['tapped'] = false;
      finish('${players[playerIdx]['name']}: ${card['name']} → exile', '${card['name']} was exiled.');
    });
    actionGrid.append(exileBtn);
  }

  final ButtonElement handBtn = ButtonElement()..text = 'Return to Hand'..className = 'tracker-add-btn btn-secondary';
  handBtn.onClick.listen((_) {
    (players[playerIdx]['cards'] as List).remove(card);
    players[playerIdx]['handSize'] = getHandSize(playerIdx) + 1;
    finish('${players[playerIdx]['name']}: ${card['name']} returns to hand', '${card['name']} returned to ${players[playerIdx]['name']}\'s hand.');
  });
  actionGrid.append(handBtn);

  final ButtonElement libraryBtn = ButtonElement()..text = 'Shuffle Into Library'..className = 'tracker-add-btn btn-secondary';
  libraryBtn.onClick.listen((_) {
    (players[playerIdx]['cards'] as List).remove(card);
    finish('${players[playerIdx]['name']}: ${card['name']} shuffled into library', '${card['name']} was shuffled back into the library.');
  });
  actionGrid.append(libraryBtn);

  box.append(actionGrid);
  final ButtonElement closeBtn = ButtonElement()..text = 'Close'..className = 'overlay-cancel-btn';
  closeBtn.onClick.listen((_) => overlay.remove());
  box.append(closeBtn);
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

// ════════════════════════════════════════════════════════════
// WHO GOES FIRST ROLL OVERLAY
// ════════════════════════════════════════════════════════════

void showWhoGoesFirstRoll(List<Map<String, dynamic>> playerList, void Function(int) onComplete) {
  DivElement overlay = DivElement()..className = 'overlay who-goes-first-overlay';
  DivElement box = DivElement()..className = 'overlay-box who-goes-first-box';
  box.append(HeadingElement.h2()..text = 'Who Goes First?'..className = 'overlay-title');
  
  DivElement rollArea = DivElement()..className = 'roll-area';
  DivElement playerDisplay = DivElement()..text = 'Rolling...'..className = 'player-roller';
  rollArea.append(playerDisplay);
  box.append(rollArea);
  
  // Start the roll animation
  int currentIndex = 0;
  int rollCount = 0;
  const int maxRolls = 20; // Total animation cycles
  const Duration rollSpeed = Duration(milliseconds: 150);
  
  // Pre-select the winner
  Random rand = Random();
  int winnerIndex = rand.nextInt(playerList.length);
  
  void animateRoll() {
    playerDisplay.text = playerList[currentIndex]['name'];
    playerDisplay.classes.remove('highlight');
    
    // Add highlight effect for the last few rolls
    if (rollCount >= maxRolls - 3) {
      playerDisplay.classes.add('highlight');
    }
    
    currentIndex = (currentIndex + 1) % playerList.length;
    rollCount++;
    
    if (rollCount < maxRolls) {
      Future.delayed(rollSpeed, animateRoll);
    } else {
      // Land on the winner
      playerDisplay.text = playerList[winnerIndex]['name'];
      playerDisplay.classes.add('winner');
      
      // Show continue button after a brief pause
      Future.delayed(Duration(milliseconds: 800), () {
        ButtonElement continueBtn = ButtonElement()
          ..text = 'Start Game →'
          ..className = 'overlay-continue-btn';
        continueBtn.onClick.listen((_) {
          overlay.remove();
          onComplete(winnerIndex);
        });
        box.append(continueBtn);
      });
    }
  }
  
  // Start animation after a brief delay
  Future.delayed(Duration(milliseconds: 500), animateRoll);
  
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

// ════════════════════════════════════════════════════════════
// SETTINGS OVERLAY
// ════════════════════════════════════════════════════════════

void showSettingsOverlay() {
  DivElement overlay = DivElement()..className = 'overlay';
  DivElement box = DivElement()..className = 'overlay-box';
  box.append(HeadingElement.h2()..text = 'Settings'..className = 'overlay-title');
  box.append(ParagraphElement()..text = 'Optional counters to show on player cards'..className = 'overlay-sub');
  box.append(_buildToggleRow(label: 'Energy counters', description: 'For decks that generate energy', value: trackEnergy, onChange: (v) { trackEnergy = v; }));
  box.append(_buildToggleRow(label: 'Experience counters', description: 'For commanders that use Exp', value: trackExp, onChange: (v) { trackExp = v; }));
  ButtonElement done = ButtonElement()..text = 'Done'..className = 'overlay-done-btn';
  done.onClick.listen((_) { overlay.remove(); buildGameScreen(); });
  box.append(done);
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) { overlay.remove(); buildGameScreen(); } });
  document.body!.append(overlay);
}

DivElement _buildToggleRow({required String label, required String description, required bool value, required void Function(bool) onChange}) {
  DivElement row = DivElement()..className = 'toggle-row';
  DivElement tc = DivElement();
  tc.append(ParagraphElement()..text = label..className = 'toggle-label');
  tc.append(ParagraphElement()..text = description..className = 'toggle-desc');
  DivElement toggle = DivElement()..className = 'toggle-switch';
  toggle.style.background = value ? '#e2b96f' : '#2a2d3e';
  DivElement thumb = DivElement()..className = 'toggle-thumb';
  thumb.style.left = value ? '23px' : '3px';
  toggle.append(thumb);
  bool cur = value;
  toggle.onClick.listen((_) {
    cur = !cur;
    onChange(cur);
    toggle.style.background = cur ? '#e2b96f' : '#2a2d3e';
    thumb.style.left = cur ? '23px' : '3px';
  });
  row..append(tc)..append(toggle);
  return row;
}

// ════════════════════════════════════════════════════════════
// TRACKER SCREEN
// ════════════════════════════════════════════════════════════

void showTrackerScreen() {
  _currentView = AppView.tracker;
  DivElement? game = querySelector('#game-screen') as DivElement?;
  if (game == null) return;
  int savedScroll = window.scrollY.toInt();
  game.children.clear();

  ButtonElement back = ButtonElement()..text = '← Back to Game'..className = 'btn-back';
  back.onClick.listen((_) => buildGameScreen());
  game.append(back);
  game.append(HeadingElement.h2()..text = 'Card Tracker'..className = 'tracker-title');

  // Add card section
  DivElement addBox = DivElement()..className = 'tracker-add-box';
  DivElement searchRow = DivElement()..className = 'tracker-add-row';

  SelectElement playerSel = SelectElement()..className = 'tracker-select';
  for (int i = 0; i < players.length; i++) {
    playerSel.append(OptionElement(data: players[i]['name'], value: '$i'));
  }
  playerSel.value = '$trackerPlayerIndex';
  playerSel.onChange.listen((_) { trackerPlayerIndex = int.tryParse(playerSel.value ?? '0') ?? 0; trackerZone = 'battlefield'; showTrackerScreen(); });

  InputElement cardInput = InputElement()..placeholder = 'Search card name...'..className = 'tracker-input';
  DivElement dropdown = DivElement()..className = 'scryfall-dropdown'..style.display = 'none';

  Map<String, dynamic>? _pendingCard;

  void applyCardData(Map<String, dynamic> data, String name) {
    cardInput.value = name;
    dropdown.style.display = 'none';
    _pendingCard = data;
    _pendingCard!['name'] = name;
    DivElement? preview = querySelector('#scryfall-preview') as DivElement?;
    preview?.remove();
    DivElement prev = DivElement()..id = 'scryfall-preview'..className = 'scryfall-preview';
    prev.append(SpanElement()..text = '✓ Found: $name'..style.cssText = 'color:#88ff88;');
    addBox.append(prev);
  }

  cardInput.onInput.listen((_) {
    _searchDebounce?.cancel();
    String q = cardInput.value?.trim() ?? '';
    if (q.length < 2) { dropdown.style.display = 'none'; return; }
    _searchDebounce = Timer(const Duration(milliseconds: 400), () async {
      List<Map<String, dynamic>> results = await _scryfallSearch(q);
      dropdown.children.clear();
      if (results.isEmpty) { dropdown.style.display = 'none'; return; }
      for (var r in results) {
        String rname = r['name']?.toString() ?? '';
        String rtype = r['type_line']?.toString() ?? '';
        DivElement item = DivElement()..className = 'dropdown-item';
        item.append(SpanElement()..text = rname..className = 'dropdown-item-name');
        item.append(SpanElement()..text = rtype..className = 'dropdown-item-type');
        item.onClick.listen((_) async {
          Map<String, dynamic>? full = await _scryfallNamed(rname);
          if (full != null) {
            Map<String, dynamic> parsed = _parseScryfall(full);
            parsed['name'] = rname;
            applyCardData(parsed, rname);
          }
        });
        dropdown.append(item);
      }
      dropdown.style.display = 'block';
    });
  });

  cardInput.onKeyDown.listen((e) async {
    if (e.keyCode == 13) {
      _searchDebounce?.cancel();
      dropdown.style.display = 'none';
      String q = cardInput.value?.trim() ?? '';
      if (q.isEmpty) return;
      if (_pendingCard != null && _pendingCard!['name'] == q) {
        // already fetched
      } else {
        Map<String, dynamic>? full = await _scryfallNamed(q);
        if (full != null) {
          Map<String, dynamic> parsed = _parseScryfall(full);
          parsed['name'] = full['name'] ?? q;
          applyCardData(parsed, parsed['name'] as String);
          _pendingCard = parsed;
        }
      }
    }
  });

  ButtonElement addBtn = ButtonElement()..text = '+ Add'..className = 'tracker-add-btn';
  addBtn.onClick.listen((_) {
    String cardName = cardInput.value?.trim() ?? '';
    if (cardName.isEmpty) return;
    int idx = int.tryParse(playerSel.value ?? '0') ?? 0;
    trackerPlayerIndex = idx;

    Map<String, dynamic> cardData = {};
    if (_pendingCard != null && (_pendingCard!['name'] == cardName || cardName.toLowerCase().contains((_pendingCard!['name'] as String).toLowerCase()))) {
      cardData = Map<String, dynamic>.from(_pendingCard!);
    } else {
      cardData = {'type': 'creature', 'subtype': '', 'supertypes': [], 'keywords': [], 'oracleText': '', 'triggers': [], 'globalEffect': ''};
    }

    cardData['id'] = '${DateTime.now().millisecondsSinceEpoch}_${Random().nextInt(9999)}';
    cardData['name'] = cardData['name'] ?? cardName;
    cardData['tapped'] = false;
    cardData['zone'] = 'battlefield';
    cardData['counters'] = 0;
    cardData['tempPtBonus'] = 0;
    cardData['keywords'] ??= [];
    cardData['supertypes'] ??= [];
    cardData['triggers'] ??= [];

    players[idx]['cards'].add(cardData);
    _cardsPlayed[players[idx]['name']] = (_cardsPlayed[players[idx]['name']] ?? 0) + 1;
    onCardPlaced(idx);
    _addLog('${players[idx]['name']} played ${cardData['name']}', '${players[idx]['name']} played ${cardData['name']} onto the battlefield.');
    _pendingCard = null;
    trackerZone = 'battlefield';
    _saveSpectatorState();
    showTrackerScreen();
  });

  searchRow..append(playerSel)..append(cardInput)..append(addBtn);
  addBox.append(searchRow);
  addBox.append(dropdown);

  // Manual entry button
  DivElement manualEntryRow = DivElement()..className = 'tracker-add-row';
  ButtonElement manualBtn = ButtonElement()..text = '📝 Manual Entry'..className = 'tracker-add-btn btn-secondary';
  manualBtn.onClick.listen((_) => showManualCardEntryOverlay());
  ButtonElement targetBtn = ButtonElement()..text = '🎯 Target Selector'..className = 'tracker-add-btn btn-secondary';
  targetBtn.onClick.listen((_) => showTargetSelectionOverlay(title: 'Choose Effect Target'));
  manualEntryRow..append(manualBtn)..append(targetBtn);
  addBox.append(manualEntryRow);

  if (_effectTarget != null) {
    final DivElement targetBanner = DivElement()..className = 'tracker-target-banner';
    targetBanner.append(SpanElement()..text = 'Target Locked'..className = 'target-lock-kicker');
    targetBanner.append(SpanElement()..text = (_effectTarget?['label'] ?? '').toString()..className = 'target-lock-value');
    final ButtonElement clearTargetBtn = ButtonElement()..text = 'Clear'..className = 'card-edit-btn';
    clearTargetBtn.onClick.listen((_) {
      _effectTarget = null;
      _commitState(view: AppView.tracker);
    });
    targetBanner.append(clearTargetBtn);
    addBox.append(targetBanner);
  }

  game.append(addBox);

  // Player tabs
  DivElement tabRow = DivElement()..className = 'tab-row';
  for (int i = 0; i < players.length; i++) {
    final int idx = i;
    bool active = i == trackerPlayerIndex;
    ButtonElement tab = ButtonElement()..text = players[i]['name']..className = active ? 'tab-btn tab-btn-active' : 'tab-btn';
    tab.onClick.listen((_) { trackerPlayerIndex = idx; trackerZone = 'battlefield'; showTrackerScreen(); });
    tabRow.append(tab);
  }
  game.append(tabRow);

  // Zone tabs
  var cc = players[trackerPlayerIndex]['cards'] as List;
  int bfc = cc.where((c) => c['zone'] == 'battlefield').length;
  int gyc = cc.where((c) => c['zone'] == 'graveyard').length;
  int exc = cc.where((c) => c['zone'] == 'exile').length;

  DivElement zoneRow = DivElement()..className = 'zone-row';
  for (var info in [['battlefield', 'Battlefield ($bfc)'], ['graveyard', 'Graveyard ($gyc)'], ['exile', 'Exile ($exc)']]) {
    final String zk = info[0];
    bool active = trackerZone == zk;
    ButtonElement zb = ButtonElement()..text = info[1]..className = active ? 'zone-btn zone-btn-active' : 'zone-btn';
    zb.onClick.listen((_) { trackerZone = zk; showTrackerScreen(); });
    zoneRow.append(zb);
  }
  game.append(zoneRow);

  // Cards
  List zoneCards = cc.where((c) => c['zone'] == trackerZone).toList();
  if (zoneCards.isEmpty) {
    game.append(ParagraphElement()..text = 'No cards in this zone.'..className = 'zone-empty');
  } else {
    Map<String, String> typeLabels = {'creature': 'Creatures', 'land': 'Lands', 'artifact': 'Artifacts', 'enchantment': 'Enchantments', 'planeswalker': 'Planeswalkers', 'instant': 'Instants', 'sorcery': 'Sorceries'};
    Map<String, List> grouped = {};
    for (var card in zoneCards) {
      grouped.putIfAbsent(card['type'], () => []).add(card);
    }

    const List<String> preferredOrder = ['creature', 'land', 'artifact'];
    final List<String> orderedTypes = [];
    for (final type in preferredOrder) {
      if (grouped.containsKey(type)) {
        orderedTypes.add(type);
      }
    }
    final List<String> remainingTypes = grouped.keys.where((type) => !preferredOrder.contains(type)).toList()..sort();
    orderedTypes.addAll(remainingTypes);

    for (final type in orderedTypes) {
      final List cards = grouped[type] ?? [];
      cards.sort((a, b) => (a['name'] ?? '').toString().toLowerCase().compareTo((b['name'] ?? '').toString().toLowerCase()));
      game.append(ParagraphElement()..text = (typeLabels[type] ?? type).toUpperCase()..className = 'card-section-label');
      for (var card in cards) {
        DivElement cardOuter = DivElement()..className = card['tapped'] == true ? 'card-outer card-outer-tapped' : 'card-outer';
        DivElement row = DivElement()..className = card['tapped'] == true ? 'card-row card-row-tapped' : 'card-row';

        if (trackerZone == 'battlefield') {
          DivElement tap = DivElement()..className = card['tapped'] == true ? 'tap-dot tap-dot-active' : 'tap-dot';
          tap.onClick.listen((_) { card['tapped'] = !(card['tapped'] as bool); _commitState(view: AppView.tracker); });
          row.append(tap);
        }

        // Name
        DivElement nameCol = DivElement()..className = 'card-name-col';
        List<String> sts = List<String>.from(card['supertypes'] ?? []);
        String displayName = sts.isNotEmpty ? '${sts.join(' ')} ${card['name']}' : card['name'] as String;
        SpanElement nameSpan = SpanElement()
          ..text = displayName + (card['tapped'] == true && trackerZone == 'battlefield' ? ' (tapped)' : '')
          ..className = card['tapped'] == true ? 'card-name card-name-tapped' : 'card-name';
        String? imgUrl = card['imageUrl']?.toString();
        if (imgUrl != null && imgUrl.isNotEmpty) {
          nameSpan.style.cursor = 'pointer';
          nameSpan.onClick.listen((_) => showCardImageOverlay(imgUrl, card['name'] as String));
          
          // Add hover preview
          DivElement? tooltip;
          nameSpan.onMouseEnter.listen((_) {
            tooltip = DivElement()..className = 'card-preview-tooltip';
            ImageElement img = ImageElement()..src = imgUrl..className = 'card-preview-image'..alt = card['name'] as String;
            tooltip!.append(img);
            document.body!.append(tooltip!);
            
            // Position tooltip
            Rectangle rect = nameSpan.getBoundingClientRect();
            tooltip!.style.left = '${rect.left + window.scrollX + rect.width / 2 - 100}px';
            tooltip!.style.top = '${rect.top + window.scrollY - 220}px';
            
            // Show with animation
            Future.delayed(Duration(milliseconds: 50), () {
              tooltip!.classes.add('show');
            });
          });
          
          nameSpan.onMouseLeave.listen((_) {
            if (tooltip != null) {
              tooltip!.classes.remove('show');
              Future.delayed(Duration(milliseconds: 200), () {
                tooltip!.remove();
              });
            }
          });
        }
        nameCol.append(nameSpan);
        String sub = (card['subtype'] ?? '').toString().trim();
        if (sub.isNotEmpty) nameCol.append(SpanElement()..text = sub..className = 'card-subtype');
        row.append(nameCol);

        // Mana cost
        String manaCostStr = (card['manaCost'] ?? '').toString().trim();
        if (manaCostStr.isNotEmpty) row.append(buildManaPips(manaCostStr, size: 18));

        // Counters
        if (trackerZone == 'battlefield') {
          _syncCounterState(card);
          int counters = (card['counters'] ?? 0) as int;
          DivElement cp = DivElement()..className = 'counter-pill';
          ButtonElement cm2 = ButtonElement()..text = '−'..className = 'counter-btn';
          SpanElement cv = SpanElement()..text = counters > 0 ? '+$counters/+$counters' : '0'..className = counters > 0 ? 'counter-val counter-val-active' : 'counter-val';
          ButtonElement cp3 = ButtonElement()..text = '+'..className = 'counter-btn';
          cm2.onClick.listen((_) {
            if ((_ensureCounterData(card)['+1/+1'] ?? 0) > 0) {
              _adjustCardCounter(card, '+1/+1', -1);
              int c = (card['counters'] ?? 0) as int;
              cv.text = c > 0 ? '+$c/+$c' : '0';
              cv.className = c > 0 ? 'counter-val counter-val-active' : 'counter-val';
              _commitState(view: AppView.tracker);
            }
          });
          cp3.onClick.listen((_) {
            _adjustCardCounter(card, '+1/+1', 1);
            int c = card['counters'] as int;
            cv.text = '+$c/+$c';
            cv.className = 'counter-val counter-val-active';
            _commitState(view: AppView.tracker);
          });
          cp..append(cm2)..append(cv)..append(cp3);
          row.append(cp);
        }

        final SpanElement counterSummary = SpanElement()
          ..text = _cardCounterSummary(card)
          ..className = _cardCounterSummary(card) == 'No counters' ? 'type-badge' : 'counter-summary-badge';
        row.append(counterSummary);

        // P/T badge
        if (card['type'] == 'creature' && (card['power'] != null || card['toughness'] != null)) {
          int p2 = (card['power'] ?? 0) as int;
          int t2 = (card['toughness'] ?? 0) as int;
          int cnt = (card['counters'] ?? 0) as int;
          int tb = (card['tempPtBonus'] ?? 0) as int;
          row.append(SpanElement()..text = '${p2 + cnt + tb}/${t2 + cnt + tb}'..className = 'pt-badge');
        }

        row.append(SpanElement()..text = card['type']..className = 'type-badge');

        // Keywords
        List<String> kws = List<String>.from(card['keywords'] ?? []);
        if (kws.isNotEmpty) {
          DivElement kwRow = DivElement()..className = 'card-kw-row';
          for (var kw in kws) {
            SpanElement kwBadge = SpanElement()..text = kw..className = 'card-kw-badge';
            if (kKeywordGlossary.containsKey(kw)) {
              kwBadge.style.cursor = 'pointer';
              kwBadge.onClick.listen((_) => showKeywordGlossary(kw));
            }
            kwRow.append(kwBadge);
          }
          cardOuter.append(kwRow);
        }

        // Zone buttons
        if (trackerZone == 'battlefield') {
          _zoneBtn('→ GY', 'zone-btn-gy', () { card['zone'] = 'graveyard'; card['tapped'] = false; _addLog('${players[trackerPlayerIndex]['name']}: ${card['name']} → graveyard', '${card['name']} was moved to the graveyard.'); _commitState(view: AppView.tracker); }, row);
          _zoneBtn('→ Exile', 'zone-btn-exile', () { card['zone'] = 'exile'; card['tapped'] = false; _addLog('${players[trackerPlayerIndex]['name']}: ${card['name']} → exile', '${card['name']} was exiled.'); _commitState(view: AppView.tracker); }, row);
        } else {
          _zoneBtn('→ BF', 'zone-btn-gy', () { card['zone'] = 'battlefield'; _addLog('${players[trackerPlayerIndex]['name']}: ${card['name']} returns', '${card['name']} returned to the battlefield.'); _commitState(view: AppView.tracker); }, row);
          if (trackerZone == 'graveyard') _zoneBtn('→ Exile', 'zone-btn-exile', () { card['zone'] = 'exile'; _commitState(view: AppView.tracker); }, row);
          else _zoneBtn('→ GY', 'zone-btn-gy', () { card['zone'] = 'graveyard'; _commitState(view: AppView.tracker); }, row);
        }

        ButtonElement interactBtn = ButtonElement()..text = '✦'..className = 'fx-btn';
        interactBtn.title = trackerZone == 'battlefield' ? 'Choose effect target' : 'Zone interactions';
        interactBtn.onClick.listen((_) {
          if (trackerZone == 'battlefield') {
            showTargetSelectionOverlay(title: 'Choose Target for ${card['name']}', sourceLabel: card['name']?.toString(), ownerIdx: trackerPlayerIndex);
          } else {
            showZoneInteractionOverlay(card as Map<String, dynamic>, trackerPlayerIndex);
          }
        });
        row.append(interactBtn);

        ButtonElement counterEditBtn = ButtonElement()..text = 'Counters'..className = 'fx-btn';
        counterEditBtn.onClick.listen((_) => showCounterEditorOverlay(card as Map<String, dynamic>, trackerPlayerIndex));
        row.append(counterEditBtn);

        // Edit button
        ButtonElement editBtn = ButtonElement()..text = '✏'..className = 'card-edit-btn';
        editBtn.onClick.listen((_) => showCardEditOverlay(card, trackerPlayerIndex));
        row.append(editBtn);

        // Remove button
        ButtonElement rm = ButtonElement()..text = '✕'..className = 'card-remove-btn';
        rm.onClick.listen((_) { players[trackerPlayerIndex]['cards'].remove(card); _commitState(view: AppView.tracker); });
        row.append(rm);
        cardOuter.append(row);
        game.append(cardOuter);
      }
    }
  }

  // Token creator
  _sectionDivider(game, 'Token Creator');
  DivElement tokenRow = DivElement()..className = 'tracker-add-row';
  InputElement tn = InputElement()..placeholder = 'Token name (e.g. Goblin)'..className = 'tracker-input';
  InputElement tpt = InputElement()..placeholder = 'P/T (e.g. 1/1)'..className = 'tracker-input tracker-input-sm';
  InputElement tq = InputElement(type: 'number')..placeholder = 'Qty'..value = '1'..className = 'tracker-input tracker-input-xs';

  void doAddToken() {
    String name = tn.value?.trim() ?? '';
    String pt = tpt.value?.trim() ?? '';
    int qty = int.tryParse(tq.value ?? '1') ?? 1;
    if (name.isEmpty) return;
    String label = qty > 1 ? '$qty× ${pt.isNotEmpty ? "$pt " : ""}$name' : '${pt.isNotEmpty ? "$pt " : ""}$name';
    players[trackerPlayerIndex]['cards'].add({
      'id': 'token_${DateTime.now().millisecondsSinceEpoch}',
      'name': label,
      'type': 'creature', 'subtype': 'Token', 'supertypes': [], 'keywords': [], 'oracleText': '', 'triggers': [], 'globalEffect': '',
      'tapped': false, 'zone': 'battlefield', 'counters': 0, 'tempPtBonus': 0, 'isToken': true,
    });
    _addLog('${players[trackerPlayerIndex]['name']} creates $label token', '${players[trackerPlayerIndex]['name']} created a $label token.');
    trackerZone = 'battlefield';
    _commitState(view: AppView.tracker);
  }

  tn.onKeyDown.listen((e) { if (e.keyCode == 13) doAddToken(); });
  ButtonElement tab2 = ButtonElement()..text = '+ Create'..className = 'tracker-add-btn';
  tab2.onClick.listen((_) => doAddToken());
  tokenRow..append(tn)..append(tpt)..append(tq)..append(tab2);
  game.append(tokenRow);

  // Notes
  _sectionDivider(game, 'Notes');
  TextAreaElement notes = TextAreaElement()..placeholder = 'Track effects, triggers, emblems...'..className = 'tracker-notes';
  notes.value = trackerNotes[trackerPlayerIndex] ?? '';
  notes.onInput.listen((_) { trackerNotes[trackerPlayerIndex] = notes.value ?? ''; });
  game.append(notes);
  game.append(_buildBottomBar());

  Future.delayed(const Duration(milliseconds: 50), () { window.scrollTo(0, savedScroll); });
}

void _sectionDivider(DivElement p, String label) {
  p.append(ParagraphElement()..text = label.toUpperCase()..className = 'section-divider-label');
}

void _zoneBtn(String label, String css, void Function() onTap, DivElement parent) {
  ButtonElement btn = ButtonElement()..text = label..className = css;
  btn.onClick.listen((_) => onTap());
  parent.append(btn);
}

void showManualCardEntryOverlay() {
  DivElement overlay = DivElement()..className = 'overlay';
  DivElement box = DivElement()..className = 'overlay-box manual-card-box';
  box.append(HeadingElement.h2()..text = 'Add Card Manually'..className = 'overlay-title');

  // Card name
  DivElement nameGroup = DivElement()..className = 'form-group';
  nameGroup.append(LabelElement()..text = 'Card Name'..className = 'form-label');
  InputElement nameInput = InputElement()..placeholder = 'Enter card name'..className = 'form-input';
  nameGroup.append(nameInput);
  box.append(nameGroup);

  // Card type
  DivElement typeGroup = DivElement()..className = 'form-group';
  typeGroup.append(LabelElement()..text = 'Card Type'..className = 'form-label');
  SelectElement typeSelect = SelectElement()..className = 'form-input';
  for (var t in ['creature', 'land', 'artifact', 'enchantment', 'planeswalker', 'instant', 'sorcery', 'other']) {
    typeSelect.append(OptionElement(data: t, value: t)..text = t[0].toUpperCase() + t.substring(1));
  }
  typeSelect.value = 'creature';
  typeGroup.append(typeSelect);
  box.append(typeGroup);

  // Power/Toughness (for creatures)
  DivElement ptGroup = DivElement()..className = 'form-group form-group-hidden';
  ptGroup.id = 'pt-group';
  ptGroup.append(LabelElement()..text = 'Power / Toughness'..className = 'form-label');
  DivElement ptRow = DivElement()..className = 'form-row';
  InputElement powerInput = InputElement(type: 'number')..placeholder = '0'..className = 'form-input form-input-sm'..value = '0';
  InputElement toughInput = InputElement(type: 'number')..placeholder = '0'..className = 'form-input form-input-sm'..value = '0';
  ptRow..append(powerInput)..append(SpanElement()..text = ' / '..style.margin = '0 8px')..append(toughInput);
  ptGroup.append(ptRow);
  box.append(ptGroup);

  // Keywords (for creatures)
  DivElement kwGroup = DivElement()..className = 'form-group form-group-hidden';
  kwGroup.id = 'kw-group';
  kwGroup.append(LabelElement()..text = 'Keywords (comma-separated)'..className = 'form-label');
  InputElement kwInput = InputElement()..placeholder = 'e.g. Flying, Haste, Vigilance'..className = 'form-input';
  kwGroup.append(kwInput);
  box.append(kwGroup);

  // Mana cost
  DivElement manaGroup = DivElement()..className = 'form-group';
  manaGroup.append(LabelElement()..text = 'Mana Cost (optional)'..className = 'form-label');
  InputElement manaInput = InputElement()..placeholder = 'e.g. {2}{R}{R} or 3RR'..className = 'form-input';
  manaGroup.append(manaInput);
  box.append(manaGroup);

  // Zone
  DivElement zoneGroup = DivElement()..className = 'form-group';
  zoneGroup.append(LabelElement()..text = 'Zone'..className = 'form-label');
  SelectElement zoneSelect = SelectElement()..className = 'form-input';
  for (var z in ['battlefield', 'graveyard', 'exile']) {
    zoneSelect.append(OptionElement(data: z, value: z)..text = z[0].toUpperCase() + z.substring(1));
  }
  zoneSelect.value = 'battlefield';
  zoneGroup.append(zoneSelect);
  box.append(zoneGroup);

  // Show/hide P/T and keywords based on card type
  void updateFormVisibility() {
    String type = typeSelect.value ?? 'creature';
    if (type == 'creature') {
      ptGroup.classes.remove('form-group-hidden');
      kwGroup.classes.remove('form-group-hidden');
    } else {
      ptGroup.classes.add('form-group-hidden');
      kwGroup.classes.add('form-group-hidden');
    }
  }
  typeSelect.onChange.listen((_) => updateFormVisibility());

  // Buttons
  DivElement btnRow = DivElement()..className = 'form-button-row';
  ButtonElement cancelBtn = ButtonElement()..text = 'Cancel'..className = 'overlay-cancel-btn';
  cancelBtn.onClick.listen((_) => overlay.remove());
  ButtonElement addBtn = ButtonElement()..text = 'Add Card'..className = 'overlay-done-btn';
  addBtn.onClick.listen((_) {
    String name = nameInput.value?.trim() ?? '';
    if (name.isEmpty) {
      window.alert('Please enter a card name');
      return;
    }

    String type = typeSelect.value ?? 'creature';
    int power = int.tryParse(powerInput.value ?? '0') ?? 0;
    int toughness = int.tryParse(toughInput.value ?? '0') ?? 0;
    String zone = zoneSelect.value ?? 'battlefield';
    String manaCost = manaInput.value?.trim() ?? '';

    List<String> keywords = [];
    String kwText = kwInput.value?.trim() ?? '';
    if (kwText.isNotEmpty) {
      keywords = kwText.split(',').map((k) => k.trim()).toList();
    }

    var cardData = {
      'id': '${DateTime.now().millisecondsSinceEpoch}_${Random().nextInt(9999)}',
      'name': name,
      'type': type,
      'zone': zone,
      'tapped': false,
      'counters': 0,
      'tempPtBonus': 0,
      'subtype': '',
      'supertypes': [],
      'keywords': keywords,
      'oracleText': '',
      'triggers': [],
      'globalEffect': '',
      'manaCost': manaCost,
      'isManualEntry': true,
    };

    if (type == 'creature') {
      cardData['power'] = power;
      cardData['toughness'] = toughness;
    }

    players[trackerPlayerIndex]['cards'].add(cardData);
    _cardsPlayed[players[trackerPlayerIndex]['name']] = (_cardsPlayed[players[trackerPlayerIndex]['name']] ?? 0) + 1;
    if (zone == 'battlefield' || zone == 'graveyard' || zone == 'exile' || zone == 'stack' || zone == 'command') {
      removeCardsFromHand(trackerPlayerIndex, 1);
    }
    _addLog('${players[trackerPlayerIndex]['name']} manually added ${cardData['name']}', '${players[trackerPlayerIndex]['name']} added ${cardData['name']} to ${zone}.');
    _saveSpectatorState();
    overlay.remove();
    showTrackerScreen();
  });
  btnRow..append(cancelBtn)..append(addBtn);
  box.append(btnRow);

  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

void showCardEditOverlay(Map<String, dynamic> card, int playerIdx) {
  DivElement overlay = DivElement()..className = 'overlay';
  DivElement box = DivElement()..className = 'overlay-box manual-card-box';
  box.append(HeadingElement.h2()..text = 'Edit Card'..className = 'overlay-title');

  String originalName = card['name'] ?? '';
  String originalType = card['type'] ?? 'creature';
  int originalPower = card['power'] ?? 0;
  int originalToughness = card['toughness'] ?? 0;
  List<String> originalKeywords = List<String>.from(card['keywords'] ?? []);
  String originalManaCost = card['manaCost'] ?? '';
  String originalZone = card['zone'] ?? 'battlefield';

  // Card name
  DivElement nameGroup = DivElement()..className = 'form-group';
  nameGroup.append(LabelElement()..text = 'Card Name'..className = 'form-label');
  InputElement nameInput = InputElement()..placeholder = 'Enter card name'..className = 'form-input'..value = originalName;
  nameGroup.append(nameInput);
  box.append(nameGroup);

  // Card type
  DivElement typeGroup = DivElement()..className = 'form-group';
  typeGroup.append(LabelElement()..text = 'Card Type'..className = 'form-label');
  SelectElement typeSelect = SelectElement()..className = 'form-input';
  for (var t in ['creature', 'land', 'artifact', 'enchantment', 'planeswalker', 'instant', 'sorcery', 'other']) {
    typeSelect.append(OptionElement(data: t, value: t)..text = t[0].toUpperCase() + t.substring(1));
  }
  typeSelect.value = originalType;
  typeGroup.append(typeSelect);
  box.append(typeGroup);

  // Power/Toughness (for creatures)
  DivElement ptGroup = DivElement()..className = 'form-group';
  if (originalType != 'creature') ptGroup.classes.add('form-group-hidden');
  ptGroup.id = 'pt-group-edit';
  ptGroup.append(LabelElement()..text = 'Power / Toughness'..className = 'form-label');
  DivElement ptRow = DivElement()..className = 'form-row';
  InputElement powerInput = InputElement(type: 'number')..placeholder = '0'..className = 'form-input form-input-sm'..value = originalPower.toString();
  InputElement toughInput = InputElement(type: 'number')..placeholder = '0'..className = 'form-input form-input-sm'..value = originalToughness.toString();
  ptRow..append(powerInput)..append(SpanElement()..text = ' / '..style.margin = '0 8px')..append(toughInput);
  ptGroup.append(ptRow);
  box.append(ptGroup);

  // Keywords (for creatures)
  DivElement kwGroup = DivElement()..className = 'form-group';
  if (originalType != 'creature') kwGroup.classes.add('form-group-hidden');
  kwGroup.id = 'kw-group-edit';
  kwGroup.append(LabelElement()..text = 'Keywords (comma-separated)'..className = 'form-label');
  InputElement kwInput = InputElement()..placeholder = 'e.g. Flying, Haste, Vigilance'..className = 'form-input'..value = originalKeywords.join(', ');
  kwGroup.append(kwInput);
  box.append(kwGroup);

  // Mana cost
  DivElement manaGroup = DivElement()..className = 'form-group';
  manaGroup.append(LabelElement()..text = 'Mana Cost (optional)'..className = 'form-label');
  InputElement manaInput = InputElement()..placeholder = 'e.g. {2}{R}{R} or 3RR'..className = 'form-input'..value = originalManaCost;
  manaGroup.append(manaInput);
  box.append(manaGroup);

  // Zone
  DivElement zoneGroup = DivElement()..className = 'form-group';
  zoneGroup.append(LabelElement()..text = 'Zone'..className = 'form-label');
  SelectElement zoneSelect = SelectElement()..className = 'form-input';
  for (var z in ['battlefield', 'graveyard', 'exile']) {
    zoneSelect.append(OptionElement(data: z, value: z)..text = z[0].toUpperCase() + z.substring(1));
  }
  zoneSelect.value = originalZone;
  zoneGroup.append(zoneSelect);
  box.append(zoneGroup);

  // Show/hide P/T and keywords based on card type
  void updateFormVisibility() {
    String type = typeSelect.value ?? 'creature';
    if (type == 'creature') {
      ptGroup.classes.remove('form-group-hidden');
      kwGroup.classes.remove('form-group-hidden');
    } else {
      ptGroup.classes.add('form-group-hidden');
      kwGroup.classes.add('form-group-hidden');
    }
  }
  typeSelect.onChange.listen((_) => updateFormVisibility());

  // Buttons
  DivElement btnRow = DivElement()..className = 'form-button-row';
  ButtonElement cancelBtn = ButtonElement()..text = 'Cancel'..className = 'overlay-cancel-btn';
  cancelBtn.onClick.listen((_) => overlay.remove());
  ButtonElement saveBtn = ButtonElement()..text = 'Save Changes'..className = 'overlay-done-btn';
  saveBtn.onClick.listen((_) {
    String name = nameInput.value?.trim() ?? '';
    if (name.isEmpty) {
      window.alert('Please enter a card name');
      return;
    }

    String type = typeSelect.value ?? 'creature';
    int power = int.tryParse(powerInput.value ?? '0') ?? 0;
    int toughness = int.tryParse(toughInput.value ?? '0') ?? 0;
    String zone = zoneSelect.value ?? 'battlefield';
    String manaCost = manaInput.value?.trim() ?? '';

    List<String> keywords = [];
    String kwText = kwInput.value?.trim() ?? '';
    if (kwText.isNotEmpty) {
      keywords = kwText.split(',').map((k) => k.trim()).toList();
    }

    // Update card properties
    card['name'] = name;
    card['type'] = type;
    card['zone'] = zone;
    card['manaCost'] = manaCost;
    card['keywords'] = keywords;

    if (type == 'creature') {
      card['power'] = power;
      card['toughness'] = toughness;
    }

    _addLog('${players[playerIdx]['name']}: ${card['name']} edited', 'Card properties updated.');
    _saveSpectatorState();
    overlay.remove();
    showTrackerScreen();
  });
  btnRow..append(cancelBtn)..append(saveBtn);
  box.append(btnRow);

  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

void showKeywordGlossary(String keyword) {
  DivElement overlay = DivElement()..className = 'overlay';
  DivElement box = DivElement()..className = 'overlay-box glossary-box';
  box.append(HeadingElement.h2()..text = keyword..className = 'overlay-title');
  String def = kKeywordGlossary[keyword] ?? 'No definition available.';
  box.append(ParagraphElement()..text = def..className = 'glossary-def');
  ButtonElement cl = ButtonElement()..text = 'Got it'..className = 'overlay-done-btn';
  cl.onClick.listen((_) => overlay.remove());
  box.append(cl);
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

void showCardImageOverlay(String imageUrl, String cardName) {
  DivElement overlay = DivElement()..className = 'overlay';
  DivElement box = DivElement()..className = 'overlay-box card-image-box';
  ImageElement img = ImageElement()..src = imageUrl..className = 'card-image-full'..alt = cardName;
  box.append(img);
  box.append(ParagraphElement()..text = cardName..className = 'card-image-name');
  ButtonElement cl = ButtonElement()..text = 'Close'..className = 'overlay-continue-btn';
  cl.onClick.listen((_) => overlay.remove());
  box.append(cl);
  overlay.append(box);
  overlay.onClick.listen((e) { if (e.target == overlay) overlay.remove(); });
  document.body!.append(overlay);
}

// ════════════════════════════════════════════════════════════
// GAME TRACKER / LOG SCREEN
// ════════════════════════════════════════════════════════════

void showGameTrackerScreen() {
  _currentView = AppView.history;
  DivElement? game = querySelector('#game-screen') as DivElement?;
  if (game == null) return;
  game.children.clear();

  ButtonElement back = ButtonElement()..text = '← Back to Game'..className = 'btn-back';
  back.onClick.listen((_) => buildGameScreen());
  game.append(back);
  game.append(HeadingElement.h2()..text = 'Game Log'..className = 'tracker-title');

  DivElement toggleRow = DivElement()..className = 'tab-row';
  ButtonElement techBtn = ButtonElement()..text = 'Detailed'..className = newPlayerMode ? 'tab-btn' : 'tab-btn tab-btn-active';
  ButtonElement simpleBtn = ButtonElement()..text = 'Simple'..className = newPlayerMode ? 'tab-btn tab-btn-active' : 'tab-btn';
  techBtn.onClick.listen((_) { newPlayerMode = false; showGameTrackerScreen(); });
  simpleBtn.onClick.listen((_) { newPlayerMode = true; showGameTrackerScreen(); });
  toggleRow..append(techBtn)..append(simpleBtn);
  game.append(toggleRow);

  DivElement list = DivElement()..className = 'tracker-list';
  List<String> source = newPlayerMode ? plainLog : gameLog;
  if (source.isEmpty) {
    list.append(ParagraphElement()..text = 'No events yet.'..className = 'zone-empty');
  }
  for (int i = source.length - 1; i >= 0; i--) {
    list.append(ParagraphElement()..text = source[i]..className = 'log-entry');
  }
  game.append(list);

  ButtonElement clearBtn = ButtonElement()..text = 'Clear Log'..className = 'tracker-add-btn';
  clearBtn.onClick.listen((_) { gameLog.clear(); plainLog.clear(); showGameTrackerScreen(); });
  game.append(clearBtn);
  game.append(_buildBottomBar());
}

// ════════════════════════════════════════════════════════════
// STATS SCREEN
// ════════════════════════════════════════════════════════════

void showStatsScreen() {
  _currentView = AppView.stats;
  DivElement? game = querySelector('#game-screen') as DivElement?;
  if (game == null) return;
  game.children.clear();

  ButtonElement back = ButtonElement()..text = '← Back to Game'..className = 'btn-back';
  back.onClick.listen((_) => buildGameScreen());
  game.append(back);
  game.append(HeadingElement.h2()..text = 'Game Stats'..className = 'tracker-title');

  List<Map<String, dynamic>> history = loadGameHistory();
  if (history.isEmpty) {
    game.append(ParagraphElement()..text = 'No games recorded yet.'..className = 'stats-empty');
    game.append(_buildBottomBar());
    return;
  }

  int totalGames = history.length;
  Map<String, int> wins = {};
  Map<String, int> gp = {};
  for (var g in history) {
    String w = g['winner'] as String;
    wins[w] = (wins[w] ?? 0) + 1;
    for (var p in (g['players'] as List)) {
      String pn = p as String;
      gp[pn] = (gp[pn] ?? 0) + 1;
    }
  }

  double avgT = history.map((g) => (g['turns'] as int?) ?? 0).reduce((a, b) => a + b) / history.length;
  String topW = wins.isEmpty ? '—' : wins.entries.reduce((a, b) => a.value > b.value ? a : b).key;

  // Calculate additional stats
  int maxTurns = history.map((g) => (g['turns'] as int?) ?? 0).reduce((a, b) => a > b ? a : b);
  int minTurns = history.map((g) => (g['turns'] as int?) ?? 0).reduce((a, b) => a < b ? a : b);
  Map<String, dynamic>? longestGame = history.where((g) => (g['turns'] as int?) == maxTurns).isNotEmpty ? history.where((g) => (g['turns'] as int?) == maxTurns).first : null;
  Map<String, dynamic>? shortestGame = history.where((g) => (g['turns'] as int?) == minTurns).isNotEmpty ? history.where((g) => (g['turns'] as int?) == minTurns).first : null;

  // Find biggest comeback (player who was losing most but won)
  Map<String, dynamic>? biggestComeback;
  int biggestComebackMargin = 0;
  for (var g in history) {
    List<Map<String, dynamic>> lifeHistory = (g['lifeHistory'] as List?)?.cast<Map<String, dynamic>>() ?? [];
    if (lifeHistory.isNotEmpty) {
      // Find the lowest life the winner had during the game
      int winnerLowestLife = startingLife;
      String winner = g['winner'] as String;
      for (var lh in lifeHistory) {
        if (lh.containsKey(winner)) {
          winnerLowestLife = min(winnerLowestLife, lh[winner] as int? ?? startingLife);
        }
      }
      int margin = startingLife - winnerLowestLife;
      if (margin > biggestComebackMargin) {
        biggestComebackMargin = margin;
        biggestComeback = g;
      }
    }
  }

  // Find current win streaks
  Map<String, int> currentStreaks = {};
  for (var player in gp.keys) {
    int streak = 0;
    for (var g in history.reversed) {
      if (g['winner'] == player) {
        streak++;
      } else if ((g['players'] as List).contains(player)) {
        break; // Streak ended
      }
    }
    if (streak > 0) currentStreaks[player] = streak;
  }
  String longestStreakPlayer = currentStreaks.isEmpty ? '—' : currentStreaks.entries.reduce((a, b) => a.value > b.value ? a : b).key;
  int longestStreak = currentStreaks.isEmpty ? 0 : currentStreaks[longestStreakPlayer] ?? 0;

  DivElement sr = DivElement()..className = 'stats-summary-row';
  sr.append(_buildStatCard('Total Games', '$totalGames'));
  sr.append(_buildStatCard('Most Wins', topW));
  sr.append(_buildStatCard('Avg Turns', avgT.toStringAsFixed(1)));
  game.append(sr);

  // Achievement highlights
  game.append(ParagraphElement()..text = 'ACHIEVEMENTS'..className = 'stats-section-label');
  DivElement highlights = DivElement()..className = 'highlight-grid';

  if (longestGame != null) {
    highlights.append(_buildHighlightCard('🏆', 'Longest Game', '${longestGame['turns']} turns', '${longestGame['winner']} vs ${(longestGame['players'] as List).join(', ')}'));
  }
  if (shortestGame != null && shortestGame['turns'] != longestGame?['turns']) {
    highlights.append(_buildHighlightCard('⚡', 'Quickest Game', '${shortestGame['turns']} turns', '${shortestGame['winner']} vs ${(shortestGame['players'] as List).join(', ')}'));
  }
  if (biggestComeback != null && biggestComebackMargin > 0) {
    highlights.append(_buildHighlightCard('🔥', 'Biggest Comeback', '$biggestComebackMargin life', '${biggestComeback['winner']} from near death'));
  }
  if (longestStreak > 1) {
    highlights.append(_buildHighlightCard('🔥', 'Hot Streak', '$longestStreak wins', '$longestStreakPlayer is on fire!'));
  }

  // Add some fun stats if we have enough data
  if (totalGames >= 3) {
    int blowouts = history.where((g) => _isBlowout(g)).length;
    if (blowouts > 0) {
      highlights.append(_buildHighlightCard('💥', 'Total Blowouts', '$blowouts games', 'Decisive victories'));
    }
  }

  game.append(highlights);

  game.append(ParagraphElement()..text = 'WIN RATES'..className = 'stats-section-label');
  List<MapEntry<String, int>> sorted = gp.entries.toList()
    ..sort((a, b) {
      double ra = (wins[a.key] ?? 0) / a.value;
      double rb = (wins[b.key] ?? 0) / b.value;
      return rb.compareTo(ra);
    });
  for (var e in sorted) {
    int played = e.value;
    int won = wins[e.key] ?? 0;
    double rate = won / played * 100;
    DivElement pr = DivElement()..className = 'stats-player-row';
    pr.append(SpanElement()..text = e.key..className = 'stats-player-name');
    DivElement bw = DivElement()..className = 'stats-bar-wrap';
    bw.append(DivElement()..className = 'stats-bar-fill'..style.width = '${rate.toStringAsFixed(0)}%');
    pr.append(bw);
    pr.append(SpanElement()..text = '${rate.toStringAsFixed(0)}% ($won/$played)'..className = 'stats-rate');
    game.append(pr);
  }

  game.append(ParagraphElement()..text = 'RECENT GAMES'..className = 'stats-section-label');
  for (var g in history.reversed.take(10)) {
    DateTime date = DateTime.parse(g['date'] as String);
    DivElement gr = DivElement()..className = 'stats-game-row';

    // Add intensity indicator
    String intensityClass = _getGameIntensityClass(g);
    if (intensityClass.isNotEmpty) {
      gr.classes.add(intensityClass);
    }

    gr.append(SpanElement()..text = '${date.month}/${date.day}/${date.year}'..className = 'stats-game-date');
    gr.append(SpanElement()..text = '🏆 ${g['winner']}'..className = 'stats-game-winner');

    // Add intensity badge
    String intensityBadge = _getGameIntensityBadge(g);
    if (intensityBadge.isNotEmpty) {
      gr.append(SpanElement()..text = intensityBadge..className = 'stats-game-intensity');
    }

    gr.append(SpanElement()..text = (g['players'] as List).join(' · ')..className = 'stats-game-players');
    gr.append(SpanElement()..text = '${g['turns']} turns · ${g['format']}'..className = 'stats-game-turns');
    game.append(gr);
  }

  ButtonElement cl = ButtonElement()..text = 'Clear All History'..className = 'stats-clear-btn';
  cl.onClick.listen((_) { if (window.confirm('Clear all game history?')) { clearGameHistory(); showStatsScreen(); } });
  game.append(cl);
  game.append(_buildBottomBar());
}

DivElement _buildStatCard(String label, String value) {
  DivElement c = DivElement()..className = 'stat-summary-card';
  c.append(SpanElement()..text = label..className = 'stat-summary-label');
  c.append(SpanElement()..text = value..className = 'stat-summary-value');
  return c;
}

DivElement _buildHighlightCard(String icon, String label, String value, String subtitle) {
  DivElement c = DivElement()..className = 'highlight-card';
  c.append(SpanElement()..text = icon..className = 'highlight-icon');
  c.append(SpanElement()..text = label..className = 'highlight-label');
  c.append(SpanElement()..text = value..className = 'highlight-value');
  c.append(SpanElement()..text = subtitle..className = 'highlight-subtitle');
  return c;
}

bool _isBlowout(Map<String, dynamic> game) {
  // A blowout is when the winner had much higher life than others at the end
  List<Map<String, dynamic>> lifeHistory = (game['lifeHistory'] as List?)?.cast<Map<String, dynamic>>() ?? [];
  if (lifeHistory.isEmpty) return false;

  Map<String, dynamic> finalLife = lifeHistory.last;
  String winner = game['winner'] as String;
  int winnerLife = finalLife[winner] ?? 0;

  // Check if winner had at least 2x the life of any other player
  for (var player in (game['players'] as List)) {
    if (player != winner) {
      int otherLife = finalLife[player] ?? 0;
      if (otherLife > 0 && winnerLife >= otherLife * 2) {
        return true;
      }
    }
  }
  return false;
}

String _getGameIntensityClass(Map<String, dynamic> game) {
  int turns = game['turns'] as int? ?? 0;
  List<Map<String, dynamic>> lifeHistory = (game['lifeHistory'] as List?)?.cast<Map<String, dynamic>>() ?? [];

  if (_isBlowout(game)) return 'game-blowout';
  if (turns >= 50) return 'game-marathon';
  if (turns <= 5) return 'game-blitz';

  // Check for close game (multiple players within 5 life of each other at some point)
  if (lifeHistory.isNotEmpty) {
    for (var lh in lifeHistory) {
      List<int> lives = lh.values.whereType<int>().toList();
      if (lives.length >= 2) {
        int maxLife = lives.reduce((a, b) => a > b ? a : b);
        int minLife = lives.reduce((a, b) => a < b ? a : b);
        if (maxLife - minLife <= 5) return 'game-close';
      }
    }
  }

  return '';
}

String _getGameIntensityBadge(Map<String, dynamic> game) {
  int turns = game['turns'] as int? ?? 0;

  if (_isBlowout(game)) return '💥 BLOWOUT';
  if (turns >= 50) return '🏃 MARATHON';
  if (turns <= 5) return '⚡ BLITZ';

  List<Map<String, dynamic>> lifeHistory = (game['lifeHistory'] as List?)?.cast<Map<String, dynamic>>() ?? [];
  if (lifeHistory.isNotEmpty) {
    for (var lh in lifeHistory) {
      List<int> lives = lh.values.whereType<int>().toList();
      if (lives.length >= 2) {
        int maxLife = lives.reduce((a, b) => a > b ? a : b);
        int minLife = lives.reduce((a, b) => a < b ? a : b);
        if (maxLife - minLife <= 5) return '🎯 CLOSE';
      }
    }
  }

  return '';
}
