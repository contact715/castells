import { Message } from '@/data/mockConversations';
import { format, isSameDay } from 'date-fns';
import { useEffect, useRef } from 'react';

interface MessageThreadProps {
    messages: Message[];
    leadName: string;
}

export function MessageThread({ messages, leadName }: MessageThreadProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const groupMessagesByDate = (messages: Message[]) => {
        const groups: { date: Date; messages: Message[] }[] = [];
        let currentDate: Date | null = null;

        messages.forEach((message) => {
            if (!currentDate || !isSameDay(currentDate, message.timestamp)) {
                currentDate = message.timestamp;
                groups.push({ date: currentDate, messages: [message] });
            } else {
                groups[groups.length - 1].messages.push(message);
            }
        });

        return groups;
    };

    const messageGroups = groupMessagesByDate(messages);

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messageGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-4">
                    {/* Date Separator */}
                    <div className="flex items-center justify-center">
                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-text-secondary">
                            {format(group.date, 'MMM dd, yyyy')}
                        </div>
                    </div>

                    {/* Messages */}
                    {group.messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-[2rem] px-4 py-3 ${message.sender === 'business'
                                        ? 'bg-bblue-600 text-white'
                                        : 'bg-white/10 text-white'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                    {message.content}
                                </p>
                                <div
                                    className={`text-xs mt-2 ${message.sender === 'business' ? 'text-white/70' : 'text-text-secondary'
                                        }`}
                                >
                                    {format(message.timestamp, 'HH:mm')}
                                    {message.sender === 'business' && (
                                        <span className="ml-2">
                                            {message.status === 'read' && '✓✓'}
                                            {message.status === 'delivered' && '✓'}
                                            {message.status === 'sent' && '·'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}
