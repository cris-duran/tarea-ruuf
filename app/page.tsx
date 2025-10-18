'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  // Estado para las dimensiones de los paneles solares
  const [panelDimensions, setPanelDimensions] = useState({
    x: 0,
    y: 0
  });
  // Estado para las dimensiones del techo
  const [roofDimensions, setRoofDimensions] = useState({
    x: 0,
    y: 0
  });

  // Función para manejar el cambio de las dimensiones de los paneles solares
  const handlePanelChange = (field: 'x' | 'y', value: string) => {
    setPanelDimensions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para manejar el cambio de las dimensiones del techo
  const handleRoofChange = (field: 'x' | 'y', value: string) => {
    setRoofDimensions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calcular cuántos paneles caben en el techo
  const calculatePanels = () => {
    try {
      // Validación
      if(panelDimensions.x === 0 || panelDimensions.y === 0 || roofDimensions.x === 0 || roofDimensions.y === 0) {
        throw new Error('Las dimensiones no pueden ser 0 o estar vacías');
      }
      const panelArea = panelDimensions.x * panelDimensions.y;
      const roofArea = roofDimensions.x * roofDimensions.y;
      const totalPanels = Math.floor(roofArea / panelArea);
      console.log('totalPanels', totalPanels);
      toast.info(`Total de paneles que caben en el techo: ${totalPanels}`);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePanels();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          ¿Cuántos paneles solares caben en mi techo?
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dimensiones de los paneles solares */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-blue-800">
              Dimensiones de los Paneles Solares
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="panel-x" className="block text-sm font-medium text-gray-700 mb-1">
                  Ancho (X)
                </label>
                <input
                  type="string"
                  id="panel-x"
                  value={panelDimensions.x}
                  onChange={(e) => handlePanelChange('x', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Ej: 1.0"
                />
              </div>
              <div>
                <label htmlFor="panel-y" className="block text-sm font-medium text-gray-700 mb-1">
                  Largo (Y)
                </label>
                <input
                  type="string"
                  id="panel-y"
                  value={panelDimensions.y}
                  onChange={(e) => handlePanelChange('y', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Ej: 2.0"
                />
              </div>
            </div>
          </div>

          {/* Dimensiones del techo */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-green-800">
              Dimensiones del Techo
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="roof-x" className="block text-sm font-medium text-gray-700 mb-1">
                  Ancho (X)
                </label>
                <input
                  type="string"
                  id="roof-x"
                  value={roofDimensions.x}
                  onChange={(e) => handleRoofChange('x', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  placeholder="Ej: 10.0"
                />
              </div>
              <div>
                <label htmlFor="roof-y" className="block text-sm font-medium text-gray-700 mb-1">
                  Largo (Y)
                </label>
                <input
                  type="string"
                  id="roof-y"
                  value={roofDimensions.y}
                  onChange={(e) => handleRoofChange('y', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
                  placeholder="Ej: 8.0"
                />
              </div>
            </div>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            style={{ cursor: 'pointer' }}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Calcular
          </button>
        </form>
      </div>
    </div>
  );
}
