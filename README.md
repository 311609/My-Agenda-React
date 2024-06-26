## AGENDA DIGITAL DE PRODUCTIVIDAD

- Este proyecto se creó con el propósito de generar una herramienta personalizada en la cual
se pueda trabajar de manera sencilla, cómoda y ante todo muy práctica en la organización de 
eventos con fechas anticipadamente programadas,con el fin de dar un orden a esas actividades
por su orden de URGENCIA, IMPORTANCIA, así el usuario las puede programar por ese orden de relevancia y de tiempo cada actividad requiera.

- Se puede adicionar al evento una fecha y una hora para iniciar la tarea o evento, lo que va a permitir al usuario contabilizar con más precisión el tiempo que ocupará en cada labor.

- Dispone además de poder agregar título, fecha y hora al evento, también de una descripción para esa actividad, en la cual se puede relacionar algún tipo de recordatorio o recursos, o deberes o cualquier tipo de informacíon relevante y que pueda ser usado en el desarrollo de la actividad o evento programado.

- La aplicación está construida utilizando React.js, aplicando CSS para el desarrollo de sus estilos para la parte del frontend.

- En el backend se utiliza JavaScript, de la que se ha usado Node.js para desarrollar la API con la que se obtuvo la conexión a la base de datos, aqui se uso express, CORS, mongoose para obtener una óptima comunicación entre la aplicación y la base de datos.

- Para la base de datos se construyó un cluster en MongoDB Atlas el cual es una excelente herramienta para la construcción de base de datos no relacionales y que genera un gran interacción en la aplicación y al usuario, facilitando asi el almacenamiento y durabilidad de la información.

 ## Instalación:

. Clona el repositorio en tu dispositivo local [https://github.com/311609/My-Agenda-React.git].
. Navega hasta el directorio del proyecto.
. Ejecuta "npm install" para instalar las dependencias.
. Ejecuta "npm run dev" para iniciar la aplicación en modo de desarrollo.
. Abre [http://localhost:3000] en tu navegador para ver la aplicación.


## Configuración del Entorno

# example.env para la conexión a tu base de datos

- Crea un archivo `.env` en la raíz del proyecto y añade la siguiente variable de entorno:

MONGO_URI=your_URL-cluster

# example.env para hacer login en la aplicación y poder utilizarla 

- Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

VITE_REACT_APP_USERNAME=your_email
VITE_REACT_APP_PASSWORD=your_password


## Si quieres contribuir con este proyecto:

- Sientete libre de hacer un fork y enviar un pull request. Estaré encantado de revisarlo. 
