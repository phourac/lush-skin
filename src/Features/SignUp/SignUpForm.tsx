'use client';

import { Controller } from 'react-hook-form';

import Link from 'next/link';

import useSignUp from './useSignUp';

export default function SignUpForm() {
  const { control, errorSignUp, errors, handleSubmit, loadingSigUp, onSubmit } =
    useSignUp();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Firstname */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Firstname
          </label>
          <Controller
            name='firstname'
            control={control}
            rules={{ required: 'Firstname is required' }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                placeholder='John'
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
          {errors.firstname && (
            <span style={{ color: '#c33', fontSize: '0.9rem' }}>
              {errors.firstname.message}
            </span>
          )}
        </div>

        {/* Lastname */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Lastname
          </label>
          <Controller
            name='lastname'
            control={control}
            rules={{ required: 'Lastname is required' }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                placeholder='Doe'
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
          {errors.lastname && (
            <span style={{ color: '#c33', fontSize: '0.9rem' }}>
              {errors.lastname.message}
            </span>
          )}
        </div>

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
                placeholder='johndoe'
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
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
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
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
            At least 6 characters
          </p>
        </div>

        {/* API error */}
        {errorSignUp && (
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
            {errorSignUp.name || 'Sign up failed'}
          </div>
        )}

        {/* Submit */}
        <button
          type='submit'
          disabled={loadingSigUp}
          style={{
            width: '100%',
            padding: '14px',
            background: loadingSigUp ? '#ccc' : '#764ba2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loadingSigUp ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s',
          }}
        >
          {loadingSigUp ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
        Already have an account?{' '}
        <Link
          aria-label='Sign In'
          href='/signin'
          style={{
            color: '#764ba2',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Sign In
        </Link>
      </p>
    </>
  );
}
