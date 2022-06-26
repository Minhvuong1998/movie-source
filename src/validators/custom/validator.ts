import { ValidationChain } from 'express-validator';
import { isNil, values } from 'lodash';
import { statics } from '../../factory';

export const emptyStringAsNull = (check: ValidationChain) =>
  check.customSanitizer((value) => {
    return value.length === 0 ? null : value;
  });

export const required = (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .exists({ checkNull: true })
    .withMessage(
      statics.messageValidate.required(fieldName)
    );

export const maxLength = (length: number) => (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .isLength({ max: length })
    .withMessage(
      statics.messageValidate.maxlength(fieldName, length)
    );

export const fileRequired = (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .custom((_, { req, path }) => {
      return req.files[path] && req.files[path].length;
    })
    .withMessage(
      statics.messageValidate.required(fieldName)
    );

export const typeFile = (type: string[]) => (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .custom((_, { req, path }) => {
      const typeFile = String(
        req.files[path][0].originalname
      ).split('.');
      if (type.indexOf(typeFile[typeFile.length - 1]) < 0) {
        return false;
      }
      return true;
    })
    .withMessage(
      statics.messageValidate.uploadFileType(
        fieldName,
        type.join(' ')
      )
    );

export const isNumber = (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .custom((value: string) => {
      if (isNil(value)) {
        return true;
      }

      return /^[0-9]+$/g.test(value);
    })
    .withMessage(
      statics.messageValidate.isNumber(fieldName)
    );

export const intBetween = (min: number, max: number) => (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .isInt({ min, max })
    .withMessage(
      statics.messageValidate.intBetween(
        fieldName,
        min,
        max
      )
    );

export const valueOf = (
  obj: Record<string, string | number>
) => (check: ValidationChain, fieldName: string) =>
  check
    .custom((value: string | number) => {
      if (isNil(value)) {
        return true;
      }

      const valueObj = values(obj).map(String);

      return valueObj.includes(value.toString());
    })
    .withMessage(
      statics.messageValidate.valueOf(fieldName)
    );

export const optional = (check: ValidationChain) =>
  check.optional({ nullable: true });

export const isEmail = (
  check: ValidationChain,
  fieldName: string
) =>
  check
    .isEmail()
    .withMessage(
      statics.messageValidate.isEmail(fieldName)
    );
