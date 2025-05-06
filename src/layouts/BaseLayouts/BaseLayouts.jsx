import {Outlet} from 'react-router';

function BaseLayouts() { //è come una classe ma è una funzione
    return (
      <div className="App">
        <div className='container'>
          <Outlet/>
        </div>
      </div>
    );
  }
  
  export default BaseLayouts;
  