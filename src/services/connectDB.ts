import mongoose from 'mongoose';
export default function (url: string) {

  mongoose.connect(url).catch((err) => { console.log('Error', err); });

  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

  /**
   * Conection to mongoDB success
   */
  mongoose.connection.on('open', () => console.log('Conection success'));
}
