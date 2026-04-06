var gameState=null,zoomed=false;
var TURN_PHASES=['Draw','Main','Combat','End'];
var cardRegistry={};
var THEMES={0:{col:'#c9a84c',bdr:'rgba(201,168,76,0.5)',bg:'rgba(201,168,76,0.06)',shadow:'rgba(201,168,76,0.2)'},1:{col:'#ff7777',bdr:'rgba(220,60,60,0.45)',bg:'rgba(200,50,50,0.06)',shadow:'rgba(220,60,60,0.2)'},2:{col:'#7aaaff',bdr:'rgba(70,120,240,0.4)',bg:'rgba(60,100,220,0.05)',shadow:'rgba(70,120,240,0.18)'},3:{col:'#77ffaa',bdr:'rgba(60,180,90,0.4)',bg:'rgba(50,160,80,0.05)',shadow:'rgba(60,180,90,0.18)'}};
var LAND_COLORS={W:{bg:'#181805',bc:'rgba(220,210,80,0.4)',c:'rgba(230,220,90,0.8)'},U:{bg:'#050812',bc:'rgba(70,120,220,0.45)',c:'rgba(100,155,255,0.8)'},B:{bg:'#090610',bc:'rgba(130,90,210,0.45)',c:'rgba(165,130,255,0.7)'},R:{bg:'#1a0605',bc:'rgba(210,70,70,0.5)',c:'rgba(255,110,110,0.8)'},G:{bg:'#060f06',bc:'rgba(60,170,80,0.45)',c:'rgba(90,215,105,0.8)'},C:{bg:'#0f0f0f',bc:'rgba(160,150,140,0.4)',c:'rgba(200,190,180,0.7)'}};
var MANA_SYMBOLS = {};
var MANA_SYMBOLS_LOADED = false;
var DEMO={players:[{name:'Sarah',commander:"Atraxa, Praetors' Voice",life:38,poison:2,eliminated:false,isMonarch:true,hasInitiative:false,commanderDamage:{'1':7,'2':0,'3':0},manaPool:{W:1,U:2,G:1},cards:[{id:'c1',name:'Atraxa',type:'creature',zone:'battlefield',tapped:false,power:4,toughness:4,keywords:['Flying','Vigilance','Deathtouch','Lifelink'],counters:2,manaCost:'{G}{W}{U}{B}',oracleText:'Flying, vigilance, deathtouch, lifelink. At the beginning of your end step, proliferate.',art:'✨',glowColor:'rgba(201,168,76,0.4)'},{id:'c2',name:'Sol Ring',type:'artifact',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'{1}',oracleText:'{T}: Add {C}{C}.',art:'💍'},{id:'c3',name:'Rhystic Study',type:'enchantment',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'{2}{U}',oracleText:'Whenever an opponent casts a spell, you may draw a card unless that player pays {1}.',art:'📚'},{id:'c4',name:'Birds of Paradise',type:'creature',zone:'battlefield',tapped:true,power:0,toughness:1,keywords:['Flying'],counters:0,manaCost:'{G}',oracleText:'Flying. {T}: Add one mana of any color.',art:'🦜'},{id:'l1',name:'Forest',type:'land',zone:'battlefield',tapped:true,keywords:[],counters:0,manaCost:'',landColor:'G',art:'🌲'},{id:'l2',name:'Forest',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'G',art:'🌲'},{id:'l3',name:'Island',type:'land',zone:'battlefield',tapped:true,keywords:[],counters:0,manaCost:'',landColor:'U',art:'🏝'},{id:'l4',name:'Plains',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'W',art:'☀'},{id:'l5',name:'Swamp',type:'land',zone:'battlefield',tapped:true,keywords:[],counters:0,manaCost:'',landColor:'B',art:'🌑'}]},{name:'Mike',commander:'The Ur-Dragon',life:24,poison:0,eliminated:false,isMonarch:false,hasInitiative:false,commanderDamage:{'0':7,'2':0,'3':0},manaPool:{R:3,G:1},cards:[{id:'c5',name:'The Ur-Dragon',type:'creature',zone:'battlefield',tapped:false,power:10,toughness:10,keywords:['Flying','Trample'],counters:0,manaCost:'{4}{W}{U}{B}{R}{G}',oracleText:'Eminence. Flying, trample. Whenever one or more Dragons you control attack, draw that many cards.',art:'🐉',glowColor:'rgba(255,60,60,0.4)',attacking:true},{id:'l6',name:'Mountain',type:'land',zone:'battlefield',tapped:true,keywords:[],counters:0,manaCost:'',landColor:'R',art:'🏔'},{id:'l7',name:'Mountain',type:'land',zone:'battlefield',tapped:true,keywords:[],counters:0,manaCost:'',landColor:'R',art:'🏔'},{id:'l8',name:'Swamp',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'B',art:'🌑'}]},{name:'Alex',commander:'Counterspell Control',life:31,poison:1,eliminated:false,isMonarch:false,hasInitiative:false,commanderDamage:{'0':0,'1':0,'3':0},manaPool:{U:4},cards:[{id:'c6',name:'Sphinx of Foresight',type:'creature',zone:'battlefield',tapped:false,power:4,toughness:4,keywords:['Flying'],counters:0,manaCost:'{2}{U}{U}',oracleText:'Flying. At the beginning of your upkeep, scry 1.',art:'🦅'},{id:'l9',name:'Island',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'U',art:'🏝'},{id:'l10',name:'Island',type:'land',zone:'battlefield',tapped:true,keywords:[],counters:0,manaCost:'',landColor:'U',art:'🏝'},{id:'l11',name:'Island',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'U',art:'🏝'},{id:'l12',name:'Island',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'U',art:'🏝'}]},{name:'Jordan',commander:'Avenger Build',life:40,poison:0,eliminated:false,isMonarch:false,hasInitiative:false,commanderDamage:{'0':0,'1':0,'2':0},manaPool:{G:2},cards:[{id:'c7',name:'Avenger of Zendikar',type:'creature',zone:'battlefield',tapped:false,power:5,toughness:5,keywords:[],counters:0,manaCost:'{5}{G}{G}',oracleText:'When this enters, create a 0/1 Plant token for each land you control. Landfall: put a +1/+1 counter on each Plant you control.',art:'🌿'},{id:'c8',name:'Plant Token',type:'creature',zone:'battlefield',tapped:false,power:0,toughness:1,keywords:[],counters:1,manaCost:'',oracleText:'Token',art:'🌱'},{id:'c9',name:'Plant Token',type:'creature',zone:'battlefield',tapped:false,power:0,toughness:1,keywords:[],counters:1,manaCost:'',oracleText:'Token',art:'🌱'},{id:'c10',name:'Plant Token',type:'creature',zone:'battlefield',tapped:false,power:0,toughness:1,keywords:[],counters:1,manaCost:'',oracleText:'Token',art:'🌱'},{id:'l13',name:'Forest',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'G',art:'🌲'},{id:'l14',name:'Forest',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'G',art:'🌲'},{id:'l15',name:'Forest',type:'land',zone:'battlefield',tapped:true,keywords:[],counters:0,manaCost:'',landColor:'G',art:'🌲'},{id:'l16',name:'Forest',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'G',art:'🌲'},{id:'l17',name:'Plains',type:'land',zone:'battlefield',tapped:false,keywords:[],counters:0,manaCost:'',landColor:'W',art:'☀'}]}],currentPlayer:'Sarah',turn:6,format:'Commander',log:["Sarah attacked Mike with Atraxa","Mike's Ur-Dragon is attacking this turn","Rhystic Study triggered — Sarah may draw"],lifeHistory:[[40,40,40,40],[39,40,40,40],[39,38,40,40],[39,38,39,40],[39,38,39,38],[38,38,39,38]]};

