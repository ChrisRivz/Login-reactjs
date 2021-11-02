import React, { useState } from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AlertComp from './AlertComp'
import ThemeContext from '../context/ThemeContext'
import '../css/Login.css'
import '../css/ThemeContext.css'

import Header from './Header'

async function Axios_Login(email, password) {
    let resp = axios.post("https://reqres.in/api/login", { email: email, password: password })
    return resp;
}

function Login() {

    const [themecontext, setContext] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [alertdata, setAlertdata] = useState({ bool: false, variant: "success", p: "Test" })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        setLoading(true);
        try {
            let resplogin = await Axios_Login(data.email, data.password);
            if (resplogin.status === 200) {
                
                localStorage.setItem('currentUser', JSON.stringify(data));
                localStorage.setItem('tokenUser', JSON.stringify(resplogin.data.token));
                window.open("/Index", '_self');
                
            }
            else {
                setAlertdata({ bool: true, variant: "warning", p: "Incorrect user or password" })
                setTimeout(() => {
                    setAlertdata({ bool: false, variant: "", p: null })
                }, 2000);
            }
        }
        catch (e) {
            setAlertdata({ bool: true, variant: "warning", p: `Incorrect user or password` + e.toString()})
            setTimeout(() => {
                setAlertdata({ bool: false, variant: "", p: null })
            }, 2000);
        }
        setLoading(false);

    }

    return (
        <ThemeContext.Provider value={[themecontext, setContext]}>
            <div className={themecontext ? "body-login" : "body-login dark"}>
                <Header />
                <Container className={themecontext ? "container-login" : "container-login dark"}>
                    <AlertComp bool={alertdata.bool} variant={alertdata.variant} p={alertdata.p} />
                    <Card className={themecontext ? "card-login" : "card-login-dark"}>
                        <Card.Header className={themecontext ? "card-body-login" : "card-body-login dark"}>
                            <h2>SIGN  IN</h2>
                            <p>Hello there! Sign in and start...</p>
                        </Card.Header>
                        <Card.Body className={themecontext ? "" : "dark"}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control className="simple-field" type="email" autoComplete="username" placeholder="Enter email" {...register("email", { required: true })} ></Form.Control>
                                    {errors.email?.type === 'required' && <span className="label-mandatory">email is required</span>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className="simple-field" type="password" autoComplete="current-password" placeholder="Enter password" {...register("password", { required: true })} ></Form.Control>
                                    {errors.password?.type === 'required' && <span className="label-mandatory">password is required</span>}
                                </Form.Group>
                                <Button
                                    type="submit"
                                    className="btn-login"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading…' : 'Log in'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </ThemeContext.Provider>
    )
}

export default Login;