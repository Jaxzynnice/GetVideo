const express = require('express');
const path = require('path');
const downloadRouter = require('./routes/download');

const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/download', downloadRouter);

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'VideooSaver - Download Videos Online',
    description: 'Download videos from various platforms with VideooSaver - Fast, free and easy to use!'
  });
});

// Error handling
app.use((req, res, next) => {
  res.status(404).render('error', { 
    title: '404 Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: '500 Server Error',
    message: 'Something went wrong on our end. Please try again later.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});