function loadManaSymbols(){
  if(MANA_SYMBOLS_LOADED) return;
  fetch('https://api.scryfall.com/symbology')
    .then(function(response){return response.json();})
    .then(function(data){
      data.data.forEach(function(sym){
        var key = sym.symbol.replace(/\{|\}/g, '').toUpperCase();
        MANA_SYMBOLS[key] = sym.svg_uri;
      });
      MANA_SYMBOLS_LOADED = true;
    })
    .catch(function(err){console.log('Failed to load mana symbols:', err);});
}

function renderManaSymbols(manaPool, size){
  if(!MANA_SYMBOLS_LOADED) return 'Loading...';
  var html = '';
  Object.keys(manaPool).forEach(function(color){
    var count = manaPool[color];
    if(count > 0){
      for(var i = 0; i < count; i++){
        var uri = MANA_SYMBOLS[color];
        if(uri){
          html += '<img src="' + uri + '" alt="' + color + '" title="' + color + '" style="width:' + size + 'px;height:' + size + 'px;display:inline-block;vertical-align:middle;margin-right:1px;">';
        } else {
          // Fallback colored circles
          var colors = {W:'#f9f6d5', U:'#b8d8f0', B:'#3a2a4a', R:'#e87040', G:'#2a6030', C:'#888'};
          var fg = {W:'#7a7020', U:'#1a4060', B:'#ccaaff', R:'#fff0e0', G:'#88ffaa', C:'#eee'};
          var bg = colors[color] || '#333';
          var f = fg[color] || '#aaa';
          html += '<span style="display:inline-flex;align-items:center;justify-content:center;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:' + bg + ';color:' + f + ';font-size:' + (size * 0.55) + 'px;font-weight:700;font-family:Georgia,serif;flex-shrink:0;margin-right:1px;" title="' + color + '">' + color + '</span>';
        }
      }
    }
  });
  return html || '0';
}

function loadHashState(){
  try{
    var hash = window.location.hash;
    if(!hash || !hash.startsWith('#state=')) return null;
    var encoded = hash.substring(7);
    var json = base64DecodeUnicode(encoded);
    return json ? JSON.parse(json) : null;
  }catch(e){
    return null;
  }
}

function loadState(){
  var shared = loadHashState();
  if(shared){
    try{ localStorage.setItem('mtg_spectator', JSON.stringify(shared)); }catch(e){}
    return shared;
  }
  try{var r=localStorage.getItem('mtg_spectator');return r?JSON.parse(r):null;}catch(e){return null;}
}

