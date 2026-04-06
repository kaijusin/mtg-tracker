// ══════════════════════════════════════
// WEB AUDIO API - SOUND SYSTEM
// ══════════════════════════════════════
var audioCtx = null;
var sounds = {};
var soundVolume = parseFloat(localStorage.getItem('soundVolume')) || 0.6;
var musicVolume = parseFloat(localStorage.getItem('musicVolume')) || 0.18;
var masterVolume = parseFloat(localStorage.getItem('masterVolume')) || 1.0;
var soundMuted = localStorage.getItem('soundMuted') === 'true';
var calmMusicSrc = 'sounds/medieval-various-music.mp3';
var tenseMusicSrc = null;

// Background music states
var bgMusic = null;
var bgMusicTense = null;
var isMusicTense = false;

function initAudioContext() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume(); // Browsers require user gesture
  }
}

function createSynthSound(name) {
  if (!audioCtx) return;
  var sr = audioCtx.sampleRate;
  var cfgs = {
    'life-loss-small':    { freq: 220, dur: 0.35, type: 'sawtooth', sweep: 0.85 },
    'life-loss-medium':   { freq: 160, dur: 0.50, type: 'sawtooth', sweep: 0.75 },
    'life-loss-large':    { freq: 100, dur: 0.75, type: 'sawtooth', sweep: 0.60 },
    'life-gain':          { freq: 528, dur: 0.40, type: 'sine',     sweep: 1.05 },
    'poison':             { freq: 140, dur: 0.55, type: 'sawtooth', sweep: 0.70 },
    'draw-card':          { freq: 640, dur: 0.18, type: 'sine',     sweep: 1.00 },
    'card-tap':           { freq: 380, dur: 0.14, type: 'square',   sweep: 0.90 },
    'next-turn':          { freq: 392, dur: 0.45, type: 'square',   sweep: 1.00 },
    'combat-start':       { freq: 280, dur: 0.60, type: 'sawtooth', sweep: 0.80 },
    'commander-damage':   { freq: 170, dur: 0.50, type: 'sawtooth', sweep: 0.75 },
    'elimination':        { freq:  80, dur: 1.20, type: 'sawtooth', sweep: 0.55 },
    'undo':               { freq: 350, dur: 0.22, type: 'square',   sweep: 0.95 },
    'voice-listening':    { freq: 720, dur: 0.18, type: 'sine',     sweep: 1.00 },
    'voice-confirmed':    { freq: 880, dur: 0.28, type: 'sine',     sweep: 1.02 },
    'voice-failed':       { freq: 200, dur: 0.38, type: 'sawtooth', sweep: 0.80 },
    'dice-roll':          { freq: 520, dur: 0.28, type: 'square',   sweep: 0.92 },
    'coin-heads':         { freq: 660, dur: 0.30, type: 'sine',     sweep: 1.00 },
    'coin-tails':         { freq: 440, dur: 0.30, type: 'sine',     sweep: 1.00 },
    'monarch-change':     { freq: 392, dur: 0.55, type: 'square',   sweep: 1.00 },
  };
  var cfg = cfgs[name] || { freq: 440, dur: 0.3, type: 'sine', sweep: 1.0 };
  var numSamples = Math.floor(sr * cfg.dur);
  var buffer = audioCtx.createBuffer(1, numSamples, sr);
  var data = buffer.getChannelData(0);
  for (var i = 0; i < numSamples; i++) {
    var t = i / sr;
    var progress = i / numSamples;
    var env = Math.min(progress * 15, 1) * Math.pow(1 - progress, 1.5);
    var freq = cfg.freq * Math.pow(cfg.sweep, progress);
    var wave;
    if (cfg.type === 'sine')         wave = Math.sin(2 * Math.PI * freq * t);
    else if (cfg.type === 'square')  wave = Math.sin(2 * Math.PI * freq * t) >= 0 ? 1 : -1;
    else                             wave = 2 * ((t * freq) % 1) - 1; // sawtooth
    data[i] = wave * env * 0.25;
  }
  sounds[name] = buffer;
}

function loadSound(name, url) {
  initAudioContext();
  fetch(url)
    .then(function(r) {
      if (!r.ok) throw new Error('not found');
      return r.arrayBuffer();
    })
    .then(function(buf) { return audioCtx.decodeAudioData(buf); })
    .then(function(decoded) {
      sounds[name] = decoded;
    })
    .catch(function() {
      createSynthSound(name);
    });
}

function playSound(name, volume, maxDuration) {
  if (soundMuted || !sounds[name] || !audioCtx) return;

  var effectiveVolume = (volume || 1.0) * soundVolume * masterVolume;
  if (effectiveVolume === 0) return;

  try {
    var source = audioCtx.createBufferSource();
    source.buffer = sounds[name];
    var gain = audioCtx.createGain();
    gain.gain.value = effectiveVolume;
    source.connect(gain);
    gain.connect(audioCtx.destination);
    if (maxDuration && maxDuration < source.buffer.duration) {
      source.start(0, 0, maxDuration);
    } else {
      source.start(0);
    }
  } catch(e) {
    console.log('Error playing sound:', e);
  }
}

function initBackgroundMusic() {
  if (bgMusic) return;
  
  // Create background music elements
  bgMusic = new Audio(calmMusicSrc);
  bgMusic.loop = true;
  bgMusic.volume = soundMuted ? 0 : (musicVolume * masterVolume);
  
  if (tenseMusicSrc) {
    bgMusicTense = new Audio(tenseMusicSrc);
    bgMusicTense.loop = true;
    bgMusicTense.volume = 0; // Start silent
  }
  
  // Resume audio context on first interaction
  document.addEventListener('click', function resumeAudio() {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (bgMusic && bgMusic.paused) {
      fadeInMusic();
    }
    document.removeEventListener('click', resumeAudio);
  }, { once: true });
}

function fadeInMusic() {
  if (!bgMusic) initBackgroundMusic();
  
  bgMusic.play().catch(function(e) {
    console.log('Could not play music:', e);
  });
  
  var fadeInterval = setInterval(function() {
    if (bgMusic.volume < (musicVolume * masterVolume)) {
      bgMusic.volume = Math.min(musicVolume * masterVolume, bgMusic.volume + 0.01);
    } else {
      clearInterval(fadeInterval);
    }
  }, 100);
}

function switchMusicState(tense) {
  if (!bgMusic) return;
  if (isMusicTense === tense) return;

  if (!bgMusicTense) {
    isMusicTense = tense;
    bgMusic.volume = soundMuted ? 0 : (musicVolume * masterVolume);
    return;
  }
  
  isMusicTense = tense;
  var fadeDuration = 3500; // 3.5 seconds
  var steps = 35;
  var step = 0;
  
  var fadeInterval = setInterval(function() {
    step++;
    var progress = step / steps;
    
    if (tense) {
      bgMusic.volume = Math.max(0, (musicVolume * masterVolume) * (1 - progress));
      bgMusicTense.volume = Math.min(musicVolume * masterVolume, (musicVolume * masterVolume) * progress);
      
      if (progress >= 1) {
        bgMusicTense.play().catch(function(){});
        clearInterval(fadeInterval);
      }
    } else {
      bgMusicTense.volume = Math.max(0, (musicVolume * masterVolume) * (1 - progress));
      bgMusic.volume = Math.min(musicVolume * masterVolume, (musicVolume * masterVolume) * progress);
      
      if (progress >= 1) {
        bgMusic.play().catch(function(){});
        clearInterval(fadeInterval);
      }
    }
  }, fadeDuration / steps);
}

function setMasterVolume(vol) {
  masterVolume = Math.max(0, Math.min(1, vol));
  localStorage.setItem('masterVolume', masterVolume);
  
  if (bgMusic) bgMusic.volume = soundMuted ? 0 : (musicVolume * masterVolume);
  if (bgMusicTense) bgMusicTense.volume = soundMuted ? 0 : (musicVolume * masterVolume);
}

function setSoundVolume(vol) {
  soundVolume = Math.max(0, Math.min(1, vol));
  localStorage.setItem('soundVolume', soundVolume);
}

function setMusicVolume(vol) {
  musicVolume = Math.max(0, Math.min(1, vol));
  localStorage.setItem('musicVolume', musicVolume);
  
  if (bgMusic && !isMusicTense) bgMusic.volume = soundMuted ? 0 : (musicVolume * masterVolume);
  if (bgMusicTense && isMusicTense) bgMusicTense.volume = soundMuted ? 0 : (musicVolume * masterVolume);
}

function toggleMute() {
  soundMuted = !soundMuted;
  localStorage.setItem('soundMuted', soundMuted);
  
  if (bgMusic) bgMusic.volume = soundMuted ? 0 : (musicVolume * masterVolume);
  if (bgMusicTense) bgMusicTense.volume = soundMuted ? 0 : (musicVolume * masterVolume);
}

// ══════════════════════════════════════
// SOUND PRELOADER - Load all sounds at startup
// ══════════════════════════════════════
function preloadSounds() {
  // Life loss effects
  loadSound('life-loss-small', 'sounds/life-loss-small.mp3');
  loadSound('life-loss-medium', 'sounds/life-loss-medium.mp3');
  loadSound('life-loss-large', 'sounds/life-loss-large.mp3');
  
  // Life gain
  loadSound('life-gain', 'sounds/life-gain.mp3');
  
  // Poison
  loadSound('poison', 'sounds/poison.mp3');
  
  // Draw and cards — real recorded sounds
  loadSound('draw-card', 'sounds/draw-card.mp3');      // card deck flick
  loadSound('card-tap', 'sounds/card-tap.wav');        // place/lay a card
  
  // Turn and phases
  loadSound('next-turn', 'sounds/next-turn.wav');
  loadSound('combat-start', 'sounds/combat-start.wav');
  
  // Commander and damage
  loadSound('commander-damage', 'sounds/commander-damage.mp3');
  
  // Player effects
  loadSound('elimination', 'sounds/elimination.mp3');
  loadSound('undo', 'sounds/undo.mp3');
  
  // Voice feedback — button click for confirmed/undo
  loadSound('voice-listening', 'sounds/voice-listening.mp3');
  loadSound('voice-confirmed', 'sounds/button-click.ogg');  // crisp click
  loadSound('voice-failed', 'sounds/voice-failed.mp3');
  loadSound('undo', 'sounds/button-click.ogg');              // same click for undo
  
  // Dice and coins — real recorded sounds
  loadSound('dice-roll', 'sounds/dice-roll.wav');      // physical dice roll
  loadSound('coin-heads', 'sounds/coin-heads.mp3');
  loadSound('coin-tails', 'sounds/coin-tails.mp3');
  
  // Monarch
  loadSound('monarch-change', 'sounds/monarch-change.mp3');

  // add_card / card-play fires the same 'place cards' sound
  loadSound('card-play', 'sounds/card-tap.wav');
}

// Initialize sounds when page loads
window.addEventListener('load', function() {
  initAudioContext();
  preloadSounds();
  initBackgroundMusic();
});

