import React from 'react'
import { storeService } from 'fbase'

function Pweet({ pweet, isOwner }) {
  const onDelete = async () => {
    const ok = window.confirm('정말로 지우시겠어요?')
    if (ok) {
      await storeService.doc(`pweets/${pweet.id}`).delete()
    }
  }

  return (
    <div key={pweet.id}>
      <h4>{pweet.content}</h4>

      {isOwner && (
        <>
          <button onClick={onDelete}>D</button>
          <button>E</button>
        </>
      )}
    </div>
  )
}

export default Pweet
