# Node Clima

Aplicación de consola interactiva creada con Node.js

Esta aplicación consume las APIs de Mapbox places para obtener ciudades por nombre y OpenWeather para obtener el clima.

Las consultas de las ciudades realizadas se almacenan en un fichero **.json** en el directorio **db/** para tener un historial de las últimas seis consultas realizadas.

En el directorio del proyecto, ejecutar el comando: `npm install`

La aplicación permite las siguientes opciones:

1. Ciudad  
2. Historial  
0. Salir 

La opciones se pueden seleccionar con las teclas direccionales, números y con la tecla espaciadora cuando hay multiples opciones.

El menú de opciones está creado con **inquirer**. Inquirer es una colección de interfaces de usuario de línea de comandos interactivas.

Para más información ver el siguiente enlace: [https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)

## Requisitos

Es necesario tener instalado:

* Cualquier editor como [Atom](https://atom.io/), [Sublime Text](https://www.sublimetext.com/), [VSCode](https://code.visualstudio.com/), o cualquier otro editor/IDE que nos guste.
* [NodeJS](https://nodejs.org/es/) en su [última versión](https://nodejs.org/es/download/).

| Dependencias | Version  |
|:-------------|:---------| 
| __node__     | >= 9.3.0 |
| __npm__      | >= 5.5.1 |

* Una cuenta en [https://www.mapbox.com/](https://www.mapbox.com/)

* Documentación [https://docs.mapbox.com/api/search/geocoding/](https://docs.mapbox.com/api/search/geocoding/)

* Una cuenta en [https://openweathermap.org/](https://openweathermap.org/)

* Documentación [https://openweathermap.org/api](https://openweathermap.org/api)
