import { PopulatedDoc, Document } from 'mongoose';
export interface Car {
  model: string,
  cost: number,
  qty: number
}
export interface User {
  name: string,
  money: number,
  cars: PopulatedDoc<ISchema.Car & Document>[],
}