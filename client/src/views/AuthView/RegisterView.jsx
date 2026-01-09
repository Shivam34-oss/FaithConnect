import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@core/store/authStore'
import Button from '@widgets/Button/Button'
import Input from '@widgets/Input/Input'
import { toast } from 'react-toastify'
import './AuthView.css'

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be less than 30 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    faith: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const RegisterView = () => {
  const navigate = useNavigate()
  const { register: registerUser, isLoading } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data
    const result = await registerUser(userData)
    if (result.success) {
      toast.success('Account created successfully!')
      navigate('/')
    } else {
      toast.error(result.error || 'Registration failed')
    }
  }

  return (
    <div className="auth-view">
      <div className="auth-container">
        <div className="auth-header">
          <h1>⛪ FaithConnect</h1>
          <h2>Create Account</h2>
          <p>Join our faith community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register('name')}
            fullWidth
          />

          <Input
            label="Username"
            type="text"
            placeholder="Choose a username"
            error={errors.username?.message}
            {...register('username')}
            fullWidth
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email')}
            fullWidth
          />

          <Input
            label="Faith"
            type="text"
            placeholder="e.g., Christianity, Islam, Judaism"
            error={errors.faith?.message}
            {...register('faith')}
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            error={errors.password?.message}
            {...register('password')}
            fullWidth
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            loading={isLoading}
            className="auth-submit"
          >
            Create Account
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterView
