import React, { useState, useEffect } from 'react';
import { m as motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Clock, User } from 'lucide-react';
import { Button } from '../ui/Button';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import ShareButtons from '../ui/ShareButtons';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

interface BlogPostDetailProps {
    onBack: () => void;
    onNavigate: (page: PageView, data?: NavigationData) => void;
    postId?: number;
}

const BLOG_POSTS_DATA: Record<number, {
    id: number;
    title: string;
    date: string;
    category: string;
    author: string;
    readTime: string;
    image: string;
    content: {
        intro: string;
        sections: Array<{
            heading: string;
            content: string;
        }>;
        conclusion: string;
    };
}> = {
    1: {
        id: 1,
        title: "The Death of Generic Targeting: Why Hyper-Local Wins in 2025",
        date: "Oct 13, 2025",
        category: "Marketing",
        author: "Alex Castells",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
        content: {
            intro: "The digital marketing landscape has fundamentally shifted. What worked in 2020—broad targeting, generic messaging, and one-size-fits-all campaigns—is now obsolete. In 2025, the winners are those who understand that every market is local, every audience is unique, and every message must be hyper-personalized.",
            sections: [
                {
                    heading: "Why Generic Targeting Fails",
                    content: "Generic targeting assumes that all potential customers are the same. It treats a contractor in Santa Monica the same as one in rural Texas. But these are fundamentally different businesses with different pain points, different buying behaviors, and different decision-making processes. When you cast a wide net, you catch everything—including the wrong fish. The result? Wasted ad spend, low conversion rates, and frustrated marketing teams."
                },
                {
                    heading: "The Hyper-Local Advantage",
                    content: "Hyper-local marketing isn't just about geography—it's about understanding the micro-ecosystem your customers operate in. It's knowing that HVAC companies in Phoenix have different peak seasons than those in Minneapolis. It's recognizing that a roofing contractor in Florida faces different challenges than one in Colorado. When you speak directly to these specific contexts, your message resonates. Conversion rates increase. Cost per acquisition drops. ROI soars."
                },
                {
                    heading: "How to Implement Hyper-Local Strategy",
                    content: "Start with data. Analyze your existing customer base by location, industry vertical, and service type. Create location-specific landing pages. Develop geo-targeted ad campaigns. Use local SEO strategies that dominate map packs and local search results. Build partnerships with local businesses and community organizations. The goal isn't to be everywhere—it's to be exactly where your ideal customers are, with messaging that speaks directly to their unique situation."
                }
            ],
            conclusion: "The future of marketing belongs to those who think small—who understand that the most powerful campaigns are the ones that feel personal, local, and relevant. Generic targeting is dead. Long live hyper-local marketing."
        }
    },
    2: {
        id: 2,
        title: "AI Agents vs. Human Support: The Hybrid Model",
        date: "Aug 2, 2025",
        category: "Enterprise AI",
        author: "Sarah Martinez",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1600&q=80",
        content: {
            intro: "The debate between AI automation and human touch in customer support has reached a critical inflection point. The question isn't whether to use AI or humans—it's how to create a seamless hybrid model that leverages the strengths of both.",
            sections: [
                {
                    heading: "The AI Advantage",
                    content: "AI agents excel at handling routine inquiries, providing instant responses, and scaling support operations 24/7. They can process vast amounts of data, identify patterns, and deliver consistent information. For high-volume, low-complexity interactions, AI is unbeatable."
                },
                {
                    heading: "Where Humans Excel",
                    content: "Humans bring empathy, emotional intelligence, and the ability to handle nuanced, complex situations. When a customer is frustrated, confused, or dealing with a unique problem, human support agents can read between the lines, adapt their approach, and build genuine relationships."
                },
                {
                    heading: "The Hybrid Model",
                    content: "The most effective support systems use AI for triage and routine tasks, then seamlessly escalate to human agents when complexity or emotion requires it. This model reduces wait times, lowers costs, and improves customer satisfaction. The key is intelligent routing that understands context, not just keywords."
                }
            ],
            conclusion: "The future of customer support isn't AI or human—it's both, working together in a carefully orchestrated hybrid model that delivers speed, scale, and genuine human connection."
        }
    },
    3: {
        id: 3,
        title: "Behind every pixel lies purpose passion and powerful brand",
        date: "Aug 6, 2025",
        category: "Design",
        author: "Michael Chen",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80",
        content: {
            intro: "Great design isn't about making things look pretty. It's about creating visual systems that communicate purpose, evoke emotion, and build lasting connections with your audience. Every pixel, every color choice, every typographic decision should serve a strategic purpose.",
            sections: [
                {
                    heading: "Purpose-Driven Design",
                    content: "Every design element should answer a question: Why does this exist? What problem does it solve? How does it serve the user? When design is driven by purpose, it becomes more than decoration—it becomes a tool for communication and conversion."
                },
                {
                    heading: "The Power of Visual Storytelling",
                    content: "Humans are visual creatures. We process images 60,000 times faster than text. A well-designed brand tells a story before a single word is read. The colors you choose, the fonts you use, the imagery you select—all of these elements work together to create a narrative that resonates with your audience on an emotional level."
                },
                {
                    heading: "Building Brand Through Design",
                    content: "Consistent, thoughtful design builds brand recognition and trust. When customers see your visual identity across touchpoints—your website, your social media, your physical materials—they begin to associate those visual elements with your brand values and quality. This is how design becomes brand equity."
                }
            ],
            conclusion: "Design is not a cost—it's an investment in how your brand is perceived, remembered, and trusted. Behind every pixel lies the opportunity to communicate purpose, passion, and powerful brand identity."
        }
    },
    4: {
        id: 4,
        title: "Creative ideas smart solutions and insights to shape the future",
        date: "Aug 27, 2025",
        category: "Coding",
        author: "David Kim",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80",
        content: {
            intro: "The intersection of technology, creativity, and strategic thinking is where innovation happens. In an era of rapid change, the companies that thrive are those that combine creative ideas with smart technical solutions to solve real problems.",
            sections: [
                {
                    heading: "The Creative-Technical Intersection",
                    content: "The most impactful solutions emerge when creative thinking meets technical expertise. It's not enough to have great ideas—you need the technical capability to execute them. And it's not enough to have technical skills—you need creative vision to see new possibilities."
                },
                {
                    heading: "Smart Solutions for Complex Problems",
                    content: "Today's business challenges are complex and interconnected. Solving them requires smart solutions that consider multiple variables, anticipate future needs, and adapt to changing circumstances. This is where thoughtful coding, intelligent automation, and strategic architecture make the difference."
                },
                {
                    heading: "Shaping the Future",
                    content: "The future belongs to those who can see beyond current limitations, who can imagine new possibilities, and who have the technical skills to bring those visions to life. Every line of code, every design decision, every strategic choice is a vote for the kind of future we want to create."
                }
            ],
            conclusion: "Creative ideas and smart solutions are the building blocks of innovation. When combined with strategic insight, they have the power to shape not just your business, but the future of your industry."
        }
    }
};

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ onBack, onNavigate, postId = 1 }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const post = BLOG_POSTS_DATA[postId] || BLOG_POSTS_DATA[1];

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(progress, 100));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Parse date for schema
    const parseDate = (dateStr: string): string => {
        const months: Record<string, string> = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        const parts = dateStr.split(' ');
        if (parts.length === 3) {
            const [month, day, year] = parts;
            return `${year}-${months[month] || '01'}-${day.padStart(2, '0')}`;
        }
        return new Date().toISOString().split('T')[0];
    };

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
    const enhancedDescription = `${post.content.intro} Marketing insights and strategies from Castells Agency, serving businesses in Santa Monica, Los Angeles, and nationwide.`;

    return (
        <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-16 md:pt-20 pb-20">
            <SEO 
                title={`${post.title} | Castells Blog - Marketing Insights`} 
                description={enhancedDescription}
                canonical={`/blog/${post.id}`}
                keywords={`${post.title}, marketing blog, digital marketing insights, marketing strategies, Santa Monica marketing blog, Los Angeles marketing tips`}
                geoRegion="US-CA"
                geoPlacename="Santa Monica, California"
                summary={`${post.title}: ${post.content.intro} Marketing insights and strategies from Castells Agency.`}
                mainEntity="Marketing Article"
            />
            <SchemaMarkup
                type="BreadcrumbList"
                data={{
                    itemListElement: [
                        { name: 'Home', item: `${siteUrl}/` },
                        { name: 'Blog & Insights', item: `${siteUrl}/blog` },
                        { name: post.title, item: `${siteUrl}/blog/${post.id}` }
                    ]
                }}
            />
            <SchemaMarkup
                type="Article"
                data={{
                    headline: post.title,
                    description: post.content.intro,
                    image: post.image,
                    datePublished: parseDate(post.date),
                    author: {
                        '@type': 'Person',
                        name: post.author
                    },
                    publisher: {
                        '@type': 'Organization',
                        name: 'Castells Agency',
                        logo: {
                            '@type': 'ImageObject',
                            url: typeof window !== 'undefined' ? `${window.location.origin}/castells-logo.png` : 'https://castells.agency/castells-logo.png'
                        }
                    }
                }}
            />
            {/* Course schema for educational content */}
            <SchemaMarkup
                type="Course"
                data={{
                    name: post.title,
                    description: post.content.intro,
                    provider: {
                        '@type': 'Organization',
                        name: 'Castells Agency',
                        url: siteUrl
                    },
                    educationalCredentialAwarded: 'Marketing Knowledge',
                    courseCode: `BLOG-${post.id}`
                }}
            />
            {/* Definition schemas for marketing terms */}
            {['ROAS', 'ROI', 'CPA', 'CPC', 'CTR', 'Conversion Rate', 'Attribution', 'Funnel'].map((term) => (
                <SchemaMarkup
                    key={term}
                    type="Definition"
                    data={{
                        name: term,
                        description: term === 'ROAS' ? 'Return on Ad Spend - a metric that measures revenue generated per dollar spent on advertising' :
                            term === 'ROI' ? 'Return on Investment - a measure of the profitability of an investment' :
                            term === 'CPA' ? 'Cost Per Acquisition - the cost of acquiring a new customer' :
                            term === 'CPC' ? 'Cost Per Click - the amount paid for each click on an advertisement' :
                            term === 'CTR' ? 'Click-Through Rate - the percentage of people who click on an ad after seeing it' :
                            term === 'Conversion Rate' ? 'The percentage of visitors who complete a desired action' :
                            term === 'Attribution' ? 'The process of identifying which marketing touchpoints contributed to a conversion' :
                            'Sales Funnel - the customer journey from awareness to purchase',
                        termSetName: 'Digital Marketing Glossary'
                    }}
                />
            ))}
            <div className="container mx-auto px-6 pt-4 md:pt-6">
                {/* Breadcrumbs */}
                <div className="mb-12">
                    <Breadcrumbs
                        items={[
                            { label: 'Home', action: () => onNavigate('home') },
                            { label: 'Blog & Insights', action: () => onNavigate('blog') },
                            { label: post.title, active: true }
                        ]}
                    />
                </div>

                {/* Hero Image with Title and Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-[500px] rounded-[2rem] overflow-hidden mb-12 group"
                >
                    <div className="absolute inset-0 bg-black">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-70 transition-opacity duration-700"
                        />
                    </div>
                    
                    {/* Content Overlay with Blur Background */}
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                        {/* Gradient Blur Layer - constant gradient from top (0%) to bottom (100%) */}
                        <div 
                            className="absolute inset-0"
                            style={{
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                                pointerEvents: 'none',
                            }}
                        />
                        <div className="relative z-10 flex flex-col justify-between h-full">
                        {/* Top: Badge (Left) and Meta (Right) */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                                <span className="font-bold uppercase tracking-widest text-white text-xs">
                                    Blog & Insights
                                </span>
                            </div>
                            
                            {/* Meta Information - Right Top */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 justify-end">
                                <span>{post.date}</span>
                                <span className="text-white/50">·</span>
                                <span>{post.author}</span>
                                <span className="text-white/50">·</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        {/* Bottom: Title, Description and Category */}
                        <div className="mt-auto pt-8">
                            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>
                            
                            {/* Description and Category - Both at Bottom */}
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <p className="text-lg text-white/90 max-w-3xl leading-relaxed flex-1 min-w-0">
                                    {post.content.intro}
                                </p>
                                
                                {/* Category Tag - Right Bottom */}
                                <div className="flex flex-wrap items-center gap-2 shrink-0">
                                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </motion.div>

                {/* Two Column Layout */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Main Content (70%) */}
                    <div className="lg:w-[70%] relative">
                        {/* Reading Progress Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black/5 dark:bg-white/10 rounded-full hidden lg:block">
                            <motion.div
                                className="w-full bg-coral rounded-full origin-top"
                                style={{ height: `${scrollProgress}%` }}
                            />
                        </div>

                        {/* Content */}
                        <div className="lg:pl-8 space-y-8">
                            {/* Sections */}
                            {post.content.sections.map((section, index) => (
                                <section key={index} className="space-y-4">
                                    <h2 className="font-display text-3xl font-semibold text-text-primary dark:text-white leading-tight">
                                        {section.heading}
                                    </h2>
                                    <p className="text-lg text-text-secondary dark:text-white/70 leading-relaxed">
                                        {section.content}
                                    </p>
                                </section>
                            ))}

                            {/* Conclusion */}
                            <div className="pt-8 -t -black/10 dark:-white/10">
                                <p className="text-xl text-text-secondary dark:text-white/80 leading-relaxed font-medium">
                                    {post.content.conclusion}
                                </p>
                            </div>

                            {/* Share Section */}
                            <div className="pt-8 -t -black/10 dark:-white/10">
                                <ShareButtons
                                    url={typeof window !== 'undefined' ? window.location.href : ''}
                                    title={post.title}
                                    description={post.content.intro}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar (30%) */}
                    <div className="lg:w-[30%]">
                        <div className="sticky top-32 space-y-6">
                            {/* Back Button */}
                            <Button
                                onClick={onBack}
                                variant="primary"
                                className="w-full"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Button>

                            {/* Related Posts */}
                            <div className="bg-white dark:bg-surface  -black/5 dark:-white/5 rounded-[2rem] p-6">
                                <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-4">
                                    Related Posts
                                </h3>
                                <div className="space-y-4">
                                    {Object.values(BLOG_POSTS_DATA)
                                        .filter(p => p.id !== post.id)
                                        .slice(0, 3)
                                        .map((relatedPost) => (
                                            <a
                                                key={relatedPost.id}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onNavigate('blog-post' as PageView, { id: relatedPost.id });
                                                }}
                                                className="block group"
                                            >
                                                <h4 className="font-display text-sm font-semibold text-text-primary dark:text-white mb-1 group-hover:text-coral transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-xs text-text-secondary dark:text-white/60">
                                                    {relatedPost.date} · {relatedPost.readTime}
                                                </p>
                                            </a>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetail;

