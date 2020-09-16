import React, { useState } from 'react'
import { storeService } from 'fbase'

function Pweet({ pweet, isOwner }) {
  const [editing, setEditing] = useState(false)
  const [newPweet, setNewPweet] = useState(pweet.content)
  const onDelete = async () => {
    const ok = window.confirm('정말로 지우시겠어요?')
    if (ok) {
      await storeService.doc(`pweets/${pweet.id}`).delete()
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev)
  const onChange = (event) => setNewPweet(event.target.value)
  const onSubmit = async (event) => {
    event.preventDefault()
    await storeService.doc(`pweets/${pweet.id}`).update({ content: newPweet })
    toggleEditing()
  }

  return editing ? (
    <>
      <form onSubmit={onSubmit}>
        <input value={newPweet} required placeholder="edit..." onChange={onChange} />
        <input type="submit" value="update pweet" />
      </form>
      <button onClick={toggleEditing}>cancel</button>
    </>
  ) : (
    <>
      <div key={pweet.id}>
        <h4>{pweet.content}</h4>

        {pweet.fileUrl && <img src={pweet.fileUrl} width="50px" height="50px" />}
        {isOwner && (
          <>
            <button onClick={onDelete}>D</button>
            <button onClick={toggleEditing}>E</button>
          </>
        )}
      </div>
    </>
  )
}

export default Pweet
