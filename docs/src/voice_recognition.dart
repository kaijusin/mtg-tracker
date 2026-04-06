part of '../main.dart';

// ════════════════════════════════════════════════════════════
// VOICE SPEECH RECOGNITION (Web Speech API)
// ════════════════════════════════════════════════════════════

dynamic _voiceRecognition;
bool _voiceListening = false;
List<String> _voiceCommands = [];

void initializeVoiceRecognition() {
  try {
    // Get the SpeechRecognition constructor
    var speechRecognitionConstructor = context['webkitSpeechRecognition'] ?? context['SpeechRecognition'];
    if (speechRecognitionConstructor == null) {
      print('Speech Recognition not supported');
      return;
    }

    // Create instance
    _voiceRecognition = JsObject(speechRecognitionConstructor);

    // Set properties
    _voiceRecognition['lang'] = 'en-US';
    _voiceRecognition['continuous'] = true;
    _voiceRecognition['interimResults'] = true;

    // Initialize grammar hints with player names (if available)
    _updateVoiceGrammar();

    // Set event handlers using allowInterop
    _voiceRecognition['onstart'] = allowInterop(() {
      _voiceListening = true;
      _updateInputModeHint();
      String hint = '🎤 Listening...';
      if (_inCombat) {
        if (_combatPhase == 0) {
          hint += ' Say "pass" when ready to declare attackers';
        } else if (_combatPhase == 1) {
          hint += ' Say "pass blockers" or "proceed" to advance';
        } else if (_combatPhase == 2) {
          hint += ' Say "resolve" to resolve combat';
        }
      } else {
        hint += ' Try: "Kai loses 5 life" or "attack for 3"';
      }
      _voiceCommands.insert(0, hint);
      _updateVoicePanel();
    });

    _voiceRecognition['onend'] = allowInterop(() {
      _voiceListening = false;
      _updateInputModeHint();
      _updateVoicePanel();
    });

    _voiceRecognition['onerror'] = allowInterop((JsObject event) {
      String error = event['error']?.toString() ?? 'unknown';
      _voiceCommands.insert(0, '❌ Error: $error');
      _updateVoicePanel();
    });

    _voiceRecognition['onresult'] = allowInterop((JsObject event) {
      String transcript = '';
      bool isFinal = false;
      int resultIndex = event['resultIndex'];
      JsArray resultsList = event['results'];

      for (int i = resultIndex; i < resultsList.length; i++) {
        JsArray thisResult = resultsList[i];
        String interim = thisResult[0]['transcript']?.toString() ?? '';
        transcript += interim;
        if (thisResult['isFinal'] == true) {
          isFinal = true;
        }
      }

      if (transcript.isNotEmpty) {
        _displayVoiceTranscript(transcript.trim());
        if (isFinal) {
          _parseAndExecuteVoiceCommand(transcript.trim());
        }
      }
    });

    print('Voice Recognition initialized successfully');
    _setupVoiceButton();
  } catch (e) {
    print('Error initializing voice: $e');
  }
}

void toggleVoiceListening() {
  if (_voiceRecognition == null) {
    initializeVoiceRecognition();
  }

  try {
    if (_voiceListening) {
      _voiceRecognition.callMethod('stop');
    } else {
      _voiceRecognition.callMethod('start');
    }
  } catch (e) {
    print('Error toggling voice: $e');
  }
}

// ════════════════════════════════════════════════════════════
// SPEECH SYNTHESIS (Text-to-Speech)
// ════════════════════════════════════════════════════════════

void speakCombatEvent(String message) {
  try {
    final utterance = JsObject(context['SpeechSynthesisUtterance'], [message]);
    utterance['rate'] = 1.0;
    utterance['pitch'] = 1.0;
    utterance['volume'] = 0.8;
    context['speechSynthesis'].callMethod('speak', [utterance]);
  } catch (e) {
    print('Speech synthesis not available: $e');
  }
}

void _setupVoiceButton() {
  try {
    ButtonElement? voiceFab = querySelector('.voice-fab') as ButtonElement?;
    if (voiceFab != null) {
      voiceFab.onClick.listen((_) {
        print('Voice button clicked');
        // Toggle the input panel visibility using JavaScript
        context.callMethod('toggleInputPanel');
        toggleVoiceListening();
      });
      print('Voice button setup complete');
    }
  } catch (e) {
    print('Error setting up voice button: $e');
  }
}

void _updateInputModeHint() {
  try {
    final hintEl = querySelector('#inputModeHint') as HtmlElement?;
    if (hintEl != null) {
      if (_voiceListening) {
        hintEl.text = '🎤 Listening for voice commands...';
      } else {
        hintEl.text = '⌨️ Type a command or click mic to speak...';
      }
    }
  } catch (e) {
    print('Error updating input hint: $e');
  }
}

void _displayVoiceTranscript(String text) {
  try {
    HtmlElement? transcript = querySelector('.voice-transcript') as HtmlElement?;
    if (transcript != null) {
      transcript.text = '"$text"';
    }
  } catch (e) {
    print('Error displaying transcript: $e');
  }
}

// ════════════════════════════════════════════════════════════
// FUZZY MATCHING (for speech recognition tolerance)
// ════════════════════════════════════════════════════════════

