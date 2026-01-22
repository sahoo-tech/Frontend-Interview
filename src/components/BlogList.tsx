import { useBlogs } from '../hooks/useBlogs'
import { BlogCard } from './BlogCard'

interface BlogListProps {
    selectedId: string | null
    onSelectBlog: (id: string) => void
}

export function BlogList({ selectedId, onSelectBlog }: BlogListProps) {
    const { data: blogs, isLoading, error } = useBlogs()

    if (isLoading) {
        return (
            <div style={{ padding: '20px 0' }}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} style={{
                        padding: '16px',
                        marginBottom: '12px',
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{
                            height: '20px',
                            width: '60px',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '4px',
                            marginBottom: '10px',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div style={{
                            height: '16px',
                            width: '100%',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '4px',
                            marginBottom: '8px',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                        <div style={{
                            height: '14px',
                            width: '80%',
                            backgroundColor: '#e2e8f0',
                            borderRadius: '4px',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                    </div>
                ))}
                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                `}</style>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: '#fef2f2',
                borderRadius: '12px',
                border: '1px solid #fecaca'
            }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
                <p style={{ color: '#dc2626', fontWeight: 500, marginBottom: '8px' }}>Failed to load articles</p>
                <p style={{ color: '#f87171', fontSize: '13px' }}>Please check your connection</p>
            </div>
        )
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
                <p style={{ color: '#64748b', fontWeight: 500 }}>No articles yet</p>
            </div>
        )
    }

    return (
        <div>
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    onClick={() => onSelectBlog(blog.id)}
                    isSelected={selectedId === blog.id}
                />
            ))}
        </div>
    )
}
