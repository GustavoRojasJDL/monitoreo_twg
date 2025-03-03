"use client";

import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Configuración de los iconos personalizados
const DefaultIcon = L.icon({
    iconUrl: '/marker-icon.png',
    iconRetinaUrl: '/marker-icon-2x.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayerComponent = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const MarkerComponent = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const PopupComponent = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Componente para centrar el mapa al cargar
const SetViewOnLoad = ({ center, zoom }: any) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

// Componente para centrar el mapa al hacer clic
const CenterMap = ({ latitude, longitude }: any) => {
    const map = useMap();
    useEffect(() => {
        if (latitude && longitude) {
            map.setView([latitude, longitude], 13);
        }
    }, [latitude, longitude, map]);
    return null;
};

const MapComponent = ({ vehicleData, selectedLocation }: any) => {
    const center = [51.505, -0.09];
    const zoom = 2;

    return (
        <Map style={{ height: "400px", width: "100%" }}>
            <SetViewOnLoad center={center} zoom={zoom} />
            <TileLayerComponent
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {vehicleData.map((vehicle: any) => (
                <MarkerComponent key={vehicle.id} position={[vehicle.currentPosition.lat, vehicle.currentPosition.lng]}>
                    <PopupComponent>
                        {vehicle.vehicleId}
                    </PopupComponent>
                </MarkerComponent>
            ))}
            {selectedLocation && (
                <CenterMap latitude={selectedLocation.latitude} longitude={selectedLocation.longitude} />
            )}
        </Map>
    );
};

export default MapComponent;
