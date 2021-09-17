import { Schema, Model, model } from 'mongoose';
import { ISchema } from 'src/types';

const userSchema = new Schema<ISchema.User, Model<ISchema.User>, ISchema.User>({
  name: {
    type: String,
    required: [true, "The user must have a name."],
    match: /^[a-zA-Z]+$/i,
    unique: true
  },
  money: {
    type: Number,
    default: 0,
    min: [0, "The user can not have less than zero dolars."]
  },
  cars: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
    default: []
  }
});

export default model<ISchema.User>('User', userSchema);