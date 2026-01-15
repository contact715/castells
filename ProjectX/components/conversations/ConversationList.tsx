import { Conversation } from '@/data/mockConversations';
import { PlatformBadge } from './PlatformBadge';
import { formatDistanceToNow } from 'date-fns';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface ConversationListProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onSelectConversation: (id: string) => void;
}

export function ConversationList({
    conversations,
    activeConversationId,
    onSelectConversation
}: ConversationListProps) {
    return (
        <div className="h-full flex flex-col bg-transparent">
            {/* Header */}
            <div className="p-6 border-b border-black/5 dark:border-white/5">
                <h2 className="text-xl font-bold text-text-primary dark:text-white mb-3">Conversations</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <Input
                        placeholder="Search conversations..."
                        className="pl-10 bg-white/5"
                    />
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {conversations.map((conversation) => (
                    <button
                        key={conversation.id}
                        onClick={() => onSelectConversation(conversation.id)}
                        className={`w-full p-6 flex items-start gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-all border-b border-black/5 dark:border-white/5 ${activeConversationId === conversation.id ? 'bg-black/5 dark:bg-white/10' : ''
                            }`}
                    >
                        {/* Platform Badge */}
                        <div className="flex-shrink-0 mt-1">
                            <PlatformBadge platform={conversation.platform} size="md" />
                        </div>

                        {/* Conversation Info */}
                        <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-white truncate">
                                    {conversation.leadName}
                                </h3>
                                <span className="text-xs text-text-secondary ml-2 flex-shrink-0">
                                    {formatDistanceToNow(conversation.timestamp, { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-sm text-text-secondary truncate">
                                {conversation.lastMessage}
                            </p>
                        </div>

                        {/* Unread Badge */}
                        {conversation.unread > 0 && (
                            <div className="flex-shrink-0 mt-1">
                                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-coral rounded-full">
                                    {conversation.unread}
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
