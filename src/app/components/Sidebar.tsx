"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogoutButton from './Logout';
import logo from '../../../public/logo_TWG.png';
import Imagen from 'next/image';

export default function Sidebar() {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Tracking', href: '/tracking' }
    ];
    const [darkMode, setDarkMode] = useState(false);
    const Dark = darkMode ? 'Light' : 'Dark';
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    return (
        <div className="h-screen bg-blue-600 dark:bg-blue-950 p-6 w-64 fixed flex flex-col justify-between">
            <div className='flex items-center justify-center'>
                <Imagen src={logo} alt="Logo" className="w-20 h-auto" />
            </div>
            <div className="text-white dark:text-yellow-400 font-bold text-2xl mb-8">
                Monitor TWG
            </div>
            <nav className="flex flex-col space-y-4">
                {navItems.map(item => (
                    <Link key={item.name} href={item.href} legacyBehavior>
                        <a className="flex items-center text-white dark:text-yellow-400 px-3 py-2 rounded-md hover:bg-blue-700">
                            {item.name}
                        </a>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto pt-4">
                <LogoutButton />
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="ml-4 p-2 rounded bg-blue-950 dark:bg-blue-600 text-yellow-400 dark:text-white cursor-pointer"
                >
                    Toggle {Dark} Mode
                </button>
            </div>
            <div className="text-white dark:text-yellow-400 text-sm mt-4">
                &copy; 2025 My Dashboard
            </div>
        </div>
    );
}
