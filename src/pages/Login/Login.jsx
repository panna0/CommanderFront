import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GenericInput from "../../components/GenericInput/GenericInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Button from "../../components/Button/Button";
import styles from "./Login.module.scss"
import Frame from "../../components/Frame/Frame";

 
const Login = () => { 
    const [email, setEmail] = useState(''); //use state valore di default
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState({length: false, specialChar: false});
    const emailInputRef = useRef(null);
    const navigate = useNavigate();
    
  
    useEffect(() => {
      console.log(emailInputRef)
      //emailInputRef.current.focus()
    }, [])
    useEffect(() => {
      const regex = /[!@#$%^&*(),.?":{}|<>]/;
  
  
      setIsPasswordValid({
        length: password.length >= 6,
        specialChar: regex.test(password)
      });
  
      
      
    }, [password]);
    
    
    /*const handleSubmit = async (e) => {
      e.preventDefault();
      if(checkMail() && checkPassword()){
        console.log("Tutto valido");
        try{
          const response = await login(email, password);
          console.log(response.data)
        }catch(error){
          console.error(error.response.data.message || "errore sulla pagina di login");
          setIsFormValid(false);
        }
      }else{
        setIsFormValid(false);
      }
    }*/
    const checkMail = () => {
      if(!email){
        alert("Email richiesta");
        //emailImputRef.current.focus();
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(email)){
        alert("Email non valida");
        //emailImputRef.current.focus();
        return false
      }
      return true;
    }
  
    const handleEmail = (e, par) => {
      setEmail(e.target.value);
    }
    
  
    const checkPassword = () => {
      if(!password){
        alert("Password richiesta");
        //ePasswordImputRef.current.focus();
        return false;
      }
      if (password.lenght < 6){
        alert("Password non valida");
        //emailImputRef.current.focus();
        return false
      }
      return true;
    }
    
    return (
    <>
        <div  className={`${styles.container}`}>
            <div className={`${styles.overlay}`}></div>
                <Frame>
                    <div className={`${styles.textContainer}`}>
                        <h1>Login</h1>
                        <h3>Welcome back! Sign in to continue</h3>
                    </div>
                        
                        <form className={`${styles.formLogin}`}>
                            <div className={`${styles.inputContainer}`}>
                                <GenericInput type={"email"} value={email} action={handleEmail} par={"Email"} isEditable={true}></GenericInput>
                                <PasswordInput showPassword={showPassword} password={password} setPassword={setPassword} setShowPassword={setShowPassword} par={"Password"} err={[""]}/>
                            </div>
                        
                            <Button type={"submit"} size={"large"} color={"primary"}>Login</Button>
                            <p>Don't have an account? <a onClick={()=>navigate("/auth/register") }>Sign Up</a></p>
                        </form>
                            {!isFormValid && <span style={{color: "red"}}>Dati non validi</span>}
                </Frame>
        </div>
    </>
    );
  }
  
  export default Login;
  