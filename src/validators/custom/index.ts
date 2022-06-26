import {
  body as b,
  query as q,
  ValidationChain
} from 'express-validator';
import * as V from './validator';

export import V = V;

type RuleChecker = (
  check: ValidationChain,
  fieldName?: string
) => ValidationChain;

const validator = (
  checkType: 'body' | 'query' | 'param',
  field: string | string[],
  fieldNameOrRules?: string | RuleChecker[],
  rules?: RuleChecker[]
) => {
  let check = b(field);
  if (checkType === 'query') {
    check = q(field);
  }

  let ruleSet: RuleChecker[] | undefined = rules;
  let fieldName;
  if (typeof fieldNameOrRules === 'string') {
    fieldName = fieldNameOrRules;
  } else {
    ruleSet = fieldNameOrRules;
  }

  if (ruleSet !== undefined) {
    for (const rule of ruleSet) {
      check = rule(check, fieldName);
    }
  }

  return check;
};

/**
 * request body validator function
 * @param field field name to be checked
 * @param rules set of rules apply to field
 */
export function body(
  field: string | string[],
  rules?: RuleChecker[]
): ValidationChain;

/**
 * request body validator function
 * @param field field name to be checked
 * @param fieldName logical field name to display in error message
 * @param rules set of rules apply to field
 */
export function body(
  field: string | string[],
  fieldName?: string,
  rules?: RuleChecker[]
): ValidationChain;

export function body(
  field: string | string[],
  fieldNameOrRules?: string | RuleChecker[],
  rules?: RuleChecker[]
) {
  return validator('body', field, fieldNameOrRules, rules);
}

export const query = (
  field: string | string[],
  fieldName?: string,
  rules?: RuleChecker[]
) => {
  return validator('query', field, fieldName, rules);
};
