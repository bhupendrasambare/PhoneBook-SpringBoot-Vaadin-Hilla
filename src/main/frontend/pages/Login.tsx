import { LoginForm, LoginOverlay } from '@vaadin/react-components'
import React from 'react'

function Login() {
    function login(event: any) {
        const { username, password } = event.detail;
        console.log("Username:", username);
        console.log("Password:", password);
      }
    
    return (
        <div>
          <LoginOverlay 
            onLogin={login} 
            title="Phone book" 
            description="Built by @Bhupendrasambare"
            opened 
            autofocus 
            theme='dark'
          />
        </div>
      );
}

export default Login