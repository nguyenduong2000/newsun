
'use client';

import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" {...props}><path fill="#2962ff" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10 c4.722,0,8.883-2.348,11.417-5.931V36H15z"/><path fill="#eee" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19 c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742 c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083 C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"/><path fill="#2962ff" d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75 S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"/><path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"/><path fill="#2962ff" d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75 S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5 c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"/><path fill="#2962ff" d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5 c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"/></svg>
);

const FacebookMessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" {...props}><path fill="#448AFF" d="M24,4C13.5,4,5,12.1,5,22c0,5.2,2.3,9.8,6,13.1V44l7.8-4.7c1.6,0.4,3.4,0.7,5.2,0.7c10.5,0,19-8.1,19-18C43,12.1,34.5,4,24,4z"/><path fill="#FFF" d="M12 28L22 17 27 22 36 17 26 28 21 23z"/></svg>
)

const contactLinks = [
    {
      href: 'tel:0366635562',
      icon: <Phone className="h-6 w-6 text-black" />,
      label: 'Hotline: 0366635562',
      bgColor: 'bg-transparent hover:bg-transparent',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=61578020506104&mibextid=wwXIfr&rdid=njTyrKorgeu7PPwO&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HkoYWxYp5%2F%3Fmibextid%3DwwXIfr#',
      icon: <FacebookMessengerIcon className="h-8 w-8"  style={{width:"2rem",height: "2rem"}}/>,
      label: 'Chat Facebook',
      bgColor: 'bg-transparent hover:bg-transparent',
    },
    {
      href: 'tel:0366635562',
      icon: <ZaloIcon className="h-8 w-8" style={{width:"2rem",height: "2rem"}} />,
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
                                <Link href={link.href} target="_blank" rel="noopener noreferrer" className='bg-white'>
                                    {link.icon}
                                    <span className="sr-only">{link.label}</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left" >
                            <p>{link.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    )
}
