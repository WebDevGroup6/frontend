export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Farmacia bing bong</h3>
              <p>Av. Principal 123, Ciudad</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horario</h3>
              <p>Lunes a Viernes: 8:00 - 20:00</p>
              <p>Sábados: 9:00 - 14:00</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p>Email: info@farmaciasalud.com</p>
              <p>Teléfono: +123 456 789</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2025 Farmacia Salud. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }