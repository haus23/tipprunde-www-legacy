import { z } from 'zod';
import { Rule } from './base-rule';

const EXTRA_QUESTION_RULE_VALUES = ['keine-zusatzfragen', 'mit-zusatzfragen'] as const;

export const ExtraQuestionRuleId = z.enum(EXTRA_QUESTION_RULE_VALUES);
export type ExtraQuestionRuleId = z.infer<typeof ExtraQuestionRuleId>;

export type ExtraQuestionRule = Rule & {
  id: ExtraQuestionRuleId;
};

export const extraQuestionRuleDescriptions: ExtraQuestionRule[] = [
  { id: 'keine-zusatzfragen', name: 'Keine Zusatzfragen' },
  { id: 'mit-zusatzfragen', name: 'Mit Zusatzfragen' },
];