setInterval(function(){var f=loadState();if(!f)return;if(JSON.stringify(f)!==JSON.stringify(gameState)){var _lc=detectLifeChanges(gameState,f);var _cd=detectCombatDeaths(gameState,f);gameState=f;renderTable();if(_lc.length)spawnLifeDeltas(_lc);if(_cd.length)spawnCombatDeathAlerts(_cd);}},2000);
function detectLifeChanges(oldState,newState){
  if(!oldState||!newState)return[];
  var changes=[];
  (newState.players||[]).forEach(function(p,i){
    var o=(oldState.players||[])[i];
    if(o&&p.life!==o.life)changes.push({playerIdx:i,delta:p.life-o.life});
  });
  return changes;
}
function spawnLifeDeltas(changes){
  var stations=document.querySelectorAll('#pgrid .pstation');
  changes.forEach(function(c){
    var station=stations[c.playerIdx];
    if(!station)return;
    var el=document.createElement('div');
    el.className='life-delta-float '+(c.delta>0?'life-gain':'life-loss');
    el.textContent=(c.delta>0?'+':'')+c.delta;
    station.appendChild(el);
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},2400);
  });
}
function detectCombatDeaths(oldState,newState){
  if(!oldState||!newState)return[];
  var deaths=[];
  (newState.players||[]).forEach(function(player,playerIdx){
    var prevPlayer=(oldState.players||[])[playerIdx]||{};
    var prevCards=prevPlayer.cards||[];
    var nextCards=player.cards||[];
    var prevByKey={};
    prevCards.forEach(function(card){
      var key=card&&card.id?('id:'+card.id):('name:'+(card&&card.name||'')+'::'+(card&&card.type||''));
      prevByKey[key]=card;
    });
    nextCards.forEach(function(card){
      var key=card&&card.id?('id:'+card.id):('name:'+(card&&card.name||'')+'::'+(card&&card.type||''));
      var prev=prevByKey[key];
      if(!prev) return;
      var from=(prev.zone||'').toLowerCase();
      var to=(card.zone||'').toLowerCase();
      var isCreature=((card.type||prev.type||'').toLowerCase()==='creature');
      if(from==='battlefield'&&to==='graveyard'&&isCreature){
        deaths.push({
          playerIdx:playerIdx,
          playerName:player.name||('Player '+(playerIdx+1)),
          cardName:card.name||'Creature'
        });
      }
    });
  });
  return deaths;
}
function spawnCombatDeathAlerts(deaths){
  var stack=document.getElementById('combatDeathAlerts');
  if(!stack){
    stack=document.createElement('div');
    stack.id='combatDeathAlerts';
    stack.className='combat-death-alerts';
    document.body.appendChild(stack);
  }
  var stations=document.querySelectorAll('#pgrid .pstation');
  deaths.forEach(function(d){
    var item=document.createElement('div');
    item.className='combat-death-alert';
    item.textContent='☠ '+d.cardName+' dies ('+d.playerName+')';
    stack.appendChild(item);
    requestAnimationFrame(function(){item.classList.add('show');});
    setTimeout(function(){
      item.classList.remove('show');
      setTimeout(function(){if(item.parentNode)item.parentNode.removeChild(item);},380);
    },2800);

    var station=stations[d.playerIdx];
    if(station){
      var burst=document.createElement('div');
      burst.className='combat-death-float';
      burst.textContent='☠ '+d.cardName;
      station.appendChild(burst);
      setTimeout(function(){if(burst.parentNode)burst.parentNode.removeChild(burst);},2200);
    }
  });
}

