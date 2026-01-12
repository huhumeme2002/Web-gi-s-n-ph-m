// Type definitions for AI Shop
// Structured for easy migration to Supabase or other databases

export interface PricingTier {
  duration: string;      // "1 ngày", "7 ngày", "1 tháng", "1 năm"
  requestLimit: string;  // "Vô Hạn", "5000 Request", "10$", etc.
  price: number;         // Price in VND
  isPopular?: boolean;   // Highlight this tier
}

export interface Product {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  imageUrl?: string; // Product image (base64 or URL)
  description: string;
  features: string[];
  pricingTiers: PricingTier[]; // Multiple pricing options
  tag?: string; // e.g., "Best Seller", "Hot", "New"
  contactLink: string; // Zalo or Messenger link
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Bill {
  id: string;
  imageUrl: string;
  date: string;
  description?: string;
  createdAt: string;
}

export interface AppState {
  products: Product[];
  bills: Bill[];
}

export interface AppContextType extends AppState {
  // Product operations
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Bill operations
  addBill: (bill: Omit<Bill, 'id' | 'createdAt'>) => void;
  deleteBill: (id: string) => void;
}
