import { useState } from 'react'
import type { Blog } from '../types/blog'

interface BlogCardProps {
    blog: Blog
    onClick: () => void
    isSelected: boolean
}

export function BlogCard({ blog, onClick, isSelected }: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Calculate reading time (approx 200 words per minute)
    const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200)

    // Get category color
    const getCategoryStyle = (category: string) => {
        const cat = category.toUpperCase()
        switch (cat) {
            case 'FINANCE': return { bg: '#dcfce7', color: '#166534', icon: '💰' }
            case 'TECH': return { bg: '#dbeafe', color: '#1e40af', icon: '💻' }
            case 'CAREER': return { bg: '#fce7f3', color: '#9d174d', icon: '🎯' }
            case 'EDUCATION': return { bg: '#fef3c7', color: '#92400e', icon: '📚' }
            case 'REGULATIONS': return { bg: '#fee2e2', color: '#991b1b', icon: '📋' }
            case 'LIFESTYLE': return { bg: '#f3e8ff', color: '#7c3aed', icon: '✨' }
            default: return { bg: '#f1f5f9', color: '#475569', icon: '📝' }
        }
    }

    const categoryStyle = getCategoryStyle(blog.category[0] || 'General')

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                cursor: 'pointer',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '12px',
                backgroundColor: isSelected ? '#eef2ff' : isHovered ? '#f8fafc' : '#ffffff',
                border: isSelected ? '2px solid #6366f1' : '1px solid #e2e8f0',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                boxShadow: isSelected ? '0 4px 12px rgba(99, 102, 241, 0.15)' : 'none'
            }}
        >
            {/* Category Badge */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: categoryStyle.bg,
                color: categoryStyle.color,
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '10px'
            }}>
                <span>{categoryStyle.icon}</span>
                {blog.category[0] || 'General'}
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: '15px',
                fontWeight: 600,
                color: isSelected ? '#4338ca' : '#1e293b',
                marginBottom: '8px',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {blog.title}
            </h3>

            {/* Description */}
            <p style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '12px',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {blog.description}
            </p>

            {/* Meta */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
                color: '#94a3b8'
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🕐</span> {readingTime} min
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>📅</span> {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
            </div>
        </div>
    )
}
