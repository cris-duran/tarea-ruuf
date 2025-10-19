# Tarea Dev Mid - Ruuf - Cristian Durán

## Stack
Se utiliza NextJs por simplicidad para crear una app básica y rápida para resolver el desafío.

## Instrucciones

### Requisitos Previos
node v20.16.0

### Instalación
```
npm install
```

### Cómo Ejecutar
```
npm run dev
```

### Acceso a la Aplicación
http://localhost:3000/

## Solución

### Explicación del algoritmo
Para encontrar de forma rápida la cantidad de paneles solares que caben en el techo se calcula el área del techo y de los paneles y se hace la división de los áreas para encontrar la cantidad máxima de paneles que caben.
Para dibujar la grilla se realiza un bucle para cada eje de la grilla y se recorre llenando los paneles de acuerdo al ancho (eje x) y largo (eje y). También se cálculan los limites hasta dónde se pueden llenar los paneles en esa rotación y una vez que se terminan de llenar se revisa (por cada eje) si se pueden agregar más paneles pero en este caso rotados, si es posible se llenan los paneles restantes.

### Decisiones técnicas
Se utiliza NextJs por simplicidad para crear una app básica y rápida para resolver el desafío. Además se incluyen paquetes para las notificaciones y el dibujo de las figuras geometricas para que la interfaz se vea más atractiva y usable.

### Estructura del proyecto
El proyecto contiene la pagina principal donde se visualiza el formulario y un componente para la grilla.