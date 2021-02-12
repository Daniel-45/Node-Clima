require('dotenv').config()

const { leerDatos, menuOpciones, pausa, listarCiudades } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {

    const busquedas = new Busquedas();

    let opcion;

    do {
        opcion = await menuOpciones();

        switch (opcion) {
            case 1:
                // Mostrar mensaje
                const ciudad = await leerDatos('Introduce la ciudad:');

                // Buscar las ciudades
                const ciudades = await busquedas.buscarCiudades(ciudad);

                // Seleccionar la ciudad
                const id = await listarCiudades(ciudades);

                if (id === 0) continue;

                const ciudadSeleccionada = ciudades.find(c => c.id === id);
                // console.log(ciudadSeleccionada);

                // Guardar en base de datos
                busquedas.guardarHistorial(ciudadSeleccionada.nombre);

                // Clima
                const clima = await busquedas.climaCiudad(ciudadSeleccionada.lat, ciudadSeleccionada.lon);
                // console.log(clima);

                // Mostrar resultado
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', ciudadSeleccionada.nombre.green);
                console.log('Latitud:', ciudadSeleccionada.lat);
                console.log('Longitud:', ciudadSeleccionada.lon);
                console.log('Temperatura:', clima.temperatura);
                console.log('Mínima:', clima.minima);
                console.log('Máxima:', clima.maxima);
                console.log('Clima:', clima.descripcion.green);
                break;


            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const index = (i + 1);
                    console.log(`\n${index} ${lugar}`.green);
                })
                break;
        }

        if (opcion !== 0) await pausa();

    } while (opcion !== 0)

}

main();