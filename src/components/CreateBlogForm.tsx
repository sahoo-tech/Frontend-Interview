import { useState } from 'react'
import { useCreateBlog } from '../hooks/useBlogs'

interface CreateBlogFormProps {
    onSuccess: () => void
    onCancel: () => void
}

export function CreateBlogForm({ onSuccess, onCancel }: CreateBlogFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [category, setCategory] = useState('')

    const createBlog = useCreateBlog()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        createBlog.mutate(
            {
                title,
                description,
                content,
                coverImage,
                category: category.split(',').map(c => c.trim()),
            },
            {
                onSuccess: () => {
                    setTitle('')
                    setDescription('')
                    setContent('')
                    setCoverImage('')
                    setCategory('')
                    onSuccess()
                },
            }
        )
    }

    const inputStyle = {
        width: '100%',
        padding: '14px 18px',
        fontSize: '15px',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        outline: 'none',
        transition: 'all 0.2s ease'
    }

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '8px'
    }

    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                padding: '32px',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '40px',
                    marginBottom: '12px'
                }}>✍️</div>
                <h2 style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '8px'
                }}>Create New Article</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
                    Share your knowledge with the community
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
                {/* Title */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={labelStyle}>📝 Article Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter an engaging title for your article"
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1'
                            e.target.style.backgroundColor = '#ffffff'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.backgroundColor = '#f8fafc'
                        }}
                        required
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={labelStyle}>💡 Short Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write a brief summary that captures the essence of your article"
                        style={{
                            ...inputStyle,
                            minHeight: '100px',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1'
                            e.target.style.backgroundColor = '#ffffff'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.backgroundColor = '#f8fafc'
                        }}
                        required
                    />
                </div>

                {/* Content */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={labelStyle}>📄 Article Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your full article content here..."
                        style={{
                            ...inputStyle,
                            minHeight: '200px',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1'
                            e.target.style.backgroundColor = '#ffffff'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.backgroundColor = '#f8fafc'
                        }}
                        required
                    />
                    <p style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        marginTop: '8px'
                    }}>
                        💡 Tip: Use ## for headings and &gt; for quotes
                    </p>
                </div>

                {/* Cover Image */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={labelStyle}>🖼️ Cover Image URL</label>
                    <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1'
                            e.target.style.backgroundColor = '#ffffff'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.backgroundColor = '#f8fafc'
                        }}
                        required
                    />
                </div>

                {/* Categories */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={labelStyle}>🏷️ Categories</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="FINANCE, TECH, CAREER"
                        style={inputStyle}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1'
                            e.target.style.backgroundColor = '#ffffff'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.backgroundColor = '#f8fafc'
                        }}
                        required
                    />
                    <p style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        marginTop: '8px'
                    }}>
                        Separate multiple categories with commas
                    </p>
                </div>

                {/* Error Message */}
                {createBlog.isError && (
                    <div style={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <span style={{ fontSize: '20px' }}>❌</span>
                        <p style={{ color: '#dc2626', fontSize: '14px', fontWeight: 500 }}>
                            Failed to create article. Please try again.
                        </p>
                    </div>
                )}

                {/* Success Message */}
                {createBlog.isSuccess && (
                    <div style={{
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <span style={{ fontSize: '20px' }}>✅</span>
                        <p style={{ color: '#16a34a', fontSize: '14px', fontWeight: 500 }}>
                            Article created successfully!
                        </p>
                    </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                        type="submit"
                        disabled={createBlog.isPending}
                        style={{
                            flex: 1,
                            background: createBlog.isPending
                                ? '#94a3b8'
                                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: 'white',
                            padding: '16px 24px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: createBlog.isPending ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {createBlog.isPending ? '⏳ Publishing...' : '🚀 Publish Article'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '16px 32px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                            border: '2px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            color: '#64748b',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
