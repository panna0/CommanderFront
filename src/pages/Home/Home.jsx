import  Button  from "../../components/Button/Button";
import YourMatches from "../../components/YourMatches/YourMatches";
import style from './Home.module.scss'
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => { 
    const { getCurrentUser, refreshToken, logout} = useAuth();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
      const authenticateUser = async () => {
          let currentUserData = null;
  
          try {
              currentUserData = await getCurrentUser();
              if (currentUserData) {
                  setUser(currentUserData);
                  return;
              }
          } catch (error) {
              console.warn("Access token non valido o scaduto, tentativo di refresh...");
          }
  
          let refreshSuccessful = false;
          try {
              refreshSuccessful = await refreshToken();
          } catch (error) {
              console.error("Errore durante il refresh del token:", error);
          }
  
          if (refreshSuccessful) {
              try {
                  currentUserData = await getCurrentUser();
                  if (currentUserData) {
                      setUser(currentUserData);
                      return;
                  }
              } catch (error) {
                  console.error("Fallito il recupero dell'utente dopo il refresh:", error);
              }
          }
  
          console.log("Autenticazione fallita, esecuzione logout.");
          logout(); 
          navigate('/');
      };
  
      authenticateUser();
  }, []);

  const handleStart = async () => {
    navigate('/home/create-match')
  }
  
    return (
        
        <div className={`${style.container}`}> {/* Un contenitore più alto per permettere lo scroll */}
          <div className={`${style.leftContainer}`}>
            <h2>Welcome back {!!user? user.username : ""}</h2>
            <div className={`${style.textContainer}`}>
              <h1>Let's Build Your Battlefield!</h1>
              <h3>Define the rules, set the scene, and get ready for action.</h3>
            </div>
            <Button color={'primary'} size={"small"} action={() => handleStart()}>Start</Button>
          </div>
           <YourMatches></YourMatches>
         
      </div>
    );
  }
  
  export default Home;