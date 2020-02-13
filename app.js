const express = require('express');
const app = express();

const db = require('./config/database');
// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

// Gig routes
app.use('/user', require('./routes/userRoutes'));
app.use('/role', require('./routes/roleRoutes'));
app.use('/userRole', require('./routes/userRoleRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));