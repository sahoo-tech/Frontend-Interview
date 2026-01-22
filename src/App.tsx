import { useState } from 'react'
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'
import { BlogNavigation } from './components/BlogNavigation'
import { GetBlogById } from './components/GetBlogById'
import { RegistrationModal } from './components/RegistrationModal'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

type ViewType = 'all' | 'byId' | 'create'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<ViewType>('all')
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              CA
            </div>
            <span className="font-bold text-lg text-slate-800">CA MONK</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Blogs', 'Products', 'Gallery', 'Life at Monk', 'Events', 'Job Board'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-indigo-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Register Button */}
          <Button
            onClick={() => setIsRegisterModalOpen(true)}
            className="hidden md:flex bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-300/40"
          >
            ✨ Register
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
            {['Blogs', 'Products', 'Gallery', 'Life at Monk', 'Events', 'Job Board'].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-sm text-slate-500 hover:text-indigo-600 font-medium py-2"
              >
                {item}
              </a>
            ))}
            <Button
              onClick={() => {
                setIsRegisterModalOpen(true)
                setIsMobileMenuOpen(false)
              }}
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              ✨ Register
            </Button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-10 md:py-12 px-4 md:px-6 text-center border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent mb-3">
            CA Monk Blog
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            Stay updated with the latest trends in finance, accounting, and career growth.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 w-full">
        {/* Navigation Tabs */}
        <BlogNavigation activeView={activeView} onViewChange={setActiveView} />

        {/* View Content */}
        {activeView === 'all' && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left Sidebar - Blog List */}
            <aside className="w-full lg:w-80 lg:flex-shrink-0 order-2 lg:order-1">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                    <span>📚</span> All Blogs
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-[60vh] lg:max-h-[calc(100vh-450px)] overflow-y-auto custom-scrollbar">
                  <BlogList
                    selectedId={selectedBlogId}
                    onSelectBlog={setSelectedBlogId}
                  />
                </CardContent>
              </Card>
            </aside>

            {/* Main Content Area - Blog Detail */}
            <div className="flex-1 min-w-0 order-1 lg:order-2">
              <Card className="min-h-[500px]">
                <CardContent className="p-6 md:p-8">
                  <BlogDetail blogId={selectedBlogId} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'byId' && (
          <GetBlogById />
        )}

        {activeView === 'create' && (
          <div className="max-w-3xl mx-auto">
            <CreateBlogForm
              onSuccess={() => setActiveView('all')}
              onCancel={() => setActiveView('all')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  CA
                </div>
                <span className="font-bold text-lg text-white">CA MONK</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering the next generation of finance leaders with insights, community, and knowledge.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-sm text-slate-100 mb-5">RESOURCES</h3>
              <ul className="space-y-3">
                {['Blog', 'Webinars', 'Case Studies'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold text-sm text-slate-100 mb-5">PLATFORM</h3>
              <ul className="space-y-3">
                {['About Us', 'Practice Tests', 'Mentorship'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-sm text-slate-100 mb-5">CONNECT</h3>
              <ul className="space-y-3">
                {['LinkedIn', 'Twitter', 'Instagram'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2024 CA Monk. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
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
