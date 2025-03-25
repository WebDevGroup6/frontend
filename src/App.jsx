import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import AllProductsModal from './components/AllProductsmodal';

export default function App() {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const productCategories = [
    {
      name: "Analgésicos",
      products: [
        { 
          name: "Paracetamol 500mg", 
          price: 5.99, 
          image: "https://m.media-amazon.com/images/I/61tZAYeQ+aL._AC_UF1000,1000_QL80_.jpg",
          description: "Alivia el dolor y reduce la fiebre",
          category: "Analgésicos"
        },
        { 
          name: "Ibuprofeno 400mg", 
          price: 7.50, 
          image: "https://www.farmaciasdesimilares.com.mx/wp-content/uploads/2022/03/7502223700293.jpg",
          description: "Antiinflamatorio y analgésico",
          category: "Analgésicos"
        },
        { 
          name: "Aspirina", 
          price: 6.25, 
          image: "https://www.bayer.com.mx/sites/g/files/kmftyc461/files/2023-04/aspirina-100-mg-10-tabletas.jpg",
          description: "Alivia el dolor y previene coágulos",
          category: "Analgésicos"
        }
      ]
    },
    {
      name: "Vitaminas",
      products: [
        { 
          name: "Vitamina C 1000mg", 
          price: 12.00, 
          image: "https://www.fahorro.com/media/catalog/product/cache/1d01ed3f1ecf95f5c6a3b4e4e4d5d4a9/7/5/7506339312398.jpg",
          description: "Refuerza el sistema inmunológico",
          category: "Vitaminas"
        },
        { 
          name: "Vitamina D3", 
          price: 15.75, 
          image: "https://www.naturitas.es/dw/image/v2/BDTX_PRD/on/demandware.static/-/Sites-naturitas-master-catalog/default/dw6d6f9f2d/images/large/72242-1-vitamina-d3-4000-ui-120-perlas-solaray.jpg",
          description: "Esencial para huesos y sistema inmune",
          category: "Vitaminas"
        },
        { 
          name: "Multivitamínico", 
          price: 18.50, 
          image: "https://centrovital.com/wp-content/uploads/2021/12/CENTRUM-HOMBRE-ADULTO-60-COMPRIMIDOS.png",
          description: "Complejo vitamínico completo",
          category: "Vitaminas"
        }
      ]
    },
    {
      name: "Cuidado Personal",
      products: [
        { 
          name: "Jabón Antibacterial", 
          price: 3.25, 
          image: "https://www.sterillium.com.mx/wp-content/uploads/2022/03/7501055300320.png",
          description: "Protección contra bacterias",
          category: "Cuidado Personal"
        },
        { 
          name: "Protector Solar FPS 50", 
          price: 14.99, 
          image: "https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products/sunscreen/am-sunscreen-mineral-spf-50-face-lotion-50ml/cerave-sunscreen-mineral-spf50-face-lotion-50ml-front-1000x1000.png",
          description: "Protección facial avanzada",
          category: "Cuidado Personal"
        },
        { 
          name: "Alcohol en Gel", 
          price: 4.50, 
          image: "https://www.gruponah.com/wp-content/uploads/2021/03/7500435120163.png",
          description: "Desinfección rápida de manos",
          category: "Cuidado Personal"
        }
      ]
    }
  ];

  // Función para obtener todos los productos combinados
  const getAllProducts = () => {
    return productCategories.flatMap(category => 
      category.products.map(product => ({
        ...product,
        categoryName: category.name
      }))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <Hero>
        <button 
          onClick={() => setShowAllProducts(true)}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
        >
          Ver Todos los Productos
        </button>
      </Hero>
      
      <main className="container mx-auto my-12 px-4 flex-grow">
        {productCategories.map((category, index) => (
          <section key={index} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-100 pb-2">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product, idx) => (
                <ProductCard 
                  key={idx} 
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
      
      {/* Modal de todos los productos */}
      {showAllProducts && (
        <AllProductsModal 
          products={getAllProducts()} 
          onClose={() => setShowAllProducts(false)} 
        />
      )}
      
      <Footer />
    </div>
  );
}