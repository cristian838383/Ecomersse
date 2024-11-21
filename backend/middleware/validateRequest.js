const { validationResult } = require("express-validator");
const { errorResponse } = require("../utils/utils");

/**
 * Middleware para manejar errores de validación de express-validator.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware/controlador.
 * @returns {object|function} Respuesta de error o pasa al siguiente middleware.
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  // Si hay errores de validación, devuelve una respuesta de error estandarizada.
  if (!errors.isEmpty()) {
    return errorResponse(res, "Errores de validación", { errors: errors.array() }, 422);
  }

  // Si no hay errores, continúa al siguiente middleware/controlador.
  next();
};

/**
 * Middleware para verificar la existencia de un cuerpo de solicitud (req.body).
 * Asegura que el cuerpo de la solicitud no esté vacío.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware/controlador.
 * @returns {object|function} Respuesta de error o pasa al siguiente middleware.
 */
const validateBodyExists = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return errorResponse(res, "El cuerpo de la solicitud no puede estar vacío", null, 400);
  }
  next();
};

// Exportar los middlewares como un objeto para evitar referencias circulares
module.exports = {
  validateRequest,
  validateBodyExists,
};
