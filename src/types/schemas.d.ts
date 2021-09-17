import { PopulatedDoc, Document } from 'mongoose';

export namespace ISchema {
  interface Car {
    model: string,
    cost: number
  }

  interface User {
    name: string,
    money: number,
    cars: PopulatedDoc<ISchema.Car & Document>[],
  }
}