function getArt(c){return{creature:'⚔',land:'🏔',artifact:'⚙',enchantment:'✦',planeswalker:'★',instant:'💫',sorcery:'🌀'}[c.type]||'🃏';}
function getCardBg(c){return{creature:'linear-gradient(135deg,#0a0f08,#141f10)',land:'linear-gradient(135deg,#0a0f08,#0f1808)',artifact:'linear-gradient(135deg,#100f08,#1e1c10)',enchantment:'linear-gradient(135deg,#080a14,#0e1222)',planeswalker:'linear-gradient(135deg,#0d080a,#1e1014)'}[c.type]||'linear-gradient(135deg,#0a0a0a,#141414)';}
function escapeHtml(text){return String(text||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function getPhaseIndex(state){var idx=parseInt(state&&state.phaseIndex,10);if(!isNaN(idx))return Math.max(0,Math.min(TURN_PHASES.length-1,idx));var phase=(state&&state.phase||'').toLowerCase();var found=TURN_PHASES.findIndex(function(name){return name.toLowerCase()===phase;});return found>=0?found:0;}
function mapCombatPhaseLabel(phase){
  var p=(phase||'idle').toLowerCase();
  if(p==='declaring_attackers') return 'Declaring Attackers';
  if(p==='declaring_blockers') return 'Declaring Blockers';
  if(p==='damage_resolution') return 'Damage Resolution';
  if(p==='results') return 'Combat Results';
  return 'Idle';
}
function findPlayerByName(state,name){
  var lower=(name||'').toLowerCase();
  return (state.players||[]).find(function(p){return (p.name||'').toLowerCase()===lower;})||null;
}
function findCardOnPlayer(player,cardId,cardName){
  if(!player||!player.cards) return null;
  if(cardId){
    var byId=player.cards.find(function(c){return (c.id||'').toString()===(cardId||'').toString();});
    if(byId) return byId;
  }
  if(!cardName) return null;
  return player.cards.find(function(c){return (c.name||'').toLowerCase()===(cardName||'').toLowerCase();})||
         player.cards.find(function(c){return (c.name||'').toLowerCase().indexOf((cardName||'').toLowerCase())>=0;})||null;
}
function renderCombatShowcase(state){
  var phaseEl=document.getElementById('combatShowcasePhase');
  var mainEl=document.getElementById('combatShowcaseMain');
  var wrapEl=document.getElementById('combatShowcaseWrap');
  if(!phaseEl||!mainEl||!wrapEl) return;

  var combat=state&&state.combatState?state.combatState:{};
  var active=combat.active===true || (combat.phase && combat.phase!=='idle');
  phaseEl.textContent=mapCombatPhaseLabel(combat.phase||'idle');
  phaseEl.className='combat-showcase-phase'+(active?' active':'');
  wrapEl.classList.toggle('active',active);
  wrapEl.classList.toggle('idle',!active);

  if(!active){
    var atkCards=[];
    (state.players||[]).forEach(function(p){
      (p.cards||[]).forEach(function(c){if(c.attacking) atkCards.push({player:p.name,card:c.name});});
    });
    if(atkCards.length===0){
      mainEl.innerHTML='<div class="combat-showcase-empty">No active combat. Spectator will auto-show all combat actions here.</div>';
      return;
    }
  }

  var attackerName=combat.attackerPlayer||'Unknown Attacker';
  var defenderName=combat.defenderPlayer||'Unknown Defender';
  var rows='';
  var attackers=combat.attackers||[];
  if(attackers.length===0){
    rows='<div class="combat-showcase-empty">Combat started. Waiting for attackers to be declared...</div>';
  }else{
    rows=attackers.map(function(entry){
      var atkPlayer=findPlayerByName(state,entry.player||attackerName);
      var atkCard=findCardOnPlayer(atkPlayer,entry.cardId,entry.cardName);
      var atkName=entry.cardName||(atkCard&&atkCard.name)||'Attacker';
      var atkPt=(atkCard&&atkCard.type==='creature'&&atkCard.power!=null)
        ? ('<span class="combat-showcase-pt">'+(parseInt(atkCard.power||0)+(atkCard.counters||0))+'/'+(parseInt(atkCard.toughness||0)+(atkCard.counters||0))+'</span>')
        : '';
      var blockers=(entry.blockers||[]).map(function(b){
        return '<span class="combat-showcase-blocker">🛡 '+escapeHtml(b.cardName||'Blocker')+'</span>';
      }).join('');
      if(!blockers) blockers='<span class="combat-showcase-unblocked">Unblocked</span>';
      return '<div class="combat-showcase-row">'
        +'<div class="combat-showcase-atk"><span class="combat-showcase-card">⚔ '+escapeHtml(atkName)+'</span>'+atkPt+'</div>'
        +'<div class="combat-showcase-def">→ '+escapeHtml(entry.defenderPlayer||defenderName)+'</div>'
        +'<div class="combat-showcase-blockers">'+blockers+'</div>'
      +'</div>';
    }).join('');
  }

  mainEl.innerHTML=''
    +'<div class="combat-showcase-matchup"><span class="atk">'+escapeHtml(attackerName)+'</span> vs <span class="def">'+escapeHtml(defenderName)+'</span></div>'
    +'<div class="combat-showcase-rows">'+rows+'</div>';
}
function renderPhaseTrack(state){
  var el=document.getElementById('phaseTrack');
  if(!el) return;
  var active=getPhaseIndex(state||{});
  el.innerHTML=TURN_PHASES.map(function(name,idx){
    var cls='phase-chip'+(idx<active?' phase-chip-done':'')+(idx===active?' phase-chip-active':'');
    return '<div class="'+cls+'">'+name+'</div>';
  }).join('');
}
function getCardStateBadges(card){
  var badges=[];
  if(card.attacking) badges.push({label:'Attacking',cls:'atk'});
  if(card.tapped) badges.push({label:'Tapped',cls:'tap'});
  if((card.damage||0)>0) badges.push({label:(card.damage||0)+' damage',cls:'dmg'});
  return badges;
}
function getCardStatusClasses(card){
  return (card.attacking?' atk':'')+(card.tapped?' tapped':'')+((card.counters||0)>0?' buff':'')+((card.damage||0)>0?' dmg':'');
}
function getCounterMarker(card,large){
  var counters=card&&card.counters||0;
  if(counters<=0) return '';
  var cls='card-counter-marker'+(large?' large':'');
  return '<div class="'+cls+'"><span class="card-counter-type">+1/+1</span><span class="card-counter-total">×'+counters+'</span></div>';
}
function registerCardRef(card,player,playerIdx,theme,surface){
  var key=[surface,playerIdx,card.id||card.name||card.type].join('::');
  cardRegistry[key]={card:card,player:player,playerIdx:playerIdx,theme:theme,surface:surface};
  return key;
}
function attachCardInteractions(root){
  var cards=root.querySelectorAll('.mc, .bc');
  cards.forEach(function(cardEl){
    var imgUrl=cardEl.getAttribute('data-img');
    var tooltip=null;
    if(imgUrl){
      cardEl.addEventListener('mouseenter', function(){
        tooltip=document.createElement('div');
        tooltip.className='card-preview-tooltip';
        var img=document.createElement('img');
        img.src=imgUrl;
        img.className='card-preview-image';
        img.alt=cardEl.getAttribute('title')||'Card preview';
        tooltip.appendChild(img);
        document.body.appendChild(tooltip);
        var rect=cardEl.getBoundingClientRect();
        tooltip.style.left=(rect.left+window.pageXOffset+rect.width/2-100)+'px';
        tooltip.style.top=(rect.top+window.pageYOffset-220)+'px';
        setTimeout(function(){if(tooltip) tooltip.classList.add('show');},50);
      });
      cardEl.addEventListener('mouseleave', function(){
        if(tooltip){
          tooltip.classList.remove('show');
          setTimeout(function(){if(tooltip&&tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);},200);
          tooltip=null;
        }
      });
    }
    cardEl.addEventListener('click', function(event){
      event.stopPropagation();
      var key=cardEl.getAttribute('data-card-key');
      if(key) openCardInspector(key);
    });
  });
}
function openCardInspector(cardKey){
  var entry=cardRegistry[cardKey];
  var overlay=document.getElementById('cardInspector');
  var panel=document.getElementById('cardInspectorPanel');
  if(!entry||!overlay||!panel) return;
  var card=entry.card;
  var player=entry.player;
  var theme=entry.theme||THEMES[entry.playerIdx%4]||THEMES[0];
  var pt=(card.type==='creature'&&card.power!=null)?(parseInt(card.power)+(card.counters||0))+'/'+(parseInt(card.toughness)+(card.counters||0)):'—';
  var badges=getCardStateBadges(card).map(function(b){return '<div class="inspector-badge">'+escapeHtml(b.label)+'</div>';}).join('');
  var kws=(card.keywords||[]).length?'<div class="inspector-badge">'+escapeHtml((card.keywords||[]).join(' · '))+'</div>':'';
  var art=card.imageUrl?'<img src="'+card.imageUrl+'" alt="'+escapeHtml(card.name)+'">':escapeHtml(card.art||getArt(card));
  panel.innerHTML=''
    +'<div class="inspector-top">'
    +'<div class="inspector-art" style="border-color:'+theme.bdr+';">'+art+'</div>'
    +'<div>'
    +'<div class="inspector-kicker">'+escapeHtml(player.name)+' · '+escapeHtml(entry.surface)+'</div>'
    +'<div class="inspector-name">'+escapeHtml(card.name)+'</div>'
    +'<div class="inspector-sub">'+escapeHtml(card.type||'Card')+'</div>'
    +'<div class="inspector-badges">'+badges+kws+'</div>'
    +'<div class="inspector-stats">'
    +'<div class="inspector-stat"><div class="inspector-stat-v">'+escapeHtml(pt)+'</div><div class="inspector-stat-l">Power / Toughness</div></div>'
    +'<div class="inspector-stat"><div class="inspector-stat-v">'+escapeHtml(String(card.counters||0))+'</div><div class="inspector-stat-l">Counters</div></div>'
    +'<div class="inspector-stat"><div class="inspector-stat-v">'+escapeHtml(String(card.damage||0))+'</div><div class="inspector-stat-l">Damage</div></div>'
    +'</div>'
    +(card.oracleText?'<div class="inspector-text">'+escapeHtml(card.oracleText)+'</div>':'')
    +'<button class="inspector-close" onclick="closeCardInspector()">Return to Table</button>'
    +'</div>'
    +'</div>';
  overlay.classList.remove('hidden');
}
function closeCardInspector(){
  var overlay=document.getElementById('cardInspector');
  if(overlay) overlay.classList.add('hidden');
}

function renderTable(){
  var state=gameState||DEMO;
  cardRegistry={};
  document.getElementById('turnPill').textContent='Turn '+(state.turn||1)+' — '+(state.currentPlayer||'');
  document.getElementById('phasePill').textContent=(state.format||'Commander')+' · '+(state.phase||TURN_PHASES[getPhaseIndex(state)]);
  renderPhaseTrack(state);
  renderCombatShowcase(state);
  var alive=(state.players||[]).filter(function(p){return!p.eliminated;});
  var leader=alive.reduce(function(a,b){return a.life>b.life?a:b;},alive[0]);
  if(leader)document.getElementById('whoWinning').textContent=leader.name;
  var grid=document.getElementById('pgrid');
  grid.innerHTML='';
  var count=(state.players||[]).length;
  grid.className='pgrid pgrid-'+Math.min(count,4);
  (state.players||[]).forEach(function(player,i){
    var theme=THEMES[i%4];
    var isActive=player.name===state.currentPlayer;
    grid.appendChild(buildStation(player,i,theme,isActive,state));
  });
  var commentary=localStorage.getItem('mtg_commentary');
  var el=document.getElementById('aiText');
  if(el&&commentary)el.innerHTML=commentary+'<span class="cur"></span>';
  
  // Update combat feed
  var combatEntries=document.getElementById('combatEntries');
  if(combatEntries){
    var combatLog=state.combatLog||[];
    if(combatLog.length>0){
      combatEntries.innerHTML=combatLog.map(function(entry){
        var e=(entry||'').toLowerCase();
        var cls='combat-entry';
        if(e.indexOf('dies')>=0||e.indexOf('graveyard')>=0) cls+=' combat-entry-kill';
        else if(e.indexOf('damage')>=0||e.indexOf('trample')>=0) cls+=' combat-entry-dmg';
        else if(e.indexOf('survive')>=0||e.indexOf('lifelink')>=0) cls+=' combat-entry-good';
        return '<div class="'+cls+'">'+entry+'</div>';
      }).join('');
      // Auto-scroll to bottom
      combatEntries.scrollTop=combatEntries.scrollHeight;
    }else{
      combatEntries.innerHTML='Waiting for combat...';
    }
  }
}

function buildStation(player,idx,theme,isActive,state){
  var div=document.createElement('div');
  div.className='pstation'+(isActive?' active-glow':'')+(player.eliminated?' eliminated':'');
  div.style.cssText='background:'+theme.bg+';border-color:'+(isActive?theme.bdr:'rgba(255,255,255,0.07)')+';'+(isActive?'box-shadow:0 0 0 1px '+theme.bdr+',0 0 35px '+theme.shadow+';':'');
  div.onclick=function(){openZoom(idx);};
  var bf=(player.cards||[]).filter(function(c){return c.zone==='battlefield';});
  var creatures=bf.filter(function(c){return c.type!=='land';});
  var lands=bf.filter(function(c){return c.type==='land';});
  var gy=(player.cards||[]).filter(function(c){return c.zone==='graveyard';}).length;
  var exile=(player.cards||[]).filter(function(c){return c.zone==='exile';}).length;
  var hand=(player.handSize!=null)?player.handSize:7;
  var h='<div class="phead" style="border-color:'+theme.bdr+';">';
  h+='<div class="pav" style="background:'+theme.bg+';border-color:'+theme.bdr+';color:'+theme.col+';">'+player.name[0]+'</div>';
  h+='<div class="phead-info"><div class="pnm" style="color:'+theme.col+';">'+player.name+(player.isMonarch?' 👑':'')+'</div><div class="pcmd">'+player.commander+'</div></div>';
  h+='<div class="phead-right"><div class="plf" style="color:'+theme.col+';border-color:'+theme.bdr+';background:'+theme.bg+';">'+player.life+'</div>'+(player.poison>0?'<div class="ppoison">☠ '+player.poison+'</div>':'')+'<div class="phand" style="color:'+theme.col+';border-color:'+theme.bdr+';background:'+theme.bg+';" title="Cards in hand">🎴 '+hand+'</div>';
  var mana = player.manaPool;
  if (mana) {
    var manaEntries = Object.entries(mana).filter(function([k,v]){return v > 0;});
    if (manaEntries.length > 0) {
      var manaHtml = renderManaSymbols(mana, 14);
      h += '<div class="pmana" style="color:'+theme.col+';">Mana: <span class="mana-symbols">' + manaHtml + '</span></div>';
    }
  }
  h += '</div></div>';
  var c='';
  if(creatures.length>0){c+='<div class="pzone-section"><div class="zl">Battlefield</div><div class="card-row">';creatures.forEach(function(card){c+=buildMiniCard(card,player,idx,theme,'Battlefield');});c+='</div></div>';}
  if(lands.length>0){c+='<div class="pzone-section"><div class="zl">Lands ('+lands.length+')</div><div class="land-row">';lands.forEach(function(l){var lc=LAND_COLORS[l.landColor||'C'];c+='<div class="land'+(l.tapped?' tapped':'')+'" style="background:'+lc.bg+';border-color:'+lc.bc+';color:'+lc.c+';" title="'+l.name+'">'+l.name[0]+'</div>';});c+='</div></div>';}
  c+='<div class="pile-row"><div class="pile gy-pile">GY<div class="pile-n">'+gy+'</div></div><div class="pile" style="opacity:0.4;">Ex<div class="pile-n">'+exile+'</div></div></div>';
  div.innerHTML=h+c+'<div class="click-hint">🔍 click to zoom</div>';
  attachCardInteractions(div);
  
  return div;
}

function buildMiniCard(card,player,playerIdx,theme,surface){
  var art=card.art||getArt(card);
  var stateClasses=getCardStatusClasses(card);
  var glow=card.glowColor?'box-shadow:0 0 14px '+card.glowColor+';':'';
  var bdr=card.glowColor?card.glowColor.replace('0.4','0.7'):'rgba(255,255,255,0.15)';
  var bg=getCardBg(card);
  var pt=(card.type==='creature'&&card.power!=null)?(parseInt(card.power)+(card.counters||0))+'/'+(parseInt(card.toughness)+(card.counters||0)):'';
  var imgData = card.imageUrl ? ' data-img="' + card.imageUrl + '"' : '';
  var cardKey=registerCardRef(card,player,playerIdx,theme,surface);
  var badges=getCardStateBadges(card).map(function(b){return '<div class="card-state-badge '+b.cls+'">'+b.label+'</div>';}).join('');
  var counterMarker=getCounterMarker(card,false);
  var artContent = card.imageUrl
    ? '<img src="'+card.imageUrl+'" alt="'+card.name+'" loading="lazy">'
    : art;
  return'<div class="mc'+stateClasses+'" style="border-color:'+bdr+';background:'+bg+';'+glow+'" title="'+card.name+'" data-card-key="'+cardKey+'"'+imgData+'>'+(card.attacking?'<div class="atk-tag">⚔</div>':'')+'<div class="mc-art">'+artContent+counterMarker+'</div>'+(badges?'<div class="card-state-stack">'+badges+'</div>':'')+(card.imageUrl?'':('<div class="mc-foot"><div class="mc-nm">'+card.name.split(' ')[0]+'</div>'+(pt?'<div class="mc-pt">'+pt+'</div>':'')+'</div>'))+'</div>';
}

function openZoom(pidx){
  zoomed=true;
  var state=gameState||DEMO;
  var player=state.players[pidx];
  var theme=THEMES[pidx%4];
  document.getElementById('t3d').classList.add('zooming');
  document.querySelectorAll('.pstation').forEach(function(el){el.classList.add('dimmed');});
  var panel=document.getElementById('zpanel');
  var ov=document.getElementById('zov');
  var bf=(player.cards||[]).filter(function(c){return c.zone==='battlefield';});
  var creatures=bf.filter(function(c){return c.type!=='land';});
  var lands=bf.filter(function(c){return c.type==='land';});
  var gy=(player.cards||[]).filter(function(c){return c.zone==='graveyard';});
  var exile=(player.cards||[]).filter(function(c){return c.zone==='exile';});
  var bigCardsHtml=creatures.map(function(c){
    var art=c.art||getArt(c);var cardKey=registerCardRef(c,player,pidx,theme,'Zoom');
    var glow=c.glowColor?'box-shadow:0 0 22px '+c.glowColor+';':'';
    var bdr=c.glowColor?c.glowColor.replace('0.4','0.8'):'rgba(255,255,255,0.2)';
    var pt=(c.type==='creature'&&c.power!=null)?(parseInt(c.power)+(c.counters||0))+'/'+(parseInt(c.toughness)+(c.counters||0)):'';
    var kws=(c.keywords||[]).join(' · ');
    var imgData = c.imageUrl ? ' data-img="' + c.imageUrl + '"' : '';
    var badges=getCardStateBadges(c).map(function(b){return '<div class="card-state-badge '+b.cls+'">'+b.label+'</div>';}).join('');
    var counterMarker=getCounterMarker(c,true);
    var bcArt = c.imageUrl
      ? '<img src="'+c.imageUrl+'" alt="'+c.name+'" loading="lazy">'
      : art;
    return'<div class="bc'+getCardStatusClasses(c)+'" style="border-color:'+bdr+';background:'+getCardBg(c)+';'+glow+'" title="'+c.name+'" data-card-key="'+cardKey+'"'+imgData+'>'+(c.attacking?'<div class="atk-tag" style="font-size:0.38rem;padding:1px 4px;">⚔ ATTACKING</div>':'')+'<div class="bc-art">'+bcArt+counterMarker+'</div>'+(badges?'<div class="card-state-stack">'+badges+'</div>':'')+'<div class="bc-foot"><div class="bc-nm">'+c.name+'</div>'+(pt?'<div class="bc-pt">'+pt+'</div>':'')+(kws?'<div class="bc-kw">'+kws+'</div>':'')+'</div></div>';
  }).join('');
  var landsHtml=lands.map(function(l){var lc=LAND_COLORS[l.landColor||'C'];return'<div class="land'+(l.tapped?' tapped':'')+'" style="width:24px;height:34px;background:'+lc.bg+';border-color:'+lc.bc+';color:'+lc.c+';" title="'+l.name+'">'+l.name[0]+'</div>';}).join('');
  var cmdHtml='';
  if(player.commanderDamage){Object.keys(player.commanderDamage).forEach(function(k){var dmg=player.commanderDamage[k];if(dmg>0&&state.players[k]){cmdHtml+='<div class="cmd-dmg-row"><span style="color:rgba(255,255,255,0.4);">From '+state.players[k].name+':</span> <span style="color:#ff9966;font-weight:700;">'+dmg+'</span>'+(dmg>=21?' <span style="color:#ff4444;">⚠ LETHAL!</span>':'')+'</div>';}});}
  var oracleHtml=creatures.filter(function(c){return c.oracleText&&c.oracleText.length>0;}).slice(0,3).map(function(c){return'<div class="oracle-entry"><div class="oracle-name">'+c.name+'</div><div class="oracle-text">'+c.oracleText+'</div></div>';}).join('');
  panel.style.borderColor=theme.bdr;
  panel.innerHTML='<button class="zoom-close" onclick="closeZoom()">✕</button>'
    +'<div class="zoom-phead" style="border-color:'+theme.bdr+';box-shadow:0 0 30px '+theme.shadow+';">'
    +'<div class="zoom-av" style="background:'+theme.bg+';border-color:'+theme.bdr+';color:'+theme.col+';">'+player.name[0]+'</div>'
    +'<div><div class="zoom-pnm" style="color:'+theme.col+';">'+player.name+(player.isMonarch?' 👑':'')+'</div><div class="zoom-cmd">'+player.commander+'</div></div>'
    +'<div class="zoom-life-block"><div class="zoom-life" style="color:'+theme.col+';border-color:'+theme.bdr+';background:'+theme.bg+';">'+player.life+'</div>'+(player.poison>0?'<div class="zoom-poison">☠ '+player.poison+' poison</div>':'')+'</div></div>'
    +'<div class="zoom-stats">'
    +'<div class="chip"><div class="chip-v" style="color:'+theme.col+';">'+player.life+'</div><div class="chip-l">Life</div></div>'
    +'<div class="chip"><div class="chip-v">'+(player.handSize!=null?player.handSize:7)+'</div><div class="chip-l">Hand</div></div>'
    +'<div class="chip"><div class="chip-v">'+creatures.length+'</div><div class="chip-l">Battlefield</div></div>'
    +'<div class="chip"><div class="chip-v">'+lands.length+'</div><div class="chip-l">Lands</div></div>'
    +'<div class="chip"><div class="chip-v">'+gy.length+'</div><div class="chip-l">Graveyard</div></div>'
    +'<div class="chip"><div class="chip-v">'+exile.length+'</div><div class="chip-l">Exile</div></div>'
    +'</div>'
    +(bigCardsHtml?'<div class="zoom-section"><div class="zoom-section-label">Battlefield</div><div class="bc-row">'+bigCardsHtml+'</div></div>':'')
    +(landsHtml?'<div class="zoom-section"><div class="zoom-section-label">Lands ('+lands.length+')</div><div class="land-row" style="gap:5px;">'+landsHtml+'</div></div>':'')
    +(cmdHtml?'<div class="zoom-section"><div class="zoom-section-label">Commander Damage Received</div>'+cmdHtml+'</div>':'')
    +(oracleHtml?'<div class="zoom-section"><div class="zoom-section-label">Card Abilities</div>'+oracleHtml+'</div>':'')
    +(function(){var bf2=(player.cards||[]).filter(function(c){return c.zone==='battlefield';});var summary=bf2.length?bf2.map(function(c){return c.name+(c.type==='creature'&&c.power!=null?' ('+c.power+'/'+c.toughness+')':'');}).join(', '):'No cards on battlefield.';return'<div class="zoom-ai-box"><div class="zoom-ai-hdr"><div class="ai-dot" style="background:#c9a84c;"></div><span class="ai-lbl">Board Summary</span></div><div class="zoom-ai-text">'+summary+'<span class="cur"></span></div></div>';}());
  ov.classList.add('on');
  setTimeout(function(){panel.classList.add('open');},20);
  attachCardInteractions(panel);
  
  document.getElementById('backBtn').classList.remove('hidden');
}

function closeZoom(){
  zoomed=false;
  closeCardInspector();
  var panel=document.getElementById('zpanel');
  var ov=document.getElementById('zov');
  panel.classList.remove('open');
  setTimeout(function(){ov.classList.remove('on');},380);
  document.getElementById('t3d').classList.remove('zooming');
  document.querySelectorAll('.pstation').forEach(function(el){el.classList.remove('dimmed');});
  document.getElementById('backBtn').classList.add('hidden');
}


// Parallax
document.getElementById('tableWrap').addEventListener('mousemove',function(e){
  if(zoomed)return;
  var r=this.getBoundingClientRect();
  var cx=(e.clientX-r.left)/r.width-0.5;
  var cy=(e.clientY-r.top)/r.height-0.5;
  document.getElementById('t3d').style.transform='perspective(1400px) rotateX('+(8-cy*4)+'deg) rotateY('+(cx*3)+'deg)';
});
document.getElementById('tableWrap').addEventListener('mouseleave',function(){
  if(!zoomed)document.getElementById('t3d').style.transform='perspective(1400px) rotateX(8deg) rotateY(0deg)';
});

// Dust
(function(){
  var scene=document.getElementById('scene');
  for(var i=0;i<20;i++){var d=document.createElement('div');d.className='dust';var sz=1.2+Math.random()*2.5;d.style.cssText='width:'+sz+'px;height:'+sz+'px;left:'+(Math.random()*100)+'%;top:'+(35+Math.random()*55)+'%;--dx:'+(Math.random()*50-25)+'px;animation-duration:'+(7+Math.random()*12)+'s;animation-delay:'+(-Math.random()*12)+'s;';scene.appendChild(d);}
})();

gameState=loadState();
loadManaSymbols();
renderTable();