// ══════════════════════════════════════
// FUZZY STRING MATCHING (Levenshtein)
// ══════════════════════════════════════
function similarity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a === b) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  
  var matrix = [];
  for (var i = 0; i <= b.length; i++) matrix[i] = [i];
  for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
  
  for (var i = 1; i <= b.length; i++) {
    for (var j = 1; j <= a.length; j++) {
      var cost = (b[i - 1] === a[j - 1]) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  var dist = matrix[b.length][a.length];
  return 1 - (dist / Math.max(a.length, b.length));
}

// ══════════════════════════════════════
// PLAYER & STATE GETTERS
// ══════════════════════════════════════
function getPlayerNames() {
  try {
    var state = JSON.parse(localStorage.getItem('mtg_spectator') || '{}');
    return (state.players || []).map(function(p) { return p.name; });
  } catch(e) {
    return [];
  }
}

function getGameState() {
  try {
    return JSON.parse(localStorage.getItem('mtg_spectator') || '{}');
  } catch(e) {
    return {};
  }
}

var pendingVoiceChoice = null;

function normaliseText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#/\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getCombatState(state) {
  var combat = state && state.combatState ? state.combatState : null;
  if (!combat) {
    return {
      active: false,
      phase: 'idle',
      attackerPlayer: '',
      defenderPlayer: '',
      attackers: []
    };
  }

  return {
    active: combat.active === true || (combat.phase && combat.phase !== 'idle' && combat.phase !== 'results'),
    phase: combat.phase || 'idle',
    attackerPlayer: combat.attackerPlayer || '',
    defenderPlayer: combat.defenderPlayer || '',
    attackers: Array.isArray(combat.attackers) ? combat.attackers : []
  };
}

function clearPendingVoiceChoice() {
  pendingVoiceChoice = null;
}

function renderPendingChoiceUI() {
  if (!pendingVoiceChoice || !voiceActionList) return;

  var choicesWrap = document.createElement('div');
  choicesWrap.className = 'voice-choice-list';

  pendingVoiceChoice.choices.forEach(function(choice, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'voice-choice-btn';
    button.textContent = (index + 1) + '. ' + (choice.cardName ? (choice.cardName + ' ' + choice.ordinal + ' (' + choice.playerName + ')') : choice.label);
    button.addEventListener('click', function() {
      choosePendingVoiceChoice(index);
    });
    choicesWrap.appendChild(button);
  });

  voiceActionList.appendChild(choicesWrap);
}

function runParsedActions(actions, transcript) {
  if (pendingVoiceChoice) {
    displayActions(actions);
    if (voiceTranscript && transcript) voiceTranscript.textContent = '"' + transcript + '"';
    setVoiceState('idle');
    return;
  }

  if (voiceSettings.confirmFirst) {
    showConfirmationWindow(actions, transcript);
    return;
  }

  var largeLifeChange = null;
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i];
    if (action.type === 'life_change' && Math.abs(action.delta) >= 10) {
      largeLifeChange = action;
      break;
    }
  }

  if (largeLifeChange) {
    showConfirmationWindow(actions, transcript);
    return;
  }

  executeActions(actions);
  displayActions(actions);
  pushActionHistory(actions);
  if (voiceTranscript && transcript) voiceTranscript.textContent = '"' + transcript + '"';
  setVoiceState('idle');
  lastFailedParse = null;
}

function choosePendingVoiceChoice(index) {
  if (!pendingVoiceChoice || !pendingVoiceChoice.choices || !pendingVoiceChoice.choices[index]) return;

  var selected = pendingVoiceChoice.choices[index];
  clearPendingVoiceChoice();
  runParsedActions(selected.actions || [], selected.cardName || selected.label || 'clarified choice');
}

function getOrdinalFromText(text) {
  var lower = normaliseText(text);
  var digits = lower.match(/\b(\d+)\b/);
  if (digits) return Math.max(1, parseInt(digits[1], 10));

  var ordinals = {
    'first': 1,
    'one': 1,
    'top': 1,
    'second': 2,
    'two': 2,
    'middle': 2,
    'third': 3,
    'three': 3,
    'fourth': 4,
    'four': 4,
    'fifth': 5,
    'five': 5,
    'last': -1,
    'bottom': -1,
  };

  var words = lower.split(/\s+/);
  for (var i = 0; i < words.length; i++) {
    if (ordinals.hasOwnProperty(words[i])) {
      return ordinals[words[i]];
    }
  }
  return null;
}

function scoreCardNameMatch(query, cardName) {
  var cleanQuery = normaliseText(query);
  var cleanName = normaliseText(cardName);
  if (!cleanQuery || !cleanName) return 0;
  if (cleanQuery === cleanName) return 1;
  if (cleanName.indexOf(cleanQuery) >= 0 || cleanQuery.indexOf(cleanName) >= 0) return 0.93;

  var queryWords = cleanQuery.split(/\s+/).filter(Boolean);
  var nameWords = cleanName.split(/\s+/).filter(Boolean);
  var tokenScore = 0;

  for (var i = 0; i < queryWords.length; i++) {
    var bestWord = 0;
    for (var j = 0; j < nameWords.length; j++) {
      bestWord = Math.max(bestWord, similarity(queryWords[i], nameWords[j]));
    }
    tokenScore += bestWord;
  }

  tokenScore = tokenScore / Math.max(queryWords.length, 1);
  return Math.max(tokenScore, similarity(cleanQuery, cleanName));
}

function listBattlefieldCards(state, options) {
  var opts = options || {};
  var players = state.players || [];
  var cards = [];

  players.forEach(function(player) {
    if (opts.player && player.name.toLowerCase() !== opts.player.toLowerCase()) return;
    (player.cards || []).forEach(function(card, index) {
      if (opts.zone && (card.zone || '') !== opts.zone) return;
      if (opts.type && (card.type || '').toLowerCase() !== opts.type.toLowerCase()) return;
      if (opts.untappedOnly && card.tapped === true) return;
      cards.push({
        player: player,
        card: card,
        index: index
      });
    });
  });

  return cards;
}

function findMatchingCards(state, query, options) {
  var cleanQuery = normaliseText(query);
  var matches = listBattlefieldCards(state, options).map(function(entry) {
    return {
      player: entry.player,
      card: entry.card,
      index: entry.index,
      score: scoreCardNameMatch(cleanQuery, entry.card.name || '')
    };
  }).filter(function(entry) {
    return entry.score >= 0.6;
  }).sort(function(a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.index - b.index;
  });

  var deduped = [];
  var seenIds = {};
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    var key = (match.card.id || '') + '::' + match.player.name;
    if (seenIds[key]) continue;
    seenIds[key] = true;
    deduped.push(match);
  }
  return deduped;
}

function describeChoice(match, number) {
  var label = match.card.name;
  if (number != null) label += ' ' + number;
  return label + ' (' + match.player.name + ')';
}

function makePendingChoice(kind, prompt, choices) {
  var sameNameCount = {};
  var decorated = choices.map(function(choice) {
    var key = (choice.cardName || choice.label || '').toLowerCase();
    sameNameCount[key] = (sameNameCount[key] || 0) + 1;
    return {
      label: choice.label,
      cardName: choice.cardName || '',
      playerName: choice.playerName || '',
      ordinal: sameNameCount[key],
      actions: choice.actions
    };
  });

  pendingVoiceChoice = {
    kind: kind,
    prompt: prompt,
    choices: decorated
  };

  return [{
    type: 'log',
    message: prompt + ' ' + decorated.map(function(choice) {
      return choice.cardName ? (choice.cardName + ' ' + choice.ordinal + ' (' + choice.playerName + ')') : choice.label;
    }).join(' · ')
  }];
}

function resolvePendingChoice(text) {
  if (!pendingVoiceChoice) return null;

  var lower = normaliseText(text);
  var ordinal = getOrdinalFromText(lower);
  var choices = pendingVoiceChoice.choices || [];
  var selected = null;

  if (ordinal != null) {
    if (ordinal === -1 && choices.length > 0) {
      selected = choices[choices.length - 1];
    } else if (ordinal > 0) {
      selected = choices.find(function(choice) {
        return choice.ordinal === ordinal;
      }) || choices[ordinal - 1] || null;
    }
  }

  if (!selected) {
    selected = choices.find(function(choice) {
      var cardMatch = choice.cardName && lower.indexOf(normaliseText(choice.cardName)) >= 0;
      var playerMatch = choice.playerName && lower.indexOf(normaliseText(choice.playerName)) >= 0;
      return cardMatch || playerMatch;
    }) || null;
  }

  if (!selected) {
    return [{
      type: 'log',
      message: '❌ Still not sure which one you mean. Try "first", "second", or say the card name again.'
    }];
  }

  clearPendingVoiceChoice();
  return selected.actions;
}

function getMentionedPlayers(text, playerNames) {
  var lower = text.toLowerCase();
  var matches = [];
  playerNames.forEach(function(name) {
    var idx = lower.indexOf(name.toLowerCase());
    if (idx >= 0) {
      matches.push({ name: name, index: idx });
    }
  });
  matches.sort(function(a, b) { return a.index - b.index; });
  return matches.map(function(match) { return match.name; });
}

function extractCombatParticipants(text, state) {
  var playerNames = getPlayerNames();
  var currentPlayer = state.currentPlayer || playerNames[0] || '';
  var mentioned = getMentionedPlayers(text, playerNames);
  var lower = normaliseText(text);
  var attacker = currentPlayer;
  var defender = '';

  if (/\b(i|im|i am)\b/.test(lower) || /\bgo to combat\b/.test(lower)) {
    if (mentioned.length > 0) defender = mentioned[0];
  } else if (mentioned.length >= 2) {
    attacker = mentioned[0];
    defender = mentioned[1];
  } else if (mentioned.length === 1) {
    if (mentioned[0].toLowerCase() !== currentPlayer.toLowerCase()) {
      defender = mentioned[0];
    } else {
      attacker = mentioned[0];
    }
  }

  if (!defender) {
    var fallback = (state.players || []).find(function(player) {
      return player.name.toLowerCase() !== attacker.toLowerCase() && player.eliminated !== true;
    });
    defender = fallback ? fallback.name : '';
  }

  if (!attacker || !defender || attacker.toLowerCase() === defender.toLowerCase()) {
    return null;
  }

  return {
    attacker: attacker,
    defender: defender
  };
}

function extractAttackerQueries(text, playerNames) {
  var working = ' ' + text + ' ';
  var withMatch = text.match(/(?:attack with|attacks with|using|uses)\s+(.+)$/i);
  if (withMatch) {
    working = withMatch[1];
  } else {
    var beforeAttack = text.match(/^(.+?)\s+attacks?\b/i);
    if (beforeAttack) {
      working = beforeAttack[1];
    }
  }

  playerNames.forEach(function(name) {
    working = working.replace(new RegExp('\\b' + escapeRegex(name) + '\\b', 'ig'), ' ');
  });

  working = working
    .replace(/\b(i|go|to|combat|declare|attackers|attacks?|attack|with|using|uses|use|the|a|an|into)\b/ig, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!working) return [];
  return working.split(/\s+and\s+|\s*,\s*/i).map(function(part) {
    return part.trim();
  }).filter(Boolean);
}

