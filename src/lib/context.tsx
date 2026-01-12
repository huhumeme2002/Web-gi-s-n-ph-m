'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Bill, AppContextType } from './types';
import { initialProducts, initialBills } from './data';

const AppContext = createContext<AppContextType | undefined>(undefined);

// Storage keys
const PRODUCTS_KEY = 'ai_shop_products';
const BILLS_KEY = 'ai_shop_bills';

export function AppProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [bills, setBills] = useState<Bill[]>(initialBills);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedProducts = localStorage.getItem(PRODUCTS_KEY);
            const storedBills = localStorage.getItem(BILLS_KEY);

            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            }
            if (storedBills) {
                setBills(JSON.parse(storedBills));
            }
            setIsInitialized(true);
        }
    }, []);

    // Save to localStorage when data changes
    useEffect(() => {
        if (isInitialized && typeof window !== 'undefined') {
            localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        }
    }, [products, isInitialized]);

    useEffect(() => {
        if (isInitialized && typeof window !== 'undefined') {
            localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
        }
    }, [bills, isInitialized]);

    // Product operations
    const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        const now = new Date().toISOString();
        const newProduct: Product = {
            ...productData,
            id: Date.now().toString(),
            createdAt: now,
            updatedAt: now,
        };
        setProducts((prev) => [...prev, newProduct]);
    };

    const updateProduct = (id: string, productData: Partial<Product>) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, ...productData, updatedAt: new Date().toISOString() }
                    : product
            )
        );
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((product) => product.id !== id));
    };

    // Bill operations
    const addBill = (billData: Omit<Bill, 'id' | 'createdAt'>) => {
        const newBill: Bill = {
            ...billData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setBills((prev) => [newBill, ...prev]);
    };

    const deleteBill = (id: string) => {
        setBills((prev) => prev.filter((bill) => bill.id !== id));
    };

    return (
        <AppContext.Provider
            value={{
                products,
                bills,
                addProduct,
                updateProduct,
                deleteProduct,
                addBill,
                deleteBill,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