/// Calculate Levenshtein distance between two strings
int _levenshteinDistance(String s1, String s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  
  if (s1.isEmpty) return s2.length;
  if (s2.isEmpty) return s1.length;
  
  List<List<int>> matrix = List.generate(s2.length + 1, (_) => List.filled(s1.length + 1, 0));
  
  for (int i = 0; i <= s1.length; i++) {
    matrix[0][i] = i;
  }
  for (int i = 0; i <= s2.length; i++) {
    matrix[i][0] = i;
  }
  
  for (int i = 1; i <= s2.length; i++) {
    for (int j = 1; j <= s1.length; j++) {
      int cost = (s1[j - 1] == s2[i - 1]) ? 0 : 1;
      matrix[i][j] = [
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      ].reduce((a, b) => a < b ? a : b);
    }
  }
  
  return matrix[s2.length][s1.length];
}

/// Calculate similarity score (0.0 to 1.0) between two strings
double _stringSimilarity(String s1, String s2) {
  int maxLen = (s1.length > s2.length) ? s1.length : s2.length;
  if (maxLen == 0) return 1.0;
  int distance = _levenshteinDistance(s1, s2);
  return 1.0 - (distance / maxLen);
}

/// Pre-process transcript to correct common speech recognition mishearings
/// Runs before parsing to ensure player names are correctly recognized
String _normaliseTranscript(String text) {
  String result = text.toLowerCase();
  
  if (players.isEmpty) {
    return result;
  }

  // For each player name, look for any word that fuzzy-matches it
  for (var player in players) {
    String name = (player['name'] as String).toLowerCase();
    List<String> words = result.split(RegExp(r'\s+'));
    
    for (int i = 0; i < words.length; i++) {
      double score = _stringSimilarity(words[i], name);
      // Check if it's a prefix match (first 60% of name matches)
      bool prefixMatch = words[i].length > 1 && 
                         name.startsWith(words[i].substring(0, (name.length * 0.6).floor().clamp(1, words[i].length)));
      
      // Check phonetic suffix equivalence: "danny"≈"dani", "katie"≈"kati", etc.
      bool phoneticMatch = false;
      if (!prefixMatch && words[i].length >= 3 && name.length >= 3) {
        String w = words[i];
        String n = name;
        // Strip common spoken suffixes and compare roots
        String wRoot = w.endsWith('ny') ? w.substring(0, w.length - 2) :
                       w.endsWith('ie') ? w.substring(0, w.length - 2) :
                       w.endsWith('y')  ? w.substring(0, w.length - 1) :
                       w.endsWith('i')  ? w.substring(0, w.length - 1) : w;
        String nRoot = n.endsWith('ny') ? n.substring(0, n.length - 2) :
                       n.endsWith('ie') ? n.substring(0, n.length - 2) :
                       n.endsWith('y')  ? n.substring(0, n.length - 1) :
                       n.endsWith('i')  ? n.substring(0, n.length - 1) : n;
        phoneticMatch = wRoot.isNotEmpty && nRoot.isNotEmpty && wRoot == nRoot;
      }

      // Replace if fuzzy match is good (55%+) or prefix/phonetic match succeeds
      if (score >= 0.55 || prefixMatch || phoneticMatch) {
        words[i] = name; // Replace the mishearing with the actual name
      }
    }
    result = words.join(' ');
  }
  
  return result;
}

