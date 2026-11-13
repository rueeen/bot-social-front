# EcoForo

Laboratorio educativo para observar la influencia de bots identificados sobre una población sintética. Frontend React + Vite, Axios, React Router y Recharts. No conecta con redes sociales reales.

## Desarrollo

Requiere Node.js 22.12 o superior (verificado con Node 24) y npm.

```sh
npm ci
cp .env.example .env.local
# Editar VITE_API_URL con la URL real del backend Django
npm run dev
```

`VITE_API_URL` es la raíz de la API, sin barra final (por ejemplo `https://docente.pythonanywhere.com/api`). `VITE_NOMBRE_APP` cambia el nombre de la cabecera. Si falta la URL, se usa `/api` en el mismo origen. Las variables Vite son públicas: no poner secretos en ellas. Reiniciar Vite después de editarlas.

```sh
npm run build
npm run preview
```

La arquitectura es plana: las páginas llaman directamente a la API; `src/api.js` concentra Axios, autenticación y avisos. Los intervalos se limpian al cambiar de página, evitan solicitudes superpuestas y pausan las consultas en pestañas ocultas. No hay paginación: el backend debe devolver listas completas (también se acepta un contenedor `results`).

## Contrato esperado del backend

Contrato verificado de `bot-social-back`, fuente de verdad de la API. Los nombres se usan directamente en las páginas, sin una capa de datos adicional.

| Método y ruta | Entrada / respuesta |
| --- | --- |
| GET `/hilos/` | Lista de hilos |
| GET `/hilos/:id/` | Hilo |
| GET `/hilos/:id/comentarios/?desde_id=N&corrida=:id` | `{comentarios: [...], ultimo_id: N}`; `corrida` opcional |
| POST `/hilos/:id/comentarios/` | `{autor_nombre, texto}` (humano), más `{es_bot:true, postura_bot, corrida}` (bot autorizado) → comentario creado |
| GET `/hilos/:id/corridas/` | Lista de `{id, etiqueta}` |
| GET `/hilos/:id/snapshots/` | Lista de snapshots de todas las corridas, incluida ronda 0 |
| POST `/token/` | `{username,password}` → `{access,refresh}` |
| POST `/token/refresh/` | `{refresh}` → `{access,refresh?}` |
| GET / POST `/panel/hilos/` | Listar / crear hilo |
| PATCH `/panel/hilos/:id/` | `{estado: "abierto" o "cerrado"}` → hilo actualizado |

Hilo: `{id,titulo,tema,pregunta_postura,estado}`. Comentario: `{id,hilo,autor_nombre,texto,fecha,es_bot,postura_bot,corrida}`; `fecha` ISO 8601, `postura_bot` `favor`, `contra`, `neutral` (también acepta `a_favor`, `en_contra` o un número firmado). Los IDs de comentario son numéricos y crecientes. El servidor debe ordenarlos por ID ascendente para mantener la conversación estable.

Snapshot de ejemplo:

```json
{
  "corrida": 1,
  "ronda": 0,
  "promedio": 12.5,
  "n_comentarios_bot": 7,
  "n_favor": 4,
  "n_contra": 2,
  "n_neutral": 1,
  "histograma": {"-100": 0, "-80": 1, "-60": 2, "-40": 3, "-20": 8, "0": 12, "20": 7, "40": 4, "60": 2, "80": 1}
}
```

`n_comentarios_bot`, `n_favor`, `n_contra` y `n_neutral` contienen los conteos del snapshot. El cambio de postura se calcula frente a ronda 0, nunca frente al primer dato disponible si falta esa ronda. La banda de dispersión y el reinicio de simulación son opcionales y no están incluidos.

## Autenticación e integridad

El login guarda JWT en `localStorage.access_token` y `refresh_token`. Solo `/panel/` recibe `Authorization: Bearer`; un 401 renueva una vez y las solicitudes concurrentes comparten la renovación. Si falla, se cierra la sesión. El backend devuelve errores `{"error":"mensaje"}` para mostrarlos en un aviso.

Axios agrega `X-Bot-Token` si existe `localStorage.bot_token`, excepto en solicitudes explícitamente humanas. Sin token, el formulario envía solo nombre (hasta 30 caracteres) y texto (hasta 400). Con token, el mismo formulario permite publicar al bot Playwright e incluye `es_bot: true`, `postura_bot` y `corrida` desde localStorage. El token autoriza y el cuerpo identifica el comentario como bot.

**El backend debe imponer esta separación**: ignorar/rechazar `es_bot` y postura proporcionados por un humano, validar el token de bot, impedir publicaciones en hilos cerrados y exigir JWT en operaciones de presentador. El navegador no puede garantizar permisos del servidor. El backend debe configurar CORS para el origen de Netlify y permitir `Authorization`, `Content-Type` y `X-Bot-Token`. Usar HTTPS y no registrar tokens. La aplicación no pide tokens en su UI.

## Netlify

- Comando de build: `npm run build`.
- Directorio de publicación: `dist`.
- Configurar `VITE_API_URL` y opcionalmente `VITE_NOMBRE_APP` en las variables de build.
- `public/_redirects` se copia a `dist` y permite abrir rutas como `/h/1/panel` directamente.
- Autorizar el origen publicado en CORS de Django. Los secretos de bots/presentador nunca deben ser variables Vite.

## Checklist del día de clase

1. Verificar API, CORS y acceso del presentador.
2. Crear un hilo con tema y pregunta de postura; dejarlo abierto.
3. Ejecutar un escenario desde el controlador local `simulador/` del proyecto correspondiente.
4. Mostrar el foro: comprobar que los bots llevan insignia y postura. El polling de comentarios es de 4 segundos.
5. Abrir el dashboard y pantalla completa: actualiza cada 2 segundos.
6. Ejecutar «sin bots» y «solo a favor» con la misma población inicial; seleccionar ambas líneas y comparar la evolución.
7. Elegir una corrida para ver su última distribución y el cambio desde ronda 0.
8. Cerrar el hilo y comprobar que ya no acepta comentarios.

## Validación y límites

La compilación comprueba que todos los módulos de producción se resuelven. No hay ESLint configurado ni un script que lo ejecute. La aceptación con el simulador real requiere el backend y datos compatibles con el contrato anterior; no se incluyen datos ficticios en producción ni se presentan como resultados reales.
