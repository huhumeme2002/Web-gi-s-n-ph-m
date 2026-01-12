'use client';

import { useAppContext } from '@/lib/context';
import { ShieldCheck, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function TrustSection() {
    const { bills } = useAppContext();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="trust" className="relative py-20 sm:py-28 bg-[#12121a]">
            {/* Background pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#16161e] border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
                        <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                        <span className="text-sm text-[#a1a1aa]">Uy tín hàng đầu</span>
                    </div>
                    <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
                        Bằng Chứng Giao Dịch
                    </h2>
                    <p className="text-[#a1a1aa] text-lg max-w-2xl mx-auto">
                        Hơn 1000+ khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi.
                        Dưới đây là bằng chứng giao dịch thành công với khách hàng.
                    </p>
                </div>

                {/* Bills grid */}
                {bills.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {bills.map((bill) => (
                            <div
                                key={bill.id}
                                onClick={() => setSelectedImage(bill.imageUrl)}
                                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#2a2a3a] cursor-pointer group card-hover"
                            >
                                <Image
                                    src={bill.imageUrl}
                                    alt={bill.description || `Giao dịch ${bill.date}`}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                                    <p className="text-xs text-white font-medium truncate">
                                        {bill.description || 'Giao dịch thành công'}
                                    </p>
                                    <p className="text-xs text-[#a1a1aa]">{bill.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <ShieldCheck className="w-16 h-16 text-[#2a2a3a] mx-auto mb-4" />
                        <p className="text-[#a1a1aa]">Chưa có giao dịch nào.</p>
                    </div>
                )}

                {/* Trust badges */}
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
                    {[
                        { icon: '🔒', text: 'Bảo mật 100%' },
                        { icon: '⚡', text: 'Giao hàng tức thì' },
                        { icon: '💬', text: 'Hỗ trợ 24/7' },
                        { icon: '🛡️', text: 'Bảo hành trọn đời' },
                    ].map((badge, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-[#16161e] border border-[#2a2a3a] rounded-full px-4 py-2"
                        >
                            <span className="text-xl">{badge.icon}</span>
                            <span className="text-sm text-[#a1a1aa]">{badge.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-[#00ff88] transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative max-w-2xl max-h-[90vh] w-full h-full">
                        <Image
                            src={selectedImage}
                            alt="Bill detail"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
