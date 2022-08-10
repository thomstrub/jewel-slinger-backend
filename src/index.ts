import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

const cookieParser = require('cookie-parser');

dotenv.config();

// create the Express app
const app = express();
const port = process.env.PORT || 4000;

//Connect to Mongo DB
require('./config/database');
// Connect to Passport 
require('./config/passport');

//middleware

app.use(express.json());
app.use(cors({origin:["https://jewel-slinger.netlify.app", 'http://localhost:3000'], credentials: true}));
app.use(cookieParser());

app.set("trust proxy", 1);

//Initialize session

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
  })
);

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

//require routes
const authRoutes = require('./routes/auth');
const oauth2CallbackRoutes = require('./routes/oauth2Callback');
const itemsRoutes = require('./routes/items');



// ------------------------------------- ROUTES ------------------------


app.use('/auth', authRoutes);
app.use('/oauth2/redirect', oauth2CallbackRoutes);

app.use('/items',itemsRoutes);

app.get('/', (req, res) => {
    res.send('Hello f Internet');
  });
  
  app.listen(port, () => {
    console.log(`[server]: Server is now ~~~~ running at https://localhost:${port}`);
  });