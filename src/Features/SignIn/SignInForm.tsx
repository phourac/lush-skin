'use client';

import { Link } from 'hooks/navigation';
import { Controller } from 'react-hook-form';

import useSignIn from '../Auth/useSignIn';

export default function SignInForm() {
  const { control, errors, handleSubmit, onSubmit, loadingSigIn, errorSignIn } =
    useSignIn();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Username
          </label>

          <Controller
            name='username'
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                placeholder='you@example.com'
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            )}
          />
          {errors.username && (
            <span style={{ color: '#c33', fontSize: '0.9rem' }}>
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Password
          </label>

          <Controller
            name='password'
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <input
                {...field}
                type='password'
                placeholder='••••••••'
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            )}
          />
          {errors.password && (
            <span style={{ color: '#c33', fontSize: '0.9rem' }}>
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Error from API */}
        {errorSignIn && (
          <div
            style={{
              padding: '12px',
              background: '#fee',
              color: '#c33',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.9rem',
            }}
          >
            {errorSignIn.name}
          </div>
        )}

        {/* Submit button */}
        <button
          type='submit'
          disabled={loadingSigIn}
          style={{
            width: '100%',
            padding: '14px',
            background: loadingSigIn ? '#ccc' : '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loadingSigIn ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s',
          }}
        >
          {loadingSigIn ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        Don&apos;t have an account?{' '}
        <Link
          aria-label='Sign Up'
          href='/signup'
          style={{
            color: '#667eea',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Sign Up
        </Link>
      </p>
    </>
  );
}
