import { Schema } from 'express-validator';

export default {
  name: {
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: "The user's name must not be empty.",
    },
    isAlpha: {
      errorMessage: "The user's name must be composed by letters.",
    },
    escape: true
  },
  money: {
    trim: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: "The user's money must be a valid number."
    },
    optional: { checkFalsy: true },
    escape: true
  },
  'cars.*': {
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: "The user's cars must not be empty.",
    },
    isAlphanumeric: {
      errorMessage: "The user's cars _id must be alphanumeric values."
    },
    escape: true
  }
} as Schema