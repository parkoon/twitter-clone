import React from 'react'

import { authService, firebaseInstance } from 'fbase'
import AuthForm from 'components/AuthForm'

function Auth() {
  const onSocialClick = async ({ target: { name } }) => {
    let provider
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    }
    if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }
    await authService.signInWithPopup(provider)
  }
  return (
    <>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          구글로 시작하기
        </button>
        <button name="github" onClick={onSocialClick}>
          깃헙으로 시작하기
        </button>
      </div>
    </>
  )
}

export default Auth
