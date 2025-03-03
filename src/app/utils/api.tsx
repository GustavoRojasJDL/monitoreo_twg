export const fetchVehiclesData = async () => {
    const response = await fetch('http://localhost:3001/vehicles');
    if (!response.ok) {
        throw new Error('Error fetching vehicles data');
    }
    const data = await response.json();
    return data;
};
