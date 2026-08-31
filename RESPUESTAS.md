# Componente Teórico - Taller React Native

## PREGUNTA 1: Entorno de desarrollo y sistema operativo

**a) Herramientas del entorno móvil**[cite: 1]
*   **Node.js y npm:** Son el motor de nuestro entorno. Node ejecuta JavaScript fuera del navegador y npm nos permite instalar librerías (dependencias) que necesitamos para el proyecto.
*   **Metro bundler:** Es el empaquetador de React Native. Toma todos nuestros archivos JS y los junta en un solo archivo optimizado para que el celular lo entienda rápido.
*   **JDK y Android SDK:** Son las herramientas oficiales para poder compilar nuestra app a código nativo de Android y probarla.
*   **Xcode:** Es el equivalente de Apple, necesario para poder compilar y generar la aplicación para iOS.
*   **Expo Go:** Es una app salvavidas que instalamos en el celular para poder probar nuestro código en vivo, sin tener que compilar nativamente ni instalar Android Studio o Xcode.

**b) Compilar iOS en Windows/Linux**[cite: 1]
Apple es muy cerrado y obliga a usar su sistema operativo (macOS) y su herramienta (Xcode) para compilar. Por eso ni en Windows ni en Linux se puede nativamente. Dos alternativas son: usar Expo Go para probar la app leyendo un QR en un iPhone físico, o usar los servicios en la nube de EAS Build de Expo, que compilan la app en los servidores de ellos.

**c) Variables de entorno y rutas**[cite: 1]
Son "atajos" que usa el sistema operativo para saber dónde encontrar ciertos programas. Si el emulador falla por ANDROID_HOME o el PATH, es porque el sistema no sabe en qué carpeta de tu disco duro están instaladas las herramientas de Android. Una variable de usuario afecta solo a la sesión del usuario actual, mientras que la de sistema le aplica a todo el computador.

**d) Expo vs React Native CLI**[cite: 1]
*   **Expo:** Ventajas: Es súper rápido para empezar y no te peleas con configuraciones nativas. Limitaciones: La app pesa un poco más y no soporta código nativo personalizado de terceros que no esté en Expo. Lo elegiría para este taller y prototipos rápidos.
*   **CLI:** Ventajas: Tienes control total sobre el código de Java/Swift e integración nativa completa. Limitaciones: Configurar el entorno es tedioso y propenso a errores. Lo usaría para una app compleja que necesite hardware muy específico.

---

## PREGUNTA 2: Fundamentos de React Native

**a) Equivalencias con la web**[cite: 1]
*   `<div>` = `<View>`
*   `<p>` y `<span>` = `<Text>`
*   `<img>` = `<Image>`
*   `<input>` = `<TextInput>`
*   Lista larga con scroll = `<FlatList>`

**b) Estilos en React Native**[cite: 1]
Primero, no se usa CSS puro, sino objetos de JavaScript usando `StyleSheet`. Segundo, no existe la "cascada" (herencia), así que debes aplicarle los estilos a cada componente. Tercero, Flexbox viene por defecto y su `flexDirection` es `column`. Esto tiene todo el sentido porque en un celular casi siempre vemos el contenido apilado hacia abajo, no de lado a lado como en una pantalla de PC.

**c) Props y Estado**[cite: 1]
Las *props* son datos fijos que le mandamos a un componente y que él no puede modificar, mientras que el *estado* son los datos dinámicos que el componente maneja y cambian con el tiempo. En una lista de productos, la información del producto (nombre, precio) se envía como prop, pero la cantidad que el usuario selecciona para el carrito sería un estado.

---

## PREGUNTA 3: Manejo de pantallas y navegación

**a) Tipos de navegador**[cite: 1]
*   **Stack:** Apila pantallas como cartas. Caso de uso: Ir de la lista de contactos al detalle de uno, y poder retroceder.
*   **Tabs:** Pestañas de navegación, generalmente abajo. Caso de uso: Moverse entre "Inicio", "Buscar" y "Perfil" como en Instagram.
*   **Drawer:** Un menú lateral que se despliega. Caso de uso: Un menú de opciones y configuraciones en una app de banco.

