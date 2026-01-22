import { useState } from 'react'
import { useRegister, type RegisterData } from '../hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface RegistrationModalProps {
    isOpen: boolean
    onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        email: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [showSuccess, setShowSuccess] = useState(false)

    const { mutate: register, isPending, error } = useRegister()

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (formData.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        register(formData, {
            onSuccess: () => {
                setShowSuccess(true)
                setFormData({ name: '', email: '', password: '' })
                setConfirmPassword('')
                setTimeout(() => {
                    setShowSuccess(false)
                    onClose()
                }, 2000)
            },
        })
    }

    const handleInputChange = (field: keyof RegisterData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <Card className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
                {showSuccess ? (
                    <CardContent className="py-16 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">
                            ✓
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Welcome to CA Monk!
                        </h2>
                        <p className="text-slate-500">Registration successful</p>
                    </CardContent>
                ) : (
                    <>
                        {/* Header */}
                        <CardHeader className="text-center pb-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                                CA
                            </div>
                            <CardTitle className="text-2xl">Create Account</CardTitle>
                            <CardDescription>Join the CA Monk community</CardDescription>
                        </CardHeader>

                        {/* Form */}
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Full Name
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter your name"
                                        className={`h-12 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        placeholder="At least 6 characters"
                                        className={`h-12 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                            if (errors.confirmPassword) {
                                                setErrors(prev => ({ ...prev, confirmPassword: '' }))
                                            }
                                        }}
                                        placeholder="Re-enter your password"
                                        className={`h-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                                        ⚠️ Registration failed. Please try again.
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-300/40"
                                >
                                    {isPending ? '⏳ Creating Account...' : '✨ Create Account'}
                                </Button>

                                {/* Close Button */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    className="w-full h-11"
                                >
                                    Cancel
                                </Button>
                            </form>

                            {/* Footer */}
                            <p className="text-center mt-6 text-xs text-slate-400">
                                By registering, you agree to our Terms of Service
                            </p>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    )
}
