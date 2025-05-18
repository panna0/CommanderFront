import {Outlet} from 'react-router';
import styles from './LoginRegisterLayouts.module.scss'
import logo from '../../assets/images/commanderLogo.svg'
import { useNavigate} from 'react-router';


function LoginRegisterLayouts() { //è come una classe ma è una funzione
    const navigate = useNavigate();
 

    return (
      <div>
       <div className={`${styles.backArrow}`} onClick={() => navigate('/')}><img src={logo} alt='back arrow' style={{width: "30px"}}></img><h3>Commander</h3></div>
        <div className={`${styles.container}`}>
          <Outlet/>
        </div>
      </div>
    );
  }
  
  export default LoginRegisterLayouts;