import {Button} from './Button'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export function Enter() {
const username = useRef<HTMLInputElement>(null);
const roomId = useRef<HTMLInputElement>(null);
const navigate = useNavigate()
  function userEnter(){
    const name = username.current?.value
    const id = roomId.current?.value
    if(name== ""){
      username.current?.focus()
    }
    if(id== ""){
      roomId.current?.focus()
    }
    if(name && id !=  ""){
    navigate('/Space', {
      state: {
        username: name,
        roomId: id,
      },
    });
  }
  
    
  }
  return (
    <div className="flex justify-center items-center ">
      <div className=" h-82 w-95 p-3 justify-center items-center mt-40 border-2 border-gray-600 rounded-3xl shadow-md ">
        <div className='flex justify-center items-center h-10 mt-10'><img src="../public/daddy.png" alt="loglo" className='w-30 h-15 ' /></div>
        <br />
        <input
          type="text"
          ref={username}
          placeholder="Name"
          onKeyDown={(e) => e.key === 'Enter' && userEnter()}
          className=" font-mono p-3 flex border-2 border-gray-400 justify-center w-full h-10 bg-[#343a40] tracking-normal ease-in duration-75  placeholder-[#adb5bd] text-white rounded-md mr-1 "
        />
        <br />
        <input
          type="text"
          ref={roomId}
          placeholder="Room Id"
          onKeyDown={(e) => e.key === 'Enter' && userEnter()}
          className=" font-mono p-3 flex border-2 border-gray-400 justify-center w-full h-10 bg-[#343a40] tracking-normal ease-in duration-75  placeholder-[#adb5bd] text-white rounded-md mr-1 "
        />
        <br />
        <div className='w-full flex justify-center items-center'>

        <Button text='Enter' size="md" onClick={userEnter}/>
        </div>
    

      </div>
    </div>
  );
}
