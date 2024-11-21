const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth"); // Middleware para autenticación
const { validateRequest } = require("../middleware/validateRequest"); // Middleware para validaciones
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  renderProductsPage,
  renderProductById,
  getProductsByCategory,
} = require("../controllers/productController"); // Importa controladores

// Validaciones comunes para productos
const validateProductBody = [
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio."),
  body("price").isNumeric().withMessage("El precio debe ser un número."),
  body("category").notEmpty().withMessage("La categoría es obligatoria."),
  validateRequest, // Maneja los errores de validación
];

// Validación de parámetros (ejemplo: validar ID)
const validateProductId = [
  param("id").isMongoId().withMessage("ID de producto no válido."),
  validateRequest,
];

// Rutas de frontend para productos
router.get("/list", renderProductsPage); // Página de lista de productos
router.get("/detail/:id", validateProductId, renderProductById); // Detalle de producto
router.get("/category/:category", getProductsByCategory); // Productos por categoría

// API para manejo de productos
router.post("/add", auth, validateProductBody, addProduct); // Crear producto
router.get("/", getProducts); // Obtener todos los productos
router.get("/:id", validateProductId, getProductById); // Obtener producto por ID
router.put("/:id", auth, validateProductId, validateProductBody, updateProduct); // Actualizar producto
router.delete("/:id", auth, validateProductId, deleteProduct); // Eliminar producto

module.exports = router;
