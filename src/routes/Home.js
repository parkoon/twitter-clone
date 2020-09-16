import React, { useState, useEffect } from 'react'
import { storeService, fileStorageService } from 'fbase'
import Pweet from 'components/Pweet'
import PweetFactory from 'components/PweetFactory'

function Home({ user }) {
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

  return (
    <>
      <PweetFactory user={user} />

      <div>
        {pweets.map((pweet) => (
          <Pweet key={pweet.id} pweet={pweet} isOwner={pweet.creatorId === user.uid} />
        ))}
      </div>
    </>
  )
}

export default Home
