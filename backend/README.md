# Backend API - CSV Processor

API REST desarrollada con Node.js y Express para procesar y formatear datos CSV de una API externa.

## Requisitos Técnicos

- Node.js 14
- Express
- Mocha & Chai (Testing)

## Instalación y Uso

1. Instalar dependencias:

   ```
   npm install
   ```

2. Iniciar el servidor (Puerto 3000):

   ```
   npm start
   ```

3. Ejecutar tests:

   ```
   npm test
   ```

4. Linter (StandardJS):

   ```
   npm run lint
   ```

## Endpoints

- `GET /files/data`: Retorna todos los archivos procesados.
- `GET /files/data?fileName=test1.csv`: Retorna un archivo específico.
- `GET /files/list`: Lista de archivos disponibles.
