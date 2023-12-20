const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Secret key for JWT
const secretKey = 'yourSecretKey';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // Store decoded user information in the request
    req.user = decoded;
    next();
  });
};

// Route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // TODO: Implement your actual authentication logic here (e.g., check against a database)

  // For simplicity, let's assume authentication is successful
  const userId = 1; // Replace with the actual user ID from your database
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: 86400 }); // Token expires in 24 hours

  res.status(200).send({ auth: true, token: token });
});

// Protected route that requires authentication
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).send({ message: 'You are authenticated!', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
