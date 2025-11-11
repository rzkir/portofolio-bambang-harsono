"use client";

import React from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import { Toaster } from "sonner";

import { useLoading } from "@/utils/context/LoadingContext";

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const { isInitialLoading, isLoading } = useLoading();
    const isBusy = isInitialLoading || isLoading;

    const isAdminRoute =
        pathname?.includes("/signin") ||
        pathname?.includes("/forgot-password") ||
        pathname?.includes("/verification") ||
        pathname?.includes("/reset-password") ||
        pathname?.includes("/dashboard") || false;

    return (
        <main>
            <Toaster
                position="top-center"
                richColors
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'black',
                        color: '#fff',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    },
                    className: 'font-medium',
                }}
            />
            <div className={isBusy ? "opacity-0 pointer-events-none select-none" : ""}>
                {!isAdminRoute && <Header />}
                {children}
                {!isAdminRoute && <Footer />}
            </div>
        </main>
    );
};

export default Pathname;