import { useState } from 'react'
import { useBlog } from '../hooks/useBlogs'
import { BlogDetail } from './BlogDetail'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

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
        <div className="space-y-6">
            {/* Search Box */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <span>🔍</span> Find Blog by ID
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                            type="text"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter blog ID (e.g., 1, 2, 3...)"
                            className="flex-1 h-12"
                        />
                        <Button
                            onClick={handleSearch}
                            disabled={!inputId.trim() || isFetching}
                            className="h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-300/40"
                        >
                            {isFetching ? '⏳ Searching...' : '🔍 Search'}
                        </Button>
                    </div>

                    {/* Quick ID buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-slate-400">Quick select:</span>
                        {['1', '2', '3', '4', '5'].map((id) => (
                            <Button
                                key={id}
                                variant={searchId === id ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    setInputId(id)
                                    setSearchId(id)
                                }}
                                className={searchId === id ? 'bg-indigo-100 text-indigo-700 border-indigo-300' : ''}
                            >
                                ID: {id}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            {searchId && (
                <Card>
                    <CardContent className="p-6 md:p-8">
                        {isLoading ? (
                            <div className="text-center py-10">
                                <div className="text-4xl mb-3">⏳</div>
                                <p className="text-slate-500">Loading blog...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-10">
                                <div className="text-4xl mb-3">❌</div>
                                <p className="text-red-600 font-medium">Blog not found</p>
                                <p className="text-red-400 text-sm mt-2">
                                    No blog exists with ID: {searchId}
                                </p>
                            </div>
                        ) : blog ? (
                            <BlogDetail blogId={searchId} />
                        ) : null}
                    </CardContent>
                </Card>
            )}

            {/* Instructions when no search */}
            {!searchId && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">
                            🔍
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            Search for a Blog
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Enter a blog ID above or use the quick select buttons to find a specific article
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
