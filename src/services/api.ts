import type { Blog, CreateBlogData } from '../types/blog'

const API_URL = 'http://localhost:3001'

export const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await fetch(`${API_URL}/blogs`)
    if (!response.ok) throw new Error('Failed to fetch blogs')
    return response.json()
}

export const fetchBlogById = async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_URL}/blogs/${id}`)
    if (!response.ok) throw new Error('Failed to fetch blog')
    return response.json()
}

export const createBlog = async (data: CreateBlogData): Promise<Blog> => {
    const response = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...data,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        }),
    })
    if (!response.ok) throw new Error('Failed to create blog')
    return response.json()
}
