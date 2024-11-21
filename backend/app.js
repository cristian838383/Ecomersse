const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const providerRoutes = require('./routes/providerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Importar middlewares
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

// Importar controladores
const productController = require('./controllers/productController');

// Configurar dotenv
dotenv.config();

const app = express();

// Configurar vistas y archivos estáticos
app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Middlewares globales
app.use(cors()); // Permitir solicitudes desde diferentes orígenes
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(cookieParser()); // Parsear cookies

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/categories', categoryRoutes);

// Rutas de vistas (frontend)
app.get('/', productController.renderHomePage); // Página principal con productos destacados
app.get('/login', (req, res) => res.render('login')); // Página de inicio de sesión
app.get('/register', (req, res) => res.render('register')); // Página de registro

// Redirección a lista de productos
app.get('/products', (req, res) => {
  res.redirect('/api/products/list'); // Redirige a la API para listar productos
});

// Ruta protegida: panel de usuario
app.get('/panel', auth, (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: 'No se encontró el usuario en la solicitud' });
  }
  res.render('panel', { user: req.user }); // Renderiza el panel de usuario
});

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
