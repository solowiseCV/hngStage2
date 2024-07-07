import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../config/config.js';


dotenv.config();
const connectDB = async ()=>{

mongoose.connect(config.mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDb is active and functional🔥');
});
    
}

export default connectDB;