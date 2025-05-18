import styles from './Register.module.scss'
import bg1 from '../../assets/images/bg1.png'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericInput from '../../components/GenericInput/GenericInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/Button/Button';
import Frame from '../../components/Frame/Frame';
import HorizontalStepper from '../../components/Stepper/HorizontalStepper';
import ProfilePicPicker from '../../components/ProfilePicPicker/ProfilePicPicker';
import { specialChars } from '@testing-library/user-event';



const Register = () => { 

    const [email, setEmail] = useState(''); //use state valore di default
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isBirthDateValid, setIsBirthDateValid] = useState(true);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState({length: false, specialChar: false, match: false});
    const [currentPage, setCurrentPage] = useState(0);
    const [passwordErr, setPasswordErr] = useState([]);
    const emailInputRef = useRef(null);
    const navigate = useNavigate();

    
    


    useEffect(() => {
        const userDate = new Date(birthDate);
        const minDate = new Date("2011-01-01");

        const dateValid = userDate < minDate;
        console.log(dateValid)

        setIsBirthDateValid(dateValid);


    }, [birthDate])

    const renderForm = () => {
        switch(currentPage) {
            case 0:
                return renderPage0();
            case 1:
                return renderPage1();
            case 2:
                return renderPage2();
            default:
                return renderPage0();

          }
    }



    const renderPage0 = () => {
        return(
            <form className={`${styles.formLogin}`}>
                <div className={`${styles.inputContainer}`}>
                    <GenericInput type={"text"} value={name} action={handleName} par={"First name"} isEditable={true}></GenericInput>
                    <GenericInput type={"text"} value={surname} action={handleSurname} par={"Last name"} isEditable={true}></GenericInput>
                    <GenericInput type={"date"} max={"2011-01-01"} value={birthDate} action={handleBirthDate} par={"Birth date"} isEditable={true} err={isBirthDateValid? "" : "You must be at least 14 years old to register"}></GenericInput>
                </div>
                
                <Button type={"button"} size={"large"} color={"primary"} action={goNextPage}>Next</Button>
                <p>Already have an account? <a onClick={()=>navigate("/auth/login") }>Login</a></p>
            </form>
        )
    }

    const renderPage1 = () => {
        return(
            <form className={`${styles.formLogin}`}>
                <div className={`${styles.inputContainer}`}>
                    <GenericInput type={"email"} value={email} action={handleEmail} par={"Email"} isEditable={true}></GenericInput>
                    <PasswordInput showPassword={showPassword} password={password} setPassword={setPassword} setShowPassword={setShowPassword} par={"Password"} err={passwordErr}/>
                    <PasswordInput showPassword={showCheckPassword} password={checkPassword} setPassword={setCheckPassword} setShowPassword={setShowCheckPassword} par={"Repeat password"} err={isPasswordValid.match? [] : ["Passwords do not match."]}/>
                </div>
                <div className={`${styles.btnContainer}`}>
                    <Button type={"button"} size={"small"} color={"secondary"} action={goPreviousPage}>Back</Button>
                    <Button type={"submit"} size={"small"} color={"primary"} action={goNextPage}>Next</Button>
                </div>
            </form>
        )
    }

    const renderPage2 = () => {
        return(
            <form className={`${styles.formLogin}`}>
                <div className={`${styles.inputContainer}`}>
                    <ProfilePicPicker></ProfilePicPicker>
                    <GenericInput type={"text"} value={username} action={handleUsername} par={"Username"} isEditable={true}></GenericInput>
                </div>
                
                <Button type={"submit"} size={"large"} color={"primary"} action={goPreviousPage}>Register</Button>
               
            </form>
        )
    }

    const goNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        console.log(currentPage)
    }

    const goPreviousPage = () => {
       
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
    }


    const handleEmail = (e, par) => {
        setEmail(e.target.value);
      }

    const handleName = (e, par) => {
        setName(e.target.value);
    }

    const handleSurname = (e, par) => {
        setSurname(e.target.value);
    }

    const handleBirthDate = (e, par) => {
        setBirthDate(e.target.value);
    }

    const handleUsername = (e, par) => {
        setUsername(e.target.value);
    }


    useEffect(() => {
        const sCharRegex = /[^A-Za-z0-9]/;
        const lengthRegex = /^.{8,}$/;
        const passwordLengthValid = lengthRegex.test(password);
        const passwordSCharValid = sCharRegex.test(password);
        const passwordsMatch = password === checkPassword;

        setIsPasswordValid({
            length: passwordLengthValid,
            specialChar: passwordSCharValid,
            match: passwordsMatch,
        });
    
       
        const errorList = [];
        if (!passwordLengthValid) errorList.push("Password must be at least 8 characters.");
        if (!passwordSCharValid) errorList.push("Password must include at least one special character.");
        
    
        setPasswordErr(errorList);
    }, [password, checkPassword]);





    return (
        <>
        <div className={`${styles.container}`}>
            <div className={`${styles.stepperForm}`}>
                <HorizontalStepper steps={["Dati", "Credenziali", "image"]} activeStep={currentPage}></HorizontalStepper>
            <Frame>
                <div className={`${styles.textContainer}`}>
                        <h1>Sign up</h1>
                        <h3>Welcome! Sign up to get started.</h3>
                    </div>
                {renderForm()}  
             </Frame>
             </div>       
        </div>
       
       
       </>
    );
  }
  
  export default Register;