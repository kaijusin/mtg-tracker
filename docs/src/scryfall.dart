part of '../main.dart';

// ════════════════════════════════════════════════════════════
// SCRYFALL API
// ════════════════════════════════════════════════════════════

Future<List<Map<String, dynamic>>> _scryfallSearch(String query) async {
  if (query.trim().isEmpty) return [];
  try {
    String url = 'https://api.scryfall.com/cards/search?q=${Uri.encodeComponent(query)}&limit=5&unique=cards';
    HttpRequest req = await HttpRequest.request(url, method: 'GET', requestHeaders: {'Accept': 'application/json'});
    if (req.status != 200) return [];
    Map<String, dynamic> data = jsonDecode(req.responseText ?? '{}');
    List cards = data['data'] as List? ?? [];
    return cards.take(5).map((c) => Map<String, dynamic>.from(c as Map)).toList();
  } catch (_) {
    return [];
  }
}

// Hardcoded basic lands — no network call ever needed
final Map<String, Map<String, dynamic>> _basicLands = {
  'plains':   { 'name': 'Plains',   'type_line': 'Basic Land — Plains',   'color_identity': ['W'], 'image_uris': { 'normal': 'https://cards.scryfall.io/normal/front/b/c/bc71ebdb-0b90-4dcd-82a5-7c1bf0e9e5b0.jpg' }, 'keywords': [], 'mana_cost': '' },
  'island':   { 'name': 'Island',   'type_line': 'Basic Land — Island',   'color_identity': ['U'], 'image_uris': { 'normal': 'https://cards.scryfall.io/normal/front/8/8/88b99c03-6f9c-4f37-a933-b8b5571c04ae.jpg' }, 'keywords': [], 'mana_cost': '' },
  'swamp':    { 'name': 'Swamp',    'type_line': 'Basic Land — Swamp',    'color_identity': ['B'], 'image_uris': { 'normal': 'https://cards.scryfall.io/normal/front/f/6/f6601bbe-88bc-4f71-8d0b-44f2e7d8e6e2.jpg' }, 'keywords': [], 'mana_cost': '' },
  'mountain': { 'name': 'Mountain', 'type_line': 'Basic Land — Mountain', 'color_identity': ['R'], 'image_uris': { 'normal': 'https://cards.scryfall.io/normal/front/5/e/5e5e3ae7-e0b1-4c7c-a7d0-c11448fe3b8e.jpg' }, 'keywords': [], 'mana_cost': '' },
  'forest':   { 'name': 'Forest',   'type_line': 'Basic Land — Forest',   'color_identity': ['G'], 'image_uris': { 'normal': 'https://cards.scryfall.io/normal/front/6/5/65f5d7b7-8b50-4913-b11c-2543dbf20e38.jpg' }, 'keywords': [], 'mana_cost': '' },
};

final Map<String, Map<String, dynamic>> _scryfallCache = {};

Future<Map<String, dynamic>?> _scryfallNamed(String name) async {
  final key = name.toLowerCase().trim();

  // Basic land shortcut
  if (_basicLands.containsKey(key)) return _basicLands[key];

  // Cache hit
  if (_scryfallCache.containsKey(key)) return _scryfallCache[key];

  try {
    String url = 'https://api.scryfall.com/cards/named?fuzzy=${Uri.encodeComponent(name)}';
    HttpRequest req = await HttpRequest.request(url, method: 'GET', requestHeaders: {'Accept': 'application/json'});
    if (req.status != 200) return null;
    final result = Map<String, dynamic>.from(jsonDecode(req.responseText ?? '{}') as Map);
    _scryfallCache[key] = result;
    return result;
  } catch (_) {
    return null;
  }
}

