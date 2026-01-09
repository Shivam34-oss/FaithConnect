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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const LoginView = () => {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password)
    if (result.success) {
      toast.success('Welcome back!')
      navigate('/')
    } else {
      toast.error(result.error || 'Login failed')
    }
  }

  return (
    <div className="auth-view">
      <div className="auth-container">
        <div className="auth-header">
          <h1>⛪ FaithConnect</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to connect with your faith community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email')}
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            loading={isLoading}
            className="auth-submit"
          >
            Sign In
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginView
