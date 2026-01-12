import { Product } from '@/lib/types';
import {
    MessageSquare,
    Code,
    Github,
    Brain,
    Image as ImageIcon,
    FileText,
    Sparkles,
    ExternalLink,
    Flame
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    MessageSquare,
    Code,
    Github,
    Brain,
    Image: ImageIcon,
    FileText,
    Sparkles,
};

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const IconComponent = iconMap[product.icon] || Sparkles;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const getTagClass = (tag?: string) => {
        if (!tag) return '';
        const tagLower = tag.toLowerCase();
        if (tagLower.includes('best') || tagLower.includes('seller')) return 'tag-bestseller';
        if (tagLower.includes('hot')) return 'tag-hot';
        if (tagLower.includes('new')) return 'tag-new';
        return 'tag-new';
    };

    // Get the lowest price for display (with safety check)
    const pricingTiers = product.pricingTiers || [];
    const lowestPrice = pricingTiers.length > 0 ? Math.min(...pricingTiers.map(t => t.price)) : 0;

    return (
        <div className="group relative bg-[#16161e] border border-[#2a2a3a] rounded-2xl overflow-hidden card-hover flex flex-col">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Tag */}
            {product.tag && (
                <div className="absolute top-4 right-4 z-10">
                    <span className={`tag ${getTagClass(product.tag)}`}>
                        {product.tag}
                    </span>
                </div>
            )}

            <div className="relative p-5 flex-1 flex flex-col">
                {/* Header: Icon/Image and Title */}
                <div className="flex items-start gap-3 mb-4">
                    <div className="relative flex-shrink-0">
                        {product.imageUrl ? (
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#2a2a3a] group-hover:border-[#00ff88]/50 transition-colors">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#00ccff]/20 flex items-center justify-center border border-[#2a2a3a] group-hover:border-[#00ff88]/50 transition-colors">
                                <IconComponent className="w-6 h-6 text-[#00ff88]" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff88] transition-colors leading-tight">
                            {product.name}
                        </h3>
                        <p className="text-xs text-[#a1a1aa] line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Starting Price */}
                <div className="mb-3">
                    <span className="text-2xl font-bold text-[#00ff88] glow-text">
                        {formatPrice(lowestPrice)}
                    </span>
                </div>

                {/* Pricing Table */}
                {pricingTiers.length > 0 && (
                    <div className="flex-1 mb-4">
                        <div className="bg-[#0a0a12] rounded-xl border border-[#2a2a3a] overflow-hidden">
                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-2 p-2 bg-[#12121a] text-xs font-semibold text-[#71717a] border-b border-[#2a2a3a]">
                                <div>Thời hạn</div>
                                <div>Request</div>
                                <div className="text-right">Giá</div>
                            </div>
                            {/* Table Body */}
                            <div className="max-h-[180px] overflow-y-auto">
                                {pricingTiers.map((tier, index) => (
                                    <div
                                        key={index}
                                        className={`grid grid-cols-3 gap-2 p-2 text-sm border-b border-[#2a2a3a]/50 last:border-b-0 hover:bg-[#16161e] transition-colors ${tier.isPopular ? 'bg-[#00ff88]/5 relative' : ''
                                            }`}
                                    >
                                        {tier.isPopular && (
                                            <Flame className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#ff6b35]" />
                                        )}
                                        <div className={`text-[#d4d4d8] ${tier.isPopular ? 'pl-2' : ''}`}>
                                            {tier.duration}
                                        </div>
                                        <div className="text-[#a1a1aa] text-xs flex items-center">
                                            {tier.requestLimit}
                                        </div>
                                        <div className={`text-right font-semibold ${tier.isPopular ? 'text-[#00ff88]' : 'text-white'}`}>
                                            {formatPrice(tier.price)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Features (compact) */}
                {product.features && product.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.features.map((feature, index) => (
                            <span
                                key={index}
                                className="text-xs px-2.5 py-1.5 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 rounded-md font-medium"
                            >
                                ✓ {feature}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA Button */}
                <Link
                    href={product.contactLink}
                    target="_blank"
                    className="btn-primary w-full flex items-center justify-center gap-2 group/btn mt-auto"
                >
                    <span>Mua ngay</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
