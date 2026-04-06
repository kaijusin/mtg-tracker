part of '../main.dart';

// ════════════════════════════════════════════════════════════
// ELIMINATION & WINNER
// ════════════════════════════════════════════════════════════

void checkElimination(int index) {
  var player = players[index];
  if (player['eliminated'] == true) return;
  if (player['life'] <= 0) { 
    player['eliminated'] = true; 
    if (_firstBloodPlayer.isEmpty) _firstBloodPlayer = player['name'] as String;
    _addLog('${player['name']} eliminated (0 life)', '${player['name']} ran out of life and is eliminated.'); 
    showEliminationOverlay(player['name'] as String, 'Ran out of life'); 
  }
  if (isCommander) {
    Map<int, int> cmd = player['commanderDamage'];
    for (var dmg in cmd.values) {
      if (dmg >= 21) { 
        player['eliminated'] = true; 
        if (_firstBloodPlayer.isEmpty) _firstBloodPlayer = player['name'] as String;
        _addLog('${player['name']} eliminated by commander damage', '${player['name']} took 21+ commander damage.'); 
        showEliminationOverlay(player['name'] as String, '21 commander damage'); 
        break; 
      }
    }
  }
  if (player['poison'] >= 10) { 
    player['eliminated'] = true; 
    if (_firstBloodPlayer.isEmpty) _firstBloodPlayer = player['name'] as String;
    _addLog('${player['name']} eliminated by poison', '${player['name']} accumulated 10 poison counters.'); 
    showEliminationOverlay(player['name'] as String, '10 poison counters'); 
  }
  checkWinner();
}

void checkWinner() {
  var alive = players.where((p) => p['eliminated'] != true).toList();
  if (alive.length == 1) {
    String winner = alive[0]['name'] as String;
    _addLog('$winner wins!', '$winner is the last player standing — they win!');
    String gyP = '—';
    int gyV = 0;
    for (var p in players) {
      int gyC = (p['cards'] as List).where((c) => c['zone'] == 'graveyard').length;
      if (gyC > gyV) { gyV = gyC; gyP = p['name'] as String; }
    }
    String lpP = '—';
    int lpV = 0;
    _lifeGained.forEach((k, v) { if (v > lpV) { lpV = v; lpP = k; } });
    String cpP = '—';
    int cpV = 0;
    _cardsPlayed.forEach((k, v) { if (v > cpV) { cpV = v; cpP = k; } });
    String cmdP = '—';
    int cmdV = 0;
    if (isCommander) {
      Map<String, int> cmdDealt = {};
      for (var p in players) {
        String name = p['name'] as String;
        cmdDealt[name] = 0;
        Map<int, int> cmd = p['commanderDamage'] as Map<int, int>;
        cmd.forEach((k, v) { cmdDealt[name] = (cmdDealt[name] ?? 0) + v; });
      }
      cmdDealt.forEach((k, v) { if (v > cmdV) { cmdV = v; cmdP = k; } });
    }
    saveGameResult(
      winner: winner,
      playerNames: players.map((p) => p['name'] as String).toList(),
      format: isCommander ? 'Commander' : 'Normal',
      turns: turnCount,
      highlights: {
        'gyPlayer': gyP, 'gyVal': gyV,
        'longestTurnPlayer': _longestTurnPlayer, 'longestTurnSecs': _longestTurnSeconds,
        'lifeGainedPlayer': lpP, 'lifeGainedVal': lpV,
        'cardsPlayedPlayer': cpP, 'cardsPlayedVal': cpV,
        'cmdPlayer': cmdP, 'cmdVal': cmdV,
        'firstBloodPlayer': _firstBloodPlayer,
      },
    );
    showWinnerOverlay(winner, turnCount, _longestTurnPlayer, _longestTurnSeconds, lpP, lpV, cmdP, cmdV, _firstBloodPlayer);
  }
}

void showEliminationOverlay(String name, String reason) {
  DivElement overlay = DivElement()..className = 'overlay';
  DivElement box = DivElement()..className = 'overlay-box overlay-box-elim';
  box.append(HeadingElement.h2()..text = '$name is eliminated'..className = 'overlay-elim-title');
  box.append(ParagraphElement()..text = reason..className = 'overlay-sub');
  ButtonElement btn = ButtonElement()..text = 'Continue'..className = 'overlay-continue-btn';
  btn.onClick.listen((_) { overlay.remove(); buildGameScreen(); });
  box.append(btn);
  overlay.append(box);
  document.body!.append(overlay);
}

void showWinnerOverlay(String winner, int totalTurns, String longestTurnPlayer, int longestTurnSecs, String lifeSwingPlayer, int lifeSwingVal, String cmdPlayer, int cmdVal, String firstBloodPlayer) {
  DivElement overlay = DivElement()..className = 'overlay overlay-recap';
  DivElement box = DivElement()..className = 'recap-box';
  
  // Winner announcement
  DivElement winnerSection = DivElement()..className = 'recap-winner';
  winnerSection.append(HeadingElement.h1()..text = '🏆 VICTORY! 🏆'..className = 'recap-title');
  winnerSection.append(HeadingElement.h2()..text = winner..className = 'recap-winner-name');
  winnerSection.append(ParagraphElement()..text = 'is the champion!'..className = 'recap-subtitle');
  box.append(winnerSection);
  
  // Stats
  DivElement statsSection = DivElement()..className = 'recap-stats';
  statsSection.append(HeadingElement.h3()..text = 'Game Statistics'..className = 'recap-stats-title');
  
  List<Map<String, String>> stats = [
    {'label': 'Total Turns', 'value': totalTurns.toString()},
    {'label': 'Longest Turn', 'value': longestTurnPlayer.isNotEmpty ? '$longestTurnPlayer (${longestTurnSecs ~/ 60}:${(longestTurnSecs % 60).toString().padLeft(2, '0')})' : '—'},
    {'label': 'Biggest Life Swing', 'value': lifeSwingPlayer != '—' ? '$lifeSwingPlayer (+$lifeSwingVal life)' : '—'},
    {'label': 'Most Commander Damage Dealt', 'value': cmdPlayer != '—' ? '$cmdPlayer ($cmdVal dmg)' : '—'},
    {'label': 'First Blood', 'value': firstBloodPlayer.isNotEmpty ? firstBloodPlayer : '—'},
  ];
  
  for (var stat in stats) {
    DivElement statRow = DivElement()..className = 'recap-stat-row';
    statRow.append(SpanElement()..text = stat['label']!..className = 'recap-stat-label');
    statRow.append(SpanElement()..text = stat['value']!..className = 'recap-stat-value');
    statsSection.append(statRow);
  }
  
  box.append(statsSection);
  
  // Buttons
  DivElement btnRow = DivElement()..className = 'recap-btn-row';
  ButtonElement playAgain = ButtonElement()..text = 'Play Again'..className = 'recap-btn recap-play-again';
  playAgain.onClick.listen((_) { overlay.remove(); resetGame(); });
  ButtonElement newSetup = ButtonElement()..text = 'New Setup'..className = 'recap-btn recap-new-setup';
  newSetup.onClick.listen((_) { overlay.remove(); goBackToSetup(); });
  btnRow..append(playAgain)..append(newSetup);
  box.append(btnRow);
  
  overlay.append(box);
  document.body!.append(overlay);
}
