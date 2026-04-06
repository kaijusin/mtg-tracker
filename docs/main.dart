library mtg_tracker;

import 'dart:html';
import 'dart:math';
import 'dart:convert';
import 'dart:async';
import 'dart:js';

part 'src/constants.dart';
part 'src/voice_bridge.dart';
part 'src/scryfall.dart';
part 'src/game_history.dart';
part 'src/app_state.dart';
part 'src/setup_screen.dart';
part 'src/game_screen.dart';
part 'src/overlays.dart';
part 'src/combat.dart';
part 'src/elimination.dart';
part 'src/spectator_sync.dart';
part 'src/voice_recognition.dart';
part 'src/hand_tracker.dart';

// ════════════════════════════════════════════════════════════
// GLOBALS
// ════════════════════════════════════════════════════════════

bool isCommander = false;
int startingLife = 40;
int currentPlayerIndex = 0;
bool gameStarted = false;
int turnCount = 1;
const List<String> turnPhases = ['Draw', 'Main', 'Combat', 'End'];
int currentPhaseIndex = 0;
bool trackEnergy = false;
bool trackExp = false;
bool newPlayerMode = false;
int trackerPlayerIndex = 0;
String trackerZone = 'battlefield';
Map<int, String> trackerNotes = {};
Map<String, dynamic>? _effectTarget;

Timer? _turnTimer;
Timer? _searchDebounce;
Timer? _voicePollTimer;
DateTime? turnStartTime;
int _longestTurnSeconds = 0;
String _longestTurnPlayer = '';
String _firstBloodPlayer = '';

Map<String, int> _lifeGained = {};
Map<String, int> _cardsPlayed = {};
Map<String, int> _poisonDealt = {};
List<int> _lastLifeValues = [];
List<List<int>> _lifeHistory = [];

List<Map<String, dynamic>> players = [];
List<String> gameLog = [];
List<String> plainLog = [];
Map<String, String> _symbolUriMap = {};
bool _symbolsLoaded = false;
List<Map<String, dynamic>> _tempEffects = [];
List<Map<String, dynamic>> _combatAttackers = [];
List<String> _combatLog = [];
int _combatPhase = 0;
bool _inCombat = false;

String _lastVoiceCmdId = '';

// ════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════

void main() {
  loadManaSymbols();
  if (!_restoreOperatorState()) {
    buildSetupScreen();
  }
  _startVoiceBridge();
  initializeVoiceRecognition();
}
