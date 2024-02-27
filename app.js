// index.js or app.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect('<your-database-uri>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
