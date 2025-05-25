import {Outlet, Link} from 'react-router';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import styles from './HomeLayouts.module.scss'
import { useNavigate } from 'react-router';
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon';
import ScrollingTextBanner from '../../components/ScrollingTextBanner/ScrollingTextBanner';


function HomeLayouts() { //è come una classe ma è una funzione
   const navigate = useNavigate();

   


    return (
      <div className={`${styles.bigContainer} `}>
        <Header>
        <div>
         <ProfileIcon></ProfileIcon>

        </div>
        </Header>
        <div className={`${styles.container} `}>
          <Outlet/>
          
        </div>
       
      </div>
    );
  }
  
  export default HomeLayouts;
  