import React, { useState, useEffect } from 'react'
import { storeService } from 'fbase'
import Pweet from 'components/Pweet'

function Home({ user }) {
  const [value, setValue] = useState('')
  const [pweets, setPweets] = useState([])

  const getPweets = async () => {
    const sanpshot = await storeService.collection('pweets').get()
    setPweets(sanpshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  useEffect(() => {
    getPweets()
    storeService.collection('pweets').onSnapshot((sanpshot) => {
      setPweets(sanpshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    await storeService.collection('pweets').add({
      content: value,
      createdAt: Date.now(),
      creatorId: user.uid,
    })
    setValue('')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="어떤 생각을 하고 계세요?"
          maxLength={120}
        />
        <input type="submit" value="트윗" />
      </form>

      <div>
        {pweets.map((pweet) => (
          <Pweet key={pweet.id} pweet={pweet} isOwner={pweet.creatorId === user.uid} />
        ))}
      </div>
    </>
  )
}

export default Home
