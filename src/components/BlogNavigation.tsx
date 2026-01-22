import { Button } from './ui/button'

type ViewType = 'all' | 'byId' | 'create'

interface BlogNavigationProps {
    activeView: ViewType
    onViewChange: (view: ViewType) => void
}

export function BlogNavigation({ activeView, onViewChange }: BlogNavigationProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 p-4 md:px-6 bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
            <span className="text-sm font-semibold text-slate-500 mr-2 hidden sm:inline">
                Actions:
            </span>

            <Button
                onClick={() => onViewChange('all')}
                variant={activeView === 'all' ? 'default' : 'outline'}
                className={activeView === 'all' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-300/40' : ''}
            >
                📚 <span className="hidden sm:inline ml-1">Get All Blogs</span>
                <span className="sm:hidden ml-1">All</span>
            </Button>

            <Button
                onClick={() => onViewChange('byId')}
                variant={activeView === 'byId' ? 'default' : 'outline'}
                className={activeView === 'byId' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-300/40' : ''}
            >
                🔍 <span className="hidden sm:inline ml-1">Get Blog by ID</span>
                <span className="sm:hidden ml-1">By ID</span>
            </Button>

            <Button
                onClick={() => onViewChange('create')}
                variant={activeView === 'create' ? 'default' : 'outline'}
                className={activeView === 'create' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-300/40' : ''}
            >
                ✨ <span className="hidden sm:inline ml-1">Create New Blog</span>
                <span className="sm:hidden ml-1">Create</span>
            </Button>
        </div>
    )
}
