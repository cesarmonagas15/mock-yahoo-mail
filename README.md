# Mock Yahoo Mail UI

Una interfaz simulada de Yahoo Mail construida con React y TypeScript, completamente en español.

## Características

- **Interfaz en español**: Todos los elementos de la UI están en español
- **Diseño moderno**: Estilo visual similar a Yahoo Mail con colores suaves grises y acentos púrpura
- **Sidebar funcional**: Navegación con Bandeja de entrada, Destacados, Enviados, etc.
- **Lista de emails**: Muestra remitente, asunto, fragmento, timestamp y etiquetas de clasificación
- **Etiquetas de clasificación**: Cada email tiene etiquetas `oldLabel` y `newLabel`
- **Responsive**: Diseño adaptable para diferentes tamaños de pantalla

## Estructura de datos

Los emails siguen esta estructura:

```typescript
interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  oldLabel: string;  // e.g. "Newsletter"
  newLabel: string;  // e.g. "Oferta"
}
```

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

```
src/
├── components/
│   ├── Sidebar.tsx      # Barra lateral con navegación
│   ├── Header.tsx       # Encabezado con barra de búsqueda
│   └── EmailList.tsx    # Lista de emails
├── data/
│   └── emails.ts        # Datos de ejemplo de emails
├── App.tsx              # Componente principal
├── index.tsx            # Punto de entrada
└── index.css            # Estilos globales
```

## Tecnologías utilizadas

- React 18
- TypeScript
- CSS3 con diseño responsive
- Emojis para iconos (compatible con todos los navegadores modernos)

## Personalización

Puedes modificar los emails de ejemplo editando el archivo `src/data/emails.ts`. Cada email debe seguir la interfaz `Email` definida.

Los estilos se pueden personalizar editando `src/index.css`. Los colores principales son:
- Púrpura principal: `#720e9e`
- Gris suave: `#f5f5f5`
- Gris de borde: `#e1e1e1` 