**b) NavigationContainer**[cite: 1]
Es el componente que guarda todo el estado y el historial de por dónde ha navegado el usuario. Solo debe haber uno en todo el proyecto porque si tuviéramos varios, entrarían en conflicto intentando gestionar el botón de retroceso y las rutas al mismo tiempo.

**c) Parámetros de navegación**[cite: 1]
Se envían usando `navigation.navigate('Detalle', { id: 123 })` y en la pantalla de destino se leen usando el hook `route.params`. Lo mejor es enviar únicamente el identificador (ID) y no el objeto completo. Así, la pantalla de destino puede hacer una consulta a la base de datos con ese ID y asegurar que siempre mostrará la información más reciente, sin sobrecargar la memoria.

**d) Ciclo de vida de las pantallas (A -> B -> A)**[cite: 1]
Cuando regresamos de B hacia A, la pantalla A conserva su estado anterior y no se vuelve a crear desde cero por cuestiones de rendimiento. La implicación de esto es que si en la pantalla B guardamos un registro nuevo, la lista en la pantalla A no se va a refrescar mágicamente, tendremos que usar técnicas o hooks para forzar la actualización al volver.

**e) El botón de "Regresar"**[cite: 1]
En Android, el sistema operativo trae por defecto un botón físico o gesto global para ir atrás. iOS no tiene un botón global de atrás, solo un gesto de deslizamiento que a veces no es tan intuitivo. La librería React Navigation resuelve esto agregando automáticamente una flecha de retroceso en el encabezado de las pantallas en iOS, mientras que en Android se adapta al botón del sistema.

---

## PREGUNTA 4: Configuración base de Firebase

**a) Pasos de configuración**[cite: 1]
1. Crear el proyecto en la consola web de Firebase.
2. Registrar una aplicación web dentro del proyecto.
3. Copiar el objeto de configuración (las credenciales).
4. Habilitar la base de datos Firestore y crear la colección inicial.
5. Instalar la librería en nuestro proyecto usando npm.
6. Crear un archivo `firebaseConfig.js`, pasarle las variables de entorno para ocultar las credenciales e inicializar la conexión.

**b) Objeto de configuración**[cite: 1]
*   **apiKey:** Es la llave de acceso pública que permite a nuestra app comunicarse con los servicios de Firebase.
*   **projectId:** Es el nombre único de nuestro proyecto dentro de los servidores de Google.
*   **appId:** El identificador específico de nuestra aplicación (ya que un proyecto puede tener web, iOS y Android al tiempo).
*   **storageBucket:** La dirección donde se guardarán los archivos pesados como imágenes o videos, si lo usamos.

**c) Seguridad de la apiKey**[cite: 1]
En aplicaciones web o móviles, la apiKey es inevitablemente pública porque el código se ejecuta en el dispositivo del cliente. Esto no es una falla grave porque esta llave solo dice "quién" se está conectando. La protección real de los datos vive en el servidor mediante las Reglas de Seguridad de Firebase, que determinan estrictamente quién puede leer o escribir en la base de datos.

**d) Modo prueba vs Modo producción**[cite: 1]
El modo prueba permite que cualquier persona en internet lea, borre o edite toda tu base de datos libremente durante 30 días. En modo producción, los accesos están bloqueados por defecto hasta que tú escribas reglas claras. Si públicas una app en modo de prueba, el riesgo es que un usuario malicioso o un bot extraiga tus datos o los borre por completo.

**e) Firestore vs Realtime Database**[cite: 1]
1. Estructura: Realtime es un JSON gigante único, Firestore se organiza ordenadamente en colecciones y documentos. 
2. Consultas: Las de Firestore son más avanzadas y rápidas para búsquedas complejas. 
3. Rendimiento: Firestore maneja mucho mejor colecciones gigantes. 
Para el proyecto de la Parte 2, elegiría Firestore porque es mucho más fácil estructurar un CRUD tradicional (contactos individuales en una lista) bajo el modelo de colecciones y documentos.