Map<String, dynamic> _parseScryfall(Map<String, dynamic> data) {
  String typeLine = (data['type_line'] ?? '').toString().toLowerCase();
  String oracleText = (data['oracle_text'] ?? '').toString();

  String type = 'creature';
  if (typeLine.contains('planeswalker')) type = 'planeswalker';
  else if (typeLine.contains('artifact')) type = 'artifact';
  else if (typeLine.contains('enchantment')) type = 'enchantment';
  else if (typeLine.contains('land')) type = 'land';
  else if (typeLine.contains('instant')) type = 'instant';
  else if (typeLine.contains('sorcery')) type = 'sorcery';

  List<String> supertypes = [];
  if (typeLine.contains('legendary')) supertypes.add('Legendary');
  if (typeLine.contains('basic')) supertypes.add('Basic');

  String subtype = '';
  String rawType = (data['type_line'] ?? '').toString();
  if (rawType.contains('—')) subtype = rawType.split('—').last.trim();

  List<String> keywords = [];
  if (data['keywords'] is List) {
    keywords = (data['keywords'] as List).map((k) => k.toString()).toList();
  }

  int? power;
  int? toughness;
  if (data['power'] != null) power = int.tryParse(data['power'].toString());
  if (data['toughness'] != null) toughness = int.tryParse(data['toughness'].toString());

  int? loyalty;
  if (data['loyalty'] != null) loyalty = int.tryParse(data['loyalty'].toString());

  String? imageUrl;
  if (data['image_uris'] is Map) {
    imageUrl = (data['image_uris'] as Map)['normal']?.toString();
  }

  String manaCost = (data['mana_cost'] ?? '').toString();

  List<String> colors = [];
  if (data['color_identity'] is List) {
    colors = (data['color_identity'] as List).map((c) => c.toString()).toList();
  }

  List<Map<String, String>> triggers = _extractTriggers(oracleText);
  String globalEffect = _extractGlobalEffect(oracleText);

  // Land color
  String landColor = 'C';
  if (type == 'land') {
    String ln = (data['name'] ?? '').toString().toLowerCase();
    if (ln.contains('forest')) landColor = 'G';
    else if (ln.contains('island')) landColor = 'U';
    else if (ln.contains('plains')) landColor = 'W';
    else if (ln.contains('swamp')) landColor = 'B';
    else if (ln.contains('mountain')) landColor = 'R';
    else if (colors.isNotEmpty) landColor = colors.first;
  }

  return {
    'type': type, 'subtype': subtype, 'supertypes': supertypes,
    'keywords': keywords, 'power': power, 'toughness': toughness,
    'loyalty': loyalty, 'imageUrl': imageUrl, 'oracleText': oracleText,
    'manaCost': manaCost, 'colors': colors, 'triggers': triggers,
    'globalEffect': globalEffect, 'landColor': landColor,
  };
}

List<Map<String, String>> _extractTriggers(String oracleText) {
  List<Map<String, String>> found = [];
  String lower = oracleText.toLowerCase();
  for (var pattern in kTriggerPatterns) {
    if (lower.contains(pattern['pattern']!)) {
      for (var sentence in oracleText.split('\n')) {
        if (sentence.toLowerCase().contains(pattern['pattern']!)) {
          found.add({'phase': pattern['phase']!, 'text': sentence.trim(), 'plain': pattern['plain']!});
          break;
        }
      }
    }
  }
  return found;
}

String _extractGlobalEffect(String oracleText) {
  for (var line in oracleText.split('\n')) {
    String lower = line.toLowerCase();
    if (lower.contains('all creatures') || lower.contains('each creature') ||
        lower.contains('creatures you control') || lower.contains('creatures your opponents control')) {
      return line.trim();
    }
  }
  return '';
}

// ════════════════════════════════════════════════════════════
// MANA SYMBOLS
// ════════════════════════════════════════════════════════════

Future<void> loadManaSymbols() async {
  if (_symbolsLoaded) return;
  try {
    HttpRequest req = await HttpRequest.request('https://api.scryfall.com/symbology', method: 'GET', requestHeaders: {'Accept': 'application/json'});
    if (req.status != 200) return;
    final data = jsonDecode(req.responseText ?? '{}') as Map<String, dynamic>;
    final list = data['data'] as List? ?? [];
    for (final sym in list) {
      final raw = (sym['symbol'] as String? ?? '');
      final key = raw.replaceAll('{', '').replaceAll('}', '').toUpperCase();
      final uri = sym['svg_uri'] as String? ?? '';
      if (key.isNotEmpty && uri.isNotEmpty) _symbolUriMap[key] = uri;
    }
    _symbolsLoaded = true;
  } catch (_) {}
}

DivElement buildManaPips(String manaCost, {double size = 20}) {
  final row = DivElement()..className = 'mana-pip-row';
  if (manaCost.trim().isEmpty) return row;
  final regex = RegExp(r'\{([^}]+)\}');
  for (final match in regex.allMatches(manaCost.toUpperCase())) {
    final pip = match.group(1) ?? '';
    final uri = _symbolUriMap[pip];
    if (uri != null && uri.isNotEmpty) {
      row.append(ImageElement()
        ..src = uri
        ..alt = pip
        ..title = pip
        ..className = 'mana-pip-img'
        ..style.width = '${size}px'
        ..style.height = '${size}px');
    } else {
      const fg = {'W': '#7a7020', 'U': '#1a4060', 'B': '#ccaaff', 'R': '#fff0e0', 'G': '#88ffaa', 'C': '#eee', 'X': '#4a3810'};
      const bg = {'W': '#f9f6d5', 'U': '#b8d8f0', 'B': '#3a2a4a', 'R': '#e87040', 'G': '#2a6030', 'C': '#888', 'X': '#c8b880'};
      final f = fg[pip] ?? '#aaa';
      final b = bg[pip] ?? '#333';
      final el = SpanElement()..text = pip..title = pip;
      el.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:$b;color:$f;font-size:${size * 0.55}px;font-weight:700;font-family:Georgia,serif;flex-shrink:0;margin-right:1px;';
      row.append(el);
    }
  }
  return row;
}
