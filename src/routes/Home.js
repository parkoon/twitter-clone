import React, { useState, useEffect } from 'react'
import { storeService, fileStorageService } from 'fbase'
import { v4 as uuidv4 } from 'uuid'
import Pweet from 'components/Pweet'

function Home({ user }) {
  const [value, setValue] = useState('')
  const [pweets, setPweets] = useState([])
  const [fileDataUrl, setFileDataUrl] = useState('')

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

    const fileRef = fileStorageService.ref().child(`${user.uid}/${uuidv4()}`)

    let fileUrl = ''
    if (fileDataUrl) {
      const response = await fileRef.putString(fileDataUrl, 'data_url')
      fileUrl = await response.ref.getDownloadURL()
    }

    await storeService.collection('pweets').add({
      fileUrl,
      content: value,
      createdAt: Date.now(),
      creatorId: user.uid,
    })

    setFileDataUrl('')
    setValue('')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event

    const theFile = files[0]

    const reader = new FileReader()
    reader.onloadend = (event) => {
      const {
        currentTarget: { result },
      } = event
      setFileDataUrl(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearPhotoDataUrl = () => {
    setFileDataUrl('')
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="트윗" />
        {fileDataUrl && <img src={fileDataUrl} width="50px" height="50px" />}
        <button onClick={onClearPhotoDataUrl}>Clear image</button>
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
