"use client";

import Histogram from "@/app/components/Histogram";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearAuthToken, isAuthTokenValid } from "@/app/utils/auth";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        if (!isAuthTokenValid()) {
            clearAuthToken();
            router.push('/login');
        }
    }, [router]);
    return (
        <div className="flex-grow min-h-screen dark:bg-gray-100 p-6 ml-64">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Dashboard</h1>
            <div className="mt-8">
                <h2 className="text-3xl font-semibold mb-4 text-center text-blue-600">Historial de Kilómetros Recorridos</h2>
                <Histogram />
            </div>
        </div>
    );
}
