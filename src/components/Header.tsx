import Link from 'next/link';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a12]/80 backdrop-blur-xl border-b border-[#2a2a3a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <Sparkles className="w-8 h-8 text-[#00ff88] group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-[#00ff88] blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-[#00ff88] bg-clip-text text-transparent">
                            AI Shop
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="#products"
                            className="text-[#a1a1aa] hover:text-[#00ff88] transition-colors font-medium"
                        >
                            Sản phẩm
                        </Link>
                        <Link
                            href="#trust"
                            className="text-[#a1a1aa] hover:text-[#00ff88] transition-colors font-medium"
                        >
                            Bằng chứng giao dịch
                        </Link>
                        <Link
                            href="https://zalo.me/0944568913"
                            target="_blank"
                            className="btn-primary text-sm"
                        >
                            Liên hệ ngay
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-[#2a2a3a]">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="#products"
                                className="text-[#a1a1aa] hover:text-[#00ff88] transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sản phẩm
                            </Link>
                            <Link
                                href="#trust"
                                className="text-[#a1a1aa] hover:text-[#00ff88] transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Bằng chứng giao dịch
                            </Link>
                            <Link
                                href="https://zalo.me/0944568913"
                                target="_blank"
                                className="btn-primary text-sm text-center"
                            >
                                Liên hệ ngay
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
