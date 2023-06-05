import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LandingPage, HomePage} from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
