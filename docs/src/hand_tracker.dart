part of '../main.dart';

// ════════════════════════════════════════════════════════════
// HAND TRACKER — Tracks player hand size and draws
// ════════════════════════════════════════════════════════════

/// Initialize hand tracking for all players
void initializeHandTracking() {
  for (int i = 0; i < players.length; i++) {
    players[i]['handSize'] = 7; // Starting hand size
  }
}

/// Get the current hand size for a player
int getHandSize(int playerIdx) {
  if (playerIdx < 0 || playerIdx >= players.length) return 0;
  return (players[playerIdx]['handSize'] ?? 0) as int;
}

/// Set the hand size manually
void setHandSize(int playerIdx, int size) {
  if (playerIdx < 0 || playerIdx >= players.length) return;
  players[playerIdx]['handSize'] = size.clamp(0, 999);
  _saveSpectatorState();
}

/// Add cards to hand (draws)
void drawCards(int playerIdx, int count) {
  if (playerIdx < 0 || playerIdx >= players.length) return;
  int current = getHandSize(playerIdx);
  players[playerIdx]['handSize'] = (current + count).clamp(0, 999);
  _addLog(
    '${players[playerIdx]['name']} draws $count card${count > 1 ? "s" : ""} (Hand: ${getHandSize(playerIdx)})',
    '${players[playerIdx]['name']} draws $count card${count > 1 ? "s" : ""}. Hand size is now ${getHandSize(playerIdx)}.',
  );
  // Auto-advance from Draw to Main phase when a card is drawn
  if (currentPhaseIndex == 0) {
    _setTurnPhase(1);
  }
  _saveSpectatorState();
}

/// Remove cards from hand (plays/casts)
void removeCardsFromHand(int playerIdx, int count) {
  if (playerIdx < 0 || playerIdx >= players.length) return;
  int current = getHandSize(playerIdx);
  int newSize = (current - count).clamp(0, 999);
  players[playerIdx]['handSize'] = newSize;
  _saveSpectatorState();
}

/// Called when a card is placed on battlefield
void onCardPlaced(int playerIdx) {
  removeCardsFromHand(playerIdx, 1);
}

/// Called when a card is cast/played
void onCardCast(int playerIdx) {
  removeCardsFromHand(playerIdx, 1);
}

/// Reset hand to starting size (mulligan or restart)
void resetHand(int playerIdx, {int toSize = 7}) {
  if (playerIdx < 0 || playerIdx >= players.length) return;
  players[playerIdx]['handSize'] = toSize;
  _addLog(
    '${players[playerIdx]['name']} hand reset to $toSize (mulligan)',
    '${players[playerIdx]['name']} took a mulligan. Hand is now $toSize card${toSize > 1 ? "s" : ""}.',
  );
  _saveSpectatorState();
}

/// Discard cards from hand
void discardCards(int playerIdx, int count) {
  if (playerIdx < 0 || playerIdx >= players.length) return;
  removeCardsFromHand(playerIdx, count);
  _addLog(
    '${players[playerIdx]['name']} discards $count card${count > 1 ? "s" : ""} (Hand: ${getHandSize(playerIdx)})',
    '${players[playerIdx]['name']} discards $count card${count > 1 ? "s" : ""}.',
  );
  _saveSpectatorState();
}

/// Get hand size display string for UI
String getHandDisplay(int playerIdx) {
  int size = getHandSize(playerIdx);
  return '🎴 $size';
}

// ════════════════════════════════════════════════════════════
// VOICE COMMANDS FOR HAND TRACKING
// ════════════════════════════════════════════════════════════

void _executeVoiceDrawCards(String text) {
  // "kai draws 2 cards" or "chi draws from deck" or "pull a card"
  int playerIdx = _findPlayerByFuzzyMatch(text);
  
  if (playerIdx < 0) {
    _voiceCommands.insert(0, '❌ Player not found');
    _updateVoicePanel();
    return;
  }

  // Extract number of cards drawn
  RegExp numPattern = RegExp(r'(\d+)');
  Match? match = numPattern.firstMatch(text);
  int cardCount = 1; // Default to 1 card
  
  if (match != null) {
    cardCount = int.tryParse(match.group(1)!) ?? 1;
  }

  drawCards(playerIdx, cardCount);
  _voiceCommands.insert(0, '✓ ${players[playerIdx]['name']} draws $cardCount card${cardCount > 1 ? "s" : ""} • Hand: ${getHandSize(playerIdx)}');
  _commitState();
  _updateVoicePanel();
}

void _executeVoiceDiscardCards(String text) {
  // "kai discards 2 cards" or "discard a card"
  int playerIdx = _findPlayerByFuzzyMatch(text);
  
  if (playerIdx < 0) {
    _voiceCommands.insert(0, '❌ Player not found');
    _updateVoicePanel();
    return;
  }

  // Extract number of cards
  RegExp numPattern = RegExp(r'(\d+)');
  Match? match = numPattern.firstMatch(text);
  int cardCount = 1; // Default to 1 card
  
  if (match != null) {
    cardCount = int.tryParse(match.group(1)!) ?? 1;
  }

  discardCards(playerIdx, cardCount);
  _voiceCommands.insert(0, '✓ ${players[playerIdx]['name']} discards $cardCount card${cardCount > 1 ? "s" : ""} • Hand: ${getHandSize(playerIdx)}');
  _commitState();
  _updateVoicePanel();
}
