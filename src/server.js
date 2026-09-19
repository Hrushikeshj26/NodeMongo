import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', userRouter)

mongoose.connect(process.env.DB_URL, { dbName: 'sample_mflix' })
  .then(() => console.log('MongoDB Connected....'))
  .catch((error) => console.error('Error in Connection.....', error))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`)
})
