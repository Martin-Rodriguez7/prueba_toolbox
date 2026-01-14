# Full Stack Challenge - CSV Processor

Este proyecto es una aplicación Full Stack que consume una API de archivos externa, procesa la información y la muestra en una interfaz web.

## Inicio Rápido con Docker

La forma más sencilla de correr todo el proyecto (Backend + Frontend) es usando Docker Compose:

```
docker-compose up --build
```

- **Frontend**: <http://localhost:3001>
- **Backend**: <http://localhost:3000>

---

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

1. **Backend**: API REST construida con Node.js 14 y Express.
   - Procesa archivos CSV.
   - Implementa Strategy Pattern para validaciones.
   - Tests con Mocha + Chai.

2. **Frontend**: Cliente web construido con React 19 y Bootstrap.
   - Gestión de estado con Redux Toolkit.
   - Testing con Jest y React Testing Library.

---

## Requisitos previos

- Docker & Docker Compose
- Node.js (opcional, si se corre sin Docker)

Para más detalles sobre cada componente, consulta los README específicos dentro de sus carpetas.
