import Link from 'next/link';
import { Sparkles, MessageCircle, Phone, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#0a0a12] border-t border-[#2a2a3a] py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-8 h-8 text-[#00ff88]" />
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-[#00ff88] bg-clip-text text-transparent">
                                AI Shop
                            </span>
                        </Link>
                        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-4">
                            Cung cấp các công cụ AI cao cấp với giá tốt nhất Việt Nam.
                            Uy tín, nhanh chóng, hỗ trợ 24/7.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="https://zalo.me/0944568913"
                                target="_blank"
                                className="w-10 h-10 rounded-lg bg-[#16161e] border border-[#2a2a3a] flex items-center justify-center hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </Link>
                            <Link
                                href="tel:0944568913"
                                className="w-10 h-10 rounded-lg bg-[#16161e] border border-[#2a2a3a] flex items-center justify-center hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                            </Link>
                            <Link
                                href="mailto:dvaidevhub@gmail.com"
                                className="w-10 h-10 rounded-lg bg-[#16161e] border border-[#2a2a3a] flex items-center justify-center hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#products" className="text-[#a1a1aa] hover:text-[#00ff88] text-sm transition-colors">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link href="#trust" className="text-[#a1a1aa] hover:text-[#00ff88] text-sm transition-colors">
                                    Bằng chứng giao dịch
                                </Link>
                            </li>
                            <li>
                                <Link href="https://zalo.me/0944568913" target="_blank" className="text-[#a1a1aa] hover:text-[#00ff88] text-sm transition-colors">
                                    Liên hệ tư vấn
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
                        <ul className="space-y-3 text-sm text-[#a1a1aa]">
                            <li className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-[#00ff88]" />
                                <span>Zalo: 0944 568 913</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#00ff88]" />
                                <span>Hotline: 0944 568 913</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#00ff88]" />
                                <span>dvaidevhub@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#2a2a3a] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[#71717a]">
                        © {currentYear} AI Shop. All rights reserved.
                    </p>
                    <p className="text-xs text-[#52525b]">
                        Made with 💚 for AI enthusiasts
                    </p>
                </div>
            </div>
        </footer>
    );
}
