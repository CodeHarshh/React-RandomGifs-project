
import { useState } from 'react';
import './App.css';
import './index.css';  
import Tag from './components/Tag';
import Random from './components/Random';



// main function
function App() { 





  return(
     <div>
      <div className='BigDiv'>

      <h1>Random Gifs</h1>
      <div className="container">
        <div className="random">
          <Random />
        </div>
        <div className="tag">
          <Tag />
        </div>
      </div>
    </div>
      </div>
  );
   
}

export default App;
