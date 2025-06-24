import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import style from './InputOTP.module.scss'

const InputOTP = ({ isDeleteModeOn, action, value, err }) => {
    

    const customInput = ({ events, props }) => (
        <input {...events} {...props} type="text" className={`${style.customOtpInput}`} />
    );

    return (
        <div className={`${style.inputOtpWrapper}`}>
            <InputOtp
                value={value}
                onChange={(e) => action(e.value)}
                inputTemplate={customInput}
                length={6}
                disabled={isDeleteModeOn}
                integerOnly
            />
            <h3>{err}</h3>
        </div>
    );
};

export default InputOTP;
