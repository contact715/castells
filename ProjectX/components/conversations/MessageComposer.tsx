import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, Paperclip, Smile } from 'lucide-react';

interface MessageComposerProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
}

export function MessageComposer({ onSendMessage, disabled = false }: MessageComposerProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 border-t border-white/10 bg-dark-surface">
            <div className="flex items-end gap-3">
                {/* Attachment Button */}
                <button
                    className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    title="Attach file"
                >
                    <Paperclip className="w-5 h-5" />
                </button>

                {/* Message Input */}
                <div className="flex-1 relative">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        disabled={disabled}
                        className="w-full bg-white/5 text-white placeholder-text-secondary rounded-[2rem] px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-bblue-500 min-h-[48px] max-h-[120px]"
                        rows={1}
                        style={{
                            height: 'auto',
                            minHeight: '48px'
                        }}
                        onInput={(e) => {
                            e.currentTarget.style.height = 'auto';
                            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                        }}
                    />
                    {/* Emoji Button */}
                    <button
                        className="absolute right-3 bottom-3 text-text-secondary hover:text-white transition-colors"
                        title="Add emoji"
                    >
                        <Smile className="w-5 h-5" />
                    </button>
                </div>

                {/* Send Button */}
                <Button
                    onClick={handleSend}
                    disabled={!message.trim() || disabled}
                    className="bg-bblue-600 hover:bg-bblue-500 text-white rounded-full p-3"
                >
                    <Send className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
