import { useState } from 'react'
import { useRegister, type RegisterData } from '../hooks/useAuth'

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
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
        >
            <div
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    padding: '40px',
                    width: '100%',
                    maxWidth: '440px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'slideUp 0.3s ease-out',
                }}
            >
                {showSuccess ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            fontSize: '36px'
                        }}>
                            ✓
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                            Welcome to CA Monk!
                        </h2>
                        <p style={{ color: '#64748b' }}>Registration successful</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '20px'
                            }}>
                                CA
                            </div>
                            <h2 style={{
                                fontSize: '24px',
                                fontWeight: 700,
                                color: '#1e293b',
                                marginBottom: '8px'
                            }}>
                                Create Account
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '14px' }}>
                                Join the CA Monk community
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter your name"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        fontSize: '15px',
                                        border: `2px solid ${errors.name ? '#ef4444' : '#e2e8f0'}`,
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        color: '#1e293b',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                    onBlur={(e) => e.target.style.borderColor = errors.name ? '#ef4444' : '#e2e8f0'}
                                />
                                {errors.name && (
                                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="you@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        fontSize: '15px',
                                        border: `2px solid ${errors.email ? '#ef4444' : '#e2e8f0'}`,
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        color: '#1e293b',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                    onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0'}
                                />
                                {errors.email && (
                                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="At least 6 characters"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        fontSize: '15px',
                                        border: `2px solid ${errors.password ? '#ef4444' : '#e2e8f0'}`,
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        color: '#1e293b',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                    onBlur={(e) => e.target.style.borderColor = errors.password ? '#ef4444' : '#e2e8f0'}
                                />
                                {errors.password && (
                                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        if (errors.confirmPassword) {
                                            setErrors(prev => ({ ...prev, confirmPassword: '' }))
                                        }
                                    }}
                                    placeholder="Re-enter your password"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        fontSize: '15px',
                                        border: `2px solid ${errors.confirmPassword ? '#ef4444' : '#e2e8f0'}`,
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        color: '#1e293b',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                                    onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#e2e8f0'}
                                />
                                {errors.confirmPassword && (
                                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px' }}>{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div style={{
                                    backgroundColor: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    borderRadius: '10px',
                                    padding: '12px 16px',
                                    marginBottom: '20px',
                                    color: '#dc2626',
                                    fontSize: '14px'
                                }}>
                                    ⚠️ Registration failed. Please try again.
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: isPending ? 'not-allowed' : 'pointer',
                                    background: isPending
                                        ? '#94a3b8'
                                        : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    color: '#ffffff',
                                    boxShadow: isPending
                                        ? 'none'
                                        : '0 4px 14px rgba(99, 102, 241, 0.4)',
                                    transition: 'all 0.2s ease',
                                    marginBottom: '16px'
                                }}
                            >
                                {isPending ? '⏳ Creating Account...' : '✨ Create Account'}
                            </button>

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    border: '2px solid #e2e8f0',
                                    backgroundColor: 'transparent',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Cancel
                            </button>
                        </form>

                        {/* Footer */}
                        <p style={{
                            textAlign: 'center',
                            marginTop: '24px',
                            fontSize: '13px',
                            color: '#94a3b8'
                        }}>
                            By registering, you agree to our Terms of Service
                        </p>
                    </>
                )}
            </div>

            {/* Animation keyframes */}
            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}
