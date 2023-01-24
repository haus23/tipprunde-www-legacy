import { z } from 'zod';
import { ExtraQuestionRuleId } from './rules/extra-question-rule';
import { MatchRuleId } from './rules/match-rule';
import { RoundRuleId } from './rules/round-rule';
import { TipRuleId } from './rules/tip-rule';

export const Rules = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  tipRuleId: TipRuleId,
  matchRuleId: MatchRuleId,
  roundRuleId: RoundRuleId,
  extraQuestionRuleId: ExtraQuestionRuleId,
});

export type Rules = z.infer<typeof Rules>;
