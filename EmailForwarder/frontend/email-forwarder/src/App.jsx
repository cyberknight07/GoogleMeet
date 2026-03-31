import { useState } from 'react'

import './App.css'

function App() {
  const [formData, setformData] = useState({to: "",  subject: "", message: ""});

  const sendEmail = async(formData) => {
    console.log(formData)
    await fetch('http://localhost:3000/send-email', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
  }

  return (
    <>
      <section id="center">
        <div className="form">
          <h1>Email Forwarder</h1>
          <p>To: <input type='email' value={formData.to} onChange={(e) => {setformData({...formData, to: e.target.value })}}/></p>
          <p>Subject: <input type='text' value={formData.subject} onChange={(e) => {setformData({...formData, subject: e.target.value})}}/></p>
          <p>Message: <textarea value={formData.message} onChange={(e) => {setformData({...formData, message: e.target.value})}}/></p>
        </div>
        <button
          className="counter"
          onClick={() => { sendEmail(formData)}}
        >
          Send
        </button>
      </section>

      <section id="mails">
        <div id="docs">
          
        </div>
        
      </section>

    </>
  )
}

export default App
