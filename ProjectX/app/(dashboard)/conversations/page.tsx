"use client";

import { useState } from 'react';
import { mockConversations, Conversation } from '@/data/mockConversations';
import { ConversationList } from '@/components/conversations/ConversationList';
import { MessageThread } from '@/components/conversations/MessageThread';
import { MessageComposer } from '@/components/conversations/MessageComposer';
import { LeadDetailsPanel } from '@/components/conversations/LeadDetailsPanel';
import { PlatformBadge } from '@/components/conversations/PlatformBadge';
import { MessageSquare } from 'lucide-react';

export default function ConversationsPage() {
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(
        mockConversations[0]?.id || null
    );

    const activeConversation = conversations.find((c) => c.id === activeConversationId);

    const handleSendMessage = (content: string) => {
        if (!activeConversation) return;

        const newMessage = {
            id: `m${Date.now()}`,
            sender: 'business' as const,
            content,
            timestamp: new Date(),
            status: 'sent' as const
        };

        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === activeConversationId
                    ? {
                        ...conv,
                        messages: [...conv.messages, newMessage],
                        lastMessage: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
                        timestamp: new Date()
                    }
                    : conv
            )
        );

        // Simulate message delivery
        setTimeout(() => {
            setConversations((prev) =>
                prev.map((conv) => {
                    if (conv.id === activeConversationId) {
                        return {
                            ...conv,
                            messages: conv.messages.map((msg) =>
                                msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
                            )
                        };
                    }
                    return conv;
                })
            );
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full gap-8">
            {/* Three-Column Layout */}
            <div className="grid grid-cols-12 gap-8 h-full">
                {/* Left: Conversation List */}
                <div className="col-span-3 rounded-[2rem] overflow-hidden shadow-xl bg-dark-surface">
                    <ConversationList
                        conversations={conversations}
                        activeConversationId={activeConversationId}
                        onSelectConversation={setActiveConversationId}
                    />
                </div>

                {/* Center: Message Thread */}
                <div className="col-span-6 rounded-[2rem] overflow-hidden shadow-xl bg-dark-surface flex flex-col">
                    {activeConversation ? (
                        <>
                            {/* Thread Header */}
                            <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-dark-surface">
                                <PlatformBadge platform={activeConversation.platform} size="md" />
                                <div className="flex-1">
                                    <h2 className="font-bold text-white">{activeConversation.leadName}</h2>
                                    <p className="text-xs text-text-secondary capitalize">{activeConversation.platform} • {activeConversation.status}</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <MessageThread
                                messages={activeConversation.messages}
                                leadName={activeConversation.leadName}
                            />

                            {/* Composer */}
                            <MessageComposer onSendMessage={handleSendMessage} />
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <MessageSquare className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                                <p className="text-text-secondary">Select a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Lead Details */}
                <div className="col-span-3 rounded-[2rem] overflow-hidden shadow-xl bg-dark-surface">
                    {activeConversation ? (
                        <LeadDetailsPanel
                            leadDetails={activeConversation.leadDetails}
                            platform={activeConversation.platform}
                            status={activeConversation.status}
                        />
                    ) : (
                        <div className="h-full bg-dark-surface flex items-center justify-center">
                            <p className="text-text-secondary text-sm">No conversation selected</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
