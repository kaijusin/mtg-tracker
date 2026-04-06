part of '../main.dart';

// ════════════════════════════════════════════════════════════
// SETUP SCREEN
// ════════════════════════════════════════════════════════════

void buildSetupScreen() {
  _currentView = AppView.setup;
  _cancelTimer();
  DivElement? setup = querySelector('#setup-screen') as DivElement?;
  if (setup == null) return;
  setup.children.clear();

  DivElement hero = DivElement()..className = 'setup-hero';
  hero.append(HeadingElement.h1()..text = '⚔️ MTG Tracker'..className = 'setup-hero-title');
  hero.append(ParagraphElement()..text = 'AI-POWERED GAME TRACKER'..className = 'setup-hero-sub');
  setup.append(hero);

  DivElement content = DivElement()..className = 'setup-content';

  // Format
  content.append(ParagraphElement()..className = 'row-label'..text = 'Format');
  DivElement ft = DivElement()..className = 'format-toggle';

  ButtonElement nb = ButtonElement()..id = 'fmt-normal'..className = 'fmt-opt';
  nb.innerHtml = '<span class="fmt-name">Standard</span><span class="fmt-sub">20 life</span>';

  ButtonElement cb = ButtonElement()..id = 'fmt-commander'..className = 'fmt-opt fmt-opt-active';
  cb.innerHtml = '<span class="fmt-name">Commander</span><span class="fmt-sub">40 life · cmd damage</span>';

  void updateLife() {
    InputElement? el = querySelector('#custom-life-input') as InputElement?;
    if (el != null) el.value = isCommander ? '40' : '20';
  }

  nb.onClick.listen((_) {
    isCommander = false;
    startingLife = 20;
    nb.className = 'fmt-opt fmt-opt-active';
    cb.className = 'fmt-opt';
    updateLife();
    buildNameInputs(_currentSetupCount());
  });
  cb.onClick.listen((_) {
    isCommander = true;
    startingLife = 40;
    nb.className = 'fmt-opt';
    cb.className = 'fmt-opt fmt-opt-active';
    updateLife();
    buildNameInputs(_currentSetupCount());
  });
  isCommander = true;
  startingLife = 40;
  ft..append(nb)..append(cb);
  content.append(ft);

  // Custom life
  content.append(ParagraphElement()..className = 'row-label'..text = 'Starting Life');
  DivElement lc = DivElement()..className = 'count-control';
  InputElement li = InputElement(type: 'number')
    ..id = 'custom-life-input'
    ..value = '40'
    ..className = 'life-number-input';
  li.onInput.listen((_) {
    int v = int.tryParse(li.value ?? '40') ?? 40;
    if (v > 0) startingLife = v;
  });
  lc.append(li);
  content.append(lc);

  // Player count
  content.append(ParagraphElement()..className = 'row-label'..text = 'Players');
  DivElement cc = DivElement()..className = 'count-control';
  ButtonElement mb = ButtonElement()..text = '−'..className = 'count-side';
  DivElement cm = DivElement()..id = 'count-mid'..className = 'count-mid'..text = '2 players';
  InputElement ci = InputElement(type: 'hidden')..id = 'player-count'..value = '2';
  ButtonElement pb = ButtonElement()..text = '+'..className = 'count-side';
  mb.onClick.listen((_) {
    int c = int.tryParse(ci.value ?? '2') ?? 2;
    if (c > 2) { c--; ci.value = '$c'; cm.text = '$c players'; buildNameInputs(c); }
  });
  pb.onClick.listen((_) {
    int c = int.tryParse(ci.value ?? '2') ?? 2;
    if (c < 6) { c++; ci.value = '$c'; cm.text = '$c players'; buildNameInputs(c); }
  });
  cc..append(mb)..append(cm)..append(pb)..append(ci);
  content.append(cc);

  DivElement nb2 = DivElement()..className = 'setup-player-list'..id = 'name-inputs-box';
  content.append(nb2);
  setup.append(content);
  buildNameInputs(2);

  DivElement sa = DivElement()..className = 'setup-start-area';
  ButtonElement sb = ButtonElement()..id = 'start-btn'..text = 'Start Game ▶';
  sb.onClick.listen((_) => startGame());
  sa.append(sb);
  setup.append(sa);

  // Voice hint
  DivElement hint = DivElement()
    ..className = 'setup-voice-hint'
    ..innerHtml = '🎤 <strong>Voice-powered:</strong> After starting, tap the microphone to control the game hands-free with AI';
  setup.append(hint);
}

