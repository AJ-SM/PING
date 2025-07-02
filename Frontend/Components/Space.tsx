
import { useEffect, useRef, useState } from 'react';
import {MessageBox} from './Message'
import {InputBox} from './MessageBox'
import { useLocation } from 'react-router-dom';


export function Space() {
  const location = useLocation();
  const [msg,SetMsg]=useState<object[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { username, roomId } = location.state || {};
  const name = useRef(username)
  const Id = useRef(roomId)
  const uid= useRef<number>(null)
  const wss = useRef<WebSocket>()


function getRandomPokemonIdSimple() {
  return Math.floor(Math.random() * 898) + 1; // from 1 to 898 inclusive
}

// Example usage:



  useEffect(()=>{
    const ws = new WebSocket("ws://172.25.170.61:3000")
      uid.current=  getRandomPokemonIdSimple()


      ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:'join',
        payload:{
          name:name.current,
          id:uid.current,
          roomId:Id.current,
        }}))
        
      }

    ws.onmessage=(event)=>{
      const data = JSON.parse(event.data)
      SetMsg(msg=>[data,...msg])
      console.log(msg)
      
    }


      
      wss.current = ws

    return () => {
    ws.close();
  };
   

  },[])

function sendMessage() {
  if (wss.current && wss.current.readyState === WebSocket.OPEN) {
    wss.current.send(JSON.stringify({
      type: 'chat',
      payload: {
        name: name.current,
        id:uid.current,
        roomId: Id.current,
        message: inputRef.current?.value || ""
      }
    }));
  }
}

 

  return (
    
    <>
    <div className=' flex justify-center items-center '>
      <div className='w-200 h-screen mx-20'>
        <div className='h-20 my0.5 flex'>
          <div className=' flex  justify-center items-center'>

          <img src="../public/billaCon.gif" alt="billa" className='w-15 h-15 rounded-xl' />
          </div >
          <div className=' flex w-full items-center ml-4'>
          <img src="../public/daddy.png" alt="loglo" className='w-30 h-15 ' />

          </div>
        </div>
        <div className='h-126 overflow-y-auto scrollbar-hide border-2 border-gray-600 rounded-md px-4 p-1 '>
          <div className='flex flex-col-reverse'>
            {msg.map((m, index) => (
          <MessageBox key={index} name={m.name} message={m.message} icon={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${m.id}.png`}  />
          ))}
  

          </div>

        </div>
        
                
      
        <InputBox ref={inputRef} onClick={sendMessage}  />
    </div>

    </div>

    </>
  )
}