function findCombatAttackers(combatState, query) {
  var cleanQuery = normaliseText(query);
  var matches = (combatState.attackers || []).map(function(attacker, index) {
    return {
      attacker: attacker,
      index: index,
      score: scoreCardNameMatch(cleanQuery, attacker.cardName || '')
    };
  }).filter(function(entry) {
    return entry.score >= 0.6;
  }).sort(function(a, b) {
    return b.score - a.score;
  });

  return matches;
}

function parseCounterCommand(text, state) {
  var lower = normaliseText(text);
  if (!/\b(add|put)\b/.test(lower) || !/\bcounter/.test(lower) || !/\bto\b/.test(lower)) {
    return null;
  }

  var player = extractPlayer(text, getPlayerNames());
  var amount = extractNumber(text) || 1;
  var targetMatch = text.match(/\bto\b\s+(.+)$/i);
  var cardQuery = targetMatch ? targetMatch[1].trim() : '';
  if (!cardQuery) {
    return [{ type: 'log', message: '❌ Please say which card gets the counter.' }];
  }

  var matches = findMatchingCards(state, cardQuery, {
    player: player,
    zone: 'battlefield'
  });

  if (matches.length === 0) {
    return [{ type: 'log', message: '❌ No battlefield card matched "' + cardQuery + '".' }];
  }

  if (matches.length > 1) {
    return makePendingChoice('counter_target', 'Which ' + cardQuery + '? You have ' + matches.length + '.', matches.map(function(match) {
      return {
        label: describeChoice(match),
        cardName: match.card.name,
        playerName: match.player.name,
        actions: [
          { type: 'add_counter', player: match.player.name, cardId: match.card.id, cardName: match.card.name, amount: amount },
          { type: 'log', message: match.player.name + ' adds +' + amount + '/+' + amount + ' counter to ' + match.card.name }
        ]
      };
    }));
  }

  return [
    { type: 'add_counter', player: matches[0].player.name, cardId: matches[0].card.id, cardName: matches[0].card.name, amount: amount },
    { type: 'log', message: matches[0].player.name + ' adds +' + amount + '/+' + amount + ' counter to ' + matches[0].card.name }
  ];
}

function parseCombatCommand(text, state) {
  var lower = normaliseText(text);
  var playerNames = getPlayerNames();
  var combatState = getCombatState(state);

  if (combatState.active) {
    if (combatState.phase === 'declaring_attackers') {
      var attackerQueries = extractAttackerQueries(text, playerNames);
      if (attackerQueries.length > 0) {
        var attackerActions = [];
        for (var aq = 0; aq < attackerQueries.length; aq++) {
          var matches = findMatchingCards(state, attackerQueries[aq], {
            player: combatState.attackerPlayer,
            zone: 'battlefield',
            type: 'creature',
            untappedOnly: true
          });

          if (matches.length === 0) {
            return [{ type: 'log', message: '❌ No untapped creature matched "' + attackerQueries[aq] + '" for ' + combatState.attackerPlayer + '.' }];
          }

          if (matches.length > 1) {
            return makePendingChoice('combat_attacker', 'Which ' + attackerQueries[aq] + ' is attacking?', matches.map(function(match) {
              return {
                label: describeChoice(match),
                cardName: match.card.name,
                playerName: match.player.name,
                actions: [
                  { type: 'combat_add_attacker', attackerPlayer: combatState.attackerPlayer, defenderPlayer: combatState.defenderPlayer, cardId: match.card.id, cardName: match.card.name },
                  { type: 'combat_declare_attackers' },
                  { type: 'log', message: 'Waiting for ' + combatState.defenderPlayer + '\'s blocks.' }
                ]
              };
            }));
          }

          attackerActions.push({
            type: 'combat_add_attacker',
            attackerPlayer: combatState.attackerPlayer,
            defenderPlayer: combatState.defenderPlayer,
            cardId: matches[0].card.id,
            cardName: matches[0].card.name
          });
        }

        attackerActions.push({ type: 'combat_declare_attackers' });
        attackerActions.push({ type: 'log', message: 'Waiting for ' + combatState.defenderPlayer + '\'s blocks.' });
        return attackerActions;
      }

      if (/\b(cancel combat|end combat|leave combat)\b/.test(lower)) {
        return [
          { type: 'combat_end' },
          { type: 'log', message: 'Combat cancelled.' }
        ];
      }

      if (/\b(done|declare|attackers?)\b/.test(lower)) {
        return [{ type: 'log', message: '❌ Say which creatures attack, like "Spider and Elf attack".' }];
      }
    }

    if (combatState.phase === 'declaring_blockers') {
      if (/\b(no blockers?|take it|takes it|unblocked|no block)\b/.test(lower)) {
        return [
          { type: 'combat_no_blockers' },
          { type: 'combat_resolve' },
          { type: 'log', message: combatState.defenderPlayer + ' takes it. Resolving combat.' }
        ];
      }

      if (/\b(resolve|damage|proceed)\b/.test(lower)) {
        return [
          { type: 'combat_resolve' },
          { type: 'log', message: 'Resolving combat.' }
        ];
      }

      if (/\bblock/.test(lower)) {
        var blockerOwner = extractPlayer(text, playerNames) || combatState.defenderPlayer;
        var blockerQuery = '';
        var attackerQuery = '';
        var withMatch = text.match(/\bwith\b\s+(.+)$/i);
        if (withMatch) {
          blockerQuery = withMatch[1].trim();
        }
        var blocksMatch = text.match(/^(.+?)\s+blocks?\s+(.+)$/i);
        if (!blockerQuery && blocksMatch) {
          var leftSide = blocksMatch[1].trim();
          var rightSide = blocksMatch[2].trim();
          if (!extractPlayer(leftSide, playerNames)) {
            blockerQuery = leftSide;
            attackerQuery = rightSide;
          } else {
            attackerQuery = rightSide.replace(/^with\s+/i, '').trim();
          }
        }

        if (!blockerQuery) {
          return [{ type: 'log', message: '❌ Say which creature blocks, like "Dani blocks with Knight".' }];
        }

        var blockerMatches = findMatchingCards(state, blockerQuery, {
          player: blockerOwner,
          zone: 'battlefield',
          type: 'creature'
        });
        if (blockerMatches.length === 0) {
          return [{ type: 'log', message: '❌ No blocker matched "' + blockerQuery + '" for ' + blockerOwner + '.' }];
        }
        if (blockerMatches.length > 1) {
          return makePendingChoice('combat_blocker', 'Which ' + blockerQuery + ' is blocking?', blockerMatches.map(function(match) {
            var attackerChoices = combatState.attackers || [];
            var targetAttacker = attackerChoices.length === 1 ? attackerChoices[0] : null;
            return {
              label: describeChoice(match),
              cardName: match.card.name,
              playerName: match.player.name,
              actions: targetAttacker ? [
                { type: 'combat_add_blocker', attackerCardId: targetAttacker.cardId, attackerCardName: targetAttacker.cardName, blockerPlayer: match.player.name, blockerCardId: match.card.id, blockerCardName: match.card.name },
                { type: 'log', message: match.card.name + ' blocks ' + targetAttacker.cardName + '. Waiting for more blocks or say resolve combat.' }
              ] : [{ type: 'log', message: '❌ Say which attacker is being blocked too.' }]
            };
          }));
        }

        var attackerMatches = attackerQuery ? findCombatAttackers(combatState, attackerQuery) : [];
        if (attackerMatches.length === 0 && combatState.attackers.length === 1) {
          attackerMatches = [{ attacker: combatState.attackers[0] }];
        }
        if (attackerMatches.length === 0) {
          return makePendingChoice('block_target', 'Which attacker is being blocked?', (combatState.attackers || []).map(function(attacker) {
            return {
              label: attacker.cardName + ' (' + attacker.player + ')',
              cardName: attacker.cardName,
              playerName: attacker.player,
              actions: [
                { type: 'combat_add_blocker', attackerCardId: attacker.cardId, attackerCardName: attacker.cardName, blockerPlayer: blockerMatches[0].player.name, blockerCardId: blockerMatches[0].card.id, blockerCardName: blockerMatches[0].card.name },
                { type: 'log', message: blockerMatches[0].card.name + ' blocks ' + attacker.cardName + '. Waiting for more blocks or say resolve combat.' }
              ]
            };
          }));
        }

        return [
          { type: 'combat_add_blocker', attackerCardId: attackerMatches[0].attacker.cardId, attackerCardName: attackerMatches[0].attacker.cardName, blockerPlayer: blockerMatches[0].player.name, blockerCardId: blockerMatches[0].card.id, blockerCardName: blockerMatches[0].card.name },
          { type: 'log', message: blockerMatches[0].card.name + ' blocks ' + attackerMatches[0].attacker.cardName + '. Waiting for more blocks or say resolve combat.' }
        ];
      }
    }

    if (combatState.phase === 'damage_resolution') {
      if (/\b(resolve|damage|done|proceed)\b/.test(lower)) {
        return [
          { type: 'combat_resolve' },
          { type: 'log', message: 'Resolving combat.' }
        ];
      }
    }

    if (combatState.phase === 'results' && /\b(done|back|finish|close)\b/.test(lower)) {
      return [
        { type: 'combat_end' },
        { type: 'log', message: 'Combat finished.' }
      ];
    }
  }

  if (/\b(attacks?|attack|combat)\b/.test(lower)) {
    var participants = extractCombatParticipants(text, state);
    if (!participants) {
      return [{ type: 'log', message: '❌ I need both attacker and defender to start combat.' }];
    }

    var startActions = [
      { type: 'combat_start', attackerPlayer: participants.attacker, defenderPlayer: participants.defender }
    ];

    var attackers = extractAttackerQueries(text, playerNames);
    if (attackers.length === 0) {
      startActions.push({ type: 'log', message: 'Entering combat. Declare attackers.' });
      return startActions;
    }

    for (var i = 0; i < attackers.length; i++) {
      var matches = findMatchingCards(state, attackers[i], {
        player: participants.attacker,
        zone: 'battlefield',
        type: 'creature',
        untappedOnly: true
      });
      if (matches.length === 0) {
        return [{ type: 'log', message: '❌ No untapped creature matched "' + attackers[i] + '" for ' + participants.attacker + '.' }];
      }
      if (matches.length > 1) {
        return makePendingChoice('combat_attacker', 'Which ' + attackers[i] + ' is attacking?', matches.map(function(match) {
          return {
            label: describeChoice(match),
            cardName: match.card.name,
            playerName: match.player.name,
            actions: [
              { type: 'combat_start', attackerPlayer: participants.attacker, defenderPlayer: participants.defender },
              { type: 'combat_add_attacker', attackerPlayer: participants.attacker, defenderPlayer: participants.defender, cardId: match.card.id, cardName: match.card.name },
              { type: 'combat_declare_attackers' },
              { type: 'log', message: 'Waiting for ' + participants.defender + '\'s blocks.' }
            ]
          };
        }));
      }

      startActions.push({
        type: 'combat_add_attacker',
        attackerPlayer: participants.attacker,
        defenderPlayer: participants.defender,
        cardId: matches[0].card.id,
        cardName: matches[0].card.name
      });
    }

    startActions.push({ type: 'combat_declare_attackers' });
    startActions.push({ type: 'log', message: 'Waiting for ' + participants.defender + '\'s blocks.' });
    return startActions;
  }

  return null;
}

