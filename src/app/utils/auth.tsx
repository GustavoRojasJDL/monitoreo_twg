const TOKEN_KEY = 'authToken';
const EXPIRATION_KEY = 'authTokenExpiration';

// Generar un token de autenticación
export const generateAuthToken = () => {
    const token = Math.random().toString(36).substr(2); // Generar un token simple
    const expirationTime = Date.now() + 30 * 60 * 1000; // Expira en 30 minutos
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRATION_KEY, expirationTime.toString());
    return token;
};

// Verificar si el token es válido
export const isAuthTokenValid = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expirationTime = localStorage.getItem(EXPIRATION_KEY);
    if (!token || !expirationTime) {
        return false;
    }
    return Date.now() < parseInt(expirationTime, 10);
};

// Limpiar el token de autenticación
export const clearAuthToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_KEY);
};
