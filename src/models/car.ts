import { Schema, model, Model } from 'mongoose';
import validate from 'mongoose-validator';
import { Car } from 'src/types';
import { isNumber, isInteger } from 'src/validations/utils';
/**
 * Car validators
 */
const validators = {
  model: [
    validate({
      validator: "isLength",
      arguments: 1,
      message: "The model must not be empty."
    }),
    validate({
      validator: "isAlpha",
      message: "The model must be composed by letters."
    })
  ],
  cost: validate({
    validator: isNumber({ gt: 0 }),
    message: "The cost must be a valid number."
  }),
  qty: validate({
    validator: isInteger({ min: 1 }),
    message: "The qty must be a valid number."
  })
}

/**
 * Schema
 */
const carSchema = new Schema<Car, Model<Car>, Car>({
  model: {
    type: String, required: [true, "The car must have a model."], validate: validators.model
  },
  cost: { type: Number, required: [true, "The car must have a cost sell."], validate: validators.cost },
  qty: { type: Number, required: [true, "The car must have a qty."], validate: validators.qty },
});

/**
 * Middlewares
 */

export default model<Car>('Car', carSchema);