// ══════════════════════════════════════
// INTENT & ENTITY EXTRACTION
// ══════════════════════════════════════
function phoneticRoot(w) {
  // Strip spoken suffixes so "danny"≈"dani", "katie"≈"kati", etc.
  if (w.endsWith('ny'))  return w.slice(0, -2);
  if (w.endsWith('ie'))  return w.slice(0, -2);
  if (w.endsWith('ey'))  return w.slice(0, -2);
  if (w.endsWith('y'))   return w.slice(0, -1);
  if (w.endsWith('i'))   return w.slice(0, -1);
  return w;
}

function extractPlayer(text, playerNames) {
  var lower = text.toLowerCase();
  var best = null;
  var bestScore = 0.0;
  var THRESHOLD = 0.55;

  // Exact substring match first
  for (var i = 0; i < playerNames.length; i++) {
    var name = playerNames[i];
    if (lower.includes(name.toLowerCase())) {
      return name;
    }
  }

  var words = lower.split(/\s+/);
  for (var i = 0; i < playerNames.length; i++) {
    var nameLower = playerNames[i].toLowerCase();
    var nameRoot = phoneticRoot(nameLower);

    for (var j = 0; j < words.length; j++) {
      var w = words[j];
      var score = similarity(w, nameLower);

      // Boost: phonetic root match ("danny"→"dan" == "dani"→"dan")
      if (phoneticRoot(w) === nameRoot && nameRoot.length >= 2) {
        score = Math.max(score, 0.85);
      }

      // Boost: prefix match (heard word starts with first 60%+ of name)
      var prefixLen = Math.max(2, Math.floor(nameLower.length * 0.6));
      if (nameLower.length >= 3 && w.length >= 2 && nameLower.startsWith(w.slice(0, Math.min(prefixLen, w.length)))) {
        score = Math.max(score, 0.80);
      }

      if (score > bestScore) {
        bestScore = score;
        best = score >= THRESHOLD ? playerNames[i] : null;
      }
    }
  }

  return best;
}

function extractNumber(text) {
  // Try to find a digit number first
  var m = text.match(/\b(\d+)\b/);
  if (m) return parseInt(m[1], 10);
  
  // Map of word numbers
  var words = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'a': 1, 'an': 1, 'half': 10
  };
  
  var found = null;
  var textWords = text.toLowerCase().split(/\s+/);
  for (var i = 0; i < textWords.length; i++) {
    if (words[textWords[i]]) {
      found = words[textWords[i]];
    }
  }
  
  return found || 1;
}

function extractIntent(text) {
  var lower = text.toLowerCase();
  
  // Damage intents
  if (/\b(loses?|lost|takes?|took|damage|hit|hurt|minus)\b/.test(lower)) return 'damage';
  
  // Healing intents
  if (/\b(gains?|gained|heal|healed|restore|plus|gets?\s+life)\b/.test(lower)) return 'heal';
  
  // Drawing
  if (/\b(draws?|drew|pull|pulls|pulls?\s+card)\b/.test(lower)) return 'draw';
  
  // Poison
  if (/\b(poison|infect)\b/.test(lower)) return 'poison';
  
  // Turn management
  if (/\b(next|pass|advance|proceed)\s+(phase|step)\b/.test(lower)) return 'next_phase';
  if (/\b(next|end|pass).{0,6}turn\b/.test(lower)) return 'next_turn';
  if (/\b(set|go\s+to|switch\s+to|enter)\s+(draw|main|combat|end)\b/.test(lower) || /\b(draw|main|combat|end)\s+phase\b/.test(lower)) return 'set_phase';
  
  // Casting/playing
  if (/\b(cast|plays?|played|place|places)\b/.test(lower)) return 'cast';
  
  // Combat
  if (/\b(attacks?|punches?)\b/.test(lower)) return 'attack';
  
  // Tap/untap
  if (/\b(tap|untap|taps?)\b/.test(lower)) {
    if (/untap/.test(lower)) return 'untap';
    return 'tap';
  }
  
  // Monarch/initiative
  if (/\b(monarch)\b/.test(lower)) return 'monarch';
  
  // Discard
  if (/\b(discard|discards|mill)\b/.test(lower)) return 'discard';
  
  // Set life (correction/override)
  if (/\b(set|now\s+at|at|is\s+at)\b.+\d+.*(life|hp)?/.test(lower)) return 'set_life';
  
  // Eliminate
  if (/\b(eliminate|eliminated|dies?|dead)\b/.test(lower)) return 'eliminate';
  
  // Undo
  if (/\b(undo|cancel|revert|back)\b/.test(lower)) return 'undo';
  
  return null;
}

function extractPhaseName(text) {
  var lower = (text || '').toLowerCase();
  if (/\bdraw\b/.test(lower)) return 'Draw';
  if (/\b(main|main\s*1|main\s*phase)\b/.test(lower)) return 'Main';
  if (/\bcombat\b/.test(lower)) return 'Combat';
  if (/\b(end|ending)\b/.test(lower)) return 'End';
  return null;
}

function shouldAutoAdvanceDrawToMain(state) {
  if (!voiceSettings || !voiceSettings.autoPhaseDraw) return false;
  if (!state) return false;
  var phaseIdx = parseInt(state.phaseIndex, 10);
  if (!isNaN(phaseIdx)) return phaseIdx === 0;
  var phase = (state.phase || '').toString().toLowerCase();
  return phase === 'draw';
}

// ══════════════════════════════════════
// ACTION HISTORY (for undo support)
// ══════════════════════════════════════
var actionHistory = [];
var MAX_HISTORY = 10;

function pushActionHistory(actions) {
  actionHistory.push(actions);
  if (actionHistory.length > MAX_HISTORY) {
    actionHistory.shift();
  }
}

function getLastActions() {
  return actionHistory.length > 0 ? actionHistory[actionHistory.length - 1] : null;
}

function popActionHistory() {
  return actionHistory.pop();
}

// ══════════════════════════════════════
// LOCAL COMMAND PARSER (intent-based)
// ══════════════════════════════════════
function parseGameCommand(transcript) {
  var text = (transcript || '').trim();
  if (!text) return [{ type: 'log', message: 'No command entered.' }];

  var lower = text.toLowerCase();
  var actions = [];
  var playerNames = getPlayerNames();
  var state = getGameState();

  // Fallback for very short commands that should be handled specially
  if (lower === 'next' || lower === 'next phase' || lower === 'pass' || lower === 'pass phase' || lower === 'advance phase' || lower === 'next step') {
    return [
      { type: 'next_phase' },
      { type: 'log', message: 'Next phase' }
    ];
  }

  if (lower === 'next turn' || lower === 'end turn' || lower === 'pass turn') {
    return [
      { type: 'next_turn' },
      { type: 'log', message: 'Next turn' }
    ];
  }

  if (lower === 'undo' || lower === 'cancel' || lower === 'cancel that') {
    var lastActs = getLastActions();
    if (!lastActs) {
      return [{ type: 'log', message: '❌ No actions to undo' }];
    }
    // Reverse each action
    var undoActions = [];
    for (var i = 0; i < lastActs.length; i++) {
      var a = lastActs[i];
      if (a.type === 'life_change') {
        undoActions.push({ type: 'life_change', player: a.player, delta: -a.delta });
      } else if (a.type === 'poison') {
        undoActions.push({ type: 'poison', player: a.player, delta: -a.delta });
      }
      // Other types are logged, so just skip them in undo
    }
    undoActions.push({ type: 'log', message: '↶ Undo' });
    popActionHistory();
    return undoActions;
  }

  var pendingActions = resolvePendingChoice(text);
  if (pendingActions) {
    return pendingActions;
  }

  var combatActions = parseCombatCommand(text, state);
  if (combatActions) {
    return combatActions;
  }

  var counterActions = parseCounterCommand(text, state);
  if (counterActions) {
    return counterActions;
  }

  // Extract intent, player, and number
  var intent = extractIntent(text);
  var player = extractPlayer(text, playerNames);
  var number = extractNumber(text);

  if (!intent) {
    actions.push({ type: 'log', message: 'Could not parse: ' + text });
    return actions;
  }

  // Route by intent
  switch(intent) {
    case 'damage':
      if (player) {
        actions.push({ type: 'life_change', player: player, delta: -number });
        actions.push({ type: 'log', message: player + ' takes ' + number + ' damage' });
      } else {
        actions.push({ type: 'log', message: '❌ Player not found in: ' + text });
      }
      break;

    case 'heal':
      if (player) {
        actions.push({ type: 'life_change', player: player, delta: number });
        actions.push({ type: 'log', message: player + ' gains ' + number + ' life' });
      } else {
        actions.push({ type: 'log', message: '❌ Player not found in: ' + text });
      }
      break;

    case 'draw':
      if (player) {
        actions.push({ type: 'draw', player: player, count: number });
        if (shouldAutoAdvanceDrawToMain(state)) {
          actions.push({ type: 'next_phase' });
        }
        actions.push({ type: 'log', message: player + ' draws ' + number + ' card' + (number > 1 ? 's' : '') });
      } else {
        actions.push({ type: 'log', message: '❌ Player not found in: ' + text });
      }
      break;

    case 'poison':
      if (player) {
        actions.push({ type: 'poison', player: player, delta: number });
        actions.push({ type: 'log', message: player + ' gets ' + number + ' poison' });
      } else {
        actions.push({ type: 'log', message: '❌ Player not found in: ' + text });
      }
      break;

    case 'next_turn':
      actions.push({ type: 'next_turn' });
      actions.push({ type: 'log', message: 'Next turn' });
      break;

    case 'next_phase':
      actions.push({ type: 'next_phase' });
      actions.push({ type: 'log', message: 'Next phase' });
      break;

    case 'set_phase':
      var phase = extractPhaseName(text);
      if (phase) {
        actions.push({ type: 'set_phase', phase: phase });
        actions.push({ type: 'log', message: 'Set phase to ' + phase });
      } else {
        actions.push({ type: 'log', message: '❌ Could not find phase in: ' + text });
      }
      break;

    case 'cast':
      if (player) {
        // Extract card name (what comes between "cast"/"play" and the player name)
        var castMatch = text.match(/(?:cast|play|place)s?\s+(?:a|an|the\s+)?(.+?)(?:\s+(?:for|by|with|from))?\s*$/i);
        var cardName = castMatch ? castMatch[1].trim() : 'card';
        actions.push({ type: 'add_card', player: player, cardName: cardName, zone: 'battlefield' });
        actions.push({ type: 'log', message: player + ' cast/played ' + cardName });
      } else {
        actions.push({ type: 'log', message: '❌ Player not found in: ' + text });
      }
      break;

    case 'attack':
      // Format: "player1 attacks player2 for N"
      var m = text.match(/([a-z0-9\s.\-']+?)\s+attacks?\s+([a-z0-9\s.\-']+?)(?:\s+for\s+(\d+))?/i);
      if (m) {
        var atkName = m[1].trim();
        var defName = m[2].trim();
        var dmg = m[3] ? parseInt(m[3], 10) : 0;
        atkName = extractPlayer(atkName, playerNames) || atkName;
        defName = extractPlayer(defName, playerNames) || defName;
        if (dmg > 0) {
          actions.push({ type: 'life_change', player: defName, delta: -dmg });
        }
        actions.push({
          type: 'combat',
          attacker: { player: atkName, cardName: 'attacker' },
          defender: { player: defName },
          damage: dmg,
          blockerName: '',
          blockerDies: false,
          attackerDies: false
        });
        actions.push({ type: 'log', message: atkName + ' attacks ' + defName + (dmg ? ' for ' + dmg + ' damage' : '') });
      } else {
        actions.push({ type: 'log', message: 'Could not parse attack: ' + text });
      }
      break;

    case 'tap':
      if (player) {
        var cardMatch = text.match(/(?:tap)s?\s+(?:a|an|the\s+)?(.+?)(?:\s|$)/i);
        var cardName = cardMatch ? cardMatch[1].trim() : 'card';
        actions.push({ type: 'tap_card', player: player, cardName: cardName, tapped: true });
        actions.push({ type: 'log', message: player + ' tapped ' + cardName });
      }
      break;

    case 'untap':
      if (player) {
        var cardMatch = text.match(/(?:untap)s?\s+(?:a|an|the\s+)?(.+?)(?:\s|$)/i);
        var cardName = cardMatch ? cardMatch[1].trim() : 'card';
        actions.push({ type: 'tap_card', player: player, cardName: cardName, tapped: false });
        actions.push({ type: 'log', message: player + ' untapped ' + cardName });
      }
      break;

    case 'monarch':
      if (player) {
        actions.push({ type: 'set_monarch', player: player });
        actions.push({ type: 'log', message: player + ' becomes the monarch' });
      }
      break;

    case 'discard':
      if (player) {
        actions.push({ type: 'discard', player: player, count: number });
        actions.push({ type: 'log', message: player + ' discards ' + number + ' card' + (number > 1 ? 's' : '') });
      }
      break;

    case 'set_life':
      if (player) {
        // Extract the target life total
        var lifeMatch = text.match(/(\d+)(?:\s+life)?/);
        var targetLife = lifeMatch ? parseInt(lifeMatch[1], 10) : 20;
        actions.push({ type: 'set_life', player: player, life: targetLife });
        actions.push({ type: 'log', message: player + ' set to ' + targetLife + ' life' });
      }
      break;

    case 'eliminate':
      if (player) {
        actions.push({ type: 'eliminate', player: player, reason: 'voice command' });
        actions.push({ type: 'log', message: player + ' is eliminated' });
      }
      break;

    default:
      actions.push({ type: 'log', message: 'Could not parse: ' + text });
  }

  return actions;
}

