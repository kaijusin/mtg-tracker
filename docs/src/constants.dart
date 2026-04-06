part of '../main.dart';

// ════════════════════════════════════════════════════════════
// CONSTANTS — Magic keywords, trigger patterns, hardcoded lists
// ════════════════════════════════════════════════════════════

const List<String> kKeywords = [
  'Flying','First Strike','Double Strike','Deathtouch','Haste',
  'Hexproof','Indestructible','Lifelink','Menace','Protection',
  'Reach','Shroud','Trample','Vigilance','Ward',
];

const Map<String, String> kKeywordGlossary = {
  'Flying': 'Can only be blocked by creatures with Flying or Reach.',
  'First Strike': 'Deals combat damage before creatures without First Strike.',
  'Double Strike': 'Deals both first strike and regular combat damage.',
  'Deathtouch': 'Any damage dealt by this creature destroys the target.',
  'Haste': 'Can attack and use tap abilities the turn it enters.',
  'Hexproof': 'Cannot be targeted by opponents\' spells or abilities.',
  'Indestructible': 'Cannot be destroyed by damage or "destroy" effects.',
  'Lifelink': 'Damage dealt also causes you to gain that much life.',
  'Menace': 'Can only be blocked by two or more creatures.',
  'Protection': 'Cannot be blocked, targeted, damaged, enchanted, or equipped by the stated quality.',
  'Reach': 'Can block creatures with Flying.',
  'Shroud': 'Cannot be targeted by any spells or abilities (including yours).',
  'Trample': 'Excess damage beyond blocking creature\'s toughness goes to the player.',
  'Vigilance': 'Does not tap when it attacks.',
  'Ward': 'When targeted by an opponent, they must pay a cost or the effect is countered.',
};

const List<Map<String, String>> kTriggerPatterns = [
  {'pattern': 'at the beginning of your upkeep', 'phase': 'Upkeep', 'plain': 'triggers at the start of your upkeep'},
  {'pattern': 'at the beginning of each upkeep', 'phase': 'Upkeep', 'plain': 'triggers at the start of every upkeep'},
  {'pattern': 'at the beginning of combat', 'phase': 'Combat', 'plain': 'triggers at the start of combat'},
  {'pattern': 'at the beginning of your end step', 'phase': 'End Step', 'plain': 'triggers at end of your turn'},
  {'pattern': 'whenever you attack', 'phase': 'Combat', 'plain': 'triggers when you declare attackers'},
  {'pattern': 'whenever ~ attacks', 'phase': 'Combat', 'plain': 'triggers when this creature attacks'},
  {'pattern': 'whenever a creature dies', 'phase': 'Any', 'plain': 'triggers when any creature dies'},
  {'pattern': 'whenever you cast', 'phase': 'Any', 'plain': 'triggers when you cast a spell'},
];
