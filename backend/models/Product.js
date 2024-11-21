const mongoose = require('mongoose');

/**
 * Esquema para los productos disponibles en la plataforma.
 * @property {string} name - Nombre del producto.
 * @property {string} description - Descripción opcional del producto.
 * @property {number} price - Precio del producto.
 * @property {string} category - Categoría principal del producto (Ej: "Maíz", "Ñame").
 * @property {string} subcategory - Subcategoría opcional del producto (Ej: "Maíz Blanco").
 * @property {string} imageUrl - URL de la imagen del producto.
 * @property {number} stock - Cantidad disponible en inventario (por defecto 0).
 * @property {Date} createdAt - Fecha de creación del producto (se asigna automáticamente).
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true, // Elimina espacios innecesarios
      maxlength: [100, 'El nombre del producto no puede exceder los 100 caracteres'],
    },
    description: {
      type: String,
      trim: true, // Elimina espacios innecesarios
    },
    price: {
      type: Number,
      required: [true, 'El precio del producto es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    category: {
      type: String,
      required: [true, 'La categoría del producto es obligatoria'],
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '', // Valor por defecto en caso de no proporcionar una imagen
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
    versionKey: false, // Elimina __v (campo de versión de documentos)
  }
);

/**
 * Modelo de la colección 'products' basado en el esquema de producto.
 */
module.exports = mongoose.model('Product', productSchema);
