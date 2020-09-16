import React, { useEffect, useState } from 'react'
import { authService, storeService } from 'fbase'
import { useHistory } from 'react-router-dom'

function Profile({ user, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(user.displayName)
  const history = useHistory()
  const onLogOut = () => {
    authService.signOut()
    history.push('/')
  }

  const getMyPweets = async () => {
    const pweets = await storeService
      .collection('pweets')
      .where('creatorId', '==', user.uid)
      // .orderBy('createdAt')
      .get()
    console.log(pweets)
    console.log(pweets.docs.map((doc) => doc.data()))
  }

  const onChangeName = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()

    if (user.displayName !== newDisplayName) {
      await user.updateProfile({
        displayName: newDisplayName,
      })
      refreshUser()
    }
  }

  useEffect(() => {
    getMyPweets()
  }, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newDisplayName}
          placeholder="display name.."
          onChange={onChangeName}
        />
        <input type="submit" value="update profile" />
      </form>
      <button onClick={onLogOut}>로그아웃</button>
    </>
  )
}

export default Profile
