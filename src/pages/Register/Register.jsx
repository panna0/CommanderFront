import styles from './Register.module.scss'

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericInput from '../../components/GenericInput/GenericInput';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/Button/Button';
import Frame from '../../components/Frame/Frame';
import HorizontalStepper from '../../components/Stepper/HorizontalStepper';
import ProfilePicPicker from '../../components/ProfilePicPicker/ProfilePicPicker';

import ApiManager from '../../services/ApiManager';



const Register = () => { 

    const [email, setEmail] = useState(''); //use state valore di default
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [showCheckPassword, setShowCheckPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState({name: false, surname: false, email: false, username: false, birthDate: false, password: {length: false, specialChar: false, notTooCommon: false, match: true, lowerUpper: false}});
    const [showPassword, setShowPassword] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [passwordErr, setPasswordErr] = useState('');
    const [checkPasswordErr, setCheckPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const navigate = useNavigate();
    const timerRef = useRef(null);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState(null); 
   

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
            <form className={`${styles.formLogin}`} onSubmit={e => e.preventDefault()}>
                <div className={`${styles.inputContainer}`}>
                    <GenericInput type={"text"} value={name} action={handleName} par={"First name"} isEditable={true} err={isFormValid.name? "" : "Missing first name"}></GenericInput>
                    <GenericInput type={"text"} value={surname} action={handleSurname} par={"Last name"} isEditable={true} err={isFormValid.surname? "" : "Missing last name"}></GenericInput>
                    <GenericInput type={"date"} max={"2011-01-01"} value={birthDate} action={handleBirthDate} par={"Birth date"} isEditable={true} err={isFormValid.birthDate? "" : "You must be at least 14 years old to register"}></GenericInput>
                </div>
                
                <Button type={"button"} size={"large"} color={"primary"} action={goNextPage}>Next</Button>
                <p>Already have an account? <a onClick={()=>navigate("/auth/login") }>Login</a></p>
            </form>
        )
    }

    const renderPage1 = () => {
        return(
            <form className={`${styles.formLogin}`} onSubmit={e => e.preventDefault()}>
                <div className={`${styles.inputContainer}`}>
                    <GenericInput type={"email"} value={email} action={handleEmail} par={"Email"} isEditable={true} err={emailErr}></GenericInput>
                    <PasswordInput showPassword={showPassword} password={password} setPassword={setPassword} setShowPassword={setShowPassword} par={"Password"} err={passwordErr}/>
                    <PasswordInput showPassword={showCheckPassword} password={checkPassword} setPassword={setCheckPassword} setShowPassword={setShowCheckPassword} par={"Repeat password"} err={checkPasswordErr}/>
                </div>
                <div className={`${styles.btnContainer}`}>
                    <Button type={"button"} size={"small"} color={"secondary"} action={goPreviousPage}>Back</Button>
                    <Button type={"button"} size={"small"} color={"primary"} action={goNextPage}>Next</Button>
                </div>
            </form>
        )
    }

    const renderPage2 = () => {
        return(
            <form className={`${styles.formLogin}`} onSubmit={e => e.preventDefault()}>
                <div className={`${styles.inputContainer}`}>
                    <ProfilePicPicker backgroundImageUrl={backgroundImageUrl} setBackgroundImageUrl={setBackgroundImageUrl}></ProfilePicPicker>
                    <GenericInput type={"text"} value={username} action={handleUsername} par={"Username"} isEditable={true} err={usernameErr}></GenericInput>
                </div>
                <div className={`${styles.btnContainer}`}>
                    <Button type={"button"} size={"small"} color={"secondary"} action={goPreviousPage}>Back</Button>
                    <Button type={"button"} size={"small"} color={"primary"} action={handleSubmit}>Register</Button>
                </div>
            </form>
        )
    }

    const goNextPage = () => {
        let canProceed = false;
        if (currentPage === 0) {
            canProceed = isFormValid.name && isFormValid.surname && isFormValid.birthDate;
        } else if (currentPage === 1) {
            canProceed = isFormValid.email && 
                         emailErr === "" && 
                         isFormValid.password.length &&
                         isFormValid.password.specialChar &&
                         isFormValid.password.match &&
                         isFormValid.password.notTooCommon &&
                         isFormValid.password.lowerUpper;
        }

        if(canProceed){
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
        }
        
        
    }

    const goPreviousPage = () => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
    }

    const setFirtLetterToUpperCase = (inputValue) => {
        if(inputValue.length > 0){
            const firstLetter = inputValue.charAt(0).toUpperCase();
            const restOfString = inputValue.slice(1);
            
            return(firstLetter + restOfString);
        }else{
            return('')
        }
      }

    const handleEmail = (e, par) => {
        setEmail(e.target.value);
      }

      
    const handleName = (e, par) => {
        setName(setFirtLetterToUpperCase(e.target.value));
    }
        
    const handleSurname = (e, par) => {
        setSurname(setFirtLetterToUpperCase(e.target.value));
    }

    const handleBirthDate = (e, par) => {
        setBirthDate(e.target.value);
    }

    const handleUsername = (e, par) => {
        setUsername(e.target.value);
    }

    

    useEffect(() => {
        const sCharRegex = /[#?!@$%^&*\\£€\\-]/;
        const lengthRegex = /^.{8,}$/;
        const lowerUpperCaseRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
        const passwordLengthValid = lengthRegex.test(password);
        const passwordSCharValid = sCharRegex.test(password);
        const lowerUpperCaseValid = lowerUpperCaseRegex.test(password);
        const passwordsMatch = password === checkPassword;

       console.log(isFormValid.password)

        if (timerRef.current) {
            clearTimeout(timerRef.current);
          }


        if (password.trim() === '') {
            console.log(1)
            setPasswordErr('Password is required');
            setIsFormValid(prevState => ({ ...prevState, password: {match: false, length: false, specialChar: false, notTooCommon: false}}));
            return;
        }else{
            setPasswordErr('');
        }

        if(passwordsMatch){
            setCheckPasswordErr('')
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, match: true}}));

        }else{
            setCheckPasswordErr('Password do not match')
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, length: false}}));
        }

    

        if (password.trim() !== password) {
            console.log(2)
            setPasswordErr('Password cannot contain spaces.');
            setIsFormValid(prevState => ({ ...prevState, password: {match: false, length: false, specialChar: false, notTooCommon: false}}));
            return;
        }else{
            setPasswordErr('');
        }
        
        if (!passwordLengthValid) {
            console.log(3)
            setPasswordErr('Password must be at least 8 characters long.');
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, length: false}}));
            return;
        }else{
            setPasswordErr('');
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, length: true}}));
        }

        if (!lowerUpperCaseValid) {
            setPasswordErr('Password must contain at least one lowercase letter and one uppercase letter.');
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, lowerUpper: false}}));
            return;
        }else{
            setPasswordErr('');
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, lowerUpper: true}}));
        }

        
        if (!passwordSCharValid) {
            console.log(4)
            setPasswordErr('Password must contain at least one special character.');
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, specialChar: false}}));
            return;
        }else{
            setPasswordErr('');
            setIsFormValid(prevState => ({ ...prevState, password: { ...prevState.password, specialChar: true}}));
        }

        


        timerRef.current = setTimeout(async () => {
            setPasswordErr('Verifying password...'); 
            try{
                const result = await ApiManager.post('check-password/', {password});
            
            const isValid = result.data.password_valid;
            console.log(result.data)
            setPasswordErr(result.data.error); 
            
            if (isValid) {

                setIsFormValid(prevState =>(
                    {...prevState, 
                        password:{
                            ...prevState.password,
                            notTooCommon: true
                        }}
                )
                );
    
            }else{
                setIsFormValid(prevState =>(
                    {...prevState, 
                        password:{
                            ...prevState.password,
                            notTooCommon: false
                        }}
                )
                );
            }
            }catch{
                console.log("error")
                setPasswordErr("Error during verification")
            }
            
           
          }, 1000);

        return () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        };
    
        
    }, [password, checkPassword]);

  

    useEffect(() => {
        let isValid = false
        if(name.trim() === ""){
            isValid = false
        }else{
            isValid = true
        }
        
        setIsFormValid(prevState =>(
            {...prevState, 
                name: isValid,}
        )
        );

    }, [name])

    useEffect(() => {
        let isValid = false
        if(surname.trim() === ""){
            isValid = false
        }else{
            isValid = true
        }
        
        setIsFormValid(prevState =>(
            {...prevState, 
                surname: isValid,}
        )
        );

    }, [surname])

    useEffect(() => {
        const userDate = new Date(birthDate);
        const minDate = new Date("2011-01-01");

        const dateValid = userDate < minDate;
        console.log(dateValid)

        setIsFormValid(prevState =>(
            {...prevState, 
                birthDate: dateValid,}
        )
        );
        


    }, [birthDate])

    
    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

        if (username.trim() === '') {
            setUsernameErr('Username is required');
            setIsFormValid(prevState => ({ ...prevState, username: false }));
        return;
        }

        if (username.trim() !== username) {
            setUsernameErr('Username cannot contain spaces.');
            setIsFormValid(prevState => ({ ...prevState, username: false }));
        return;
        }


        timerRef.current = setTimeout(async () => {
            setUsernameErr('Verifying username...'); 
            try{
                const result = await ApiManager.post('check-username/', {username});
                console.log(result)
                const isTaken = result.data.username_taken;
                const err = isTaken? "Username already taken." : ""
                setUsernameErr(err); 
                
                if (isTaken) {
                    setIsFormValid(prevState =>(
                        {...prevState, 
                            username: false,}
                    )
                    );
        
                }else{
                    setIsFormValid(prevState =>(
                        {...prevState, 
                            username: true,}
                    )
                    );
                }
               
            }catch{
                setUsernameErr("Error during verification")
            }
           
          }, 1000);

        return () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        };

    }, [username])

    useEffect(() => {

       

        if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

        if (email.trim() === '') {
            setEmailErr("Email is required");
            setIsFormValid(prevState => ({ ...prevState, email: false }));
        return;
        }else{
            setEmailErr("")
        }

        if (!/\S+@\S+\.\S+/.test(email)){
            console.log(/\S+@\S+\.\S+/.test(email), "gaga")
            setEmailErr("Email non valida");
            setIsFormValid(prevState => ({ ...prevState, email: false }));
        return;
        }


    
        timerRef.current = setTimeout(async () => {
            try{
                const result = await ApiManager.post('check-email/', {email});
            console.log(result)
            const isTaken = result.data.email_taken;
            const err = isTaken? "Email already taken." : ""
            
            setEmailErr(err);
            if (isTaken) {
                setIsFormValid(prevState =>(
                    {...prevState, 
                        email: false,}
                )
                );
            }else{
                setIsFormValid(prevState =>(
                    {...prevState, 
                        email: true,}
                )
                );
            }
            }catch{
                console.log("errore")
                setEmailErr("Error during verification")
            }
            
            

        }, 1000);
        

        

        return () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        };

    }, [email])

   

    const handleSubmit = async (e) => {
        
        if(isFormValid.name && isFormValid.surname && isFormValid.birthDate && isFormValid.email && isFormValid.username && isFormValid.password.length && isFormValid.password.notTooCommon && isFormValid.password.match && isFormValid.password.specialChar && isFormValid.password.lowerUpper){
            const newUser = {
                    username: username,
                    password: password,
                    password2: checkPassword,
                    email: email,
                    first_name: name,
                    last_name: surname,
                    date_of_birth: birthDate
            }
            navigate("/auth/login")
        try{
            const response = await ApiManager.post("register/", newUser);
            console.log(response.data)
        }catch(error){
            console.error(error.response.data.message || "errore sulla pagina di login");
        }
        }
    }



    return (
        <>
        <div className={`${styles.container}`}>
            <div className={`${styles.stepperForm}`}>
                <div className={`${styles.stepper}`}>
                    <HorizontalStepper steps={["Personal info", "Credentials", "Profile"]} activeStep={currentPage}></HorizontalStepper>
                </div>
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