import { faker } from '@faker-js/faker';
import fs from 'fs';

const n_user = 2;
const users: { email: string, password: string }[] = [];

for (let i = 0; i < n_user; i++) {
    users.push({
        email: faker.internet.email(),
        password: faker.internet.password(),
    });
}

console.log("Usuarios mockeados:", users);

// Generar datos de kilómetros recorridos para cada vehículo en los últimos 15 días
const generateVehicleData = (numVehicles: number) => {
    const data = [];
    for (let i = 0; i < numVehicles; i++) {
        const vehicleId = `Vehicle-${i + 1}`;
        const plate = faker.vehicle.vrm();
        const vin = faker.vehicle.vin();
        const model = faker.vehicle.model();
        const currentPosition = {
            lat: faker.location.latitude({ max: 32.72, min: 14.55, precision: 5 }),
            lng: faker.location.longitude({ max: -86.71, min: -118.41, precision: 5 })
        }
        const mileageData = Array.from({ length: 15 }, (v, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
            mileage: faker.number.int({ min: 100, max: 500 }),
        }));
        data.push({ id: i + 1, vehicleId, plate, vin, model, currentPosition, mileageData, selected: false });
    }
    return data;
};

const vehicles = generateVehicleData(20);

const jsonData = { users, vehicles };

// Guardar los datos en un archivo JSON
fs.writeFile('db.json', JSON.stringify(jsonData, null, 2), (err: any) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Data successfully saved to db.json');
    }
});