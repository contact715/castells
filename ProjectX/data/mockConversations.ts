// Mock data for conversations
export type Platform = 'yelp' | 'google' | 'facebook' | 'instagram' | 'whatsapp';

export interface Message {
    id: string;
    sender: 'business' | 'lead';
    content: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
}

export interface LeadDetails {
    name: string;
    email?: string;
    phone?: string;
    address?: string;

    // Yelp Lead Details
    yelpLeadId?: string;
    yelpTemporaryEmail?: string;
    yelpEmailExpires?: Date;
    yelpConversationUrl?: string;
    projectType?: string;
    projectLocation?: string;
    conversationMessagesCount?: number;
    conversationStatus?: string;

    // Other platform details
    initialInquiry?: string;
    propertyDetails?: string;
    facebookPageId?: string;
    instagramHandle?: string;
    whatsappNumber?: string;
}

export interface Conversation {
    id: string;
    leadName: string;
    platform: Platform;
    lastMessage: string;
    timestamp: Date;
    unread: number;
    messages: Message[];
    leadDetails: LeadDetails;
    status: 'active' | 'pending' | 'closed';
}

export const mockConversations: Conversation[] = [
    {
        id: '1',
        leadName: 'Elena F.',
        platform: 'yelp',
        lastMessage: 'Hi Elena, thanks for reaching out...',
        timestamp: new Date('2024-11-28T10:31:00'),
        unread: 0,
        status: 'active',
        messages: [
            {
                id: 'm1',
                sender: 'lead',
                content: 'Hi there! Could you help me with my project? Here are my answers to Yelp\'s questions regarding my project: What kind of work would you like to get done? Clearing How tall is the tree? 2 stories you like you like to add? 4,128 square feet with both townhome units How would you like the trees serviced? Arborist consultation Do you need tree service? Yes',
                timestamp: new Date('2024-11-28T10:31:00'),
                status: 'read'
            },
            {
                id: 'm2',
                sender: 'business',
                content: 'Hi Stephanie, thanks for reaching out to The Brothers that just do Gutters Austin. We can help you similar cleaning for both 2 townhome units on 78745. Might tell you scheduled for an estimate so we can note your ASAP preference and have this fulfilled ASAP. How is next week?',
                timestamp: new Date('2024-11-28T10:34:00'),
                status: 'read'
            }
        ],
        leadDetails: {
            name: 'Elena F.',
            phone: 'N/A',
            email: 'N/A',
            yelpLeadId: 'DJupEBnz0Bcwj161AcehQA',
            yelpTemporaryEmail: 'leadsapi+536739799a204370b22d0f10304c8655@messaging.yelp.com',
            yelpEmailExpires: new Date('2025-11-25T10:31:00'),
            yelpConversationUrl: 'https://www.yelp.com/leads/conversation/DJupEBnz0Bcwj161AcehQA',
            projectType: 'Gutter cleaning',
            projectLocation: 'postalCode: 78745',
            conversationMessagesCount: 8,
            conversationStatus: 'AI Paused',
            initialInquiry: `Hi there! Could you help me with my project? Here are my answers to Yelp's questions regarding my project:

What kind of work would you like to get done?
Cleaning

How tall is the home?
2 stories

Any details you'd like to add?
4,128 square feet with both townhome units

When do you require this service?
As soon as possible

In what location do you need the service?
78745`
        }
    },
    {
        id: '2',
        leadName: 'Yanish',
        platform: 'whatsapp',
        lastMessage: 'Thanks for reaching out, Italia...',
        timestamp: new Date('2024-11-28T11:56:00'),
        unread: 2,
        status: 'pending',
        messages: [
            {
                id: 'm3',
                sender: 'lead',
                content: 'Good morning! I need help with gutter installation',
                timestamp: new Date('2024-11-28T11:50:00'),
                status: 'read'
            },
            {
                id: 'm4',
                sender: 'business',
                content: 'Thanks for reaching out, Italia. We can definitely help with that!',
                timestamp: new Date('2024-11-28T11:56:00'),
                status: 'delivered'
            }
        ],
        leadDetails: {
            name: 'Yanish',
            phone: '+1 512-555-0123',
            initialInquiry: 'Gutter installation inquiry'
        }
    },
    {
        id: '3',
        leadName: 'Marco D.',
        platform: 'google',
        lastMessage: 'Thank you!',
        timestamp: new Date('2024-11-28T10:39:00'),
        unread: 0,
        status: 'active',
        messages: [
            {
                id: 'm5',
                sender: 'lead',
                content: 'Hi there, The address is 4600 Banister Ln, Austin, TX 78745. You can also call me at 720 364-7618. Thank you!',
                timestamp: new Date('2024-11-28T10:37:00'),
                status: 'read'
            },
            {
                id: 'm6',
                sender: 'business',
                content: 'Thanks, Stephanie. We have 4600 Banister Ln, Austin, TX 78745 and your phone number ending in 7618. For the next steps, what is the best email to send you our scheduler link where you can pick a time for an estimate and we can note your need for ASAP service? If you prefer, you can also pick a time at this link now: [link]',
                timestamp: new Date('2024-11-28T10:39:00'),
                status: 'read'
            }
        ],
        leadDetails: {
            name: 'Marco D.',
            phone: '720-364-7618',
            address: '4600 Banister Ln, Austin, TX 78745',
            initialInquiry: 'Need gutter service ASAP'
        }
    },
    {
        id: '4',
        leadName: 'Daisy N.',
        platform: 'facebook',
        lastMessage: 'Thanks! Sent from ...',
        timestamp: new Date('2024-11-28T09:28:00'),
        unread: 0,
        status: 'active',
        messages: [
            {
                id: 'm7',
                sender: 'lead',
                content: 'Hello! I saw your service and would like to schedule a consultation.',
                timestamp: new Date('2024-11-28T09:25:00'),
                status: 'read'
            },
            {
                id: 'm8',
                sender: 'business',
                content: 'Thanks! We can absolutely help with that. When works best for you?',
                timestamp: new Date('2024-11-28T09:28:00'),
                status: 'read'
            }
        ],
        leadDetails: {
            name: 'Daisy N.',
            email: 'daisy.n@email.com',
            initialInquiry: 'Consultation request'
        }
    },
    {
        id: '5',
        leadName: 'Nicky B.',
        platform: 'instagram',
        lastMessage: 'Thanks, Nicky, got your number...',
        timestamp: new Date('2024-11-27T13:10:00'),
        unread: 1,
        status: 'pending',
        messages: [
            {
                id: 'm9',
                sender: 'lead',
                content: 'Hey! Love your work. Can you help with my home?',
                timestamp: new Date('2024-11-27T13:05:00'),
                status: 'read'
            },
            {
                id: 'm10',
                sender: 'business',
                content: 'Thanks, Nicky! We would love to help. What kind of service are you looking for?',
                timestamp: new Date('2024-11-27T13:10:00'),
                status: 'delivered'
            }
        ],
        leadDetails: {
            name: 'Nicky B.',
            initialInquiry: 'Home service inquiry via Instagram'
        }
    },
    {
        id: '6',
        leadName: 'Benjamin S.',
        platform: 'yelp',
        lastMessage: 'Hi there, Can I take your pho...',
        timestamp: new Date('2024-11-25T14:20:00'),
        unread: 0,
        status: 'active',
        messages: [
            {
                id: 'm11',
                sender: 'lead',
                content: 'Stephaine, your name? Can I take your phone number for scheduling?',
                timestamp: new Date('2024-11-25T14:18:00'),
                status: 'read'
            },
            {
                id: 'm12',
                sender: 'business',
                content: 'Hi there, Can I take your phone number and we can schedule a call?',
                timestamp: new Date('2024-11-25T14:20:00'),
                status: 'read'
            }
        ],
        leadDetails: {
            name: 'Benjamin S.',
            yelpLeadId: 'stephaine-contact-request',
            initialInquiry: 'Scheduling inquiry'
        }
    }
];
