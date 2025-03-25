export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h1 className="text-2xl font-bold">Farmacia bing bong</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-white hover:text-blue-200">Inicio</a></li>
            <li><a href="#" className="text-white hover:text-blue-200">Productos</a></li>
            <li><a href="#" className="text-white hover:text-blue-200">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}