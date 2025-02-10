import logo from './logo.svg';
import './App.css';
import Router from './Router.js';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
     <Router/>
    </BrowserRouter>
   
  );
}

export default App;
