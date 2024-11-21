// backend/controllers/productController.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
const { errorResponse, successResponse } = require("../utils/utils");

/**
 * Renderizar la página principal con productos destacados.
 */
exports.renderHomePage = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("index", { products });
  } catch (error) {
    console.error("Error al cargar la página principal:", error);
    errorResponse(res, "Error al cargar la página principal");
  }
};

/**
 * Crear un nuevo producto.
 */
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, subcategory } = req.body;

    const product = new Product({ name, description, price, stock, category, subcategory });
    await product.save();

    successResponse(res, "Producto creado exitosamente", product, 201);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    errorResponse(res, "Error al crear el producto");
  }
};

/**
 * Obtener todos los productos.
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    successResponse(res, "Productos obtenidos exitosamente", products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    errorResponse(res, "Error al obtener los productos");
  }
};

/**
 * Renderizar la página de productos con la lista de productos.
 */
exports.renderProductsPage = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products });
  } catch (error) {
    console.error("Error al cargar la página de productos:", error);
    errorResponse(res, "Error al cargar los productos");
  }
};

/**
 * Obtener un producto por ID.
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, "ID de producto no válido", 400);
    }

    const product = await Product.findById(id);
    if (!product) {
      return errorResponse(res, "Producto no encontrado", 404);
    }

    successResponse(res, "Producto obtenido exitosamente", product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    errorResponse(res, "Error al obtener el producto");
  }
};

/**
 * Renderizar la página de detalles de un producto.
 */
exports.renderProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).render("404", { message: "ID de producto no válido" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).render("404", { message: "Producto no encontrado" });
    }

    res.render("productDetail", { product });
  } catch (error) {
    console.error("Error al cargar los detalles del producto:", error);
    errorResponse(res, "Error al obtener los detalles del producto");
  }
};

/**
 * Obtener productos por categoría y subcategoría.
 */
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { subcategory } = req.query;

    let filter = { category };
    if (subcategory) {
      filter.subcategory = subcategory;
    }

    const products = await Product.find(filter);
    res.render("categoryProducts", { products, category, subcategory });
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    errorResponse(res, "Error al obtener productos por categoría");
  }
};

/**
 * Actualizar un producto.
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, subcategory } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, "ID de producto no válido", 400);
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, category, subcategory },
      { new: true }
    );

    if (!product) {
      return errorResponse(res, "Producto no encontrado", 404);
    }

    successResponse(res, "Producto actualizado exitosamente", product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    errorResponse(res, "Error al actualizar el producto");
  }
};

/**
 * Eliminar un producto.
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, "ID de producto no válido", 400);
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return errorResponse(res, "Producto no encontrado", 404);
    }

    successResponse(res, "Producto eliminado exitosamente");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    errorResponse(res, "Error al eliminar el producto");
  }
};
