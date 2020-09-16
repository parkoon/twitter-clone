import React, { useState } from 'react'
import { authService } from 'fbase'

function AuthForm() {
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

  return (
    <>
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
    </>
  )
}

export default AuthForm
