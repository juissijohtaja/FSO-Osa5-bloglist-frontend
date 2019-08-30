import React from 'react'

const Notification = ({ notification }) => {
    console.log("Notification: message", notification.message)
    console.log("Notification: style", notification.style)
    console.log("Notification:", notification)
    if (notification.message === null) {
      return null
    }
  
    return (
      <div className={`notification ${notification.style}`} >
        {notification.message}
      </div>
    )
  }

  export default Notification