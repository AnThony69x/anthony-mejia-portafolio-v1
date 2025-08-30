# Configuración de EmailJS para Formulario de Contacto

## Descripción
Esta guía te explica cómo configurar EmailJS para habilitar el envío automático de emails desde el formulario de contacto del portfolio.

## Pasos de Configuración

### 1. Crear Cuenta en EmailJS
1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Regístrate o inicia sesión en tu cuenta
3. Ve al dashboard

### 2. Configurar Servicio de Email
1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Configura la conexión con tu email
5. **Anota el Service ID** (ej: `service_portfolio`)

### 3. Crear Template de Email
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template con los siguientes parámetros:

#### Template de Email Recomendado:
```
Subject: {{subject}} - Nuevo mensaje desde el portfolio

Hola Anthony,

Has recibido un nuevo mensaje desde tu portfolio:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este email fue enviado automáticamente desde tu portfolio.
Puedes responder directamente a: {{reply_to}}
```

#### Parámetros del Template:
- `{{from_name}}` - Nombre del usuario
- `{{from_email}}` - Email del usuario  
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Mensaje completo
- `{{to_email}}` - Tu email de destino (anthony.dev@gmail.com)
- `{{reply_to}}` - Para poder responder directamente

4. **Anota el Template ID** (ej: `template_contact`)

### 4. Obtener Public Key
1. Ve a **"Account"** en el dashboard
2. En la sección **"API Keys"**
3. **Anota tu Public Key** (ej: `your_public_key_here`)

### 5. Configurar Variables en el Código

Edita el archivo `src/components/Contacto/Contacto.jsx` y actualiza estas variables:

```javascript
// EmailJS configuration
const EMAILJS_SERVICE_ID = 'tu_service_id_aqui'     // Desde paso 2
const EMAILJS_TEMPLATE_ID = 'tu_template_id_aqui'   // Desde paso 3  
const EMAILJS_PUBLIC_KEY = 'tu_public_key_aqui'     // Desde paso 4
```

### 6. Configuración de Seguridad (Opcional)
Para mayor seguridad, puedes:

1. **Restricciones de Dominio**: En el dashboard de EmailJS, configura restricciones de dominio
2. **Variables de Entorno**: Mover las keys a variables de entorno
3. **Límites de Rate**: Configurar límites de envío

## Configuración del Email de Destino

El email de destino está configurado como `anthony.dev@gmail.com` en el código. 

Para cambiarlo:
1. Edita la variable `to_email` en el `templateParams` del archivo `Contacto.jsx`
2. O actualiza el template en EmailJS para usar un email fijo

## Funcionalidades Implementadas

✅ **Envío Real de Emails**: Reemplaza el mailto con envío automático  
✅ **Validación de Formulario**: Mantiene validación en tiempo real  
✅ **Estados de Carga**: Spinner durante el envío  
✅ **Mensajes de Éxito/Error**: Feedback visual para el usuario  
✅ **Limpieza de Formulario**: Se limpia automáticamente tras envío exitoso  
✅ **Manejo de Errores**: Gestión robusta de errores de envío  
✅ **UX Mejorada**: Mensajes temporales con animaciones  

## Template de Email Personalizable

El template de EmailJS permite personalizar completamente:
- **Subject**: Asunto dinámico desde el formulario
- **Contenido**: Formato del email recibido  
- **Reply-to**: Respuesta directa al remitente
- **Styling**: HTML para emails más atractivos

## Solución de Problemas

### Error de CORS
Si experimentas errores de CORS:
1. Verifica que el dominio esté configurado correctamente en EmailJS
2. Usa HTTPS en producción

### Emails no llegan
1. Verifica la configuración del servicio de email
2. Revisa la carpeta de spam
3. Confirma que el template tenga el formato correcto

### Rate Limiting  
EmailJS tiene límites gratuitos:
- 200 emails/mes en plan gratuito
- Considera upgrade para mayor volumen

## Testing

Para probar la funcionalidad:
1. Configura las credenciales
2. Ejecuta `npm run dev` 
3. Ve a la sección de contacto
4. Envía un mensaje de prueba
5. Verifica que llegue a tu email

## Seguridad y Buenas Prácticas

- ✅ Las credenciales están en el frontend (normal para EmailJS)
- ✅ EmailJS valida el dominio de origen  
- ✅ Configurar límites de rate apropiados
- ✅ Monitorear usage en el dashboard
- ✅ Usar HTTPS en producción

¡Con esta configuración tendrás un formulario de contacto completamente funcional!