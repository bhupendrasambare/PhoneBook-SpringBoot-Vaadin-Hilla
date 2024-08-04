import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation
import { useDispatch } from 'react-redux'; // Assuming you are using Redux for state management
import NavbarComponent from 'Frontend/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HorizontalLayout, Icon, Notification } from '@vaadin/react-components';

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>('error');
  const [formMessage, setFormMessage] = useState<string>('');
  const [notificationOpened, setNotificationOpened] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = (): boolean => {
    let isValid = true;
    if (!username) {
      setUsernameError('Username is required.');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
        setNotificationOpened(false)
      axios({
        url: "/phone-book/user/register",
        method: "POST",
        data: {
          username,
          password,
        },
      }).then((res) => {
        if (res.status === 200) {
          const resData: any = res.data.data;
          setNotificationOpened(true)
          setFormStatus('success');
          setFormMessage(res.data.data.message)
          setUsername('')
          setPassword('')
        } else {
            setNotificationOpened(true)
            const resData: any = res.data.data;
            setFormStatus('error');
            setFormMessage(res.data.data.message)
        }
      }).catch((exc) => {
        setNotificationOpened(true)
        console.log("error")
        setFormStatus('error');
        setFormMessage(exc.response.data.message)
      });
    }
  };

  return (
    <div className="home-page">
      <NavbarComponent />
      <div className="container my-3 rounded-4 p-3 bg-light">
        <h4 className="text-dark text-design">Create new user</h4>
        <div className="align-content-start my-4 ">
            {notificationOpened &&
                <div className={("alert alert-dismissible fade show ") + ((formStatus=="error")?"alert-danger ":"alert-success ")} role="alert">
                    <strong>{(formStatus=="error")?
                    <>{formMessage}</> :
                    <>User created successfully</>}</strong>
                    <button onClick={()=>setNotificationOpened(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <small className="text-danger">{usernameError}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <small className="text-danger">{passwordError}</small>}
            </Form.Group>
            <Button variant="success" className="bg-gradient" type="submit">
              Create
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
