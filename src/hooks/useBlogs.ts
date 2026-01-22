import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchBlogs, fetchBlogById, createBlog } from '../services/api'
import type { CreateBlogData } from '../types/blog'

export const useBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    })
}

export const useBlog = (id: string | null) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    })
}

export const useCreateBlog = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateBlogData) => createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
    })
}
