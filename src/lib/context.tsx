'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { initialProducts, initialBills } from './data';

// Types for frontend
export interface PricingTier {
    id?: number;
    duration: string;
    requestLimit: string;
    price: number;
    isPopular?: boolean;
}

export interface Product {
    id: string;
    name: string;
    icon: string;
    imageUrl?: string | null;
    description: string;
    features: string[];
    pricingTiers: PricingTier[];
    tag?: string | null;
    contactLink: string;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface Bill {
    id: string;
    imageUrl: string;
    date: string;
    description?: string | null;
    createdAt: Date | string;
}

interface AppContextType {
    products: Product[];
    bills: Bill[];
    loading: boolean;
    addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    addBill: (bill: Omit<Bill, 'id' | 'createdAt'>) => Promise<void>;
    deleteBill: (id: string) => Promise<void>;
    refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [bills, setBills] = useState<Bill[]>(initialBills);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    const refreshData = useCallback(async () => {
        try {
            const [productsRes, billsRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/bills'),
            ]);

            if (productsRes.ok) {
                const productsData = await productsRes.json();
                if (Array.isArray(productsData) && productsData.length > 0) {
                    setProducts(productsData);
                }
            }

            if (billsRes.ok) {
                const billsData = await billsRes.json();
                if (Array.isArray(billsData)) {
                    setBills(billsData);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Keep using initial data on error
        } finally {
            setLoading(false);
        }
    }, []);

    // Load data on mount
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    // Product operations
    const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                await refreshData();
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    };

    const updateProduct = async (id: string, productData: Partial<Product>) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                await refreshData();
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await refreshData();
            } else {
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    };

    // Bill operations
    const addBill = async (billData: Omit<Bill, 'id' | 'createdAt'>) => {
        try {
            const res = await fetch('/api/bills', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(billData),
            });

            if (res.ok) {
                await refreshData();
            } else {
                throw new Error('Failed to add bill');
            }
        } catch (error) {
            console.error('Error adding bill:', error);
            throw error;
        }
    };

    const deleteBill = async (id: string) => {
        try {
            const res = await fetch(`/api/bills/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await refreshData();
            } else {
                throw new Error('Failed to delete bill');
            }
        } catch (error) {
            console.error('Error deleting bill:', error);
            throw error;
        }
    };

    return (
        <AppContext.Provider
            value={{
                products,
                bills,
                loading,
                addProduct,
                updateProduct,
                deleteProduct,
                addBill,
                deleteBill,
                refreshData,
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
