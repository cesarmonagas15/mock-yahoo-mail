# Mock Yahoo Mail UI

Una interfaz simulada de Yahoo Mail construida con React y TypeScript, completamente en español.

## Características

- Interfaz en español: Todos los elementos de la UI están en español  
- Diseño moderno: Estilo visual similar a Yahoo Mail con colores suaves grises y acentos púrpura  
- Sidebar funcional: Navegación con Bandeja de entrada, Destacados, Enviados, etc.  
- Lista de emails: Muestra remitente, asunto, fragmento, timestamp y etiquetas de clasificación  
- Etiquetas de clasificación: Cada email tiene etiquetas `oldLabel` y `newLabel`  
- Clasificación automática: Los correos se clasifican usando un modelo de HuggingFace en el backend  
- Botón para limpiar etiquetas: Permite reiniciar la clasificación  
- Modal de carga: Animación con mensaje personalizado mientras corre la clasificación  
- Responsive: Diseño adaptable para diferentes tamaños de pantalla  

## Estructura de datos

Los emails siguen esta estructura:

```ts
interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  oldLabel: string;  // e.g. "Newsletter"
  newLabel: string;  // e.g. "Oferta"
  isRead: boolean;
}
```

## Instalación

Instala las dependencias del frontend:

```bash
cd frontend
npm install
```

Instala las dependencias del backend:

```bash
cd ../backend
npm install
```

Crea un archivo `.env` en la carpeta `backend` con tu token de HuggingFace:

```ini
HF_TOKEN=tu_token_aquí
```

Inicia el servidor backend:

```bash
npm start
```

Inicia la aplicación React:

```bash
cd ../frontend
npm start
```

Abre `http://localhost:3000` en tu navegador. El backend se ejecuta en `http://localhost:4000`.

## Estructura del proyecto

### Frontend

```
src/
├── components/
│   ├── Sidebar.tsx      # Barra lateral con navegación
│   ├── Header.tsx       # Encabezado con barra de búsqueda y botones
│   ├── EmailList.tsx    # Lista de emails
│   ├── EmailDetail.tsx  # Vista individual del email
│   └── LoadingModal.tsx # Modal de carga con mensaje bilingüe
├── store/
│   └── emailStore.ts    # Zustand store global
├── App.tsx              # Componente principal
├── index.tsx            # Punto de entrada
└── index.css            # Estilos globales
```

### Backend

```
backend/
├── data/
│   └── emails.json         # Emails simulados (fuente de verdad)
├── routes/
│   └── classify.js         # Endpoint de clasificación usando HuggingFace
├── .env                    # Contiene HF_TOKEN (excluido por .gitignore)
├── index.js                # Servidor Express
└── package.json
```

## Tecnologías utilizadas

- React 18  
- TypeScript  
- Zustand  
- Node.js + Express  
- HuggingFace Inference API  
- CSS3 con diseño responsive  

## Personalización

- Puedes modificar los correos de ejemplo en `backend/data/emails.json`.  
- Para cambiar el modelo de clasificación, edita `backend/routes/classify.js`.  
- Los estilos están definidos en `src/index.css`. Los colores principales son:

```yaml
Púrpura principal: #720e9e  
Gris suave: #f5f5f5  
Gris de borde: #e1e1e1  
```
