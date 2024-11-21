const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/utils'); // Utilidad para respuestas estandarizadas

/**
 * Middleware de autenticación.
 * Verifica el token JWT en las cookies o en el encabezado Authorization.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Siguiente middleware a ejecutar.
 */
const auth = (req, res, next) => {
  try {
    // Obtiene el token desde las cookies o el encabezado Authorization
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

    // Si no hay token, responde con un error
    if (!token) {
      return errorResponse(
        res,
        'Acceso denegado: Token no proporcionado',
        { hint: 'Incluye un token válido en las cookies o el encabezado Authorization' },
        401
      );
    }

    // Verifica y decodifica el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return errorResponse(
          res,
          'Token inválido o expirado',
          { error: err.message },
          401
        );
      }
      req.user = decoded; // Adjunta el usuario decodificado al objeto de solicitud
      next(); // Continúa con el siguiente middleware o controlador
    });
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error.message);
    return errorResponse(
      res,
      'Error en el proceso de autenticación',
      { error: error.message },
      500
    );
  }
};

module.exports = auth;
