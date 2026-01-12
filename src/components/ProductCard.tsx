import { Product } from '@/lib/types';
import {
    MessageSquare,
    Code,
    Github,
    Brain,
    Image as ImageIcon,
    FileText,
    Sparkles,
    Check,
    ExternalLink
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

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    return (
        <div className="group relative bg-[#16161e] border border-[#2a2a3a] rounded-2xl overflow-hidden card-hover">
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

            <div className="relative p-6">
                {/* Icon/Image and Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                        {product.imageUrl ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#2a2a3a] group-hover:border-[#00ff88]/50 transition-colors">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#00ccff]/20 flex items-center justify-center border border-[#2a2a3a] group-hover:border-[#00ff88]/50 transition-colors">
                                <IconComponent className="w-7 h-7 text-[#00ff88]" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-[#00ff88] blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00ff88] transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-sm text-[#a1a1aa] line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-3xl font-bold text-[#00ff88] glow-text">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <>
                            <span className="text-lg text-[#71717a] line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                            <span className="text-sm font-semibold text-[#ff3366] bg-[#ff3366]/10 px-2 py-0.5 rounded">
                                -{discount}%
                            </span>
                        </>
                    )}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                            <Check className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link
                    href={product.contactLink}
                    target="_blank"
                    className="btn-primary w-full flex items-center justify-center gap-2 group/btn"
                >
                    <span>Mua ngay</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
