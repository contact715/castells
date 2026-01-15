import { Platform } from '@/data/mockConversations';
import { MessageCircle } from 'lucide-react';
import { FaYelp, FaFacebook, FaInstagram, FaWhatsapp, FaGoogle } from 'react-icons/fa';

interface PlatformBadgeProps {
    platform: Platform;
    size?: 'sm' | 'md' | 'lg';
}

const platformConfig = {
    yelp: {
        icon: FaYelp,
        color: 'bg-red-500',
        textColor: 'text-red-500',
        name: 'Yelp'
    },
    google: {
        icon: FaGoogle,
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
        name: 'Google'
    },
    facebook: {
        icon: FaFacebook,
        color: 'bg-blue-600',
        textColor: 'text-blue-600',
        name: 'Facebook'
    },
    instagram: {
        icon: FaInstagram,
        color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500',
        textColor: 'text-pink-500',
        name: 'Instagram'
    },
    whatsapp: {
        icon: FaWhatsapp,
        color: 'bg-green-500',
        textColor: 'text-green-500',
        name: 'WhatsApp'
    }
};

export function PlatformBadge({ platform, size = 'md' }: PlatformBadgeProps) {
    const config = platformConfig[platform];
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'w-4 h-4 p-0.5',
        md: 'w-6 h-6 p-1',
        lg: 'w-8 h-8 p-1.5'
    };

    return (
        <div
            className={`${sizeClasses[size]} ${config.color} rounded-full flex items-center justify-center text-white`}
            title={config.name}
        >
            <Icon className="w-full h-full" />
        </div>
    );
}
