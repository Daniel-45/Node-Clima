const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];

    dbPath = './db/database.json';

    constructor() {
        this.leerBaseDatos();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 6,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ')
        });
    }

    async buscarCiudades(ciudades) {

        try {
            // Petición http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudades}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();

            return resp.data.features.map(ciudad => ({
                id: ciudad.id,
                nombre: ciudad.place_name,
                lon: ciudad.center[0],
                lat: ciudad.center[1],
            }));

        } catch (error) {
            return [];
        }
    }

    async climaCiudad(lat, lon) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })

            const res = await instance.get();

            const { weather, main } = res.data;

            return {
                descripcion: weather[0].description,
                minima: main.temp_min,
                maxima: main.temp_max,
                temperatura: main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    // Guardar historial de búsquedas
    guardarHistorial(ciudad) {

        if (this.historial.includes(ciudad.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(ciudad.toLocaleLowerCase());

        // Guardar en base de datos
        this.guardarBaseDatos();
    }

    guardarBaseDatos() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerBaseDatos() {
        if (!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.historial = data.historial;
    }

}

module.exports = Busquedas;