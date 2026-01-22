import { useBlog } from '../hooks/useBlogs'

interface BlogDetailProps {
    blogId: string | null
}

export function BlogDetail({ blogId }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useBlog(blogId)

    // Empty state
    if (!blogId) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '500px',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #eef2ff, #faf5ff)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                }}>
                    <span style={{ fontSize: '36px' }}>📰</span>
                </div>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1e293b',
                    marginBottom: '8px'
                }}>Select an Article</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                    Choose from the list to start reading
                </p>
            </div>
        )
    }

    // Loading state
    if (isLoading) {
        return (
            <div>
                <div style={{
                    height: '320px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{
                    height: '24px',
                    width: '120px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{
                    height: '40px',
                    width: '80%',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{
                    height: '16px',
                    width: '100%',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <div style={{
                    height: '16px',
                    width: '90%',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '4px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                }}>
                    <span style={{ fontSize: '36px' }}>⚠️</span>
                </div>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#dc2626',
                    marginBottom: '8px'
                }}>Failed to load article</h3>
                <p style={{ color: '#f87171', fontSize: '14px' }}>
                    Please try again later
                </p>
            </div>
        )
    }

    if (!blog) return null

    // Calculate reading time
    const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200)

    // Format date
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    // Get badge color based on category
    const getCategoryStyle = (category: string) => {
        const cat = category.toUpperCase()
        switch (cat) {
            case 'FINANCE': return { bg: '#dcfce7', color: '#166534' }
            case 'TECH': return { bg: '#dbeafe', color: '#1e40af' }
            case 'CAREER': return { bg: '#fce7f3', color: '#9d174d' }
            case 'EDUCATION': return { bg: '#fef3c7', color: '#92400e' }
            case 'REGULATIONS': return { bg: '#fee2e2', color: '#991b1b' }
            case 'LIFESTYLE': return { bg: '#f3e8ff', color: '#7c3aed' }
            default: return { bg: '#f1f5f9', color: '#475569' }
        }
    }

    return (
        <article>
            {/* Featured Image */}
            <div style={{
                marginBottom: '32px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    style={{
                        width: '100%',
                        height: '320px',
                        objectFit: 'cover'
                    }}
                />
            </div>

            {/* Category & Read Time */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '20px'
            }}>
                {blog.category.map((cat, i) => {
                    const style = getCategoryStyle(cat)
                    return (
                        <span key={i} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            backgroundColor: style.bg,
                            color: style.color,
                            fontSize: '12px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {cat}
                        </span>
                    )
                })}
                <span style={{
                    fontSize: '14px',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    🕐 {readingTime} min read
                </span>
            </div>

            {/* Title */}
            <h1 style={{
                fontSize: '36px',
                fontWeight: 800,
                color: '#0f172a',
                marginBottom: '24px',
                lineHeight: 1.2
            }}>
                {blog.title}
            </h1>

            {/* Author & Meta Row */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '24px',
                paddingBottom: '24px',
                marginBottom: '32px',
                borderBottom: '1px solid #e2e8f0'
            }}>
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '16px'
                    }}>
                        AK
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Written by</p>
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#6366f1' }}>Aman K.J</p>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '40px', backgroundColor: '#e2e8f0' }} />

                {/* Category */}
                <div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{blog.category.join(', ')}</p>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '40px', backgroundColor: '#e2e8f0' }} />

                {/* Read Time */}
                <div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Read Time</p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{readingTime} Minutes</p>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '40px', backgroundColor: '#e2e8f0' }} />

                {/* Date */}
                <div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</p>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{formattedDate}</p>
                </div>
            </div>

            {/* Description */}
            <p style={{
                fontSize: '18px',
                color: '#475569',
                marginBottom: '32px',
                lineHeight: 1.7,
                fontStyle: 'italic',
                paddingLeft: '20px',
                borderLeft: '4px solid #6366f1'
            }}>
                {blog.description}
            </p>

            {/* Main Content */}
            <div style={{
                fontSize: '16px',
                color: '#334155',
                lineHeight: 1.8
            }}>
                {blog.content.split('\n\n').map((paragraph, index) => {
                    // Check if it's a heading
                    if (paragraph.startsWith('## ')) {
                        return (
                            <h2 key={index} style={{
                                fontSize: '24px',
                                fontWeight: 700,
                                color: '#0f172a',
                                marginTop: '40px',
                                marginBottom: '16px'
                            }}>
                                {paragraph.replace('## ', '')}
                            </h2>
                        )
                    }

                    // Check if it's a subheading
                    if (paragraph.startsWith('### ')) {
                        return (
                            <h3 key={index} style={{
                                fontSize: '20px',
                                fontWeight: 600,
                                color: '#1e293b',
                                marginTop: '32px',
                                marginBottom: '12px'
                            }}>
                                {paragraph.replace('### ', '')}
                            </h3>
                        )
                    }

                    // Check if it's a quote
                    if (paragraph.startsWith('>')) {
                        return (
                            <blockquote key={index} style={{
                                borderLeft: '4px solid #e2e8f0',
                                backgroundColor: '#f8fafc',
                                padding: '20px 24px',
                                margin: '24px 0',
                                fontStyle: 'italic',
                                color: '#64748b',
                                borderRadius: '0 12px 12px 0'
                            }}>
                                "{paragraph.replace('> ', '').replace(/"/g, '')}"
                            </blockquote>
                        )
                    }

                    // Regular paragraph
                    return (
                        <p key={index} style={{ marginBottom: '20px' }}>
                            {paragraph}
                        </p>
                    )
                })}
            </div>

            {/* Author Card at Bottom */}
            <div style={{
                marginTop: '48px',
                padding: '24px',
                background: 'linear-gradient(135deg, #f8fafc, #eef2ff)',
                borderRadius: '16px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '20px'
                    }}>
                        AK
                    </div>
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>
                            Written by Aman K.J
                        </h4>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                            Finance Expert & Content Creator at CA Monk
                        </p>
                    </div>
                </div>
            </div>

            {/* Share Buttons */}
            <div style={{
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Share:</span>
                {['🔗', '💬', '📧'].map((icon, i) => (
                    <button
                        key={i}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {icon}
                    </button>
                ))}
            </div>
        </article>
    )
}
