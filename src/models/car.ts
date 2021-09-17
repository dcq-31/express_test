import { Schema, Model, model } from 'mongoose';
import { ISchema } from 'src/types';

const carSchema = new Schema<ISchema.Car, Model<ISchema.Car>, ISchema.Car>({
  model: { type: String, required: [true, "The car must have a model."] },
  cost: { type: Number, required: [true, "The car must have a cost sell."], min: [0, "The car's cost must be greater than zero."] }
})

export default model<ISchema.Car>('Car', carSchema);
