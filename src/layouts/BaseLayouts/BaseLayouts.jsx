import {Outlet, Link} from 'react-router';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import styles from './BaseLayouts.module.scss'
import { useNavigate } from 'react-router';


function BaseLayouts() { //è come una classe ma è una funzione
   const navigate = useNavigate();

   


    return (
      <div>
        <Header>
        <div>
         <Button color={"primary"} size={"small"} action={() => navigate('/auth/login')}>login</Button>

        </div>
        </Header>
        <div className={`${styles.container}`}>
          <Outlet/>
        </div>
      </div>
    );
  }
  
  export default BaseLayouts;
  