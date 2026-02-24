import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import tableRoute from './routes/tableRoutes.js';
import columnRoute from './routes/columnRoutes.js';
import recordRoute from './routes/recordRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cookieParser());


//routes
app.use("/api/auth", authRoutes);
app.use('/api/tables', tableRoute);
app.use('/api/columns', columnRoute);
app.use('/api/records', recordRoute);

//root route
app.get('/', (req, res) => {
    res.send("server is running");
});


//error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});