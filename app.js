require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const config = require('./config/database');

const app = express();

// Handlebars
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts') }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const dbName = process.env.MONGO_DB || "airbnb_db";
const uri = `${process.env.MONGO_URI}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB connected: ${dbName}`))
    .catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.on("connected", () => console.log("Mongoose connected"));
mongoose.connection.on("error", (err) => console.error("Mongoose error:", err));
mongoose.connection.on("disconnected", () => console.log("Mongoose disconnected"));

// Graceful shutdown
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
});

//welcome page
app.get('/', (req, res) => {
    res.render('index', { title: 'Airbnb App Dashboard' });
});


// Routes
const airbnbRoutes = require('./routes/airbnb');
app.use('/api/airbnb', airbnbRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));
