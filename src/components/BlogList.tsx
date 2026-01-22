import { useBlogs } from '../hooks/useBlogs'
import { BlogCard } from './BlogCard'
import { Skeleton } from './ui/skeleton'

interface BlogListProps {
    selectedId: string | null
    onSelectBlog: (id: string) => void
}

export function BlogList({ selectedId, onSelectBlog }: BlogListProps) {
    const { data: blogs, isLoading, error } = useBlogs()

    if (isLoading) {
        return (
            <div className="py-5 space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200"
                    >
                        <Skeleton className="h-5 w-16 mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-10 px-5 bg-red-50 rounded-xl border border-red-200">
                <div className="text-3xl mb-3">⚠️</div>
                <p className="text-red-600 font-medium mb-2">Failed to load articles</p>
                <p className="text-red-400 text-sm">Please check your connection</p>
            </div>
        )
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="text-center py-10 px-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-3xl mb-3">📭</div>
                <p className="text-slate-500 font-medium">No articles yet</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
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