// ══════════════════════════════════════
// VOICE ENGINE
// ══════════════════════════════════════
var recognition = null;
var voiceActive = false;
var voicePanel = document.getElementById('voicePanel');
var voiceFab = document.getElementById('voiceFab');
var voiceTranscript = document.getElementById('voiceTranscript');
var voiceActionList = document.getElementById('voiceActionList');
var voiceHoldHint = document.getElementById('voiceHoldHint');

// Voice settings
var storedVoiceMode = localStorage.getItem('voiceMode');
var initialVoiceMode = (storedVoiceMode === 'continuous' || storedVoiceMode === 'toggle') ? storedVoiceMode : 'toggle';
var voiceSettings = {
  mode: initialVoiceMode,
  lang: localStorage.getItem('voiceLang') || 'en-US',
  noiseGate: localStorage.getItem('voiceNoiseGate') === 'true',
  confirmFirst: localStorage.getItem('voiceConfirmFirst') === 'true',
  autoPhaseDraw: localStorage.getItem('voiceAutoPhaseDraw') === 'true',
  silenceTimeout: 2000  // Auto-stop after 2 seconds of silence in continuous mode
};

if (storedVoiceMode !== initialVoiceMode) {
  localStorage.setItem('voiceMode', initialVoiceMode);
}

// Noise gate state
var audioContext = null;
var micStream = null;
var analyser = null;
var micLevelViz = document.getElementById('voiceMicLevel');
var micLevelBar = document.getElementById('voiceMicLevelBar');

// Last failed parse (for error recovery)
var lastFailedParse = null;

function initVoice() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceTranscript.textContent = 'Speech recognition not supported. Use Chrome or Edge.';
    return null;
  }
  var r = new SpeechRecognition();
  r.continuous = (voiceSettings.mode === 'continuous');
  r.interimResults = true;
  r.maxAlternatives = 5;
  r.lang = voiceSettings.lang;

  r.onresult = function(e) {
    var playerNames = getPlayerNames();
    // Use the first alternative for interim display
    var displayTranscript = e.results[e.results.length - 1][0].transcript;
    voiceTranscript.textContent = '"' + displayTranscript + '"';

    if (e.results[e.results.length - 1].isFinal) {
      // Pick the alternative that best matches a known player name (if any)
      var finalResult = e.results[e.results.length - 1];
      var bestTranscript = finalResult[0].transcript;
      var bestPlayerScore = 0;
      for (var alt = 0; alt < finalResult.length; alt++) {
        var altText = finalResult[alt].transcript;
        var words = altText.toLowerCase().split(/\s+/);
        for (var pi = 0; pi < playerNames.length; pi++) {
          var pn = playerNames[pi].toLowerCase();
          for (var wi = 0; wi < words.length; wi++) {
            var sc = similarity(words[wi], pn);
            if (phoneticRoot(words[wi]) === phoneticRoot(pn) && phoneticRoot(pn).length >= 2) sc = 0.9;
            if (sc > bestPlayerScore) { bestPlayerScore = sc; bestTranscript = altText; }
          }
        }
      }
      processVoiceCommand(bestTranscript);
    }
  };
  r.onerror = function(e) {
    voiceTranscript.textContent = 'Error: ' + e.error;
    setVoiceState('idle');
  };
  r.onend = function() {
    // In always-on mode, restart silently.
    if (voiceSettings.mode === 'continuous' && voiceActive) {
      try { recognition.start(); } catch(ex) {}
    }
  };
  return r;
}

function setVoiceState(state) {
  voiceFab.className = 'voice-fab' + (state === 'listening' ? ' listening' : state === 'processing' ? ' processing' : '');
  if (state === 'listening') {
    voiceFab.textContent = '🔴';
    voiceActive = true;
    playSound('voice-listening', 0.5);
  } else if (state === 'processing') {
    voiceFab.textContent = '⏳';
    voiceActive = false;
  } else {
    voiceFab.textContent = '🎤';
    voiceActive = false;
  }
}

// ══════════════════════════════════════
// NOISE GATE (Web Audio API)
// ══════════════════════════════════════
function initNoiseGate() {
  if (audioContext) return; // Already initialized
  
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
    micStream = stream;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    var source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    
    // Visualize mic level
    var dataArray = new Uint8Array(analyser.frequencyBinCount);
    var animationId;
    
    function updateMicLevel() {
      analyser.getByteFrequencyData(dataArray);
      var average = dataArray.reduce(function(a, b) { return a + b; }) / dataArray.length;
      var percentage = Math.min(100, (average / 256) * 100);
      if (micLevelBar) {
        micLevelBar.style.width = percentage + '%';
      }
      animationId = requestAnimationFrame(updateMicLevel);
    }
    updateMicLevel();
  }).catch(function(err) {
    console.log('Noise gate requires microphone access:', err);
  });
}

voiceFab.addEventListener('click', function() {
  // Show/hide settings on click
  var settingsDiv = document.getElementById('voiceSettings');
  var settingsToggle = document.getElementById('voiceSettingsToggle');
  var isShowing = settingsDiv.style.display !== 'none';
  settingsDiv.style.display = isShowing ? 'none' : 'block';
  settingsToggle.style.transform = isShowing ? 'rotate(0deg)' : 'rotate(45deg)';
});

// Settings panel handlers
document.getElementById('voiceMode')?.addEventListener('change', function(e) {
  voiceSettings.mode = e.target.value;
  localStorage.setItem('voiceMode', voiceSettings.mode);
  var hints = {
    'toggle': 'Click FAB to toggle on/off · speak freely',
    'continuous': 'Always listening · 2sec silence stops listening'
  };
  voiceHoldHint.textContent = hints[voiceSettings.mode] || 'Click FAB to start';
  // Reinitialize voice engine
  if (recognition) recognition.abort();
  recognition = initVoice();
});

document.getElementById('voiceLang')?.addEventListener('change', function(e) {
  voiceSettings.lang = e.target.value;
  localStorage.setItem('voiceLang', voiceSettings.lang);
  if (recognition) {
    recognition.lang = voiceSettings.lang;
    recognition.abort();
    if (voiceActive) {
      try { recognition.start(); } catch(ex) {}
    }
  }
});

document.getElementById('voiceNoiseGate')?.addEventListener('change', function(e) {
  voiceSettings.noiseGate = e.checked;
  localStorage.setItem('voiceNoiseGate', voiceSettings.noiseGate);
  micLevelViz.style.display = voiceSettings.noiseGate ? 'block' : 'none';
  if (voiceSettings.noiseGate) {
    initNoiseGate();
  }
});

document.getElementById('voiceConfirmFirst')?.addEventListener('change', function(e) {
  voiceSettings.confirmFirst = e.checked;
  localStorage.setItem('voiceConfirmFirst', voiceSettings.confirmFirst);
});

document.getElementById('voiceAutoPhaseDraw')?.addEventListener('change', function(e) {
  voiceSettings.autoPhaseDraw = e.checked;
  localStorage.setItem('voiceAutoPhaseDraw', voiceSettings.autoPhaseDraw);
});

document.getElementById('voiceSettingsToggle')?.addEventListener('click', function(e) {
  e.stopPropagation();
  var settingsDiv = document.getElementById('voiceSettings');
  var isShowing = settingsDiv.style.display !== 'none';
  settingsDiv.style.display = isShowing ? 'none' : 'block';
  this.style.transform = isShowing ? 'rotate(0deg)' : 'rotate(45deg)';
});

