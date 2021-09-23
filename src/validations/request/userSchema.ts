import { Schema } from 'express-validator';

export default {
  name: {
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: "The user's name must not be empty."
    },
    isAlpha: {
      errorMessage: "The user's name must be composed by letters.",
    }
  },
  money: {
    trim: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: "The user's money must be a valid number."
    },
  },
} as Schema