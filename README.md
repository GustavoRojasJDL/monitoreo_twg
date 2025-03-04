# Monitoreo TWG

## Descripción

Monitoreo_TWG es una aplicación web diseñada para visualizar y gestionar el estado de una flota de vehículos. Esta herramienta proporciona una solución completa para la supervisión en tiempo real y reporte de kilometraje.

Este proyecto utiliza **Next.js**, **React** y **Tailwind CSS**. A continuación, se presentan los pasos para montar y ejecutar el proyecto.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- Node.js y npm
- Git

## Paso 1: Clonar el repositorio

```bash
git clone https://github.com/GustavoRojasJDL/monitoreo_twg.git
cd monitoreo_twg
```

## Paso 2: Instalación de dependencias
  1. Instalar las dependencias del proyecto:
     ```bash
     npm install
     ```

## Paso 3: Ejecutar el servidor
  1. Levantar el servidor de desarrollo de Next.js:
     ```bash
     npm run dev
     ```
## Scripts del package.json
El archivo package.json contiene los siguientes scripts:
  ```json
  {
    "scripts": {
      "dev": "next dev --turbo pack",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "start:json-server": "json-server --watch db.json --port 3001",
      "generate-fake-data": "npx tsx scripts/mockData.js"
    }
  }
  ```
## Descripción de los scripts
  - dev: Inicia el servidor de desarrollo de Next.js.
  - build: Construye el proyecto para producción.
  - start: Inicia el servidor en modo de producción.
  - lint: Ejecuta ESLint para analizar el código.
  - start:json-server: Inicia JSON Server en el puerto 3001 para mockear el API que provee la informacion a la aplicacion web.
  - generate-fake-data: Genera datos falsos utilizando el script mockData.js.

## Paso 5: Acceder a la aplicación
  1. Abrir tu navegador web y acceder a http://localhost:3000 para ver la aplicación en          funcionamiento.
