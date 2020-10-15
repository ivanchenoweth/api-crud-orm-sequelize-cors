# REST API crud Demo 

## Descripción

Esta es una API REST simple basada en JSON, construida con Node, Express, Sequelize ORM y Cors.

Utiliza ubicaciones de artistas, obras de arte y museos como información de muestra.

## Author

- [Ivan Chenoweth](https://github.com/ivanchenoweth)


## License

Este es un proyecto de codigo abierto disponible bajo [MIT License](LICENSE).


## Configurar (Setup)

Como arrancar la aplicacion despues de descargar el repositorio?

Clonar el repo e instalar las dependencia via NPM:

	npm install

Instale Sequelize-cli globalmente, para que pueda ejecutar las operaciones de línea de comando de Sequelize desde la raíz del proyecto.

Esto también nos permitirá tener nuestros modelos, migraciones y sembradoras (seeders) almacenados en la carpeta db
 en lugar de dentro de node_modules

	npm install -g sequelize-cli

De forma predeterminada, la aplicación busca una base de datos MySQL en localhost llamada 'art-demo'.
Esto se puede cambiar en el archivo db / config / config.json, editando las credenciales.
Los valores predeterminados 'root' y 'null' se proporcionan como marcadores de posición para los inicios de sesión, deberá actualizarlos a las credenciales de su base de datos localhost.

### Ambientes (Environments)
Cuanto se conecta a la base de datos, Sequelize utilizará el entorno de 'desarrollo' de forma predeterminada,
a menos que detecte una variable de entorno que indique lo contrario (como una variable ENV personalizada en una instancia de Heroku).
Esto se define en db / models / index.js, donde se realiza la conexión a la base de datos:

	var env = process.env.NODE_ENV || 'development';

to nos permite cambiar fácilmente entre conectarnos con una base de datos de prueba que se ejecuta en localhost y una base de datos de producción.

### Migrando la base de datos (Migrating the database)

Se incluyen migraciones para configurar/construir las tablas de base de datos necesarias para los modelos.

Ejecute migraciones con sequelize-cli. Desde la raíz del proyecto, ejecute:

	sequelize db:migrate

Sequelize luego creará las tablas en la base de datos.



### Alimentando datos de ejemplo (Seeding sample data)

Hay archivos de seeder en db / seeders para insertar datos de muestra en la base de datos.
Para ejecutar el proceso de inicialización y completar las tablas de la base de datos, ejecute lo siguiente desde la raíz del proyecto:

	sequelize db:seed:all

*** Luego puede ejecutar app.js en el nodo o usar nodemon para ejecutar la aplicación localmente ***


## The .sequelizerc file
Este es un archivo en la raíz del proyecto que nos permite definir dónde se ubicarán nuestros modelos ORM, archivos de migración,
 sembradoras (seeders) y archivo de configuración en la aplicación. Por defecto, Sequelize-cli los generará en node_modules / .bin /.

Dado que ignoramos node_modules / via Git, necesitamos mover estos archivos a la estructura de archivos del proyecto principal.

* Nota: si está iniciando un nuevo proyecto desde cero, puede crear este archivo en la raíz del proyecto antes de ejecutar sequelize init.
De esta manera, Sequelize-cli generará estas carpetas para usted cuando inicie el proyecto *

## Executar la Demo

	node app.js nodemon

## Routes / Endpoints
Las siguientes rutas están configuradas y devolverán datos JSON:

#### Artworks
+ **GET** all artworks: /api/v1/artworks
+ **GET** single artwork by id: /api/v1/artworks/{id}
+ **POST** new artwork: /api/v1/artworks
+ **PUT** edit a single artwork: /api/v1/artworks/{id}
+ **DELETE** a single artwork: /api/v1/artworks/{id}


#### Artists
+ **GET** all artists: /api/v1/artists
+ **GET** single artist by id: /api/v1/artists/{id}
+ **POST** new artist: /api/v1/artists
+ **PUT** edit a single artist: /api/v1/artists/{id}
+ **DELETE** a single artist: /api/v1/artists/{id}


#### Locations
+ **GET** all locations: /api/v1/locations
+ **GET** single location by id: /api/v1/locations/{id}
+ **POST** new location: /api/v1/locations
+ **PUT** edit a single location: /api/v1/locations/{id}
+ **DELETE** a single location: /api/v1/locations/{id}

La respuesta JSON para artistas y ubicaciones devolverá una lista de sus objetos de arte asociados.

## Controladores(Controllers)

Los métodos CRUD para cada modelo se mueven a archivos de controlador separados, almacenados en db / controllers.

Luego importamos cada uno de estos al archivo app.js principal y los pasamos como funciones de middleware a las definiciones de ruta.

Esto nos permite mantener limpio y legible el archivo app.js principal, y agrupa las funciones relevantes para cada modelo en un solo archivo, de modo que se puedan localizar y editar fácilmente.

Los controladores utilizan los métodos basados en promesas de Sequelize para leer y escribir en la base de datos y detectar cualquier error.

## Sequelize Models
Los archivos de modelo son generados por Sequelize-cli. Son archivos que describen una tabla de base de datos en forma de objeto javascript.


Mas informacion:
[Creating a Model](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration)

La carpeta de modelos tiene un archivo index.js, que es donde Sequelize se conecta a la base de datos. Entonces, cuando importamos los modelos a nuestros otros archivos, por ejemplo, el app.js principal, requerimos el directorio / modelos / completo, de modo que este archivo index.js esté incluido, en lugar de solo requerir los archivos de modelo individuales. El archivo index.js también contiene la lógica para crear las asociaciones entre los modelos.

** Nota: el valor asignado a la variable de configuración, en index.js, difiere del valor predeterminado proporcionado por Sequelize-cli, ya que la ruta predeterminada puede no funcionar en Windows 10. **

Mas informacion:
[Var config not supported on Windows 10](https://github.com/sequelize/sequelize/issues/7418)

## Migraciones (Migrations)
Los archivos de migración se generan usando el sequelize-cli, para permitirnos editar la base de datos, agregar tablas, columnas, etc. siempre que creamos un nuevo modelo o editamos uno existente. Esta es una forma de control de versiones para nuestra base de datos.

Cuando generamos un nuevo archivo de modelo, Sequelize-cli creará automáticamente el archivo de migración para nosotros. También podemos generar manualmente un archivo de migración, por ejemplo, aquellos para agregar columnas para nuestras claves externas.

Más información aquí:
[Migraciones] (http://docs.sequelizejs.com/manual/tutorial/migrations.html)


## Sembradoras (Seeders)
Los archivos semilla en db / seeders proporcionan una serie de objetos javascript, con información predefinida para insertar en cada tabla de base de datos como filas de datos de muestra.

Ejecutar las sembradoras a través de la línea de comando insertará los datos en las tablas. Esto debe hacerse después de que la base de datos se haya migrado correctamente.

Más información aquí:
[Creación y ejecución de sembradoras] (http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-seed)


## Asociación de modelos y uso de relaciones secuelas
Podemos definir asociaciones entre nuestros modelos, que Sequelize usará para agregar referencias entre nuestras tablas de base de datos. Esto nos permite incluir fácilmente todos los registros asociados de otras tablas al consultar un registro. Por ejemplo, establecer una relación padre-hijo entre los artistas y sus obras de arte asociadas.

Sequelize nos permite definir esto usando términos naturales. En nuestro ejemplo, un artista '** tieneMuchas () **' obras de arte, y cada obra de arte '** pertenece a () **' a un artista. Estas asociaciones se definen en los archivos del modelo y deben definirse en cada dirección, es decir, tanto en el modelo principal como en el secundario.

Luego, en nuestros métodos GET en los archivos del controlador de ubicación y artista, agregamos un objeto ** include ** en la llamada findAll (), para que podamos incluir los registros asociados de la otra tabla.

*** Nota: los tutoriales más antiguos pueden indicarle que defina esto en la propiedad 'classMethods' en el objeto modelo. Esto ya no funcionará con Sequelize v4 +, debe definir las asociaciones fuera del objeto del modelo. Más información sobre esto aquí: [Actualizar a V4] (http://docs.sequelizejs.com/manual/tutorial/upgrade-to-v4.html) ***
