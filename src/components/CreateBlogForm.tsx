import { useState } from 'react'
import { useCreateBlog } from '../hooks/useBlogs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

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

    return (
        <Card className="overflow-hidden shadow-xl border-slate-200">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-center py-8">
                <div className="text-5xl mb-3">✍️</div>
                <CardTitle className="text-2xl font-bold text-white">Create New Article</CardTitle>
                <CardDescription className="text-white/80">
                    Share your knowledge with the community
                </CardDescription>
            </CardHeader>

            {/* Form */}
            <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            📝 Article Title
                        </label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter an engaging title for your article"
                            required
                            className="h-12"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            💡 Short Description
                        </label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a brief summary that captures the essence of your article"
                            required
                            className="min-h-[100px] resize-y"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            📄 Article Content
                        </label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your full article content here..."
                            required
                            className="min-h-[200px] resize-y"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                            💡 Tip: Use ## for headings and &gt; for quotes
                        </p>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            🖼️ Cover Image URL
                        </label>
                        <Input
                            type="url"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            required
                            className="h-12"
                        />
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            🏷️ Categories
                        </label>
                        <Input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="FINANCE, TECH, CAREER"
                            required
                            className="h-12"
                        />
                        <p className="text-xs text-slate-400 mt-2">
                            Separate multiple categories with commas
                        </p>
                    </div>

                    {/* Error Message */}
                    {createBlog.isError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                            <span className="text-xl">❌</span>
                            <p className="text-red-600 text-sm font-medium">
                                Failed to create article. Please try again.
                            </p>
                        </div>
                    )}

                    {/* Success Message */}
                    {createBlog.isSuccess && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                            <span className="text-xl">✅</span>
                            <p className="text-green-600 text-sm font-medium">
                                Article created successfully!
                            </p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button
                            type="submit"
                            disabled={createBlog.isPending}
                            className="flex-1 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-300/40"
                        >
                            {createBlog.isPending ? '⏳ Publishing...' : '🚀 Publish Article'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="h-12 px-8"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
