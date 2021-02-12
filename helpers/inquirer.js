require('colors');
const inquirer = require('inquirer');

const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Selecciona una opción:',
        choices: [
            {
                value: 1,
                name: '1. Ciudad'
            },
            {
                value: 2,
                name: '2. Historial'
            },
            {
                value: 0,
                name: '0. Salir'
            }
        ]
    }
];

const menuOpciones = async () => {
    console.clear();
    const { opcion } = await inquirer.prompt(opciones);
    return opcion;
}

const leerDatos = async (message) => {
    const input = [
        {
            type: 'input',
            name: 'datos',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor introduce un valor';
                }
                return true;
            }
        }
    ];

    const { datos } = await inquirer.prompt(input);

    return datos;
}

const pausa = async () => {
    const opcion = [
        {
            type: 'input',
            name: 'enter',
            message: `Presiona ${'ENTER'.green} para continuar`
        }
    ];

    console.log();

    await inquirer.prompt(opcion);
}

// Listar ciudades que coinciden con el término de búsqueda
const listarCiudades = async (ciudades = []) => {
    const choices = ciudades.map((ciudad, i) => {
        const index = (i + 1);
        return {
            value: ciudad.id,
            name: `${index} ${ciudad.nombre}`
        }
    });

    // Añadir opción cancelar
    choices.unshift({
        value: 0,
        name: '0. Cancelar'
    });

    const opciones = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecciona ciudad:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(opciones);

    return id;
}

module.exports = {
    menuOpciones,
    leerDatos,
    pausa,
    listarCiudades
}
