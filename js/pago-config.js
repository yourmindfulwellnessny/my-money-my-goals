/*
 * Pagos del taller "My Money, My Goals" (archivo PÚBLICO: sin claves ni datos de familias).
 * Enlaces de pago de Stripe propios del taller, en la cuenta Mindful Wellness and Coaching.
 * Productos separados de las cajitas: "My Money, My Goals · N niño(s)/hermanos".
 */
window.PAGO_CONFIG = {
  totals: { 1: 60, 2: 110, 3: 160, 4: 210 },
  stripe: {
    1: "https://buy.stripe.com/9B68wQgfv5Sc5VC0e2enS0j",
    2: "https://buy.stripe.com/6oU28s7IZgwQ4Ry9OCenS0k",
    3: "https://buy.stripe.com/9B64gAfbr1BW1Fme4SenS0l",
    4: "https://buy.stripe.com/9B6cN62oF94o1Fm1i6enS0m"
  },
  zelle: {
    nombre: "Mindful Wellness & Coaching LLC",
    telefono: "201-679-9969",
    qr: "assets/zelle-qr.jpg"
  },
  // WhatsApp de Mindful Wellness para enviar el comprobante de Zelle (solo números).
  whatsapp: "12016799969",
  // Prefijo del código de pago (para no mezclarlo con los pedidos de las cajitas).
  prefijo: "MMMG"
};
