"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import 'leaflet/dist/leaflet.css';
import { DataGrid, GridEventListener } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import { clearAuthToken, isAuthTokenValid } from "@/app/utils/auth";
import { fetchVehiclesData } from "../utils/api";
import MapComponent from "../components/Map";

export default function Tracking() {
    const router = useRouter();
    const [vehicleData, setVehicleData] = useState<{ id: number, vehicleId: string, plate: string, vin: string, model: string, currentPosition: { lat: number, lng: number }, mileageData: [{ date: string, mileage: number }] }[]>([]);
    const [rows, setRows] = useState<{ id: number, vehicleId: string, plate: string, vin: string, model: string, latitude: number, longitude: number }[]>([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [selectedLocation, setSelectedLocation] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        if (!isAuthTokenValid()) {
            clearAuthToken();
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        fetchVehiclesData()
            .then(data => {
                setVehicleData(data);
                setRows(data.map((vehicle: { id: number, vehicleId: string, plate: string, vin: string, model: string, currentPosition: { lat: number, lng: number }, mileageData: [{ date: string, mileage: number }] }) => ({
                    id: vehicle.id,
                    vehicleId: vehicle.vehicleId,
                    plate: vehicle.plate,
                    vin: vehicle.vin,
                    model: vehicle.model,
                    latitude: vehicle.currentPosition.lat,
                    longitude: vehicle.currentPosition.lng
                })));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columns = [
        { field: 'vehicleId', headerName: 'Vehicle ID', width: 150 },
        { field: 'plate', headerName: 'Plate', width: 150 },
        { field: 'vin', headerName: 'VIN', width: 150 },
        { field: 'model', headerName: 'Model', width: 150 },
        { field: 'latitude', headerName: 'Latitude', width: 150 },
        { field: 'longitude', headerName: 'Longitude', width: 150 }
    ];

    const handleEvent: GridEventListener<'rowClick'> = (params) => {
        const { latitude, longitude } = params.row;
        setSelectedLocation({ latitude, longitude });
    };

    return (
        <div className="flex">
            <div className="flex-grow min-h-screen bg-gray-100 dark:bg-gray-950 p-6 ml-64">
                <MapComponent vehicleData={vehicleData} selectedLocation={selectedLocation} />
                <Box sx={{ height: 400, width: '100%', mt: 2 }} >
                    <DataGrid onRowClick={handleEvent}
                        rows={rows}
                        columns={columns}
                        paginationModel={paginationModel}
                        pageSizeOptions={[5, 10, 20]}
                        onPaginationModelChange={(model) => setPaginationModel(model)}
                        disableRowSelectionOnClick
                        checkboxSelection
                        className="dark:bg-gray-100"
                    />
                </Box>
            </div>
        </div>
    );
}

