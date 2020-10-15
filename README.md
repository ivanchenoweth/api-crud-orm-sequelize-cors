# Simple API crud Demo usando node+sequelize+express+cors

## Overview

Esta es una simple REST API basada en JSON, contruida con node+express+sequelize

Contiene las tablas relacionadas de Artists, Artworks y Museum locations como informacion de ejemplo.


## Setup

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

### Environments
WAl conectarse a la base de datos, Sequelize utilizará el entorno de 'desarrollo' de forma predeterminada,
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

Los métodos CRUD para cada modelo se mueven a archivos de controlador separados, almacenados en db / controllers. Luego importamos cada uno de estos al archivo app.js principal y los pasamos como funciones de middleware a las definiciones de ruta.

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

## Migrations
The migration files are generated using the sequelize-cli, to enable us to edit the database, add tables, columns etc.. whenever we create a new model or edit an existing one. This is a form of version control for our database.

When we generate a new model file, Sequelize-cli will automatically create the migration file for us. We can also manually generate a migration file, for example the ones to add columns for our foreign keys.

More information here:
[Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)


## Seeders
The seed files in db/seeders provide a series of javascript objects, with pre-defined information to insert into each database table as sample data rows.

Running the seeders via the command line will insert the data into the tables. This should be done after the database has been properly migrated.

More information here:
[Creating and running seeders](http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-seed)


## Associating Models and Using Sequelize Relationships
We can define associations between our models, which Sequelize will use to add refernces between our database tables. This allows us to easily include all associated records from other tables when querying a record. For example, setting up a parent-child relationship between artists and their associated artworks.

Sequelize enables us to define this using natural terms. In our example, an artist '**hasMany()**' artworks, and each artwork '**belongsTo()**' an artist. These associations are defined the the model files, and need to be defined in each direction, i.e on both the parent and child model.

Then, in our GET methods in the artist and location controller files, we add an **include** object into the findAll() call, so we can include the associated records from the other table.

***Note - older tutorials may tell you to define this in the 'classMethods' property on the model object. This will no longer work with Sequelize v4+, you need to define the associations outside of the model object. More information on this here: [Upgrade to V4](http://docs.sequelizejs.com/manual/tutorial/upgrade-to-v4.html)***

