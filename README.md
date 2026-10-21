# My Money, My Goals — página del taller

Página pública de lanzamiento del taller infantil **My Money, My Goals / Mi dinero, mis metas** de Mindful Wellness & Coaching.

- **Página (GitHub Pages):** https://yourmindfulwellnessny.github.io/my-money-my-goals/
- **Formulario de inscripción (Jotform):** https://form.jotform.com/262935586277170 — **abierto como solicitudes** desde el 21 oct 2026 (el pago se coordina después).

## Arquitectura

| Parte | Dónde vive | Qué contiene |
|---|---|---|
| Página pública | Este repositorio + GitHub Pages | Solo HTML, CSS, JS, el logo y la foto del flyer. **Ningún dato de familias.** |
| Inscripciones, alergias, permisos | Cuenta privada de Jotform (`yourmindfulwellnessny`) | Respuestas del formulario. Solo se accede con el inicio de sesión de la cuenta. |
| Pago | Stripe, conectado dentro de Jotform (**pendiente**) | Jotform y Stripe procesan la tarjeta; ni la página ni este repo la ven. |
| Notificaciones | Jotform → yourmindfulwellnessny@gmail.com | Un correo por cada solicitud recibida. |

No hay servidor propio ni base de datos propia: Jotform cumple ese papel (almacenamiento privado, acceso autenticado, validación en su servidor, protección anti-spam, exportación). Por eso **no se necesitan claves en este repositorio**; ver `.env.example`.

## Estructura

```
index.html          Página (todas las secciones)
css/styles.css      Estilos (morado, verde, crema, amarillo y coral del flyer)
js/config.js        Fecha, horario, precios, cupo, enlace del formulario, interruptor de inscripción
js/i18n.js          Textos en inglés y español
js/app.js           Selector de idioma, fecha/hora, calculadora de precio, estado de inscripción
assets/             Logo oficial (sin modificar, solo recortado el margen blanco), foto del flyer y flyer completo
```

## Cómo publicar cambios

1. Edita los archivos (por ejemplo, `js/config.js`).
2. Haz commit y push a la rama `main`.
3. GitHub Pages publica automáticamente en 1–2 minutos (Settings → Pages: "Deploy from a branch", `main` / root).

## Política de cancelación (aprobada por la organizadora)

- Avisar con un mínimo de 24 horas de anticipación al inicio del taller.
- No se realizan reembolsos.
- Con aviso de al menos 24 horas, el niño recibe un crédito para una actividad similar de Mindful Wellness.
- Avisos con menos de 24 horas o inasistencia sin aviso no generan crédito.

Aparece en la página (preguntas frecuentes) y en el paso 6 del formulario, en inglés y español.

## Fotos

- Portada: fotografía del flyer aprobado, completa (sin recortes de caras).
- Secciones: fotos reales con licencia gratuita de Pexels y Unsplash, enlazadas desde sus servidores, con crédito a cada fotógrafo en el pie de página.
- Equipo: foto de Mónica (`assets/team-monica.jpg`). Para agregar a Jessica y Andrea: guardar `assets/team-jessica.jpg` y `assets/team-andrea.jpg` (cuadradas, mínimo 600×600) y reemplazar el bloque `person__photo--pending` en `index.html` por una etiqueta `<img>` igual a la de Mónica.

## Pago con Stripe (siguiente paso)

1. **Stripe:** en Jotform → Build → agregar el elemento *Stripe* → conectar la cuenta de Stripe → configurar el cobro con el total calculado (`totalDue`) o con productos "Primer niño $60" + "Hermano adicional $50". Probar en modo de prueba de Stripe.
2. **Aviso de privacidad:** el texto actual describe cómo se guardan los datos; confirmar que la organizadora lo aprueba.
3. **Cupo:** decidir qué estados ocupan cupo y cuánto dura una reserva pendiente (ver "Cupos" abajo).
4. **Plan de Jotform:** el plan gratis permite **10 envíos con pago al mes** y 100 envíos al mes. Para 14 niños con pago en línea probablemente se necesita el plan Bronze.

## Cupos (máximo 14 niños en total)

