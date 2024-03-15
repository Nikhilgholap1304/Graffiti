const mongoose = require('mongoose');

const db = async() => {
  try {
    await mongoose.connect(database, {useNewUrlParser: true,
      useUnifiedTopology: true,});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}

module.exports = db;

