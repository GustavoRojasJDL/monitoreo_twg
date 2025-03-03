import { useRouter } from 'next/navigation';
import { clearAuthToken } from '../utils/auth';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        clearAuthToken();
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="text-white dark:text-yellow-400 hover:text-blue-800 cursor-pointer ml-4 p-2">
            Logout
        </button>
    );
};

export default LogoutButton;
