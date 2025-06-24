import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericInput from "../../components/GenericInput/GenericInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Button from "../../components/Button/Button";
import styles from "./Login.module.scss";
import Frame from "../../components/Frame/Frame";
import { useAuth } from "../../context/AuthContext";
import ApiManager from "../../services/ApiManager";
import InputOTP from "../../components/InputOTP/InputOTP";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [otp, setOTP] = useState('');
  const [otpErr, setOtpErr] = useState('');
  const navigate = useNavigate();
  const { login, getCurrentUser } = useAuth();

  useEffect(() => {
    checkMail();
  }, [username]);

  useEffect(() => {
    checkPassword();
  }, [password]);


  const renderPage = () => {
    return showOTP ? renderOTPInput() : renderLoginForm();
  };

  const renderOTPInput = () => (
    <>
      <div className={styles.textContainer}>
        <h1>Enter Your OTP</h1>
        <h3>A 6-digit code has been sent to your email. Please enter it below.</h3>
      </div>
      <form className={styles.formOTP} onSubmit={e => e.preventDefault()}>
        <InputOTP value={otp} action={setOTP} err={otpErr} />
        <div className={styles.buttonDiv}>
          <Button color="secondary" size="large" action={requestOTP}>Resend Code</Button>
          <Button color="primary" size="large" action={verifyOTP}>Verify OTP</Button>
        </div>
      </form>
    </>
  );

  const renderLoginForm = () => (
    <>
      <div className={styles.textContainer}>
        <h1>Login</h1>
        <h3>Welcome back! Sign in to continue</h3>
      </div>
      <form className={styles.formLogin} onSubmit={e => e.preventDefault()}>
        <div className={styles.inputContainer}>
          <GenericInput
            type="text"
            value={username}
            action={handleEmail}
            par="Email or Username"
            isEditable={true}
            err={emailErr}
          />
          <PasswordInput
            showPassword={showPassword}
            password={password}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            par="Password"
            err={passwordErr}
          />
        </div>
        <Button type="button" size="large" color="primary" action={handleSubmit}>Login</Button>
        <p>
          Don't have an account?{" "}
          <a onClick={() => navigate("/auth/register")}>Sign Up</a>
        </p>
      </form>
    </>
  );

  const requestOTP = async () => {
    try {
      const response = await ApiManager.post('login/request-otp/', { username, password });
      return response.status === 200;
    } catch {
      return false;
    }
  };

  const verifyOTP = async () => {
    setOtpErr('');
    try {
      const response = await ApiManager.post('login/verify-otp/', {
        username: username,
        otp,
      });

      const refresh = response.data.refresh;
      const access = response.data.access;

      if (access && refresh) {
        Cookies.set("accessToken", access, { expires: 1/24, secure: true, sameSite: 'Lax' });
        Cookies.set("refreshToken", refresh, { expires: 30, secure: true, sameSite: 'Lax' });
        
        await getCurrentUser(); 
        navigate("/home");
      } else {
        setOtpErr("Risposta token non valida dal server.");
      }
    } catch (error) {
      setOtpErr("OTP non valida o scaduta. Riprova.");
    }
  };

  const handleSubmit = async () => {
    if (checkMail() && checkPassword()) {
      try {
        await login(username, password);
        const otpResponse = await requestOTP();
        if (otpResponse) {
          setShowOTP(true);
        }
      } catch {
        setEmailErr("Invalid credentials");
        setPasswordErr("Invalid credentials");
      }
    }
  };

  const checkMail = () => {
    if (!username) {
      setEmailErr("Email or Username is required");
      return false;
    }
    setEmailErr("");
    return true;
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const checkPassword = () => {
    if (!password) {
      setPasswordErr("Password is required");
      return false;
    }
    setPasswordErr("");
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <Frame>
        {renderPage()}
      </Frame>
    </div>
  );
};

export default Login;