Jotform no cuenta niños de forma atómica (cuenta formularios), así que el control es:

- La página y el formulario dicen que enviar es una **solicitud**, no un cupo confirmado.
- En **Jotform Tables**, filtrar por estado y sumar el campo *How many children* de las inscripciones que ocupan cupo.
- Al llegar a 14: cambiar el formulario a lista de espera (Settings → Form Status → *Disable on date/limit* o editar el texto) **antes** de cobrar más.
- Una familia con hermanos solo se cobra si hay cupo para todos; si no, se le ofrece lista de espera sin cobrar.

> Si en el futuro se necesita control estricto por niño con inscripciones simultáneas, habría que agregar un backend (por ejemplo Supabase) que reserve los cupos antes del pago.

## Estados de inscripción

Jotform Tables → agregar una columna **Estado** con las opciones: `Solicitud recibida`, `Pendiente de pago`, `Confirmada`, `Cancelada`, `Lista de espera`. Mientras Stripe no esté conectado, todo envío entra como *Solicitud recibida*; la página de agradecimiento dice explícitamente que **no** es un cupo confirmado y que **no** se recibió pago.

## Cómo administrar las inscripciones (equipo)

- **Ver y buscar:** jotform.com → My Forms → *My Money, My Goals – Family Registration* → **Tables** (o Inbox).
- **Alergias y apoyos:** columnas `c1Allergy`, `c1AllergyList`, `c1Diet`, `c1AllergyEmerg` (igual para c2–c4).
- **Grupos:** `c1Group` … `c4Group` (asignado automáticamente según la fecha de nacimiento).
- **Permiso de fotos por niño:** `c1Photo` … `c4Photo`.
- **Quién recoge:** `pickup`, `pickName`, `pickRelation`, `pickPhone`.
- **Exportar lista operativa:** Tables → Download → Excel/CSV. **No subir ese archivo a GitHub** (está bloqueado en `.gitignore`).
- **Corregir:** abrir el envío → Edit. **Eliminar:** seleccionar → Delete (Jotform pide confirmación).
- **Acceso del equipo:** compartir solo con quien lo necesite desde Jotform (Share → colaboradores con permiso de solo lectura). No compartir enlaces públicos de Tables.

## Datos después del taller

- Dentro de los 30 días posteriores al taller (plazo sugerido, pendiente de aprobación): exportar solo lo necesario para registros contables y **borrar los envíos** de Jotform, incluidos los de la papelera.
- Borrar exportaciones locales (CSV/Excel) que ya no se necesiten.
- Quitar el acceso de colaboradores que ya no lo necesiten.

## Pruebas realizadas (21 oct 2026)

**Página**
- Celular (390 px) y escritorio (1280 px): sin desplazamiento horizontal ni errores de JavaScript.
- Selector EN/ES: cambia todos los textos, el título y el texto alternativo de la foto; ambos idiomas indican que el taller es completamente en inglés.
- Calculadora: 1 niño = $60, 2 = $110, 3 = $160.

**Formulario Jotform (sin enviar)**
- Fichas de hijos 2–4 aparecen y desaparecen según el número de niños.
- Total: $60 / $110 / $160 / $210.
- Edad y grupo en las fechas límite: nacido 8-nov-2016 → 9 años, grupo 7–9; 7-nov-2016 → 10 años, grupo 10–13; 7-nov-2019 → 7; 8-nov-2012 → 13.
- Fuera de rango: la edad queda vacía y el campo es obligatorio, así que no deja avanzar.
- "¿Alergias? Sí" muestra y exige "¿Cuáles?"; "No" lo oculta.
- Grado "Otro" muestra el campo para especificar.
- "Otra persona autorizada" muestra nombre, relación y teléfono.
- Cambio de idioma inglés ↔ español sin perder respuestas; la lógica funciona en ambos idiomas.
- Resumen del paso 7 con niños, grupos y total.

**Pendiente de probar**
- Envíos de prueba con 1, 2 y 3 hermanos (requiere autorización y activar el formulario temporalmente).
- Pago fallido, pendiente y confirmado (cuando Stripe esté conectado).
- Concurrencia de cupos (ver "Cupos").
