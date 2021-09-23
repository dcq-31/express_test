import { PopulatedDoc, Document } from 'mongoose';
export interface Car {
  model: string,
  cost: number
}
export interface User {
  name: string,
  money: number,
  cars: PopulatedDoc<Car & Document>[],
}