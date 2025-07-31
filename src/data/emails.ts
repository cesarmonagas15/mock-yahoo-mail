export interface Email {
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

export const sampleEmails: Email[] = [
  {
    id: "1",
    sender: "no-reply@newsletters.xataka.com",
    subject: "Confirma tu suscripción a Xataka",
    snippet: "¡Gracias por tu interés en Xataka! Confirma tu suscripción y pronto recibirás el siguiente envío. Confirma tu suscripción ahora...",
    body: "¡Gracias por tu interés en Xataka! Confirma tu suscripción y pronto recibirás el siguiente envío con las últimas noticias de tecnología.",
    timestamp: "5:02 p.m.",
    oldLabel: "Noticias",
    newLabel: "Tecnología",
    isRead: false
  },
  {
    id: "2",
    sender: "Yahoo Mail",
    subject: "¡Bienvenido a Yahoo Mail!",
    snippet: "Explora tu nueva bandeja de entrada inteligente. Descubre todas las funciones que te ayudarán a organizar tu correo...",
    body: "Explora tu nueva bandeja de entrada inteligente. Descubre todas las funciones que te ayudarán a organizar tu correo de manera más eficiente.",
    timestamp: "4:36 p.m.",
    oldLabel: "Sistema",
    newLabel: "Bienvenida",
    isRead: false
  },
  {
    id: "3",
    sender: "Amazon España",
    subject: "Tu pedido #123-4567890-1234567 ha sido enviado",
    snippet: "¡Hola! Tu pedido ha sido enviado y llegará el martes. Puedes rastrear tu envío aquí...",
    body: "¡Hola! Tu pedido ha sido enviado y llegará el martes. Puedes rastrear tu envío aquí. Gracias por comprar con Amazon.",
    timestamp: "3:15 p.m.",
    oldLabel: "Compras",
    newLabel: "Envío",
    isRead: true
  },
  {
    id: "4",
    sender: "Netflix",
    subject: "Nuevas series disponibles este mes",
    snippet: "Descubre las nuevas series y películas que hemos añadido a Netflix este mes...",
    body: "Descubre las nuevas series y películas que hemos añadido a Netflix este mes. No te pierdas las últimas novedades.",
    timestamp: "2:45 p.m.",
    oldLabel: "Entretenimiento",
    newLabel: "Novedades",
    isRead: true
  },
  {
    id: "5",
    sender: "Banco Santander",
    subject: "Confirmación de transferencia bancaria",
    snippet: "Se ha realizado una transferencia de 150€ a tu cuenta. Detalles de la operación...",
    body: "Se ha realizado una transferencia de 150€ a tu cuenta. Detalles de la operación incluidos en este mensaje.",
    timestamp: "1:30 p.m.",
    oldLabel: "Finanzas",
    newLabel: "Transferencia",
    isRead: false
  },
  {
    id: "6",
    sender: "LinkedIn",
    subject: "María García ha visto tu perfil",
    snippet: "María García, Directora de Marketing en TechCorp, ha visto tu perfil esta semana...",
    body: "María García, Directora de Marketing en TechCorp, ha visto tu perfil esta semana. ¿Te gustaría conectar?",
    timestamp: "12:15 p.m.",
    oldLabel: "Redes Sociales",
    newLabel: "Perfil",
    isRead: true
  },
  {
    id: "7",
    sender: "Spotify",
    subject: "Tu playlist 'Música para trabajar' ha sido actualizada",
    snippet: "Hemos añadido nuevas canciones a tu playlist basándonos en tu historial de escucha...",
    body: "Hemos añadido nuevas canciones a tu playlist basándonos en tu historial de escucha. ¡Disfruta de la nueva música!",
    timestamp: "11:20 a.m.",
    oldLabel: "Música",
    newLabel: "Playlist",
    isRead: true
  },
  {
    id: "8",
    sender: "Uber Eats",
    subject: "¡20% de descuento en tu próxima comida!",
    snippet: "Aprovecha este descuento especial en tu próxima orden. Válido hasta el domingo...",
    body: "Aprovecha este descuento especial en tu próxima orden. Válido hasta el domingo. ¡No te lo pierdas!",
    timestamp: "10:45 a.m.",
    oldLabel: "Comida",
    newLabel: "Oferta",
    isRead: false
  }
]; 