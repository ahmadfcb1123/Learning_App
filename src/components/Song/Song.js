import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { CircularProgress } from '@mui/material';
import CustomAppBar from "../Header/AppBar";
import Swal from 'sweetalert2';


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'


const Song = () => {

  const Song = "I get up in the morning I get up in the morning stretch stretch stretch"

  const Location = useLocation();
  const studName = localStorage.getItem('studentName');
  // const chapter_id = Location.state.id;

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
  const [answer , setAnswer] = useState([]);
  const [Correct , setCorrect] = useState([]);


  useEffect(() => {
    handleListen()
  }, [isListening])
  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([savedNotes, note])
    setNote(null);
    if (note === Song)
    {
      setAnswer([...answer,note])
      setCorrect("Is Correct");
    setNote(null);
    console.log("done")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'عمل جيد لقد كانت اجابة صحيحة',
      showConfirmButton: false,
    })
    }
    else
    {
      setAnswer([...answer,note])
      setCorrect("Not Correct");
    setNote(null);
    console.log("False")
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'للأسف يا صغيري لقد أخطأت حاول مجددا',
      showConfirmButton: false,
    })
    }
  }





  return (
    <div>
      <CustomAppBar studentName={studName} position="fixed"/>
      <h1 style={{color:"green"}}>Chapter Song</h1>
      <div className='text' style={{paddingLift:"10px"}}>
        <h2 style={{color:"brown"}}> Part 1:</h2>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <video style={{width:"50%",borderRadius:"10px 10px"}} controls src="/audio/section.mp4"></video>
      <p style={{color:"gray",paddingTop:"10px",fontWeight:"bold"}}>Good Morning Song</p>            
      </div>
      <div className="container202">
            <div className="box">
              <h2>Talk Here</h2>
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              <button onClick={handleSaveNote} disabled={!note || isListening===true}>
                submit
              </button>
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <p>{note}</p>
            </div>
            <div className="box">
              <h2>Notes</h2>
              {savedNotes.map((n,index) => (
                <p key={index}>{n}</p>
              ))}
              </div>
          </div>
<hr></hr>
<hr></hr>
<hr></hr>
          <div className='text' style={{paddingLift:"10px"}}>
        <h2 style={{color:"brown"}}> Part 2:</h2>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <video style={{width:"50%",borderRadius:"10px 10px"}} controls src="/audio/section2.mp4"></video>
      <p style={{color:"gray",paddingTop:"10px",fontWeight:"bold"}}>Good Morning Song</p>            
      </div>
      <div className="container202">
            <div className="box">
              <h2>Talk Here</h2>
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              <button onClick={handleSaveNote} disabled={!note || isListening===true}>
                submit
              </button>
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <p>{note}</p>
            </div>
            <div className="box">
              <h2>Notes</h2>
              {savedNotes.map((n,index) => (
                <p key={index}>{n}</p>
              ))}
              </div>
          </div>

          <hr></hr>
<hr></hr>
<hr></hr>
          <div className='text' style={{paddingLift:"10px"}}>
        <h2 style={{color:"brown"}}> Part 3:</h2>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <video style={{width:"50%",borderRadius:"10px 10px"}} controls src="/audio/section3.mp4"></video>
      <p style={{color:"gray",paddingTop:"10px",fontWeight:"bold"}}>Good Morning Song</p>            
      </div>
      <div className="container202">
            <div className="box">
              <h2>Talk Here</h2>
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              <button onClick={handleSaveNote} disabled={!note || isListening===true}>
                submit
              </button>
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <p>{note}</p>
            </div>
            <div className="box">
              <h2>Notes</h2>
              {savedNotes.map((n,index) => (
                <p key={index}>{n}</p>
              ))}
              </div>
          </div>
          <hr></hr>
<hr></hr>
<hr></hr>
          <div className='text' style={{paddingLift:"10px"}}>
        <h2 style={{color:"brown"}}> Part 4:</h2>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <video style={{width:"50%",borderRadius:"10px 10px"}} controls src="/audio/section4.mp4"></video>
      <p style={{color:"gray",paddingTop:"10px",fontWeight:"bold"}}>Good Morning Song</p>            
      </div>
      <div className="container202">
            <div className="box">
              <h2>Talk Here</h2>
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              <button onClick={handleSaveNote} disabled={!note || isListening===true}>
                submit
              </button>
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <p>{note}</p>
            </div>
            <div className="box">
              <h2>Notes</h2>
              {savedNotes.map((n,index) => (
                <p key={index}>{n}</p>
              ))}
              </div>
          </div>

    </div>
  );
}

export default Song;
