'use client';

import { useAppContext } from '@/lib/context';
import ProductCard from './ProductCard';
import { Package } from 'lucide-react';

export default function ProductGrid() {
    const { products } = useAppContext();
    const activeProducts = products.filter(p => p.isActive);

    return (
        <section id="products" className="relative py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#16161e] border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
                        <Package className="w-4 h-4 text-[#00ccff]" />
                        <span className="text-sm text-[#a1a1aa]">Danh sách sản phẩm</span>
                    </div>
                    <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
                        Công Cụ AI Premium
                    </h2>
                    <p className="text-[#a1a1aa] text-lg max-w-2xl mx-auto">
                        Đa dạng sản phẩm AI cao cấp với giá rẻ nhất thị trường. Bảo hành trọn đời, hỗ trợ 24/7.
                    </p>
                </div>

                {/* Product grid */}
                {activeProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {activeProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Package className="w-16 h-16 text-[#2a2a3a] mx-auto mb-4" />
                        <p className="text-[#a1a1aa]">Chưa có sản phẩm nào.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
