export default function Hero({ onShowProducts }) {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">Bienvenido a Farmacia bing bong</h2>
        <p className="text-xl text-blue-600 mb-8">Tu salud es nuestra prioridad</p>
        <button 
          onClick={onShowProducts}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver productos
        </button>
      </div>
    </section>
  );
}