int _currentSetupCount() {
  InputElement? el = querySelector('#player-count') as InputElement?;
  return int.tryParse(el?.value ?? '2') ?? 2;
}

// ════════════════════════════════════════════════════════════
// NAME INPUTS
// ════════════════════════════════════════════════════════════

void buildNameInputs(int count) {
  DivElement? nb = querySelector('#name-inputs-box') as DivElement?;
  if (nb == null) return;
  nb.children.clear();

  for (int i = 0; i < count; i++) {
    final int idx = i;
    DivElement card = DivElement()..id = 'player-card-$i'..className = 'setup-player-card';
    DivElement av = DivElement()..id = 'avatar-$i'..className = 'player-avatar'..text = '?';
    DivElement info = DivElement()..className = 'player-info';
    SpanElement iname = SpanElement()..id = 'preview-$i'..className = 'player-info-name'..text = 'Player ${i + 1}';
    SpanElement isub = SpanElement()..id = 'preview-sub-$i'..className = 'player-info-sub'..text = 'tap to fill in';
    info..append(iname)..append(isub);
    SpanElement chev = SpanElement()..id = 'chevron-$i'..className = 'player-chevron'..text = '▼';
    DivElement header = DivElement()..className = 'setup-player-header';
    header..append(av)..append(info)..append(chev);

    DivElement body = DivElement()..id = 'body-$i'..className = 'setup-player-body';

    DivElement ng = DivElement()..className = 'input-group';
    ng.append(SpanElement()..className = 'input-label'..text = 'Your name');
    InputElement ni = InputElement(type: 'text')
      ..id = 'player-name-${i + 1}'
      ..placeholder = 'e.g. Kai'
      ..className = 'styled-input';
    ni.onInput.listen((_) {
      String v = ni.value?.trim() ?? '';
      (querySelector('#preview-$idx') as SpanElement?)?.text = v.isEmpty ? 'Player ${idx + 1}' : v;
      DivElement? a = querySelector('#avatar-$idx') as DivElement?;
      if (a != null) a.text = v.isEmpty ? '?' : v.substring(0, 1).toUpperCase();
    });
    ni.onKeyDown.listen((e) {
      if (e.keyCode == 13) {
        if (isCommander) {
          (querySelector('#commander-name-${idx + 1}') as InputElement?)?.focus();
        } else {
          InputElement? nx = querySelector('#player-name-${idx + 2}') as InputElement?;
          if (nx != null) nx.focus(); else startGame();
        }
      }
    });
    ng.append(ni);
    body.append(ng);

    if (isCommander) {
      DivElement cg = DivElement()..className = 'input-group';
      cg.append(SpanElement()..className = 'input-label'..text = 'Commander');
      InputElement ci2 = InputElement(type: 'text')
        ..id = 'commander-name-${i + 1}'
        ..placeholder = "e.g. Atraxa, Praetors' Voice"
        ..className = 'styled-input';
      ci2.onInput.listen((_) {
        String v = ci2.value?.trim() ?? '';
        (querySelector('#preview-sub-$idx') as SpanElement?)?.text = v.isEmpty ? 'tap to edit' : v;
      });
      ci2.onKeyDown.listen((e) {
        if (e.keyCode == 13) {
          InputElement? nx = querySelector('#player-name-${idx + 2}') as InputElement?;
          if (nx != null) nx.focus(); else startGame();
        }
      });
      cg.append(ci2);
      body.append(cg);
    }

    bool expanded = true;
    header.onClick.listen((_) {
      expanded = !expanded;
      body.style.display = expanded ? 'flex' : 'none';
      (querySelector('#chevron-$idx') as SpanElement?)?.text = expanded ? '▼' : '▶';
    });
    card..append(header)..append(body);
    nb.append(card);
  }
}
