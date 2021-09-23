import { Schema, Model, model } from 'mongoose';
import validate from 'mongoose-validator';
import { User } from 'src/types';
import { isNumber } from 'src/validations/utils';

/**
 * User validators
 */
const validators = {
  name: [
    validate({
      validator: "isLength",
      arguments: 1,
      message: "The user's name must not be empty."
    }),
    validate({
      validator: "isAlpha",
      message: "The user's name must be composed by letters."
    }),
  ],

  money: validate({
    validator: isNumber({ min: 0 }),
    passIfEmpty: true,
    message: "The user's money must be a valid number."
  }),

  cars: [
    validate({
      validator: (value: any) => {
        return Array.isArray(value);
      },
      message: "The user's cars must be a array."
    }),
    validate({
      validator: (value: []) => {
        for (const element of value) {
          if (!(/^[a-z0-9]+$/i.test(element))) {
            return false;
          }
        }
        return true;
      },
      message: "The user's cars _id must be alphanumeric values."
    }),
  ]
}

/**
 * Schema
 */
const userSchema = new Schema<User, Model<User>, User>({
  name: {
    type: String,
    required: [true, "The user must have a name."],
    validate: validators.name
  },
  money: {
    type: Number,
    default: 0,
    validate: validators.money
  },
  cars: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
    required: [true, "The user must have cars."],
    validate: validators.cars
  }
});

export default model<User>('User', userSchema);