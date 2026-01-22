import { useBlog } from '../hooks/useBlogs'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'

interface BlogDetailProps {
    blogId: string | null
}

export function BlogDetail({ blogId }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useBlog(blogId)

    // Empty state
    if (!blogId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-4xl">📰</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Select an Article</h3>
                <p className="text-slate-400 text-sm">Choose from the list to start reading</p>
            </div>
        )
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-80 w-full rounded-2xl" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-4/5" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Failed to load article</h3>
                <p className="text-red-400 text-sm">Please try again later</p>
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

    // Get badge variant based on category
    const getCategoryVariant = (category: string): "default" | "secondary" | "destructive" | "outline" => {
        const cat = category.toUpperCase()
        switch (cat) {
            case 'FINANCE':
            case 'TECH':
                return 'default'
            case 'CAREER':
            case 'EDUCATION':
                return 'secondary'
            case 'REGULATIONS':
                return 'destructive'
            default:
                return 'outline'
        }
    }

    return (
        <article>
            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-64 md:h-80 object-cover"
                />
            </div>

            {/* Category & Read Time */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
                {blog.category.map((cat, i) => (
                    <Badge key={i} variant={getCategoryVariant(cat)}>
                        {cat}
                    </Badge>
                ))}
                <span className="text-sm text-slate-500 flex items-center gap-1">
                    🕐 {readingTime} min read
                </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                {blog.title}
            </h1>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-6 mb-8 border-b border-slate-200">
                {/* Author */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                        AK
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Written by</p>
                        <p className="text-sm font-semibold text-indigo-600">Aman K.J</p>
                    </div>
                </div>

                <div className="hidden md:block w-px h-10 bg-slate-200" />

                {/* Category */}
                <div className="hidden md:block">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Category</p>
                    <p className="text-sm font-semibold text-slate-800">{blog.category.join(', ')}</p>
                </div>

                <div className="hidden md:block w-px h-10 bg-slate-200" />

                {/* Read Time */}
                <div className="hidden md:block">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Read Time</p>
                    <p className="text-sm font-semibold text-slate-800">{readingTime} Minutes</p>
                </div>

                <div className="hidden md:block w-px h-10 bg-slate-200" />

                {/* Date */}
                <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Date</p>
                    <p className="text-sm font-semibold text-slate-800">{formattedDate}</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-600 mb-8 leading-relaxed italic pl-5 border-l-4 border-indigo-500">
                {blog.description}
            </p>

            {/* Main Content */}
            <div className="prose prose-slate max-w-none">
                {blog.content.split('\n\n').map((paragraph, index) => {
                    // Check if it's a heading
                    if (paragraph.startsWith('## ')) {
                        return (
                            <h2 key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
                                {paragraph.replace('## ', '')}
                            </h2>
                        )
                    }

                    // Check if it's a subheading
                    if (paragraph.startsWith('### ')) {
                        return (
                            <h3 key={index} className="text-xl font-semibold text-slate-800 mt-8 mb-3">
                                {paragraph.replace('### ', '')}
                            </h3>
                        )
                    }

                    // Check if it's a quote
                    if (paragraph.startsWith('>')) {
                        return (
                            <blockquote key={index} className="border-l-4 border-slate-200 bg-slate-50 px-6 py-5 my-6 italic text-slate-600 rounded-r-xl">
                                "{paragraph.replace('> ', '').replace(/"/g, '')}"
                            </blockquote>
                        )
                    }

                    // Regular paragraph
                    return (
                        <p key={index} className="text-base text-slate-700 leading-relaxed mb-5">
                            {paragraph}
                        </p>
                    )
                })}
            </div>

            {/* Author Card at Bottom */}
            <Card className="mt-12 bg-gradient-to-br from-slate-50 to-indigo-50">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            AK
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900 mb-1">
                                Written by Aman K.J
                            </h4>
                            <p className="text-sm text-slate-500">
                                Finance Expert & Content Creator at CA Monk
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Share Buttons */}
            <div className="mt-6 flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium">Share:</span>
                {['🔗', '💬', '📧'].map((icon, i) => (
                    <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="w-10 h-10 p-0"
                    >
                        {icon}
                    </Button>
                ))}
            </div>
        </article>
    )
}
