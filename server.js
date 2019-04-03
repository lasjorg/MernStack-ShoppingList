const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const items = require('./routes/api/items');

const app = express();
// Bodyparser middleware (needs to be declared before the routes).
app.use(express.json());

// Connect to db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/api/items', items);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
