'use client';

import { Zap, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background effects */}
            <div className="absolute inset-0 grid-pattern" />
            <div className="absolute inset-0 gradient-animated opacity-50" />

            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00ff88] rounded-full blur-[128px] opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ccff] rounded-full blur-[128px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#ff00ff] rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#16161e] border border-[#2a2a3a] rounded-full px-4 py-2 mb-8">
                    <Sparkles className="w-4 h-4 text-[#00ff88]" />
                    <span className="text-sm text-[#a1a1aa]">Uy tín • Nhanh chóng • Giá tốt nhất</span>
                </div>

                {/* Main heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="text-white">Premium </span>
                    <span className="bg-gradient-to-r from-[#00ff88] via-[#00ccff] to-[#00ff88] bg-clip-text text-transparent">
                        AI Tools
                    </span>
                    <br />
                    <span className="text-white">Giá Tốt Nhất Việt Nam</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed">
                    Cung cấp tài khoản <span className="text-[#00ff88] font-semibold">ChatGPT Plus</span>,
                    <span className="text-[#00ccff] font-semibold"> Cursor Pro</span>,
                    <span className="text-[#ff00ff] font-semibold"> GitHub Copilot</span> và nhiều công cụ AI cao cấp khác với giá rẻ nhất thị trường.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <button
                        onClick={() => scrollToSection('products')}
                        className="btn-primary pulse-glow flex items-center gap-2 text-lg px-8 py-4"
                    >
                        <Zap className="w-5 h-5" />
                        Xem sản phẩm
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <Link
                        href="https://zalo.me/0944568913"
                        target="_blank"
                        className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
                    >
                        Chat Zalo ngay
                    </Link>
                    <button
                        onClick={() => scrollToSection('trust')}
                        className="flex items-center gap-2 text-lg px-8 py-4 bg-gradient-to-r from-[#ffcc00]/20 to-[#ff6b35]/20 border-2 border-[#ffcc00] rounded-lg text-[#ffcc00] hover:text-white hover:from-[#ffcc00]/30 hover:to-[#ff6b35]/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,204,0,0.3)] hover:shadow-[0_0_30px_rgba(255,204,0,0.5)]"
                    >
                        🔥 Bằng chứng giao dịch
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {[
                        { value: '1000+', label: 'Khách hàng' },
                        { value: '99%', label: 'Hài lòng' },
                        { value: '24/7', label: 'Hỗ trợ' },
                        { value: '5 phút', label: 'Nhận hàng' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-[#16161e]/80 backdrop-blur-sm border border-[#2a2a3a] rounded-xl p-4 card-hover"
                        >
                            <div className="text-2xl sm:text-3xl font-bold text-[#00ff88] glow-text mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-[#a1a1aa]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs text-[#a1a1aa]">Scroll</span>
                <div className="w-6 h-10 border-2 border-[#2a2a3a] rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-[#00ff88] rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}
