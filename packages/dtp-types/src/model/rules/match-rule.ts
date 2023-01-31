import { z } from 'zod';
import { Rule } from './base-rule';

const MATCH_RULE_VALUES = ['keine-besonderheiten', 'alleiniger-treffer-drei-punkte'] as const;

export const MatchRuleId = z.enum(MATCH_RULE_VALUES);
export type MatchRuleId = z.infer<typeof MatchRuleId>;

export type MatchRule = Rule & {
  id: MatchRuleId;
};

export const matchRuleDescriptions: MatchRule[] = [
  {
    id: 'keine-besonderheiten',
    name: 'Keine Besonderheiten',
    description: `
    Es gibt keine Sonderregeln für einzelne Spiele.
  `,
  },
  {
    id: 'alleiniger-treffer-drei-punkte',
    name: 'Alleiniger Treffer gibt drei Punkte',
    description: `
    Falls ein Spieler als einziger für ein Spiel Punkte erhält, bekommt er drei zusätzliche Punkte.
  `,
  },
];
