import { useRouter } from 'next/navigation';
import { clearAuthToken } from '../utils/auth';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        clearAuthToken();
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="text-white hover:text-blue-800">
            Logout
        </button>
    );
};

export default LogoutButton;
