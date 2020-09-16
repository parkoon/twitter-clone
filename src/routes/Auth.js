import React, { useState } from 'react'
import { authService, firebaseInstance } from 'fbase'

function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      let res
      if (newAccount) {
        // create account
        res = await authService.createUserWithEmailAndPassword(values.email, values.password)
      } else {
        // log in
        res = await authService.signInWithEmailAndPassword(values.email, values.password)
      }

      console.log(res)
    } catch (error) {
      setError(error.message)
    }
  }
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    console.log(name, value)
    setValues({ ...values, [name]: value })
  }

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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={values.email}
          type="text"
          placeholder="당신의 멋진 이메일 주소를 입력해주세요."
          required
          onChange={onChange}
        />
        <input
          name="password"
          value={values.password}
          type="password"
          placeholder="아무도 모르고 있는 당신의 비밀번호를 입력하세요."
          required
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? '계정 만들기' : '시작하기'} />

        {error && <h1>{error}</h1>}
      </form>

      <div>
        <button name="google" onClick={onSocialClick}>
          구글로 시작하기
        </button>
        <button name="github" onClick={onSocialClick}>
          깃헙으로 시작하기
        </button>
      </div>
    </div>
  )
}

export default Auth
