const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoute = require('./routes/authRoutes.js')
const companiesRoute = require('./routes/companiesRoutes.js');
const productsRoute = require('./routes/productRoutes.js')
const port = 5000;
require('dotenv').config();

app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//routes
app.use("/", authRoute);
app.use("/", companiesRoute);
app.use("/", productsRoute);

//connect to database
connectDB();

//trial route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
