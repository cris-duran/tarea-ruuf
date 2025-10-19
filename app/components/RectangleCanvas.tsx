'use client';

import { Layer, Rect, Stage } from 'react-konva';

interface RectangleCanvasProps {
  panelDimensions: { x: number; y: number };
  roofDimensions: { x: number; y: number };
  width?: number;
  height?: number;
}

export default function RectangleCanvas({ 
  panelDimensions, 
  roofDimensions, 
  width = 600, 
  height = 400 
}: RectangleCanvasProps) {

  // Calcular la escala para que el techo se ajuste al canvas
  const scaleX = width / (roofDimensions.x * 10); // Factor de escala para visualización
  const scaleY = height / (roofDimensions.y * 10);
  const scale = Math.min(scaleX, scaleY, 1); // No ampliar más de 1:1

  // Dimensiones escaladas
  const scaledRoofWidth = roofDimensions.x * 10 * scale;
  const scaledRoofHeight = roofDimensions.y * 10 * scale;
  const scaledPanelWidth = panelDimensions.x * 10 * scale;
  const scaledPanelHeight = panelDimensions.y * 10 * scale;

  // Calcular limites de paneles normales
  const normalPanelsLimits = {
    x: Math.floor(scaledRoofWidth / scaledPanelWidth) * scaledPanelWidth,
    y: Math.floor(scaledRoofHeight / scaledPanelHeight) * scaledPanelHeight
  };


  // Función para calcular la mejor disposición de paneles
  const calculateOptimalLayout = () => {
    const panels = [];
            
    // Generar posiciones de paneles
    for (let y = 0; y + scaledPanelHeight <= scaledRoofHeight; y+=scaledPanelHeight) {
        for (let x = 0; x + scaledPanelWidth <= scaledRoofWidth; x+=scaledPanelWidth) {
            const panel = {
                x,
                y,
                width: scaledPanelWidth,
                height: scaledPanelHeight,
                id: `panel-${x}-${y}`
            };
            panels.push(panel);
        }
    }

    // Generar posiciones de paneles rotados
    // EJE Y
    const spaceY = scaledRoofHeight - normalPanelsLimits.y;
    if (spaceY >= scaledPanelWidth) {
        for (let x = 0; x + scaledPanelHeight <= scaledRoofWidth; x+=scaledPanelHeight) {
            const y = normalPanelsLimits.y;
            const panel = {
                x,
                y,
                width: scaledPanelHeight,
                height: scaledPanelWidth,
                id: `panel-rotated-${x}-${y}`
            };
            panels.push(panel);
        }
    }
    // EJE X
    const spaceX = scaledRoofWidth - normalPanelsLimits.x;
    if (spaceX >= scaledPanelHeight) {
        for (let y = 0; y + scaledPanelWidth <= scaledRoofHeight; y+=scaledPanelWidth) {
            const x = normalPanelsLimits.x;
            const panel = {
                x,
                y,
                width: scaledPanelHeight,
                height: scaledPanelWidth,
                id: `panel-rotated-${x}-${y}`
            };
            panels.push(panel);
        }
    }

    return { panels, totalPanels: panels.length };
  };

  const { panels, totalPanels } = calculateOptimalLayout();

  // Centrar el canvas
  const offsetX = (width - scaledRoofWidth) / 2;
  const offsetY = (height - scaledRoofHeight) / 2;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600">
          Total de paneles que caben: <span className="font-bold text-blue-600">{totalPanels}</span>
        </p>
        <p className="text-xs text-gray-500">
          Escala: 1 unidad = {Math.round(10 * scale)}px
        </p>
      </div>
      
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <Stage
          width={width}
          height={height}
          style={{ backgroundColor: '#f8fafc' }}
        >
          <Layer>
            {/* Techo (rectángulo verde) */}
            <Rect
              x={offsetX}
              y={offsetY}
              width={scaledRoofWidth}
              height={scaledRoofHeight}
              fill="#10b981"
              stroke="#059669"
              strokeWidth={2}
              cornerRadius={4}
            />
            
            {/* Paneles solares (rectángulos azules) */}
            {panels.map((panel) => (
              <Rect
                key={panel.id}
                x={offsetX + panel.x}
                y={offsetY + panel.y}
                width={panel.width}
                height={panel.height}
                rotation={0}
                fill="#3b82f6"
                stroke="#1d4ed8"
                strokeWidth={1}
                cornerRadius={2}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Techo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Paneles Solares</span>
          </div>
        </div>
      </div>
    </div>
  );
}