/// Find the closest matching player name in text
/// Only matches against players currently in the game
int _findPlayerByFuzzyMatch(String text) {
  // Can only match if there are players in the game
  if (players.isEmpty) {
    return -1;
  }
  
  double bestScore = 0.0;
  int bestIdx = -1;
  
  text = text.toLowerCase();
  
  for (int i = 0; i < players.length; i++) {
    String pname = (players[i]['name'] as String).toLowerCase();
    
    // Try exact substring match first (highest priority)
    if (text.contains(pname)) {
      return i;
    }
    
    // Try each word in the text
    List<String> words = text.split(RegExp(r'\s+'));
    for (String word in words) {
      // Looser thresholds to catch mishearings like "danny" for "dani"
      double threshold = (word.length <= 4) ? 0.55 : 0.58;
      double score = _stringSimilarity(word, pname);
      
      // Boost exact matches
      if (word == pname) {
        score = 1.0;
      }
      
      // Boost prefix matches
      if (pname.startsWith(word) || word.startsWith(pname)) {
        score = (score + 0.95) / 2; // Average with high score
      }
      
      if (score > threshold && score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
  }
  
  // Fallback: return best match at a lower threshold to catch mishearings like "danny"→"dani"
  if (bestIdx < 0) {
    double fallbackScore = 0.0;
    int fallbackIdx = -1;

    for (int i = 0; i < players.length; i++) {
      String pname = (players[i]['name'] as String).toLowerCase();
      List<String> words = text.split(RegExp(r'\s+'));

      for (String word in words) {
        double score = _stringSimilarity(word, pname);

        // Boost prefix matches
        if (pname.startsWith(word) || word.startsWith(pname)) {
          score = (score + 0.95) / 2;
        }

        // Boost phonetic suffix matches (danny≈dani, katie≈kati)
        String wRoot = word.endsWith('ny') ? word.substring(0, word.length - 2) :
                       word.endsWith('ie') ? word.substring(0, word.length - 2) :
                       word.endsWith('y')  ? word.substring(0, word.length - 1) :
                       word.endsWith('i')  ? word.substring(0, word.length - 1) : word;
        String nRoot = pname.endsWith('ny') ? pname.substring(0, pname.length - 2) :
                       pname.endsWith('ie') ? pname.substring(0, pname.length - 2) :
                       pname.endsWith('y')  ? pname.substring(0, pname.length - 1) :
                       pname.endsWith('i')  ? pname.substring(0, pname.length - 1) : pname;
        if (wRoot.isNotEmpty && nRoot.isNotEmpty && wRoot == nRoot) {
          score = (score + 0.95) / 2;
        }

        if (score >= 0.50 && score > fallbackScore) {
          fallbackScore = score;
          fallbackIdx = i;
        }
      }
    }
    
    return fallbackIdx;
  }
  
  return bestIdx;
}

/// Update voice recognition grammar hints based on current players and common commands
void _updateVoiceGrammar() {
  if (_voiceRecognition == null || players.isEmpty) return;
  
  try {
    var grammarConstructor = context['webkitSpeechGrammarList'] ?? context['SpeechGrammarList'];
    if (grammarConstructor == null) {
      // Grammar hints not supported in this browser
      return;
    }
    
    var grammarList = JsObject(grammarConstructor);
    
    // Gather vocabulary: player names + common MTG commands
    List<String> vocab = [
      // Player names
      ...players.map((p) => (p['name'] as String).toLowerCase()),
      // Common MTG commands
      'gains', 'loses', 'life', 'draw', 'draws', 'card', 'cards',
      'poison', 'poisoned', 'attacks', 'attack', 'cast', 'casts',
      'next', 'turn', 'tap', 'tapped', 'untap', 'untapped',
      'monarch', 'becomes', 'damage', 'placed', 'battlefield',
      'with', 'from', 'counter', 'counters', 'declared',
      'pass', 'declare', 'attackers', 'blockers', 'resolve',
      'undo', 'last', 'into', 'the'
    ];
    
    // Remove duplicates
    List<String> uniqueVocab = vocab.toSet().toList();
    
    // Build JSGF grammar string
    String grammar = '#JSGF V1.0;\ngrammar mtg;\npublic <phrase> = ${uniqueVocab.join(' | ')} ;';
    
    // Add grammar with maximum weight (1.0)
    grammarList.callMethod('addFromString', [grammar, 1.0]);
    _voiceRecognition['grammars'] = grammarList;
    
    print('Voice grammar updated with ${uniqueVocab.length} terms');
  } catch (e) {
    print('Grammar update failed (browser may not support it): $e');
  }
}

void _updateVoicePanel() {
  try {
    DivElement? panel = querySelector('.voice-panel') as DivElement?;
    ButtonElement? fab = querySelector('.voice-fab') as ButtonElement?;

    if (panel != null) {
      if (_voiceListening || _voiceCommands.isNotEmpty) {
        panel.classes.add('visible');
      } else {
        panel.classes.remove('visible');
      }
    }

    if (fab != null) {
      if (_voiceListening) {
        fab.classes.remove('processing');
        fab.classes.add('listening');
      } else if (_voiceCommands.isNotEmpty) {
        fab.classes.remove('listening');
        fab.classes.add('processing');
      } else {
        fab.classes.remove('listening');
        fab.classes.remove('processing');
      }
    }

    // Update label
    HtmlElement? fabLabel = querySelector('#voiceFabLabel') as HtmlElement?;
    if (fabLabel != null) {
      if (_voiceListening) {
        fabLabel.text = '🔴 Listening...';
      } else {
        fabLabel.text = 'Click to toggle mic';
      }
    }

    // Update command list
    DivElement? cmdList = querySelector('.voice-action-list') as DivElement?;
    if (cmdList != null) {
      cmdList.children.clear();
      for (var cmd in _voiceCommands.take(5)) {
        DivElement item = DivElement()..className = 'voice-action-item'..text = cmd;
        cmdList.append(item);
      }
    }
  } catch (e) {
    print('Error updating voice panel: $e');
  }
}

void _parseAndExecuteVoiceCommand(String text) {
  try {
    final jsProcessVoiceCommand = context['processVoiceCommand'];
    if (jsProcessVoiceCommand is JsFunction) {
      jsProcessVoiceCommand.apply([text.trim()]);
      return;
    }
  } catch (_) {
    // Fall through to the legacy parser only if the JS interpreter is unavailable.
  }

  String lower = _normaliseTranscript(text.trim());
  
  // Ignore voice commands if game hasn't started
  if (!gameStarted || players.isEmpty) {
    _voiceCommands.insert(0, '❓ Game not started yet');
    _updateVoicePanel();
    return;
  }

  // Combat Phase Commands (high priority)
  if ((lower.contains('declare') || lower.contains('done') || lower.contains('pass')) && _inCombat && _combatPhase == 0) {
    _executeVoiceDeclareAttackers(lower);
    return;
  }

  if ((lower.contains('block') || lower.contains('resolve') || lower.contains('proceed')) && _inCombat && _combatPhase == 1) {
    _executeVoiceBlockersPhase(lower);
    return;
  }

  if ((lower.contains('resolve') || lower.contains('damage') || lower.contains('proceed')) && _inCombat && _combatPhase == 2) {
    _executeVoiceResolutePhase(lower);
    return;
  }

  // Hand & Draw Commands
  if ((lower.contains('draw') || lower.contains('pulls') || lower.contains('pull')) && (lower.contains('card') || lower.contains('deck'))) {
    _executeVoiceDrawCards(lower);
    return;
  }

  if ((lower.contains('discard') || lower.contains('mill')) && lower.contains('card')) {
    _executeVoiceDiscardCards(lower);
    return;
  }

  // Pattern: "[Player] placed [card] into the battlefield"
  if (lower.contains('placed') && lower.contains('battlefield')) {
    _executeVoicePlaceCard(lower);
    return;
  }

  // Pattern: "[Player] cast [card]"
  if (lower.contains('cast')) {
    _executeVoiceCastCard(lower);
    return;
  }

  // Pattern: "attack with [creature]" or "Kai attacks with goblin" - automatic combat mode
  if (lower.contains('attack') && (lower.contains('with') || lower.contains('using'))) {
    _executeVoiceAttackInitiation(lower);
    return;
  }

  // Pattern: "[Player] gains/loses [number] life"
  if ((lower.contains('gain') || lower.contains('lose')) && lower.contains('life')) {
    _executeVoiceLifeChange(lower);
    return;
  }

  // Pattern: "tap [card]"
  if (lower.contains('tap')) {
    _executeVoiceTapCard(lower);
    return;
  }

  // Pattern: "next turn"
  if (lower.contains('next') && lower.contains('turn')) {
    _executeVoiceNextTurn();
    return;
  }

  // Pattern: "[Player] takes [number] poison"
  if (lower.contains('poison')) {
    _executeVoicePoison(lower);
    return;
  }

  // Pattern: "add a counter to [card]" or "[player] adds counter to [card]"
  if ((lower.contains('add') || lower.contains('put')) && lower.contains('counter') && lower.contains('to')) {
    _executeVoiceAddCounter(lower);
    return;
  }

  // Pattern: "[Player] becomes the monarch" or "[player] is monarch"
  if ((lower.contains('monarch') || lower.contains('becomes')) && (lower.contains('monarch') || lower.contains('becomes'))) {
    _executeVoiceSetMonarch(lower);
    return;
  }

  // Pattern: "[Player] takes [number] commander damage from [player]"
  if (lower.contains('commander') && lower.contains('damage') && lower.contains('from')) {
    _executeVoiceCommanderDamage(lower);
    return;
  }

  // Pattern: "undo" or "undo last"
  if (lower == 'undo' || (lower.contains('undo') && lower.contains('last'))) {
    _executeVoiceUndo();
    return;
  }

  _voiceCommands.insert(0, '❓ Unknown command');
  _updateVoicePanel();
}

void _executeVoicePlaceCard(String text) {
  // "kai placed goblin shaman into the battlefield" or "chi placed" (fuzzy match)
  int playerIdx = _findPlayerByFuzzyMatch(text);

  if (playerIdx < 0) {
    _voiceCommands.insert(0, '❌ Player not found');
    _updateVoicePanel();
    return;
  }

  // Extract card name (between "placed" and "into", or after "placed" if no "into")
  int placedIdx = text.indexOf('placed');
  if (placedIdx < 0) return;
  int intoIdx = text.indexOf('into');
  String cardName;
  if (intoIdx > placedIdx) {
    cardName = text.substring(placedIdx + 7, intoIdx).trim();
  } else {
    String afterPlaced = text.substring(placedIdx + 7).trim();
    List<String> words = afterPlaced.split(RegExp(r'\s+'));
    cardName = words.where((w) => !['the','a','an','onto','battlefield'].contains(w)).join(' ').trim();
  }
  if (cardName.isEmpty) return;

  // Always validate against Scryfall — no unrecognised names allowed via voice
  _voiceCommands.insert(0, '🔍 Looking up "$cardName"...');
  _updateVoicePanel();
  _validateAndPlaceCard(playerIdx, cardName);
}

Future<void> _validateAndPlaceCard(int playerIdx, String cardName) async {
  try {
    Map<String, dynamic>? scryfallCard = await _scryfallNamed(cardName);

    if (scryfallCard == null) {
      _voiceCommands.insert(0, '❌ "$cardName" not found in Scryfall — use manual entry');
      _updateVoicePanel();
      return;
    }

    Map<String, dynamic> parsedCard = _parseScryfall(scryfallCard);
    String displayName = parsedCard['name'] ?? cardName;

    var cardData = {
      'id': '${DateTime.now().millisecondsSinceEpoch}_${Random().nextInt(9999)}',
      'name': displayName,
      'type': parsedCard['type'] ?? 'creature',
      'zone': 'battlefield',
      'tapped': false,
      'counters': 0,
      'tempPtBonus': 0,
      'subtype': parsedCard['subtype'] ?? '',
      'supertypes': parsedCard['supertypes'] ?? [],
      'keywords': parsedCard['keywords'] ?? [],
      'oracleText': parsedCard['oracleText'] ?? '',
      'triggers': parsedCard['triggers'] ?? [],
      'globalEffect': parsedCard['globalEffect'] ?? '',
      'manaCost': parsedCard['manaCost'] ?? '',
      'imageUrl': parsedCard['imageUrl'] ?? '',
      'isVoiceEntry': true,
    };

    players[playerIdx]['cards'].add(cardData);
    _cardsPlayed[players[playerIdx]['name']] = (_cardsPlayed[players[playerIdx]['name']] ?? 0) + 1;
    onCardPlaced(playerIdx);
    _addLog('${players[playerIdx]['name']} placed $displayName onto battlefield (voice) • Hand: ${getHandSize(playerIdx)}', '${players[playerIdx]['name']} played $displayName via voice command.');
    _voiceCommands.insert(0, '✓ Placed $displayName • Hand: ${getHandSize(playerIdx)}');
    _commitState();
    _updateVoicePanel();
  } catch (e) {
    _voiceCommands.insert(0, '❌ Error looking up card: $e');
    _updateVoicePanel();
  }
}

void _executeVoiceCastCard(String text) {
  // "kai cast lightning bolt" or "chi cast" (fuzzy match)
  int playerIdx = _findPlayerByFuzzyMatch(text);
  
  if (playerIdx < 0) {
    _voiceCommands.insert(0, '❌ Player not found');
    _updateVoicePanel();
    return;
  }

  // Extract card name (after "cast")
  int castIdx = text.indexOf('cast');
  if (castIdx < 0) return;
  String cardName = text.substring(castIdx + 5).trim();
  if (cardName.isEmpty) return;

  // Validate against Scryfall
  _validateAndCastCard(playerIdx, cardName);
}

Future<void> _validateAndCastCard(int playerIdx, String cardName) async {
  try {
    // Look up the card on Scryfall
    Map<String, dynamic>? scryfallCard = await _scryfallNamed(cardName);
    
    if (scryfallCard == null) {
      _voiceCommands.insert(0, '❌ Card not found: "$cardName" (not in Scryfall database)');
      _updateVoicePanel();
      return;
    }

    // Parse the Scryfall card into our format
    Map<String, dynamic> parsedCard = _parseScryfall(scryfallCard);
    
    var cardData = {
      'id': '${DateTime.now().millisecondsSinceEpoch}_${Random().nextInt(9999)}',
      'name': parsedCard['name'] ?? cardName,
      'type': parsedCard['type'] ?? 'unknown',
      'zone': 'graveyard',
      'tapped': false,
      'counters': 0,
      'tempPtBonus': 0,
      'subtype': parsedCard['subtype'] ?? '',
      'supertypes': parsedCard['supertypes'] ?? [],
      'keywords': parsedCard['keywords'] ?? [],
      'oracleText': parsedCard['oracleText'] ?? '',
      'triggers': parsedCard['triggers'] ?? [],
      'globalEffect': parsedCard['globalEffect'] ?? '',
      'manaCost': parsedCard['manaCost'] ?? '',
      'isVoiceEntry': true,
    };

    players[playerIdx]['cards'].add(cardData);
    _cardsPlayed[players[playerIdx]['name']] = (_cardsPlayed[players[playerIdx]['name']] ?? 0) + 1;
    onCardCast(playerIdx);
    
    String displayName = parsedCard['name'] ?? cardName;
    _addLog('${players[playerIdx]['name']} cast $displayName (voice) • Hand: ${getHandSize(playerIdx)}', '${players[playerIdx]['name']} cast $displayName via voice command.');
    _voiceCommands.insert(0, '✓ Cast $displayName • Hand: ${getHandSize(playerIdx)}');
    _commitState();
    _updateVoicePanel();
  } catch (e) {
    _voiceCommands.insert(0, '❌ Error validating card: $e');
    _updateVoicePanel();
  }
}

void _executeVoiceLifeChange(String text) {
  // "kai gains 5 life" or "kai loses a life" or "chi loses 3 life" (fuzzy match)
  int playerIdx = _findPlayerByFuzzyMatch(text);

  if (playerIdx < 0) {
    _voiceCommands.insert(0, '❌ Player not found');
    _updateVoicePanel();
    return;
  }

  // Extract number using regex or default to 1 if "a" or "an" is used
  RegExp numPattern = RegExp(r'(\d+)');
  Match? match = numPattern.firstMatch(text);
  int delta = 1; // Default to 1 life
  
  if (match != null) {
    delta = int.tryParse(match.group(1)!) ?? 1;
  }
  
  if (text.contains('lose')) delta = -delta;

  _lastLifeValues[playerIdx] = players[playerIdx]['life'] as int;
  players[playerIdx]['life'] = (players[playerIdx]['life'] as int) + delta;
  showLifeChangePopup(playerIdx, delta);
  if (delta > 0) _lifeGained[players[playerIdx]['name']] = (_lifeGained[players[playerIdx]['name']] ?? 0) + delta;
  _addLog(
    '${players[playerIdx]['name']} ${delta > 0 ? "gains" : "loses"} ${delta.abs()} life → ${players[playerIdx]['life']} (voice)',
    '${players[playerIdx]['name']} ${delta > 0 ? "gained" : "lost"} ${delta.abs()} life via voice. Now at ${players[playerIdx]['life']}.',
  );
  checkElimination(playerIdx);
  _voiceCommands.insert(0, '✓ ${players[playerIdx]['name']} ${delta > 0 ? "gained" : "lost"} ${delta.abs()} life');
  _commitState();
  _updateVoicePanel();
}

void _executeVoiceTapCard(String text) {
  // "tap goblin" - tap card in current player's battlefield
  int playerIdx = currentPlayerIndex;

  // Try to extract card name (after "tap")
  int tapIdx = text.indexOf('tap');
  if (tapIdx < 0) return;
  String cardName = text.substring(tapIdx + 3).trim();
  if (cardName.isEmpty) return;

  List cards = players[playerIdx]['cards'] as List;
  for (var card in cards) {
    if ((card['name'] as String).toLowerCase().contains(cardName.toLowerCase()) && card['zone'] == 'battlefield') {
      card['tapped'] = !(card['tapped'] as bool);
      String state = card['tapped'] == true ? 'tapped' : 'untapped';
      _addLog('${players[playerIdx]['name']}: ${card['name']} now $state (voice)', '${card['name']} is now $state.');
      _voiceCommands.insert(0, '✓ ${card['name']} is now $state');
      _commitState();
      _updateVoicePanel();
      return;
    }
  }

  _voiceCommands.insert(0, '❌ Card not found on battlefield');
  _updateVoicePanel();
}

void _executeVoiceNextTurn() {
  if (!gameStarted) {
    _voiceCommands.insert(0, '❌ Game not started');
    _updateVoicePanel();
    return;
  }

  _moveToNextTurn(addVoiceSuffix: true);
  _voiceCommands.insert(0, '✓ Next turn: ${players[currentPlayerIndex]['name']}');
  _commitState();
  _updateVoicePanel();
}

void _executeVoicePoison(String text) {
  // "kai takes 2 poison" or "chi takes poison" (fuzzy match)
  int playerIdx = _findPlayerByFuzzyMatch(text);

  if (playerIdx < 0) {
    _voiceCommands.insert(0, '❌ Player not found');
    _updateVoicePanel();
    return;
  }

  // Extract number
  RegExp numPattern = RegExp(r'(\d+)');
  Match? match = numPattern.firstMatch(text);
  int qty = 1; // Default to 1 poison
  if (match != null) {
    qty = int.tryParse(match.group(1)!) ?? 1;
  }

  players[playerIdx]['poison'] = (players[playerIdx]['poison'] ?? 0) + qty;

  _addLog(
    '${players[playerIdx]['name']} gains $qty poison (${players[playerIdx]['poison']}/10) - voice',
    '${players[playerIdx]['name']} now has ${players[playerIdx]['poison']} poison counters via voice command.',
  );
  checkElimination(playerIdx);
  _voiceCommands.insert(0, '✓ ${players[playerIdx]['name']} now at ${players[playerIdx]['poison']} poison');
  _commitState();
  _updateVoicePanel();
}

// ════════════════════════════════════════════════════════════
// COMBAT VOICE HANDLERS
// ════════════════════════════════════════════════════════════

void _executeVoiceAttackInitiation(String text) {
  // "kai attacks with zombie and goblin" or "attack using spiderman"
  String lower = text.toLowerCase().trim();
  
  // If already in combat, just declare the attackers
  if (_inCombat && _combatPhase == 0) {
    _executeVoiceDeclareAttackers(text);
    return;
  }
  
  // Get attacker (current player) and extract creature names
  int attackerIdx = currentPlayerIndex;
  List<String> creatureTokens = [];
  
  // Extract creature names (words after "with" or "using")
  RegExp withPattern = RegExp(r'(?:with|using)\s+(.+?)(?:\s+and\s+|\s+attacks?|$)');
  final matches = withPattern.allMatches(lower);
  
  for (final match in matches) {
    String creaturePart = match.group(1) ?? '';
    creaturePart.split(RegExp(r'\s+and\s+|\s*,\s*')).forEach((c) {
      if (c.isNotEmpty) creatureTokens.add(c.trim());
    });
  }
  
  // If no explicit creatures mentioned, ask user to select
  if (creatureTokens.isEmpty) {
    _voiceCommands.insert(0, 'ℹ️ Which creatures attack? (e.g., "spiderman and goblin")');
    _updateVoicePanel();
    return;
  }
  
  // Find matching creatures on battlefield
  List<Map<String, dynamic>> battlefield = (players[attackerIdx]['cards'] as List)
      .where((c) => c['zone'] == 'battlefield' && c['type'] == 'creature' && c['tapped'] != true)
      .cast<Map<String, dynamic>>()
      .toList();
  
  List<Map<String, dynamic>> selectedCreatures = [];
  
  for (String creatureToken in creatureTokens) {
    // Fuzzy match creature names
    Map<String, dynamic>? bestMatch;
    double bestScore = 0.75; // Higher threshold for creature matching
    
    for (Map<String, dynamic> creature in battlefield) {
      String creatureName = (creature['name'] as String).toLowerCase();
      double score = _stringSimilarity(creatureToken, creatureName);
      
      // Boost for exact substring
      if (creatureName.contains(creatureToken) || creatureToken.startsWith(creatureName)) {
        score = (score + 0.95) / 2;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = creature;
      }
    }
    
    if (bestMatch != null && !selectedCreatures.any((c) => c['id'] == bestMatch!['id'])) {
      selectedCreatures.add(bestMatch);
    }
  }
  
  if (selectedCreatures.isEmpty) {
    _voiceCommands.insert(0, '❌ No creatures found matching: ${creatureTokens.join(", ")}');
    _updateVoicePanel();
    return;
  }
  
  // Find defender (parse from text)
  int defenderIdx = -1;
  RegExp attackPattern = RegExp(r'attack(?:s?)?\s+(?:player\s+)?(.+?)(?:\s+with|\s+using|$)');
  final attackMatch = attackPattern.firstMatch(lower);
  
  if (attackMatch != null) {
    defenderIdx = _findPlayerByFuzzyMatch((attackMatch.group(1) ?? '').trim());
  }
  
  // If no defender found, attack the first non-attacker
  if (defenderIdx < 0 || defenderIdx == attackerIdx) {
    defenderIdx = _firstAvailableDefenderIndex(attackerIdx);
  }

  if (defenderIdx < 0 || defenderIdx == attackerIdx) {
    _voiceCommands.insert(0, '❌ No valid defender found.');
    _updateVoicePanel();
    return;
  }
  
  // Enter combat mode and add creatures
  _inCombat = true;
  _combatPhase = 0;
  _combatAttackers.clear();
  
  for (Map<String, dynamic> creature in selectedCreatures) {
    _combatAttackers.add({
      'card': creature,
      'targetIdx': defenderIdx,
      'blockers': <Map<String, dynamic>>[]
    });
  }
  
  String creatureNames = selectedCreatures.map((c) => c['name']).join(', ');
  String defenderName = defenderIdx >= 0 ? players[defenderIdx]['name'] : 'unknown';
  
  _voiceCommands.insert(0, '✓ Combat initiated: $creatureNames attacking $defenderName');
  _addLog(
    '${players[attackerIdx]['name']} initiates combat with: $creatureNames (attacking $defenderName) (voice)',
    'Combat started: $creatureNames attacking $defenderName via voice command.',
  );
  _saveSpectatorState();
  showCombatScreen();
  _updateVoicePanel();
}

void _executeVoiceDeclareAttackers(String text) {
  String lower = text.toLowerCase().trim();
  
  // Parse: "Kai uses [creature] and attacks [opponent]"
  // or "Kai attacks with [creature]"
  // or just "attack" / "done" / "pass"
  
  RegExp creaturePattern = RegExp(r'(?:use|attack|cast)\s+(\w+)');
  
  final creatureMatch = creaturePattern.firstMatch(lower);
  
  // If user mentioned specific creatures, add them
  if (creatureMatch != null && _combatAttackers.isEmpty) {
    String creatureName = creatureMatch.group(1)!;
    _voiceCommands.insert(0, 'ℹ️ Manually select attacker: $creatureName (then continue)');
    _updateVoicePanel();
    return;
  }
  
  if (_combatAttackers.isEmpty && !lower.contains('pass') && !lower.contains('done')) {
    _voiceCommands.insert(0, '❌ Please select attackers first using the UI or "attack [creature]"');
    _updateVoicePanel();
    return;
  }

  // Tap attackers (unless they have vigilance)
  for (final a in _combatAttackers) {
    final kws = List<String>.from(a['card']['keywords'] ?? []);
    if (!kws.contains('Vigilance')) a['card']['tapped'] = true;
  }

  String attackersList = _combatAttackers.map((a) => (a['card']['name'] as String)).join(', ');
  
  _voiceCommands.insert(0, '✓ Attackers: $attackersList. Waiting for blockers...');
  _combatPhase = 1;
  _saveSpectatorState();
  showCombatScreen();
  _updateVoicePanel();
}

void _executeVoiceBlockersPhase(String text) {
  String lower = text.toLowerCase().trim();
  
  // Parse: "dani blocks using [creature]"
  // or "dani doesn't block and takes [number] damage"
  // or "no blockers" / "pass" / "proceed"
  
  RegExp blockPattern = RegExp(r'blocks?(?:\s+using)?\s+(\w+)');
  RegExp noBlockPattern = RegExp(r"(?:no|doesn't?|don't)\s+blocks?");
  
  if (blockPattern.hasMatch(lower)) {
    String creatureName = blockPattern.firstMatch(lower)!.group(1)!;
    _voiceCommands.insert(0, 'ℹ️ Manually assign blocker: $creatureName (then continue)');
    _updateVoicePanel();
    return;
  }
  
  if (noBlockPattern.hasMatch(lower) || 
      lower.contains('pass') || 
      lower.contains('no block') ||
      lower.contains('unblocked')) {
    _voiceCommands.insert(0, '✓ No blockers. Combat damage on the stack...');
    _combatPhase = 2;
  } else if (lower.contains('proceed') || lower.contains('resolve') || lower.contains('damage')) {
    _voiceCommands.insert(0, '✓ Combat damage resolving...');
    _combatPhase = 2;
  } else {
    _voiceCommands.insert(0, '💬 Assign blockers, then say "proceed", "damage", or "no blockers"');
  }
  
  _saveSpectatorState();
  showCombatScreen();
  _updateVoicePanel();
}

void _executeVoiceResolutePhase(String text) {
  String lower = text.toLowerCase().trim();
  
  // Parse: "dani takes [number] damage"
  // or just "resolve" / "done"
  
  RegExp damagePattern = RegExp(r'(?:takes?|deals?)\s+(\d+)\s+damage');
  
  final damageMatch = damagePattern.firstMatch(lower);
  if (damageMatch != null) {
    int damage = int.parse(damageMatch.group(1)!);
    
    // Find which opponent this damage is to
    RegExp playerPattern = RegExp(r'\b(\w+)\s+(?:takes?|gets?)\s+(\d+)');
    final playerMatch = playerPattern.firstMatch(lower);
    
    int targetIdx = -1;
    if (playerMatch != null) {
      targetIdx = _findPlayerByFuzzyMatch(playerMatch.group(1)!);
    }
    
    if (targetIdx >= 0) {
      final target = players[targetIdx];
      int newLife = (target['life'] as int) - damage;
      target['life'] = newLife;
      _voiceCommands.insert(0, '✓ ${target['name']} takes $damage damage');
    } else {
      _voiceCommands.insert(0, '✓ Combat damage applied');
    }
  } else {
    _voiceCommands.insert(0, '✓ Combat resolved');
  }
  
  _resolveCombat();
}

void _executeVoiceAddCounter(String text) {
  // "add a counter to goblin shaman" or "kai adds counter to goblin shaman"
  String lower = text.toLowerCase().trim();
  
  // Extract card name (after "to")
  int toIdx = lower.indexOf('to');
  if (toIdx < 0) {
    _voiceCommands.insert(0, '❌ Please specify which card to add counter to');
    _updateVoicePanel();
    return;
  }
  
  String cardName = lower.substring(toIdx + 2).trim();
  if (cardName.isEmpty) {
    _voiceCommands.insert(0, '❌ Please specify a card name');
    _updateVoicePanel();
    return;
  }
  
  // Find the card on battlefield
  Map<String, dynamic>? foundCard;
  int playerIdx = -1;
  
  for (int i = 0; i < players.length; i++) {
    List cards = players[i]['cards'] as List;
    for (var card in cards) {
      if (card['zone'] == 'battlefield' && 
          (card['name'] as String).toLowerCase().contains(cardName.toLowerCase())) {
        foundCard = card as Map<String, dynamic>;
        playerIdx = i;
        break;
      }
    }
    if (foundCard != null) break;
  }
  
  if (foundCard == null) {
    _voiceCommands.insert(0, '❌ Card "$cardName" not found on battlefield');
    _updateVoicePanel();
    return;
  }
  
  int currentCounters = (foundCard['counters'] ?? 0) as int;
  foundCard['counters'] = currentCounters + 1;
  
  _addLog(
    '${players[playerIdx]['name']} adds +1/+1 counter to ${foundCard['name']} (${foundCard['counters']})',
    '${players[playerIdx]['name']} added a +1/+1 counter to ${foundCard['name']}.',
  );
  
  _voiceCommands.insert(0, '✓ Added counter to ${foundCard['name']} (${foundCard['counters']} total)');
  _commitState();
  _updateVoicePanel();
}

void _executeVoiceSetMonarch(String text) {
  // "kai becomes the monarch" or "kai is monarch"
  int playerIdx = _findPlayerByFuzzyMatch(text);
  if (playerIdx < 0) {
    _voiceCommands.insert(0, '❌ Player not found');
    _updateVoicePanel();
    return;
  }
  
  // Clear existing monarch
  for (var p in players) p['isMonarch'] = false;
  
  // Set new monarch
  players[playerIdx]['isMonarch'] = true;
  
  _addLog('${players[playerIdx]['name']} becomes the Monarch', '${players[playerIdx]['name']} is now the Monarch.');
  
  _voiceCommands.insert(0, '✓ ${players[playerIdx]['name']} is now the Monarch 👑');
  _commitState();
  _updateVoicePanel();
}

void _executeVoiceCommanderDamage(String text) {
  // "kai takes 3 commander damage from dani"
  String lower = text.toLowerCase().trim();
  
  // Parse damage amount
  RegExp damagePattern = RegExp(r'takes?\s+(\d+)\s+commander\s+damage');
  final damageMatch = damagePattern.firstMatch(lower);
  if (damageMatch == null) {
    _voiceCommands.insert(0, '❌ Please specify damage amount (e.g., "takes 3 commander damage")');
    _updateVoicePanel();
    return;
  }
  
  int damage = int.parse(damageMatch.group(1)!);
  
  // Find target player (who takes damage)
  int targetIdx = _findPlayerByFuzzyMatch(text);
  if (targetIdx < 0) {
    _voiceCommands.insert(0, '❌ Target player not found');
    _updateVoicePanel();
    return;
  }
  
  // Find source player (who deals damage)
  int fromIdx = -1;
  int fromWord = lower.indexOf('from');
  if (fromWord >= 0) {
    String fromPart = lower.substring(fromWord + 4).trim();
    fromIdx = _findPlayerByFuzzyMatch(fromPart);
  }
  
  if (fromIdx < 0) {
    _voiceCommands.insert(0, '❌ Source player not found (use "from [player]")');
    _updateVoicePanel();
    return;
  }
  
  // Apply commander damage
  Map<int, int> cmd = players[targetIdx]['commanderDamage'] as Map<int, int>? ?? {};
  cmd[fromIdx] = (cmd[fromIdx] ?? 0) + damage;
  players[targetIdx]['commanderDamage'] = cmd;
  
  _addLog(
    '${players[targetIdx]['name']} takes $damage commander damage from ${players[fromIdx]['name']} (${cmd[fromIdx]})',
    '${players[targetIdx]['name']} has taken ${cmd[fromIdx]} total commander damage from ${players[fromIdx]['name']}.',
  );
  
  checkElimination(targetIdx);
  
  _voiceCommands.insert(0, '✓ ${players[targetIdx]['name']} takes $damage commander damage from ${players[fromIdx]['name']} (${cmd[fromIdx]} total)');
  _commitState();
  _updateVoicePanel();
}

void _executeVoiceUndo() {
  final bool undone = _undoLastAction();
  if (!undone) {
    _voiceCommands.insert(0, '❌ No recent action to undo');
    _updateVoicePanel();
    return;
  }

  _voiceCommands.insert(0, '✓ Undid last action');
  _updateVoicePanel();
}
