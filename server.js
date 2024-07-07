import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute.js';
import organisationRoutes from './routes/organisationRoute.js';
import connectDB from './models/db.js';
import cookieParser from 'cookie-parser';

// Connect to MongoDB
connectDB()

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);

// route for home page
app.get("/", (req, res) => {
  res.send("Welcome to Home route, Please sign up or log in to continue");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
