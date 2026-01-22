import type { Blog } from '../types/blog'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface BlogCardProps {
    blog: Blog
    onClick: () => void
    isSelected: boolean
}

export function BlogCard({ blog, onClick, isSelected }: BlogCardProps) {
    // Calculate reading time (approx 200 words per minute)
    const readingTime = Math.ceil(blog.content.split(/\s+/).length / 200)

    // Get category variant
    const getCategoryVariant = (category: string): "default" | "secondary" | "destructive" | "outline" => {
        const cat = category.toUpperCase()
        switch (cat) {
            case 'TECH':
            case 'FINANCE':
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

    // Get category icon
    const getCategoryIcon = (category: string) => {
        const cat = category.toUpperCase()
        switch (cat) {
            case 'FINANCE': return '💰'
            case 'TECH': return '💻'
            case 'CAREER': return '🎯'
            case 'EDUCATION': return '📚'
            case 'REGULATIONS': return '📋'
            case 'LIFESTYLE': return '✨'
            default: return '📝'
        }
    }

    return (
        <Card
            onClick={onClick}
            className={`cursor-pointer transition-all duration-200 hover:translate-x-1 ${isSelected
                    ? 'bg-indigo-50 border-2 border-indigo-500 shadow-md shadow-indigo-200/50'
                    : 'hover:bg-slate-50 border border-slate-200'
                }`}
        >
            <CardContent className="p-4">
                {/* Category Badge */}
                <Badge
                    variant={getCategoryVariant(blog.category[0] || 'General')}
                    className="mb-2.5"
                >
                    <span className="mr-1">{getCategoryIcon(blog.category[0] || 'General')}</span>
                    {blog.category[0] || 'General'}
                </Badge>

                {/* Title */}
                <h3 className={`text-sm font-semibold leading-snug mb-2 line-clamp-2 ${isSelected ? 'text-indigo-700' : 'text-slate-800'
                    }`}>
                    {blog.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">
                    {blog.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                        <span>🕐</span> {readingTime} min
                    </span>
                    <span className="flex items-center gap-1">
                        <span>📅</span> {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
