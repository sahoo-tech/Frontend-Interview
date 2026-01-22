import { useState } from 'react'
import { useBlog } from '../hooks/useBlogs'
import { BlogDetail } from './BlogDetail'

export function GetBlogById() {
    const [inputId, setInputId] = useState('')
    const [searchId, setSearchId] = useState<string | null>(null)

    const { data: blog, isLoading, error, isFetching } = useBlog(searchId)

    const handleSearch = () => {
        if (inputId.trim()) {
            setSearchId(inputId.trim())
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div>
            {/* Search Box */}
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0',
                marginBottom: '24px'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span>🔍</span> Find Blog by ID
                </h2>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter blog ID (e.g., 1, 2, 3...)"
                        style={{
                            flex: 1,
                            padding: '14px 18px',
                            fontSize: '15px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            backgroundColor: '#f8fafc',
                            color: '#1e293b',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1'
                            e.target.style.backgroundColor = '#ffffff'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0'
                            e.target.style.backgroundColor = '#f8fafc'
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        disabled={!inputId.trim() || isFetching}
                        style={{
                            padding: '14px 28px',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: inputId.trim() && !isFetching ? 'pointer' : 'not-allowed',
                            background: inputId.trim() && !isFetching
                                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                : '#e2e8f0',
                            color: inputId.trim() && !isFetching ? '#ffffff' : '#94a3b8',
                            boxShadow: inputId.trim() && !isFetching
                                ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                                : 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isFetching ? '⏳ Searching...' : '🔍 Search'}
                    </button>
                </div>

                {/* Quick ID buttons */}
                <div style={{ marginTop: '16px' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8', marginRight: '12px' }}>Quick select:</span>
                    {['1', '2', '3', '4', '5'].map((id) => (
                        <button
                            key={id}
                            onClick={() => {
                                setInputId(id)
                                setSearchId(id)
                            }}
                            style={{
                                padding: '6px 14px',
                                marginRight: '8px',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 500,
                                border: '1px solid #e2e8f0',
                                backgroundColor: searchId === id ? '#eef2ff' : '#ffffff',
                                color: searchId === id ? '#6366f1' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            ID: {id}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {searchId && (
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0'
                }}>
                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
                            <p style={{ color: '#64748b' }}>Loading blog...</p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>❌</div>
                            <p style={{ color: '#dc2626', fontWeight: 500 }}>Blog not found</p>
                            <p style={{ color: '#f87171', fontSize: '14px', marginTop: '8px' }}>
                                No blog exists with ID: {searchId}
                            </p>
                        </div>
                    ) : blog ? (
                        <BlogDetail blogId={searchId} />
                    ) : null}
                </div>
            )}

            {/* Instructions when no search */}
            {!searchId && (
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    padding: '48px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
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
                        margin: '0 auto 24px',
                        fontSize: '36px'
                    }}>
                        🔍
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
                        Search for a Blog
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                        Enter a blog ID above or use the quick select buttons to find a specific article
                    </p>
                </div>
            )}
        </div>
    )
}
