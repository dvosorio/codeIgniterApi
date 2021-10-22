## PRUEBA KONECTA

Este archivo explica el procedimiento para ejecutar el proyecto

### Configuración

-  Versión php >= 5.6.40.
-  Crear la base de datos llamada `konecta_db`, esta base de datos se encuentra localizada en [/sql/konecta.sql](https://github.com/vasquezdavid-23/prueba/blob/master/sql/konecta_db.sql)
-  Ejecutar el comando `$ composer install` y si no lo tienes aquí está el link para instalar [composer](https://getcomposer.org/download/)

### Vistas

-  /`{proyecto}`/productos/.

### Apis

-  /`{proyecto}`/api/crear/ | `POST` | *nombre, referencia, precio, peso, categoria, stock*
-  /`{proyecto}`/api/editar/id/`id`/?`campos` | `PUT` *nombre, referencia, precio, peso, categoria, stock*
-  /`{proyecto}`/api/list/ | `GET`
-  /`{proyecto}`/api/info/id/`id`/ | `GET`
-  /`{proyecto}`/api/eliminar/id/`id`/ | `DELETE`

