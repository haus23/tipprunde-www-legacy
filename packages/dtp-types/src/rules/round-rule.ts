import { z } from 'zod';
import { Rule } from './base-rule';

const ROUND_RULE_VALUES = ['keine-besonderheiten', 'alles-verdoppelt'] as const;

export const RoundRuleId = z.enum(ROUND_RULE_VALUES);
export type RoundRuleId = z.infer<typeof RoundRuleId>;

export type RoundRule = Rule & {
  id: RoundRuleId;
};

export const roundRuleDescriptions: RoundRule[] = [
  {
    id: 'keine-besonderheiten',
    name: 'Keine Besonderheiten',
    description: `
    Es gibt keine Sonderregeln zum Abschluss einer Runde.
  `,
  },
  {
    id: 'alles-verdoppelt',
    name: 'Alles verdoppelt',
    description: `Jeder Tipp in dieser Runde bekommt die doppelte Punktzahl. Also zwei, vier oder sechs Punkte.
    Unabhängig davon können Joker gesetzt werden (falls erlaubt), die dann nocheinmal beim Treffer verdoppeln.
    Es sind also maximal 15 Punkte möglich, falls der richtige Tipp sogar der einzige richtige war.
    `,
  },
];
