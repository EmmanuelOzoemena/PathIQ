require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cron = require('node-cron');
const progressService = require ("./src/services/progressService")


const apiRouter = require("./src/routes");
const routeNotFound = require("./src/middleware/routeNotFound");
const errorHandler = require("./src/middleware/errorHandler");
const connectDB = require("./src/config/db");
const strategy = require("./src/config/passport")
const router = require("./src/routes/index");
const eventRoutes = require("./src/routes/eventRoutes");

// Connect to Database
connectDB ();

const app = express();


// Node Cron, Runs every day at 00:00
cron.schedule('0 0 * * *', () => {
    progressService.checkAndSendReminders();
});


//Middwares
app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: false, // Disable credentials for CORS
}));


app.get("/", (req, res) => {
  res.send("Welcome!")
});


// Express-session
app.use(session({
  secret: process.env.SESSION_SECRET_KEY, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' } 
}));


// Open Authorization Middleware
app.use(passport.initialize())
app.use(passport.session())
router.use(eventRoutes);

// Logging
app.use(morgan("dev"));

//Routes
app.use("/api/v1", apiRouter)

app.use(routeNotFound)

// Security and Performance Enhancements
app.use(helmet());
app.use(compression());


// Body Parsers
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, slow down!" },
});
app.use(limiter);

// Secure Cookies & Sessions
app.use(cookieParser());

// Error Handling
app.use(errorHandler);



//Export
module.exports = app;



