"use client";

import React from 'react';
import Sidebar from './components/Sidebar'; // Asegúrate de que la ruta sea correcta
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  return (
    <html lang="en" className="dark">
      <title>Monitoreo TWG</title>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!isLoginPage &&
          <Sidebar />
        }
        {children}
      </body>
    </html>
  );
}
