const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const db = require('./database');
const app = express();
const cors = require('cors')

dotenv.config({ path: './config.env' })
port = process.env.PORT;
database = process.env.DATABASE;

db();

// Middleware
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString()
  },
  limit: '50mb'
}));
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 }))

// Routes
app.use(require('./routes/auth'));
app.use(require('./routes/forgot'));
app.use(require('./routes/profile'));
app.use(require('./routes/design'));
app.use(require('./routes/admin'));


app.get("/", (req, res) => {
  res.send("Hello");
})

app.listen(port, () => {
  console.log(`our Backend is running on port ${port}`);
});