var voiceModeSelect = document.getElementById('voiceMode');
if (voiceModeSelect) {
  voiceModeSelect.value = voiceSettings.mode;
}

var voiceNoiseGateToggle = document.getElementById('voiceNoiseGate');
if (voiceNoiseGateToggle) {
  voiceNoiseGateToggle.checked = voiceSettings.noiseGate;
}

var voiceConfirmFirstToggle = document.getElementById('voiceConfirmFirst');
if (voiceConfirmFirstToggle) {
  voiceConfirmFirstToggle.checked = voiceSettings.confirmFirst;
}

var voiceAutoPhaseDrawToggle = document.getElementById('voiceAutoPhaseDraw');
if (voiceAutoPhaseDrawToggle) {
  voiceAutoPhaseDrawToggle.checked = voiceSettings.autoPhaseDraw;
}

if (voiceHoldHint) {
  voiceHoldHint.textContent = voiceSettings.mode === 'continuous'
    ? 'Always listening · 2sec silence stops listening'
    : 'Click FAB to toggle on/off · speak freely';
}

// Manual command input (for typed support)
document.getElementById('manualCmdBtn').addEventListener('click', function() {
  var txt = document.getElementById('manualCmd').value.trim();
  if (!txt) return;
  processVoiceCommand(txt);
  document.getElementById('manualCmd').value = '';
});

document.getElementById('manualCmd').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    var txt = this.value.trim();
    if (!txt) return;
    processVoiceCommand(txt);
    this.value = '';
  }
});

// ══════════════════════════════════════
// CHAINED COMMAND SPLITTING
// ══════════════════════════════════════
function splitChainedCommands(transcript) {
  if (pendingVoiceChoice) return [transcript];

  var lower = transcript.toLowerCase();
  if (/\b(attack|attacks|block|blocks|counter|counters?)\b/.test(lower)) {
    return [transcript];
  }

  var rawParts = transcript.split(/\s+and\s+/i);
  if (rawParts.length <= 1) return [transcript];

  var verbStart = /^(draw|draws|gain|gains|lose|loses|takes|take|discard|discards|cast|casts|play|plays|tap|untap|set|next|pass|poison|heal|comment|say|monarch|eliminate|undo)\b/i;
  var merged = [rawParts[0].trim()];

  for (var i = 1; i < rawParts.length; i++) {
    var part = rawParts[i].trim();
    if (verbStart.test(part)) {
      merged.push(part);
    } else {
      merged[merged.length - 1] += ' and ' + part;
    }
  }

  return merged.filter(function(part) { return part.length > 0; });
}

// ══════════════════════════════════════
// CARD NAME NORMALISATION
// Corrects common speech-recognition mishearings before hitting Scryfall
// ══════════════════════════════════════
var CARD_NAME_CORRECTIONS = {
  'planes': 'plains',
  'plain': 'plains',
  'island': 'island',
  'swamp': 'swamp',
  'mountains': 'mountain',
  'forests': 'forest',
  'lightening bolt': 'lightning bolt',
  'lightning balls': 'lightning bolt',
  'lighting bolt': 'lightning bolt',
  'counter spell': 'counterspell',
  'countrespell': 'counterspell',
  'sol ring': 'sol ring',
  'sole ring': 'sol ring',
  'sol rng': 'sol ring',
  'command tower': 'command tower',
  'arcane signet': 'arcane signet',
  'arkin signet': 'arcane signet',
  'swiftfoot boots': 'swiftfoot boots',
  'swift foot boots': 'swiftfoot boots',
  'lightning greaves': 'lightning greaves',
};

function normaliseCardName(name) {
  var lower = name.toLowerCase().trim();
  if (CARD_NAME_CORRECTIONS[lower]) return CARD_NAME_CORRECTIONS[lower];
  return lower;
}

// ══════════════════════════════════════
// SCRYFALL LOOKUP WITH CACHE
// ══════════════════════════════════════
var scryfallCache = {};

// Hardcoded basic lands — never need a network call
var BASIC_LANDS = {
  'plains':   { name: 'Plains',   type_line: 'Basic Land — Plains',   color_identity: ['W'], image_uris: { normal: 'https://cards.scryfall.io/normal/front/b/c/bc71ebdb-0b90-4dcd-82a5-7c1bf0e9e5b0.jpg' } },
  'island':   { name: 'Island',   type_line: 'Basic Land — Island',   color_identity: ['U'], image_uris: { normal: 'https://cards.scryfall.io/normal/front/8/8/88b99c03-6f9c-4f37-a933-b8b5571c04ae.jpg' } },
  'swamp':    { name: 'Swamp',    type_line: 'Basic Land — Swamp',    color_identity: ['B'], image_uris: { normal: 'https://cards.scryfall.io/normal/front/f/6/f6601bbe-88bc-4f71-8d0b-44f2e7d8e6e2.jpg' } },
  'mountain': { name: 'Mountain', type_line: 'Basic Land — Mountain', color_identity: ['R'], image_uris: { normal: 'https://cards.scryfall.io/normal/front/5/e/5e5e3ae7-e0b1-4c7c-a7d0-c11448fe3b8e.jpg' } },
  'forest':   { name: 'Forest',   type_line: 'Basic Land — Forest',   color_identity: ['G'], image_uris: { normal: 'https://cards.scryfall.io/normal/front/6/5/65f5d7b7-8b50-4913-b11c-2543dbf20e38.jpg' } },
};

async function lookupScryfall(cardName) {
  var normalised = normaliseCardName(cardName);

  // Basic land hardcodes — instant, no network
  if (BASIC_LANDS[normalised]) return BASIC_LANDS[normalised];

  // Check cache
  if (scryfallCache[normalised]) return scryfallCache[normalised];

  try {
    var url = 'https://api.scryfall.com/cards/named?fuzzy=' + encodeURIComponent(normalised);
    var resp = await fetch(url);
    if (!resp.ok) return null;
    var data = await resp.json();
    scryfallCache[normalised] = data;
    return data;
  } catch(e) {
    return null;
  }
}

async function processVoiceCommand(transcript) {
  setVoiceState('processing');
  var text = (transcript || '').trim();
  if (!text) {
    addVoiceAction('⚠ No command to process', true);
    setVoiceState('idle');
    return;
  }

  // Check for error recovery phrases
  if (text.match(/^(i meant|meant)\s+(\d+)/i)) {
    var newNum = parseInt(text.match(/\d+/)[0], 10);
    if (lastFailedParse && lastFailedParse.actions) {
      // Replace the number in the last failed command
      for (var i = 0; i < lastFailedParse.actions.length; i++) {
        var a = lastFailedParse.actions[i];
        if (a.type === 'life_change' || a.type === 'draw' || a.type === 'poison' || a.type === 'discard') {
          a.delta = (a.type === 'life_change' && a.delta < 0) ? -newNum : newNum;
          break;
        }
      }
      var correctedTranscript = lastFailedParse.transcript;
      lastFailedParse.actions[lastFailedParse.actions.length - 1].message = 'Corrected from "' + correctedTranscript + '"';
      executeActions(lastFailedParse.actions);
      displayActions(lastFailedParse.actions);
      pushActionHistory(lastFailedParse.actions);
      lastFailedParse = null;
      setVoiceState('idle');
      return;
    }
  }

  if (text.match(/^(i meant|meant)\s+(\w+)/i)) {
    var newName = text.match(/^(i meant|meant)\s+(\w+)/i)[2];
    if (lastFailedParse && lastFailedParse.actions) {
      var foundPlayer = extractPlayer(newName, getPlayerNames());
      if (foundPlayer) {
        // Replace player name in last failed command
        for (var i = 0; i < lastFailedParse.actions.length; i++) {
          var a = lastFailedParse.actions[i];
          if (a.player === undefined && a.type !== 'next_turn' && a.type !== 'log') {
            a.player = foundPlayer;
          }
        }
        lastFailedParse.actions[lastFailedParse.actions.length - 1].message = 'Corrected player to ' + foundPlayer;
        executeActions(lastFailedParse.actions);
        displayActions(lastFailedParse.actions);
        pushActionHistory(lastFailedParse.actions);
        lastFailedParse = null;
        setVoiceState('idle');
        return;
      }
    }
  }

  // Commentary shortcut: "say: ..." or "comment: ..."
  var commentMatch = text.match(/^(?:say|comment|commentary)[:\s]+(.+)/i);
  if (commentMatch) {
    broadcastCommentary(commentMatch[1].trim());
    if (voiceTranscript) voiceTranscript.textContent = '💬 "' + commentMatch[1].trim() + '"';
    addVoiceAction('💬 Commentary sent', false);
    setVoiceState('idle');
    return;
  }

  // Split chained commands (e.g., "Dani loses 5 life and draws 2 cards")
  var clauses = splitChainedCommands(text);
  var allActions = [];

  for (var c = 0; c < clauses.length; c++) {
    var clauseActions = parseGameCommand(clauses[c]);
    allActions = allActions.concat(clauseActions);
  }

  // Validate any add_card actions against Scryfall — reject if not a real card
  var hasCardActions = allActions.some(function(a) { return a.type === 'add_card'; });
  if (hasCardActions) {
    addVoiceAction('🔍 Looking up card...', false);
    var validated = [];
    for (var i = 0; i < allActions.length; i++) {
      var a = allActions[i];
      if (a.type === 'add_card') {
        var card = await lookupScryfall(a.cardName);
        if (card && card.name) {
          a.cardName = card.name; // Use canonical Scryfall name
          a.imageUrl = (card.image_uris && card.image_uris.normal) || '';
          validated.push(a);
          validated.push({ type: 'log', message: '✓ ' + a.player + ' played ' + card.name });
        } else {
          validated.push({ type: 'log', message: '❌ "' + a.cardName + '" not in Scryfall — use manual entry' });
        }
        // Remove the auto-generated log for this card if it follows
        if (i + 1 < allActions.length && allActions[i + 1].type === 'log' && allActions[i + 1].message.includes(a.cardName)) {
          i++; // skip it, we added our own above
        }
      } else {
        validated.push(a);
      }
    }
    allActions = validated;
  }

  runParsedActions(allActions, text);
}

