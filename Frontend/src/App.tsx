
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import {Enter} from "../Components/EnterPage"
import {Space} from '../Components/Space'


function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Enter/>}/>
      <Route path='/Space' element={<Space/>}/>
    </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
