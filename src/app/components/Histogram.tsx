"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRandomColor } from '../utils/helpers';
import { fetchVehiclesData } from '../utils/api';

const aggregateMileageData = (fleetMileageData: any) => {
    const aggregatedData: { [key: string]: { [vehicle: string]: string; date: string; } } = {};

    fleetMileageData.forEach((vehicle: { id: number; vehicleId: string; currentPosition: any; mileageData: any[]; }) => {
        vehicle.mileageData.forEach((entry: { date: string; mileage: any; }) => {
            if (!(entry.date in aggregatedData)) {
                aggregatedData[entry.date] = { date: entry.date };
            }
            aggregatedData[entry.date][vehicle.vehicleId] = entry.mileage;
        });
    });

    return Object.values(aggregatedData);
};

export default function Histogram() {
    const [data, setData] = useState<{ [vehicle: string]: string; date: string; }[]>([]);

    useEffect(() => {
        fetchVehiclesData()
            .then(data => {
                setData(aggregateMileageData(data));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                className='bg-gray-100'
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(data[0] || {}).filter(key => key !== 'date').map(vehicleId => (
                    <Bar key={vehicleId} dataKey={vehicleId} fill={getRandomColor()} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
