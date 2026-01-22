import { useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = 'http://localhost:3001'

export interface RegisterData {
    name: string
    email: string
    password: string
}

export interface User {
    id: string
    name: string
    email: string
    createdAt: string
}

const registerUser = async (data: RegisterData): Promise<User> => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            createdAt: new Date().toISOString(),
        }),
    })

    if (!response.ok) {
        throw new Error('Registration failed')
    }

    return response.json()
}

export const useRegister = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: RegisterData) => registerUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}
