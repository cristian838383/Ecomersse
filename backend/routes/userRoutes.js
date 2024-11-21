const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateRequest } = require('../middleware/validateRequest');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * Ruta para registrar un nuevo usuario.
 */
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('birthdate').isISO8601().toDate().withMessage('La fecha de nacimiento no es válida'),
    body('documentId').notEmpty().withMessage('El documento de identidad es obligatorio'),
    body('address').notEmpty().withMessage('La dirección es obligatoria'),
    body('city').notEmpty().withMessage('La ciudad es obligatoria'),
    body('state').notEmpty().withMessage('El estado/departamento es obligatorio'),
    body('occupation').notEmpty().withMessage('La ocupación es obligatoria'),
    body('phone').isMobilePhone().withMessage('El número de teléfono no es válido'),
    body('gender').notEmpty().withMessage('El género es obligatorio'),
    validateRequest, // Middleware para validar la solicitud
  ],
  registerUser // Controlador para manejar la solicitud
);

/**
 * Ruta para iniciar sesión.
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    validateRequest, // Middleware para validar la solicitud
  ],
  loginUser // Controlador para manejar la solicitud
);

/**
 * Ruta protegida de ejemplo para obtener el perfil del usuario.
 */
router.get('/profile', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Acceso autorizado',
    user: req.user,
  });
});

module.exports = router;
