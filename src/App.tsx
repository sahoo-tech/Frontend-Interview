import { useState } from 'react'
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'
import { BlogNavigation } from './components/BlogNavigation'
import { GetBlogById } from './components/GetBlogById'
import { RegistrationModal } from './components/RegistrationModal'

type ViewType = 'all' | 'byId' | 'create'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<ViewType>('all')
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px'
            }}>CA</div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#1e293b' }}>CA MONK</span>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {['Blogs', 'Products', 'Gallery', 'Life at Monk', 'Events', 'Job Board'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#6366f1'}
                onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Register Button */}
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            ✨ Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #faf5ff 100%)',
        padding: '48px 24px',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #1e293b, #6366f1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px'
          }}>
            CA Monk Blog
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6 }}>
            Stay updated with the latest trends in finance, accounting, and career growth.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{
        flex: 1,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '32px 24px',
        width: '100%'
      }}>
        {/* Navigation Tabs */}
        <BlogNavigation activeView={activeView} onViewChange={setActiveView} />

        {/* View Content */}
        {activeView === 'all' && (
          <div style={{ display: 'flex', gap: '40px' }}>
            {/* Left Sidebar */}
            <aside style={{ width: '320px', flexShrink: 0 }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
              }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#6366f1',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>📚</span> All Blogs
                </h2>
                <div style={{ maxHeight: 'calc(100vh - 450px)', overflowY: 'auto' }} className="custom-scrollbar">
                  <BlogList
                    selectedId={selectedBlogId}
                    onSelectBlog={setSelectedBlogId}
                  />
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0',
                minHeight: '500px'
              }}>
                <BlogDetail blogId={selectedBlogId} />
              </div>
            </div>
          </div>
        )}

        {activeView === 'byId' && (
          <GetBlogById />
        )}

        {activeView === 'create' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <CreateBlogForm
              onSuccess={() => setActiveView('all')}
              onCancel={() => setActiveView('all')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px'
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>CA</div>
                <span style={{ fontWeight: 700, fontSize: '18px' }}>CA MONK</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>
                Empowering the next generation of finance leaders with insights, community, and knowledge.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '20px', color: '#f1f5f9' }}>RESOURCES</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Blog', 'Webinars', 'Case Studies'].map(item => (
                  <li key={item} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '20px', color: '#f1f5f9' }}>PLATFORM</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About Us', 'Practice Tests', 'Mentorship'].map(item => (
                  <li key={item} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 style={{ fontWeight: 600, fontSize: '14px', marginBottom: '20px', color: '#f1f5f9' }}>CONNECT</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['LinkedIn', 'Twitter', 'Instagram'].map(item => (
                  <li key={item} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid #1e293b',
            marginTop: '48px',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
            color: '#64748b'
          }}>
            <p>© 2024 CA Monk. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  )
}

export default App
