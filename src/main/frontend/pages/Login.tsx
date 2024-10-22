import { LoginForm, LoginOverlay } from '@vaadin/react-components';
import axios from 'axios';
import { RootState } from 'Frontend/storage';
import { setToken } from 'Frontend/storage/authSlice';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<boolean | undefined>(undefined);

    const handleSetToken = (username: string, password: string) => {
        setErrorMessage(undefined);
        axios({
            url: "/phone-book/user/authenticate",
            method: "POST",
            data: {
                "username": username,
                "password": password
            },
        }).then((res) => {
            if (res.status === 200) {
                const resData: any = res.data.data;
                var tokenString:string = resData.token;
                dispatch(setToken(tokenString));
                navigate("/");
            } else {
                setErrorMessage(true);
            }
        }).catch((exc) => {
            setErrorMessage(true);
        });
    };

    function login(event: any) {
        const { username, password } = event.detail;
        handleSetToken(username, password);
    }

    function forgot(event: any) {
        // Implement forgot password functionality if needed
        console.log("Forgot password clicked");
    }

    return (
        <div>
            <div className='bg-light p-5'></div>
            <LoginOverlay
                onLogin={login}
                onForgotPassword={forgot}
                title={"Phone book "}
                description="Built by @Bhupendrasambare"
                opened
                autofocus
                theme='dark'
                error={errorMessage} // Display error message
            />
        </div>
    );
}

export default Login;