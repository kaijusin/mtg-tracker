part of '../main.dart';

// ════════════════════════════════════════════════════════════
// SPECTATOR STATE SYNC
// ════════════════════════════════════════════════════════════

void _saveSpectatorState() {
  _persistOperatorState();
  if (!gameStarted || players.isEmpty) return;
  try {
    String combatPhase = 'idle';
    if (_inCombat) {
      if (_combatPhase == 0) combatPhase = 'declaring_attackers';
      else if (_combatPhase == 1) combatPhase = 'declaring_blockers';
      else if (_combatPhase == 2) combatPhase = 'damage_resolution';
      else if (_combatPhase == 3) combatPhase = 'results';
    }

    List<Map<String, dynamic>> playerData = players.map((p) {
      List<Map<String, dynamic>> cards = [];
      for (var card in (p['cards'] as List)) {
        String landColor = _getLandColor(card);
        String art = _getCardArt(card);
        String? glowColor;
        List<dynamic> keywords = card['keywords'] ?? [];
        if (keywords.contains('Lifelink') || keywords.contains('Vigilance')) glowColor = 'rgba(201,168,76,0.4)';
        else if (keywords.contains('Flying') || keywords.contains('Reach')) glowColor = 'rgba(100,140,255,0.35)';
        else if (keywords.contains('Deathtouch')) glowColor = 'rgba(160,80,255,0.35)';

        cards.add({
          'id': card['id'] ?? card['name'],
          'name': card['name'] ?? '',
          'type': card['type'] ?? 'creature',
          'zone': card['zone'] ?? 'battlefield',
          'tapped': card['tapped'] ?? false,
          'damage': card['damage'] ?? 0,
          'power': card['power'],
          'toughness': card['toughness'],
          'keywords': card['keywords'] ?? [],
          'counters': card['counters'] ?? 0,
          'imageUrl': card['imageUrl'] ?? '',
          'manaCost': card['manaCost'] ?? '',
          'oracleText': card['oracleText'] ?? '',
          'landColor': landColor,
          'art': art,
          'glowColor': glowColor,
          'attacking': card['attacking'] ?? false,
        });
      }

      Map<String, dynamic> cmdDmg = {};
      if (p['commanderDamage'] != null) {
        (p['commanderDamage'] as Map).forEach((k, v) { cmdDmg[k.toString()] = v; });
      }

      return {
        'name': p['name'] ?? '',
        'commander': p['commander'] ?? '',
        'life': p['life'] ?? 20,
        'handSize': p['handSize'] ?? 7,
        'poison': p['poison'] ?? 0,
        'eliminated': p['eliminated'] ?? false,
        'isMonarch': p['isMonarch'] ?? false,
        'hasInitiative': p['hasInitiative'] ?? false,
        'commanderDamage': cmdDmg,
        'cards': cards,
      };
    }).toList();

    Map<String, dynamic> state = {
      'players': playerData,
      'currentPlayer': players[currentPlayerIndex]['name'] ?? '',
      'turn': turnCount,
      'phase': turnPhases[currentPhaseIndex.clamp(0, turnPhases.length - 1)],
      'phaseIndex': currentPhaseIndex,
      'format': isCommander ? 'Commander' : 'Standard',
      'log': plainLog.reversed.take(8).toList(),
      'combatLog': _combatLog.take(10).toList(),
      'lifeHistory': _lifeHistory,
      'combatState': {
        'active': _inCombat,
        'phase': combatPhase,
        'attackerPlayer': players[currentPlayerIndex]['name'] ?? '',
        'defenderPlayer': _combatAttackers.isNotEmpty ? players[_combatAttackers.first['targetIdx'] as int]['name'] ?? '' : '',
        'attackers': _combatAttackers.map((entry) {
          final card = entry['card'] as Map<String, dynamic>;
          final blockers = List<Map<String, dynamic>>.from(entry['blockers'] as List? ?? []);
          return {
            'player': players[currentPlayerIndex]['name'] ?? '',
            'cardId': card['id'] ?? card['name'],
            'cardName': card['name'] ?? '',
            'defenderPlayer': players[entry['targetIdx'] as int]['name'] ?? '',
            'blockers': blockers.map((blocker) => {
              'player': players.firstWhere((p) => (p['cards'] as List).any((c) => (c['id']?.toString() ?? c['name']) == (blocker['id']?.toString() ?? blocker['name'])), orElse: () => {'name': ''})['name'] ?? '',
              'cardId': blocker['id'] ?? blocker['name'],
              'cardName': blocker['name'] ?? '',
            }).toList(),
          };
        }).toList(),
      },
    };

    window.localStorage['mtg_spectator'] = jsonEncode(state);
    // Trigger storage event for other tabs
    window.localStorage['mtg_spectator_ts'] = DateTime.now().millisecondsSinceEpoch.toString();
  } catch (e) {
    // silent
  }
}

String _getLandColor(Map<String, dynamic> card) {
  if (card['type'] != 'land') return 'C';
  if (card['landColor'] != null) return card['landColor'] as String;
  String name = (card['name'] ?? '').toString().toLowerCase();
  if (name.contains('forest')) return 'G';
  if (name.contains('island')) return 'U';
  if (name.contains('plains')) return 'W';
  if (name.contains('swamp')) return 'B';
  if (name.contains('mountain')) return 'R';
  return 'C';
}

String _getCardArt(Map<String, dynamic> card) {
  String name = (card['name'] ?? '').toString().toLowerCase();
  String type = (card['type'] ?? '').toString();
  if (name.contains('sol ring')) return '💍';
  if (name.contains('atraxa')) return '✨';
  if (name.contains('dragon')) return '🐉';
  if (name.contains('angel')) return '👼';
  if (name.contains('demon')) return '😈';
  if (name.contains('zombie') || name.contains('undead')) return '💀';
  if (name.contains('goblin')) return '👺';
  if (name.contains('lightning')) return '⚡';
  if (name.contains('wolf') || name.contains('werewolf')) return '🐺';
  if (name.contains('elf') || name.contains('llanowar')) return '🌿';
  if (name.contains('bird')) return '🦜';
  if (name.contains('sphinx')) return '🦅';
  if (name.contains('spirit')) return '👻';
  Map<String, String> typeArts = {'creature': '⚔', 'artifact': '⚙', 'enchantment': '✦', 'planeswalker': '★', 'instant': '💫', 'sorcery': '🌀', 'land': '🏔'};
  return typeArts[type] ?? '🃏';
}
