import { Schema } from 'express-validator';

export default {
  model: {
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: "The car's model must not be empty."
    },
    isAlpha: {
      errorMessage: "The car's model must be composed by letters.",
    }
  },
  cost: {
    trim: true,
    isFloat: {
      options: { gt: 0 },
      errorMessage: "The car's cost must be a valid number."
    },
  },
  qty: {
    trim: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "The car's qty must be a valid number."
    },
  }
} as Schema