import React from 'react'

function Avatar({name}) {
  return (
    <div className="avatar">
      <div className=" rounded-full ring  ring-offset-base-100 ring-offset-2">
        <img src={`https://api.multiavatar.com/${name}.png`}  alt="Avatar" />
      </div>
    </div>
  )
}

export default Avatar