'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/lib/context';
import { Product, PricingTier } from '@/lib/types';
import {
    Shield,
    Package,
    ImageIcon,
    Plus,
    Trash2,
    Edit,
    Save,
    X,
    LogOut,
    Eye,
    EyeOff,
    Upload,
    Link as LinkIcon,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ADMIN_PASSWORD = 'Khanh2003@'; // Change this to your desired password

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Check if already authenticated
    useEffect(() => {
        const isAuth = sessionStorage.getItem('admin_authenticated');
        if (isAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setError('');
        } else {
            setError('Mật khẩu không đúng');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-[#16161e] border border-[#2a2a3a] rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#00ff88]/20 to-[#00ccff]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-[#00ff88]" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
                            <p className="text-[#a1a1aa] text-sm">Nhập mật khẩu để truy cập</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mật khẩu"
                                    className="input-dark w-full pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" className="btn-primary w-full">
                                Đăng nhập
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/" className="text-[#a1a1aa] hover:text-[#00ff88] text-sm">
                                ← Quay lại trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
    const { products, bills, addProduct, updateProduct, deleteProduct, addBill, deleteBill } =
        useAppContext();
    const [activeTab, setActiveTab] = useState<'products' | 'bills'>('products');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [newBillDesc, setNewBillDesc] = useState('');
    const [billUploadMode, setBillUploadMode] = useState<'file' | 'url'>('file');
    const [newBillUrl, setNewBillUrl] = useState('');
    const [isUploadingBill, setIsUploadingBill] = useState(false);

    const billFileInputRef = useRef<HTMLInputElement>(null);
    const productImageInputRef = useRef<HTMLInputElement>(null);

    // Product form state
    const [productForm, setProductForm] = useState({
        name: '',
        icon: 'Sparkles',
        imageUrl: '',
        description: '',
        features: [''],
        pricingTiers: [{ duration: '', requestLimit: '', price: 0, isPopular: false }] as PricingTier[],
        tag: '',
        contactLink: 'https://zalo.me/0944568913',
        isActive: true,
    });

    const resetForm = () => {
        setProductForm({
            name: '',
            icon: 'Sparkles',
            imageUrl: '',
            description: '',
            features: [''],
            pricingTiers: [{ duration: '', requestLimit: '', price: 0, isPopular: false }],
            tag: '',
            contactLink: 'https://zalo.me/0944568913',
            isActive: true,
        });
        setEditingProduct(null);
        setIsAddingProduct(false);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            icon: product.icon,
            imageUrl: product.imageUrl || '',
            description: product.description,
            features: product.features.length > 0 ? product.features : [''],
            pricingTiers: product.pricingTiers.length > 0 ? product.pricingTiers : [{ duration: '', requestLimit: '', price: 0, isPopular: false }],
            tag: product.tag || '',
            contactLink: product.contactLink,
            isActive: product.isActive,
        });
        setIsAddingProduct(true);
    };

    const handleSaveProduct = () => {
        const productData = {
            ...productForm,
            imageUrl: productForm.imageUrl || undefined,
            tag: productForm.tag || undefined,
            features: productForm.features.filter((f) => f.trim() !== ''),
            pricingTiers: productForm.pricingTiers.filter((t) => t.duration.trim() !== ''),
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
        resetForm();
    };

    // Handle product image file upload
    const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                setProductForm({ ...productForm, imageUrl: base64 });
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    // Handle bill file upload
    const handleBillFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setIsUploadingBill(true);
            try {
                for (let i = 0; i < files.length; i++) {
                    const base64 = await fileToBase64(files[i]);
                    addBill({
                        imageUrl: base64,
                        date: new Date().toISOString().split('T')[0],
                        description: newBillDesc || `Bill ${new Date().toLocaleDateString('vi-VN')}`,
                    });
                }
                setNewBillDesc('');
                if (billFileInputRef.current) {
                    billFileInputRef.current.value = '';
                }
            } catch (error) {
                console.error('Error uploading bill:', error);
            }
            setIsUploadingBill(false);
        }
    };

    // Handle bill URL add
    const handleAddBillUrl = () => {
        if (newBillUrl.trim()) {
            addBill({
                imageUrl: newBillUrl,
                date: new Date().toISOString().split('T')[0],
                description: newBillDesc || undefined,
            });
            setNewBillUrl('');
            setNewBillDesc('');
        }
    };

    // Add pricing tier
    const addPricingTier = () => {
        setProductForm({
            ...productForm,
            pricingTiers: [...productForm.pricingTiers, { duration: '', requestLimit: '', price: 0, isPopular: false }],
        });
    };

    // Remove pricing tier
    const removePricingTier = (index: number) => {
        setProductForm({
            ...productForm,
            pricingTiers: productForm.pricingTiers.filter((_, i) => i !== index),
        });
    };

    // Update pricing tier
    const updatePricingTier = (index: number, field: keyof PricingTier, value: string | number | boolean) => {
        const newTiers = [...productForm.pricingTiers];
        newTiers[index] = { ...newTiers[index], [field]: value };
        setProductForm({ ...productForm, pricingTiers: newTiers });
    };

    const iconOptions = [
        'MessageSquare',
        'Code',
        'Github',
        'Brain',
        'Image',
        'FileText',
        'Sparkles',
    ];

    // Format price for display
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    return (
        <div className="min-h-screen bg-[#0a0a12]">
            {/* Header */}
            <header className="bg-[#16161e] border-b border-[#2a2a3a] px-4 sm:px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Shield className="w-8 h-8 text-[#00ff88]" />
                        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="text-[#a1a1aa] hover:text-white text-sm">
                            Xem trang chủ →
                        </Link>
                        <button onClick={onLogout} className="btn-secondary flex items-center gap-2 text-sm py-2">
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'products'
                            ? 'bg-[#00ff88] text-[#0a0a12]'
                            : 'bg-[#16161e] text-[#a1a1aa] hover:text-white border border-[#2a2a3a]'
                            }`}
                    >
                        <Package className="w-5 h-5" />
                        Sản phẩm ({products.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('bills')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'bills'
                            ? 'bg-[#00ff88] text-[#0a0a12]'
                            : 'bg-[#16161e] text-[#a1a1aa] hover:text-white border border-[#2a2a3a]'
                            }`}
                    >
                        <ImageIcon className="w-5 h-5" />
                        Bills ({bills.length})
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        {/* Add/Edit Form */}
                        {isAddingProduct ? (
                            <div className="bg-[#16161e] border border-[#2a2a3a] rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">
                                        {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                                    </h2>
                                    <button onClick={resetForm} className="text-[#a1a1aa] hover:text-white">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Tên sản phẩm</label>
                                        <input
                                            type="text"
                                            value={productForm.name}
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            className="input-dark w-full"
                                            placeholder="Cursor Vô Hạn Request"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Icon</label>
                                        <select
                                            value={productForm.icon}
                                            onChange={(e) => setProductForm({ ...productForm, icon: e.target.value })}
                                            className="input-dark w-full"
                                        >
                                            {iconOptions.map((icon) => (
                                                <option key={icon} value={icon}>
                                                    {icon}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Product Image Upload */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Ảnh sản phẩm</label>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <div className="flex-1">
                                                <input
                                                    ref={productImageInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleProductImageUpload}
                                                    className="hidden"
                                                    id="product-image-input"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => productImageInputRef.current?.click()}
                                                    className="w-full py-3 px-4 border-2 border-dashed border-[#2a2a3a] rounded-xl hover:border-[#00ff88] transition-colors flex items-center justify-center gap-2 text-[#a1a1aa] hover:text-[#00ff88]"
                                                >
                                                    <Upload className="w-5 h-5" />
                                                    Tải ảnh từ máy tính
                                                </button>
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={productForm.imageUrl.startsWith('data:') ? '' : productForm.imageUrl}
                                                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                                                    className="input-dark w-full h-full"
                                                    placeholder="Hoặc nhập URL ảnh..."
                                                />
                                            </div>
                                        </div>
                                        {productForm.imageUrl && (
                                            <div className="mt-3 relative inline-block">
                                                <Image
                                                    src={productForm.imageUrl}
                                                    alt="Preview"
                                                    width={120}
                                                    height={120}
                                                    className="rounded-lg object-cover border border-[#2a2a3a]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setProductForm({ ...productForm, imageUrl: '' })}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Tag</label>
                                        <input
                                            type="text"
                                            value={productForm.tag}
                                            onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                                            className="input-dark w-full"
                                            placeholder="Best Seller, Hot, New"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Link liên hệ</label>
                                        <input
                                            type="text"
                                            value={productForm.contactLink}
                                            onChange={(e) =>
                                                setProductForm({ ...productForm, contactLink: e.target.value })
                                            }
                                            className="input-dark w-full"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Mô tả</label>
                                        <textarea
                                            value={productForm.description}
                                            onChange={(e) =>
                                                setProductForm({ ...productForm, description: e.target.value })
                                            }
                                            className="input-dark w-full h-20 resize-none"
                                            placeholder="Mô tả sản phẩm..."
                                        />
                                    </div>

                                    {/* Pricing Tiers */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Bảng giá</label>
                                        <div className="space-y-2">
                                            {/* Header */}
                                            <div className="grid grid-cols-12 gap-2 text-xs text-[#71717a] px-2">
                                                <div className="col-span-3">Thời hạn</div>
                                                <div className="col-span-3">Request/Limit</div>
                                                <div className="col-span-3">Giá (VND)</div>
                                                <div className="col-span-2">Hot</div>
                                                <div className="col-span-1"></div>
                                            </div>
                                            {productForm.pricingTiers.map((tier, index) => (
                                                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                                                    <input
                                                        type="text"
                                                        value={tier.duration}
                                                        onChange={(e) => updatePricingTier(index, 'duration', e.target.value)}
                                                        className="input-dark col-span-3 text-sm"
                                                        placeholder="1 tháng"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={tier.requestLimit}
                                                        onChange={(e) => updatePricingTier(index, 'requestLimit', e.target.value)}
                                                        className="input-dark col-span-3 text-sm"
                                                        placeholder="Vô Hạn"
                                                    />
                                                    <input
                                                        type="number"
                                                        value={tier.price}
                                                        onChange={(e) => updatePricingTier(index, 'price', parseInt(e.target.value) || 0)}
                                                        className="input-dark col-span-3 text-sm"
                                                        placeholder="250000"
                                                    />
                                                    <div className="col-span-2 flex justify-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={tier.isPopular || false}
                                                            onChange={(e) => updatePricingTier(index, 'isPopular', e.target.checked)}
                                                            className="w-4 h-4 accent-[#00ff88]"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => removePricingTier(index)}
                                                        className="col-span-1 text-red-500 hover:text-red-400 p-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={addPricingTier}
                                            className="text-[#00ff88] hover:text-[#00cc6a] text-sm flex items-center gap-1 mt-2"
                                        >
                                            <Plus className="w-4 h-4" /> Thêm gói giá
                                        </button>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm text-[#a1a1aa] mb-2">Tính năng</label>
                                        {productForm.features.map((feature, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => {
                                                        const newFeatures = [...productForm.features];
                                                        newFeatures[index] = e.target.value;
                                                        setProductForm({ ...productForm, features: newFeatures });
                                                    }}
                                                    className="input-dark flex-1"
                                                    placeholder={`Tính năng ${index + 1}`}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newFeatures = productForm.features.filter((_, i) => i !== index);
                                                        setProductForm({ ...productForm, features: newFeatures });
                                                    }}
                                                    className="text-red-500 hover:text-red-400 p-2"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() =>
                                                setProductForm({ ...productForm, features: [...productForm.features, ''] })
                                            }
                                            className="text-[#00ff88] hover:text-[#00cc6a] text-sm flex items-center gap-1"
                                        >
                                            <Plus className="w-4 h-4" /> Thêm tính năng
                                        </button>
                                    </div>

                                    <div className="md:col-span-2 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            checked={productForm.isActive}
                                            onChange={(e) =>
                                                setProductForm({ ...productForm, isActive: e.target.checked })
                                            }
                                            className="w-5 h-5 accent-[#00ff88]"
                                        />
                                        <label htmlFor="isActive" className="text-[#a1a1aa]">
                                            Hiển thị sản phẩm
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-4">
                                    <button onClick={handleSaveProduct} className="btn-primary flex items-center gap-2">
                                        <Save className="w-5 h-5" />
                                        {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                                    </button>
                                    <button onClick={resetForm} className="btn-secondary">
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingProduct(true)}
                                className="btn-primary flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Thêm sản phẩm mới
                            </button>
                        )}

                        {/* Products List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-[#16161e] border border-[#2a2a3a] rounded-xl p-4"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        {product.imageUrl ? (
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                width={48}
                                                height={48}
                                                className="rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-[#2a2a3a] rounded-lg flex items-center justify-center">
                                                <Package className="w-6 h-6 text-[#a1a1aa]" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-semibold text-white text-sm">{product.name}</h3>
                                                {product.tag && (
                                                    <span className="text-xs bg-[#00ff88]/10 text-[#00ff88] px-2 py-0.5 rounded">
                                                        {product.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[#00ff88] font-bold text-sm">
                                                {product.pricingTiers.length > 0
                                                    ? `Từ ${formatPrice(Math.min(...product.pricingTiers.map(t => t.price)))}`
                                                    : 'Chưa có giá'}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#a1a1aa] mb-3 line-clamp-2">{product.description}</p>
                                    <div className="text-xs text-[#71717a] mb-3">
                                        {product.pricingTiers.length} gói giá
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="flex-1 py-2 bg-[#2a2a3a] hover:bg-[#3a3a4a] rounded-lg text-sm flex items-center justify-center gap-1"
                                        >
                                            <Edit className="w-4 h-4" /> Sửa
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="py-2 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bills Tab */}
                {activeTab === 'bills' && (
                    <div className="space-y-6">
                        {/* Add Bill Form */}
                        <div className="bg-[#16161e] border border-[#2a2a3a] rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Thêm bill mới</h2>

                            {/* Toggle between file and URL */}
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setBillUploadMode('file')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${billUploadMode === 'file'
                                        ? 'bg-[#00ff88] text-[#0a0a12]'
                                        : 'bg-[#2a2a3a] text-[#a1a1aa] hover:text-white'
                                        }`}
                                >
                                    <Upload className="w-4 h-4" />
                                    Tải từ máy tính
                                </button>
                                <button
                                    onClick={() => setBillUploadMode('url')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${billUploadMode === 'url'
                                        ? 'bg-[#00ff88] text-[#0a0a12]'
                                        : 'bg-[#2a2a3a] text-[#a1a1aa] hover:text-white'
                                        }`}
                                >
                                    <LinkIcon className="w-4 h-4" />
                                    Nhập URL
                                </button>
                            </div>

                            {billUploadMode === 'file' ? (
                                <div className="space-y-4">
                                    <div>
                                        <input
                                            type="text"
                                            value={newBillDesc}
                                            onChange={(e) => setNewBillDesc(e.target.value)}
                                            placeholder="Mô tả bill (tùy chọn)"
                                            className="input-dark w-full"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            ref={billFileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleBillFileUpload}
                                            className="hidden"
                                            id="bill-file-input"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => billFileInputRef.current?.click()}
                                            disabled={isUploadingBill}
                                            className="w-full py-6 px-4 border-2 border-dashed border-[#2a2a3a] rounded-xl hover:border-[#00ff88] transition-colors flex flex-col items-center justify-center gap-2 text-[#a1a1aa] hover:text-[#00ff88] disabled:opacity-50"
                                        >
                                            <Upload className="w-8 h-8" />
                                            <span className="font-medium">
                                                {isUploadingBill ? 'Đang tải...' : 'Click để chọn ảnh bill'}
                                            </span>
                                            <span className="text-sm text-[#71717a]">
                                                Hỗ trợ chọn nhiều ảnh cùng lúc
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="text"
                                        value={newBillUrl}
                                        onChange={(e) => setNewBillUrl(e.target.value)}
                                        placeholder="URL hình ảnh bill"
                                        className="input-dark flex-1"
                                    />
                                    <input
                                        type="text"
                                        value={newBillDesc}
                                        onChange={(e) => setNewBillDesc(e.target.value)}
                                        placeholder="Mô tả (tùy chọn)"
                                        className="input-dark flex-1"
                                    />
                                    <button onClick={handleAddBillUrl} className="btn-primary flex items-center gap-2">
                                        <Plus className="w-5 h-5" />
                                        Thêm
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Bills Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {bills.map((bill) => (
                                <div
                                    key={bill.id}
                                    className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#2a2a3a] group"
                                >
                                    <Image
                                        src={bill.imageUrl}
                                        alt={bill.description || 'Bill'}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => deleteBill(bill.id)}
                                            className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
                                        <p className="text-xs text-white truncate">{bill.description || bill.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
