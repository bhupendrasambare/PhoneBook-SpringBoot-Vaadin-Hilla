import { RootState } from 'Frontend/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface WrapperComponentProps {
  children: React.ReactNode;
}

const Authenticate: React.FC<WrapperComponentProps> = ({ children }) => {

    const navigate = useNavigate();
    const token:string|null = useSelector((state: RootState) => state.auth.token);

    useEffect(()=>{
        if(token!=null && token != undefined && token != ""){
            
        }else{
            navigate("/login")
        }
    },[])

    return (
        <div className="wrapper">
            {children}
        </div>
    );
};

export default Authenticate;