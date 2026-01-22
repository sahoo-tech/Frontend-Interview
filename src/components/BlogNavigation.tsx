type ViewType = 'all' | 'byId' | 'create'

interface BlogNavigationProps {
    activeView: ViewType
    onViewChange: (view: ViewType) => void
}

export function BlogNavigation({ activeView, onViewChange }: BlogNavigationProps) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 24px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            marginBottom: '24px'
        }}>
            <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#64748b',
                marginRight: '8px'
            }}>
                Actions:
            </span>

            <button
                onClick={() => onViewChange('all')}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activeView === 'all'
                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                        : '#f1f5f9',
                    color: activeView === 'all' ? '#ffffff' : '#475569',
                    boxShadow: activeView === 'all'
                        ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                        : 'none'
                }}
            >
                📚 Get All Blogs
            </button>

            <button
                onClick={() => onViewChange('byId')}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activeView === 'byId'
                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                        : '#f1f5f9',
                    color: activeView === 'byId' ? '#ffffff' : '#475569',
                    boxShadow: activeView === 'byId'
                        ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                        : 'none'
                }}
            >
                🔍 Get Blog by ID
            </button>

            <button
                onClick={() => onViewChange('create')}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activeView === 'create'
                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                        : '#f1f5f9',
                    color: activeView === 'create' ? '#ffffff' : '#475569',
                    boxShadow: activeView === 'create'
                        ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                        : 'none'
                }}
            >
                ✨ Create New Blog
            </button>
        </div>
    )
}
