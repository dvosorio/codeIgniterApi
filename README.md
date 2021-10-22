## PRUEBA KONECTA

Este archivo explica el procedimiento para ejecutar el proyecto

### Configuración

-  Versión php >= 5.6.40.
-  Crear la base de datos llamada `konecta_db`, esta base de datos se encuentra localizada en [/sql/konecta.sql](https://github.com/vasquezdavid-23/prueba/blob/master/sql/konecta_db.sql)
-  Ejecutar el comando `$ composer install` y si no lo tienes aquí está el link para instalar [composer](https://getcomposer.org/download/)

### Vistas

-  http://localhost/`{carpeta}`/productos/.

### Apis

-  http://localhost/`{carpeta}`/api/crear/ | `POST` | *nombre, referencia, precio, peso, categoria, stock*
-  http://localhost/`{carpeta}`/api/editar/id/`id`/?`campos` | `PUT` *nombre, referencia, precio, peso, categoria, stock*
-  http://localhost/`{carpeta}`/api/list/ | `GET`
-  http://localhost/`{carpeta}`/api/info/id/`id`/ | `GET`
-  http://localhost/`{carpeta}`/api/eliminar/id/`id`/ | `DELETE`

