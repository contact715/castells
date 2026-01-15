import { LeadDetails, Platform } from '@/data/mockConversations';
import { PlatformBadge } from './PlatformBadge';
import { Mail, Phone, MapPin, Calendar, Tag, ExternalLink, MessageSquare, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface LeadDetailsPanelProps {
    leadDetails: LeadDetails;
    platform: Platform;
    status: 'active' | 'pending' | 'closed';
}

export function LeadDetailsPanel({ leadDetails, platform, status }: LeadDetailsPanelProps) {
    const statusConfig = {
        active: { bg: 'bg-green-500/10', text: 'text-green-400', label: 'Active' },
        pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', label: 'Pending' },
        closed: { bg: 'bg-gray-500/10', text: 'text-gray-400', label: 'Closed' }
    };

    const currentStatus = statusConfig[status];

    return (
        <div className="h-full bg-dark-surface border-l border-white/10 overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-6">
                {/* Header with Yelp Lead Badge */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Client Details</h3>
                        {platform === 'yelp' && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-red-500/10 rounded text-xs font-medium text-red-400">
                                <Tag className="w-3 h-3" />
                                Yelp Lead
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 mb-4">
                        <div>
                            <p className="text-xs text-text-secondary mb-1">Name</p>
                            <p className="text-sm font-medium text-white">{leadDetails.name}</p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary mb-1">Phone</p>
                            <p className="text-sm text-white">{leadDetails.phone || 'N/A'}</p>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary mb-1">Email</p>
                            <p className="text-sm text-white">{leadDetails.email || 'N/A'}</p>
                        </div>

                        {leadDetails.yelpLeadId && (
                            <div>
                                <p className="text-xs text-text-secondary mb-1">Yelp Lead ID</p>
                                <p className="text-xs font-mono text-white break-all">{leadDetails.yelpLeadId}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Yelp Lead Details Section */}
                {platform === 'yelp' && leadDetails.yelpLeadId && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Yelp Lead Details</h3>
                            <a
                                href="https://www.yelp.com/leads"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                            >
                                View in Yelp Leads
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Contact Name */}
                        <div>
                            <p className="text-xs text-text-secondary mb-1">Contact Name</p>
                            <p className="text-sm font-medium text-white">{leadDetails.name}</p>
                        </div>

                        {/* Temporary Email */}
                        {leadDetails.yelpTemporaryEmail && (
                            <div>
                                <p className="text-xs text-text-secondary mb-1">Temporary Email (Yelp)</p>
                                <p className="text-xs text-white break-all mb-1">{leadDetails.yelpTemporaryEmail}</p>
                                {leadDetails.yelpEmailExpires && (
                                    <p className="text-xs text-text-secondary">
                                        Expires: {format(leadDetails.yelpEmailExpires, 'MMM dd, yyyy hh:mm a')}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Yelp Conversation Link */}
                        {leadDetails.yelpConversationUrl && (
                            <div>
                                <p className="text-xs text-text-secondary mb-1">Yelp Conversation</p>
                                <a
                                    href={leadDetails.yelpConversationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    Open in Yelp
                                </a>
                            </div>
                        )}

                        {/* Project Type */}
                        {leadDetails.projectType && (
                            <div>
                                <p className="text-xs text-text-secondary mb-1">Project Type</p>
                                <p className="text-sm text-white">{leadDetails.projectType}</p>
                            </div>
                        )}

                        {/* Project Location */}
                        {leadDetails.projectLocation && (
                            <div>
                                <p className="text-xs text-text-secondary mb-1">Project Location</p>
                                <p className="text-sm text-white">{leadDetails.projectLocation}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Initial Message */}
                {leadDetails.initialInquiry && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Initial Message</h3>
                        <div className="p-3 bg-white/5 rounded-[1.5rem]">
                            <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">{leadDetails.initialInquiry}</p>
                        </div>
                    </div>
                )}

                {/* Conversation Status */}
                {(leadDetails.conversationMessagesCount || leadDetails.conversationStatus) && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Conversation Status</h3>
                        <div className="flex items-center gap-3 text-sm">
                            {leadDetails.conversationMessagesCount && (
                                <div className="flex items-center gap-2 text-white">
                                    <MessageSquare className="w-4 h-4 text-text-secondary" />
                                    <span>{leadDetails.conversationMessagesCount} messages exchanged</span>
                                </div>
                            )}
                            {leadDetails.conversationStatus && (
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${leadDetails.conversationStatus.includes('Paused')
                                    ? 'bg-yellow-500/10 text-yellow-400'
                                    : 'bg-green-500/10 text-green-400'
                                    }`}>
                                    {leadDetails.conversationStatus}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Yelp Disclaimer */}
                {platform === 'yelp' && leadDetails.yelpLeadId && (
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs text-text-secondary leading-relaxed">
                            This is a Yelp lead. Phone and email are temporary forwarding addresses provided by Yelp. Click &quot;View in Yelp Leads&quot; above to see the full conversation history and payout details.
                        </p>
                    </div>
                )}

                {/* Contact Information (for non-Yelp platforms) */}
                {platform !== 'yelp' && (leadDetails.email || leadDetails.phone || leadDetails.address) && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">Contact Info</h3>

                        {leadDetails.email && (
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-text-secondary mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-text-secondary mb-1">Email</p>
                                    <a href={`mailto:${leadDetails.email}`} className="text-sm text-white hover:text-coral transition-colors">
                                        {leadDetails.email}
                                    </a>
                                </div>
                            </div>
                        )}

                        {leadDetails.phone && (
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-text-secondary mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-text-secondary mb-1">Phone</p>
                                    <a href={`tel:${leadDetails.phone}`} className="text-sm text-white hover:text-coral transition-colors">
                                        {leadDetails.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {leadDetails.address && (
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-text-secondary mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-text-secondary mb-1">Address</p>
                                    <p className="text-sm text-white">{leadDetails.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-3">Quick Actions</h3>
                    <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2rem] text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule Callback
                    </button>
                    <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2rem] text-sm font-medium transition-colors">
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
}
