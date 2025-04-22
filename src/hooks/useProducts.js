import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../services/productService"; // Import the service

// Define the expected primary key for products (adjust if different)
const PRODUCT_ID_KEY = "id_producto"; // Or 'codigo', etc.

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Add filters specific to products if needed, e.g., tipo, status
  // const [selectedTipo, setSelectedTipo] = useState("");
  // const [uniqueTipos, setUniqueTipos] = useState([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
          // Extract unique values for filters if needed
          // const tipos = [...new Set(data.map((prod) => prod.tipo).filter(Boolean))];
          // setUniqueTipos(["", ...tipos]); // Add "All" option
        } else {
          console.error("Received non-array data for products:", data);
          setProducts([]);
          // setUniqueTipos([""]);
          setError("Received invalid data format for products.");
        }
      } catch (err) {
        setError("Failed to fetch products. Please check the API connection.");
        console.error(err);
        setProducts([]);
        // setUniqueTipos([""]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Updated search fields
      const matchesSearchTerm =
        product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by nombre
        product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by descripcion
        product.tipo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.fabricante?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.lote?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by lote
        product.codigo_digemaps
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Add filter logic if filters are implemented
      // const matchesTipo = selectedTipo === "" || product.tipo === selectedTipo;

      return matchesSearchTerm; // && matchesTipo;
    });
  }, [products, searchTerm /*, selectedTipo */]);

  // Function to remove product from state after deletion
  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prod) => prod[PRODUCT_ID_KEY] !== id)
    );
  };

  // Function to add a new product to the state
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    // Optionally update unique filter values
  };

  // Function to update an existing product in the state
  const updateProductState = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod[PRODUCT_ID_KEY] === updatedProduct[PRODUCT_ID_KEY]
          ? updatedProduct
          : prod
      )
    );
    // Optionally update unique filter values
  };

  return {
    products: filteredProducts, // Return the filtered list
    loading,
    error,
    searchTerm,
    setSearchTerm,
    // Expose filters and setters if implemented
    // selectedTipo,
    // setSelectedTipo,
    // uniqueTipos,
    removeProduct,
    addProduct,
    updateProductState,
    originalCount: products.length,
    findProductById: (id) =>
      products.find((prod) => prod[PRODUCT_ID_KEY] === id),
  };
}