function showConfirmationWindow(actions, transcript) {
  // Create a temporary confirmation dialog
  var dialog = document.createElement('div');
  dialog.className = 'voice-confirm-dialog';
  dialog.style.cssText = `
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(20,20,30,0.95);
    border: 2px solid #4a9eff;
    border-radius: 8px;
    padding: 16px;
    color: #fff;
    font-family: monospace;
    font-size: 14px;
    z-index: 10000;
    max-width: 300px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    animation: slideUp 0.3s ease;
  `;

  // Display what was recognized
  var actionText = '';
  for (var i = 0; i < actions.length; i++) {
    if (actions[i].type === 'log') {
      actionText = actions[i].message;
      break;
    }
  }

  dialog.innerHTML = `
    <div style="margin-bottom: 12px; color: #4a9eff;">Confirm:</div>
    <div style="margin-bottom: 12px; padding: 8px; background: rgba(74,158,255,0.1); border-left: 2px solid #4a9eff;">
      ${actionText}
    </div>
    <div style="display: flex; gap: 8px; font-size: 12px;">
      <button id="confirmYes" style="flex:1; padding: 8px; background: #00aa44; border: none; border-radius: 4px; color: #fff; cursor: pointer; font-weight: bold;">✓ Confirm</button>
      <button id="confirmNo" style="flex:1; padding: 8px; background: #aa0000; border: none; border-radius: 4px; color: #fff; cursor: pointer; font-weight: bold;">✗ Cancel</button>
    </div>
    <div style="margin-top: 8px; font-size: 11px; color: #888;">Auto-confirm in <span id="countdown">2</span>s</div>
  `;

  document.body.appendChild(dialog);

  var confirmed = false;
  var autoConfirmTimer = null;
  var countdown = 2;

  var onConfirm = function() {
    if (confirmed) return;
    confirmed = true;
    clearInterval(autoConfirmTimer);
    document.body.removeChild(dialog);
    executeActions(actions);
    displayActions(actions);
    pushActionHistory(actions);
    setVoiceState('idle');
  };

  var onCancel = function() {
    if (confirmed) return;
    confirmed = true;
    clearInterval(autoConfirmTimer);
    document.body.removeChild(dialog);
    addVoiceAction('❌ Command cancelled', false);
    setVoiceState('idle');
  };

  document.getElementById('confirmYes').addEventListener('click', onConfirm);
  document.getElementById('confirmNo').addEventListener('click', onCancel);

  // Auto-confirm after 2 seconds
  autoConfirmTimer = setInterval(function() {
    countdown--;
    var el = document.getElementById('countdown');
    if (el) el.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(autoConfirmTimer);
      onConfirm();
    }
  }, 1000);
}

function displayActions(actions) {
  voiceActionList.innerHTML = '';
  var hasError = false;
  actions.forEach(function(a) {
    if (a.type === 'log' && a.message.startsWith('❌')) {
      hasError = true;
      lastFailedParse = { transcript: voiceTranscript.textContent, actions: actions };
      playSound('voice-failed', 0.7);
    }
    var el = document.createElement('div');
    el.className = 'voice-action-item';
    el.textContent = actionToString(a);
    if (a.message && a.message.startsWith('❌')) {
      el.style.color = 'rgba(255,100,100,0.8)';
    }
    voiceActionList.appendChild(el);
  });

  if (pendingVoiceChoice) {
    renderPendingChoiceUI();
    return;
  }
  
  // Play success sound if no errors
  if (!hasError && actions.length > 0) {
    playSound('voice-confirmed', 0.6);
  }
}

function addVoiceAction(msg, isError) {
  var el = document.createElement('div');
  el.className = 'voice-action-item';
  if (isError) el.style.color = 'rgba(255,100,100,0.7)';
  el.textContent = msg;
  voiceActionList.appendChild(el);
}

function actionToString(a) {
  switch(a.type) {
    case 'life_change': return (a.delta > 0 ? '+' : '') + a.delta + ' life → ' + a.player;
    case 'set_life': return a.player + ' set to ' + a.life + ' life';
    case 'add_card': return 'Add ' + a.cardName + ' to ' + a.player + "'s " + a.zone;
    case 'move_card': return a.cardName + ': ' + a.fromZone + ' → ' + a.toZone;
    case 'tap_card': return (a.tapped ? 'Tap' : 'Untap') + ' ' + a.cardName + ' (' + a.player + ')';
    case 'add_counter': return '+' + (a.amount || 1) + '/+' + (a.amount || 1) + ' on ' + a.cardName;
    case 'next_turn': return 'Next turn';
    case 'next_phase': return 'Next phase';
    case 'set_phase': return 'Set phase: ' + (a.phase || '?');
    case 'draw': return a.player + ' draws ' + a.count;
    case 'discard': return a.player + ' discards ' + a.count;
    case 'poison': return a.player + ' gets poison +' + a.delta;
    case 'eliminate': return '⚰ ' + a.player + ' is eliminated';
    case 'combat': return '⚔ ' + a.attacker.cardName + ' attacks ' + a.defender.player;
    case 'combat_start': return '⚔ Enter combat: ' + a.attackerPlayer + ' attacking ' + a.defenderPlayer;
    case 'combat_add_attacker': return '⚔ ' + a.cardName + ' attacks ' + a.defenderPlayer;
    case 'combat_declare_attackers': return 'Declare attackers';
    case 'combat_add_blocker': return '🛡 ' + a.blockerCardName + ' blocks ' + a.attackerCardName;
    case 'combat_no_blockers': return 'No blockers';
    case 'combat_resolve': return 'Resolve combat';
    case 'combat_end': return 'End combat';
    case 'add_token': return 'Create ' + (a.quantity||1) + 'x ' + a.tokenName + ' token';
    case 'log': return a.message;
    default: return a.type;
  }
}

// ══════════════════════════════════════
// ACTION EXECUTOR — bridges to Dart via localStorage
// ══════════════════════════════════════
function executeActions(actions) {
  // Write command to localStorage — Dart polls and executes
  var cmd = { id: Date.now(), actions: actions };
  localStorage.setItem('mtg_voice_cmd', JSON.stringify(cmd));
  // Also update spectator directly for zero-lag display
  updateSpectatorFromActions(actions);
  
  // Play sounds for actions
  for (var i = 0; i < actions.length; i++) {
    var a = actions[i];
    switch(a.type) {
      case 'life_change':
        if (a.delta < 0) {
          var damage = Math.abs(a.delta);
          if (damage <= 4) {
            playSound('life-loss-small', 0.7);
          } else if (damage <= 9) {
            playSound('life-loss-medium', 0.8);
          } else {
            playSound('life-loss-large', 0.9);
          }
        } else {
          playSound('life-gain', 0.8);
        }
        // Switch to tense music if someone is low on life
        if (a.delta < 0) {
          var state = getGameState();
          var p = state.players && findPlayerInState(state.players, a.player);
          if (p && (p.life - Math.abs(a.delta)) < 10) {
            switchMusicState(true);
          }
        }
        break;
      case 'set_life':
        playSound('life-gain', 0.6);
        break;
      case 'poison':
        playSound('poison', 0.8);
        break;
      case 'draw':
        playSound('draw-card', 0.8);
        break;
      case 'discard':
        playSound('card-tap', 0.45);
        break;
      case 'add_card':
        playSound('card-play', 0.85);
        break;
      case 'next_turn':
        playSound('next-turn', 0.8, sounds['next-turn'] ? sounds['next-turn'].duration / 2 : undefined);
        break;
      case 'next_phase':
      case 'set_phase':
        playSound('next-turn', 0.7, sounds['next-turn'] ? sounds['next-turn'].duration / 2 : undefined);
        break;
      case 'combat_start':
      case 'combat_declare_attackers':
      case 'combat':
        playSound('combat-start', 0.9);
        switchMusicState(true);
        break;
      case 'tap_card':
        playSound('card-tap', 0.6);
        break;
      case 'add_counter':
        playSound('life-gain', 0.4);
        break;
      case 'eliminate':
        playSound('elimination', 1.0);
        break;
      case 'set_monarch':
        playSound('monarch-change', 0.9);
        break;
      case 'add_token':
        playSound('card-play', 0.6);
        break;
      case 'undo':
        playSound('undo', 0.8);
        break;
    }
  }
}

function findPlayerInState(statePlayers, nameStr) {
  if (!nameStr || !statePlayers) return null;
  var lower = nameStr.toLowerCase();
  // Exact first
  var exact = statePlayers.find(function(p){ return p.name.toLowerCase() === lower; });
  if (exact) return exact;
  // Fuzzy fallback
  var best = null, bestScore = 0.55;
  statePlayers.forEach(function(p) {
    var score = similarity(p.name.toLowerCase(), lower);
    if (phoneticRoot(p.name.toLowerCase()) === phoneticRoot(lower)) score = Math.max(score, 0.85);
    if (score > bestScore) { bestScore = score; best = p; }
  });
  return best;
}

function findCardInState(state, playerName, cardId, cardName) {
  var player = findPlayerInState(state.players || [], playerName);
  if (!player || !player.cards) return null;

  if (cardId) {
    var byId = player.cards.find(function(card) {
      return (card.id || '').toString() === cardId.toString();
    });
    if (byId) return byId;
  }

  if (!cardName) return null;
  return player.cards.find(function(card) {
    return (card.name || '').toLowerCase().indexOf(cardName.toLowerCase()) >= 0;
  }) || null;
}

