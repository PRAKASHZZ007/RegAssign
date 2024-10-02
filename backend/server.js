const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const Address = require('./models/Address');

const app = express();
const port = 3000;  // You can also use a hardcoded port

// Middleware
app.use(cors({
  origin: ['https://regassign-frontend.onrender.com'],  // Your frontend URL
}));
app.use(bodyParser.json());

// Connect to MongoDB (hardcoded credentials)
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/userAddressDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit if MongoDB connection fails
  });

// Route to handle user registration with address
app.post('/register', async (req, res) => {
  const { name, address } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name });
    await newUser.save();

    // Create a new address associated with the user
    const newAddress = new Address({
      address,
      userId: newUser._id,
    });
    await newAddress.save();

    res.status(201).json({ message: 'User and address registered successfully' });
  } catch (error) {
    console.error('Error registering user and address:', error);
    res.status(500).json({ message: 'Error registering user and address', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
