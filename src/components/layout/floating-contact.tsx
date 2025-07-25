
'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" {...props}>
        <path fill="#2196F3" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#FFF" d="M33.5,21.162c-0.306,0-0.6,0.078-0.867,0.225l-2.734,1.5c-0.39,0.216-0.633,0.639-0.633,1.092v3.498c0,0.453,0.243,0.876,0.633,1.092l2.734,1.5c0.267,0.147,0.561,0.225,0.867,0.225c0.84,0,1.5-0.783,1.5-1.749v-5.242C35,21.945,34.34,21.162,33.5,21.162z"></path>
        <path fill="#FFF" d="M19.195,19.062c-0.34,0-0.679,0.084-0.985,0.252l-2.585,1.422c-0.54,0.297-0.879,0.864-0.879,1.488v4.542c0,0.624,0.339,1.191,0.879,1.488l2.585,1.422c0.306,0.168,0.645,0.252,0.985,0.252c0.9,0,1.805-0.852,1.805-1.92V20.982C21,19.914,20.095,19.062,19.195,19.062z"></path>
        <path fill="#FFF" d="M26.348,22.462c-0.39,0-0.771,0.108-1.092,0.315l-2.661,1.725c-0.453,0.294-0.729,0.81-0.729,1.359v2.247c0,0.549,0.276,1.065,0.729,1.359l2.661,1.725c0.321,0.207,0.702,0.315,1.092,0.315c0.867,0,1.652-0.816,1.652-1.836V24.3C28,23.278,27.215,22.462,26.348,22.462z"></path>
    </svg>
);

const FacebookMessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.105 3.163 9.422 7.592 11.232.417.108.417-.234 0-.342-3.176-1.423-5.35-4.47-5.35-7.89 0-4.97 4.03-9 9-9s9 4.03 9 9c0 3.42-2.174 6.467-5.35 7.89-.417.108-.417.342 0 .342C20.837 21.422 24 17.105 24 12c0-6.627-5.373-12-12-12z"></path>
        <path d="M7.75 14.164l2.502-2.502 3.253 1.948 4.32-4.32-10.222 4.07 1.63 1.63 2.518-1.5z" fill="#fff"></path>
    </svg>
)

const contactLinks = [
    {
      href: 'tel:0961997355',
      icon: <Phone className="h-6 w-6 text-white" />,
      label: 'Hotline: 0961.997.355',
      bgColor: 'bg-red-500 hover:bg-red-600',
    },
    {
      href: 'https://m.me/your-facebook-page-id', // Thay đổi thành link m.me của bạn
      icon: <FacebookMessengerIcon className="h-6 w-6 text-white" />,
      label: 'Chat Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      href: 'https://zalo.me/0961997355', // Thay đổi thành link Zalo của bạn
      icon: <ZaloIcon className="h-7 w-7" />,
      label: 'Chat Zalo',
      bgColor: 'bg-transparent hover:bg-transparent',
    },
];

export function FloatingContact() {
    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 items-center">
            <TooltipProvider>
                {contactLinks.map((link) => (
                    <Tooltip key={link.label}>
                        <TooltipTrigger asChild>
                            <Button
                                asChild
                                size="icon"
                                className={`rounded-full shadow-lg h-12 w-12 transition-all duration-300 ${link.bgColor}`}
                            >
                                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                                    {link.icon}
                                    <span className="sr-only">{link.label}</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>{link.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    )
}