function updateSpectatorFromActions(actions) {
  var stateRaw = localStorage.getItem('mtg_spectator');
  if (!stateRaw) return;
  var state;
  try { state = JSON.parse(stateRaw); } catch(e) { return; }

  function zoneConsumesHand(zone) {
    var z = (zone || '').toString().toLowerCase();
    return z === 'battlefield' || z === 'graveyard' || z === 'exile' || z === 'stack' || z === 'command';
  }

  function adjustHand(player, delta) {
    if (!player) return;
    var current = parseInt(player.handSize, 10);
    if (isNaN(current)) current = 7;
    player.handSize = Math.max(0, current + delta);
  }

  if (!state.combatState) {
    state.combatState = {
      active: false,
      phase: 'idle',
      attackerPlayer: '',
      defenderPlayer: '',
      attackers: []
    };
  }

  actions.forEach(function(a) {
    switch(a.type) {
      case 'life_change': {
        var p = findPlayerInState(state.players, a.player);
        if (p) p.life = (p.life || 0) + a.delta;
        break;
      }
      case 'add_card': {
        var p = findPlayerInState(state.players, a.player);
        if (p) {
          if (!p.cards) p.cards = [];
          var cardType = guessType(a.cardName);
          var zone = a.zone || 'battlefield';
          p.cards.push({
            id: 'v_' + Date.now() + '_' + Math.random(),
            name: a.cardName, type: cardType,
            zone: zone, tapped: false,
            power: null, toughness: null, keywords: [],
            counters: 0, art: getArtEmoji(a.cardName, cardType),
            landColor: getLandColor(a.cardName),
            imageUrl: a.imageUrl || '',
          });
          if (zoneConsumesHand(zone)) adjustHand(p, -1);
        }
        break;
      }
      case 'draw': {
        var p = findPlayerInState(state.players, a.player);
        if (p) adjustHand(p, parseInt(a.count, 10) || 1);
        break;
      }
      case 'discard': {
        var p = findPlayerInState(state.players, a.player);
        if (p) adjustHand(p, -(parseInt(a.count, 10) || 1));
        break;
      }
      case 'move_card': {
        var p = findPlayerInState(state.players, a.player);
        if (p && p.cards) {
          var card = p.cards.find(function(c){ return c.name.toLowerCase().includes(a.cardName.toLowerCase()); });
          var toZone = a.toZone || '';
          var fromZone = a.fromZone || '';
          if (card) {
            fromZone = fromZone || card.zone || '';
            card.zone = toZone;
          }
          var fromHand = (fromZone || '').toLowerCase() === 'hand';
          var toHand = (toZone || '').toLowerCase() === 'hand';
          if (fromHand && !toHand) adjustHand(p, -1);
          else if (toHand && !fromHand) adjustHand(p, 1);
        }
        break;
      }
      case 'combat': {
        var defP = findPlayerInState(state.players, a.defender.player);
        if (defP && a.damage) defP.life = (defP.life || 0) - a.damage;
        if (a.attackerDies) {
          var atkP = findPlayerInState(state.players, a.attacker.player);
          if (atkP && atkP.cards) {
            var card = atkP.cards.find(function(c){ return c.name.toLowerCase().includes(a.attacker.cardName.toLowerCase()); });
            if (card) card.zone = 'graveyard';
          }
        }
        if (a.blockerDies && a.blockerName) {
          var defCards = defP && defP.cards;
          if (defCards) {
            var blk = defCards.find(function(c){ return c.name.toLowerCase().includes(a.blockerName.toLowerCase()); });
            if (blk) blk.zone = 'graveyard';
          }
        }
        break;
      }
      case 'add_token': {
        var p = findPlayerInState(state.players, a.player);
        if (p) {
          if (!p.cards) p.cards = [];
          for (var i = 0; i < (a.quantity || 1); i++) {
            p.cards.push({
              id: 'tok_' + Date.now() + '_' + i,
              name: a.tokenName + ' Token', type: 'creature',
              zone: 'battlefield', tapped: false,
              power: a.power || 1, toughness: a.toughness || 1,
              keywords: [], counters: 0, art: '🌱', isToken: true,
            });
          }
        }
        break;
      }
      case 'next_turn': {
        state.turn = (state.turn || 1) + 1;
        state.phaseIndex = 0;
        state.phase = 'Draw';
        if (state.players && state.players.length > 0) {
          var currentName = (state.currentPlayer || '').toLowerCase();
          var currIdx = state.players.findIndex(function(p) {
            return (p.name || '').toLowerCase() === currentName;
          });
          if (currIdx < 0) currIdx = 0;
          currIdx = (currIdx + 1) % state.players.length;
          state.currentPlayer = state.players[currIdx].name;
        }
        break;
      }
      case 'next_phase': {
        var phaseIdx = parseInt(state.phaseIndex, 10);
        if (isNaN(phaseIdx)) phaseIdx = 0;
        phaseIdx = (phaseIdx + 1) % 4;
        state.phaseIndex = phaseIdx;
        state.phase = ['Draw', 'Main', 'Combat', 'End'][phaseIdx];
        break;
      }
      case 'set_phase': {
        var phaseName = (a.phase || '').toString().toLowerCase();
        var map = { draw: 0, main: 1, combat: 2, end: 3 };
        if (Object.prototype.hasOwnProperty.call(map, phaseName)) {
          state.phaseIndex = map[phaseName];
          state.phase = ['Draw', 'Main', 'Combat', 'End'][map[phaseName]];
        }
        break;
      }
      case 'set_monarch': {
        state.players.forEach(function(p){ p.isMonarch = (p.name.toLowerCase() === a.player.toLowerCase()); });
        break;
      }
      case 'set_active_player': {
        state.currentPlayer = a.player;
        break;
      }
      case 'set_format': {
        state.format = (a.format || 'Normal').charAt(0).toUpperCase() + (a.format || 'Normal').slice(1);
        if (a.life && !isNaN(a.life)) {
          state.turn = state.turn || 1;
          state.players.forEach(function(p){ p.life = Number(a.life); });
        }
        break;
      }
      case 'log': {
        if (!state.log) state.log = [];
        state.log.unshift(a.message);
        if (state.log.length > 20) state.log.pop();
        break;
      }
      case 'poison': {
        var p = findPlayerInState(state.players, a.player);
        if (p) p.poison = Math.max(0, (p.poison || 0) + a.delta);
        break;
      }
      case 'commander_damage': {
        var defP = findPlayerInState(state.players, a.to);
        if (defP) {
          if (!defP.commanderDamage) defP.commanderDamage = {};
          var fromIdx = -1;
          state.players.forEach(function(p, idx) { if (findPlayerInState([p], a.from)) fromIdx = idx; });
          if (fromIdx >= 0) defP.commanderDamage[fromIdx] = (defP.commanderDamage[fromIdx] || 0) + a.damage;
        }
        break;
      }
      case 'draw': {
        var p = findPlayerInState(state.players, a.player);
        if (p) p.hand = (p.hand || 0) + (a.count || 1);
        break;
      }
      case 'discard': {
        var p = findPlayerInState(state.players, a.player);
        if (p) p.hand = Math.max(0, (p.hand || 0) - (a.count || 1));
        break;
      }
      case 'set_life': {
        var p = findPlayerInState(state.players, a.player);
        if (p) p.life = a.life || 20;
        break;
      }
      case 'add_counter': {
        var p = findPlayerInState(state.players, a.player);
        var card = findCardInState(state, a.player, a.cardId, a.cardName);
        if (p && card) {
          card.counters = (card.counters || 0) + (a.amount || 1);
        }
        break;
      }
      case 'eliminate': {
        var p = findPlayerInState(state.players, a.player);
        if (p) p.eliminated = true;
        break;
      }
      case 'tap_card': {
        var p = findPlayerInState(state.players, a.player);
        if (p && p.cards) {
          var card = findCardInState(state, a.player, a.cardId, a.cardName);
          if (card) card.tapped = a.tapped;
        }
        break;
      }
      case 'combat_start': {
        state.combatState = {
          active: true,
          phase: 'declaring_attackers',
          attackerPlayer: a.attackerPlayer,
          defenderPlayer: a.defenderPlayer,
          attackers: []
        };
        break;
      }
      case 'combat_add_attacker': {
        if (!state.combatState || !state.combatState.active) {
          state.combatState = {
            active: true,
            phase: 'declaring_attackers',
            attackerPlayer: a.attackerPlayer,
            defenderPlayer: a.defenderPlayer,
            attackers: []
          };
        }
        var attackerCard = findCardInState(state, a.attackerPlayer, a.cardId, a.cardName);
        if (attackerCard) {
          attackerCard.attacking = true;
          var exists = state.combatState.attackers.find(function(entry) {
            return (entry.cardId || '') === (attackerCard.id || '');
          });
          if (!exists) {
            state.combatState.attackers.push({
              player: a.attackerPlayer,
              defenderPlayer: a.defenderPlayer,
              cardId: attackerCard.id,
              cardName: attackerCard.name,
              blockers: []
            });
          }
        }
        break;
      }
      case 'combat_declare_attackers': {
        if (state.combatState) {
          state.combatState.phase = 'declaring_blockers';
          (state.combatState.attackers || []).forEach(function(entry) {
            var combatCard = findCardInState(state, entry.player, entry.cardId, entry.cardName);
            if (combatCard) combatCard.tapped = true;
          });
        }
        break;
      }
      case 'combat_add_blocker': {
        if (state.combatState && state.combatState.attackers) {
          var attackerEntry = state.combatState.attackers.find(function(entry) {
            return (entry.cardId || '') === (a.attackerCardId || '');
          });
          var blockerCard = findCardInState(state, a.blockerPlayer, a.blockerCardId, a.blockerCardName);
          if (attackerEntry && blockerCard) {
            attackerEntry.blockers = attackerEntry.blockers || [];
            attackerEntry.blockers.push({
              player: a.blockerPlayer,
              cardId: blockerCard.id,
              cardName: blockerCard.name
            });
          }
        }
        break;
      }
      case 'combat_no_blockers': {
        if (state.combatState) state.combatState.phase = 'damage_resolution';
        break;
      }
      case 'combat_resolve': {
        if (state.combatState) state.combatState.phase = 'results';
        break;
      }
      case 'combat_end': {
        (state.players || []).forEach(function(player) {
          (player.cards || []).forEach(function(card) {
            card.attacking = false;
          });
        });
        state.combatState = {
          active: false,
          phase: 'idle',
          attackerPlayer: '',
          defenderPlayer: '',
          attackers: []
        };
        break;
      }
    }
  });

  localStorage.setItem('mtg_spectator', JSON.stringify(state));
  // Trigger storage event for spectator tab
  localStorage.setItem('mtg_spectator_ts', Date.now().toString());
}

function guessType(name) {
  var n = name.toLowerCase();
  if (n.includes('forest')||n.includes('island')||n.includes('plains')||n.includes('swamp')||n.includes('mountain')) return 'land';
  if (n.includes('ring')||n.includes('sword')||n.includes('staff')||n.includes('sol ring')) return 'artifact';
  if (n.includes('bolt')||n.includes('counterspell')||n.includes('path')) return 'instant';
  return 'creature';
}

function getLandColor(name) {
  var n = name.toLowerCase();
  if (n.includes('forest')) return 'G';
  if (n.includes('island')) return 'U';
  if (n.includes('plains')) return 'W';
  if (n.includes('swamp')) return 'B';
  if (n.includes('mountain')) return 'R';
  return 'C';
}

function getArtEmoji(name, type) {
  var n = name.toLowerCase();
  if (n.includes('dragon')) return '🐉';
  if (n.includes('angel')) return '👼';
  if (n.includes('zombie')) return '💀';
  if (n.includes('goblin')) return '👺';
  if (n.includes('lightning')) return '⚡';
  if (n.includes('wolf')) return '🐺';
  if (n.includes('elf')) return '🌿';
  if (n.includes('sol ring')) return '💍';
  var arts = {creature:'⚔',land:'🏔',artifact:'⚙',enchantment:'✦',planeswalker:'★',instant:'💫',sorcery:'🌀'};
  return arts[type] || '🃏';
}

// ══════════════════════════════════════
// LIVE COMMENTARY BROADCAST
// ══════════════════════════════════════
function broadcastCommentary(text) {
  if (!text) return;
  localStorage.setItem('mtg_commentary', text);
  var el = document.getElementById('commentaryInput');
  if (el) el.value = '';
}

document.getElementById('commentaryBtn').addEventListener('click', function() {
  broadcastCommentary(document.getElementById('commentaryInput').value.trim());
});

document.getElementById('commentaryInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') broadcastCommentary(this.value.trim());
});

// ══════════════════════════════════════
// SYNC STATUS
// ══════════════════════════════════════
var lastSync = '';
setInterval(function() {
  var raw = localStorage.getItem('mtg_spectator') || '';
  if (raw !== lastSync) {
    lastSync = raw;
    var el = document.getElementById('syncStatus');
    el.textContent = '● SYNCING'; el.style.color = 'rgba(68,255,136,0.9)';
    setTimeout(function(){ el.textContent='● SYNC OK'; el.style.color='rgba(68,255,136,0.4)'; }, 800);
  }
}, 500);
