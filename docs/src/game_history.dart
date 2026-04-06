part of '../main.dart';

// ════════════════════════════════════════════════════════════
// LOCAL STORAGE — GAME HISTORY
// ════════════════════════════════════════════════════════════

List<Map<String, dynamic>> loadGameHistory() {
  try {
    String? raw = window.localStorage['mtg_game_history'];
    if (raw == null || raw.isEmpty) return [];
    return (jsonDecode(raw) as List).map((e) => Map<String, dynamic>.from(e as Map)).toList();
  } catch (_) {
    return [];
  }
}

void saveGameResult({
  required String winner, required List<String> playerNames,
  required String format, required int turns,
  required Map<String, dynamic> highlights,
}) {
  List<Map<String, dynamic>> history = loadGameHistory();
  history.add({
    'winner': winner, 'players': playerNames, 'format': format,
    'date': DateTime.now().toIso8601String(), 'turns': turns,
    'highlights': highlights,
  });
  window.localStorage['mtg_game_history'] = jsonEncode(history);
}

void clearGameHistory() => window.localStorage.remove('mtg_game_history');
