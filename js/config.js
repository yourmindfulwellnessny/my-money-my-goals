/*
 * Configuración pública del taller "My Money, My Goals".
 * Este archivo es PÚBLICO: no pongas aquí contraseñas, claves ni datos de familias.
 * Edita estos valores y vuelve a publicar la página.
 */
window.WORKSHOP_CONFIG = {
  // Fecha y horario confirmados por la organizadora (formato ISO para el calendario).
  date: "2026-11-07",
  startTime: "09:00",
  endTime: "11:30",

  // En la página pública solo se muestra la ciudad. La dirección exacta va solo en la confirmación privada.
  publicLocation: "Wallington, NJ",

  // Precios (USD). Fórmula: primer niño + hermano adicional × (niños − 1).
  priceFirstChild: 60,
  priceAdditionalSibling: 50,

  // Cupo máximo total (no por grupo).
  maxChildren: 14,

  // Inscripción: mantener en false hasta que el pago (Stripe), las condiciones de
  // cancelación y el aviso de privacidad estén aprobados y conectados.
  // Abierta como solicitudes (el pago se coordina después de recibir la inscripción).
  registrationOpen: true,

  // Enlace del formulario de Jotform (se completa cuando el formulario esté listo).
  // Formulario en Jotform (desactivado en Jotform hasta el lanzamiento).
  registrationFormUrl: "https://form.jotform.com/262935586277170",

  // Contacto público. Deja vacío lo que no deba publicarse.
  contactEmail: "yourmindfulwellnessny@gmail.com",
  instagram: "" // ej. "mindfulwellnessnyc" — solo si la organizadora lo aprueba
};
