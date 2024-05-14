"use client";

import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";



//Testing:

const loginURL =`http://localhost:3000/api/login`

const Register = () => {
    const [name, setName] =useState("");
    const [surname, setSurname] =useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Submit");
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [colour, setColour] = useState('dark')

    const router = useRouter()

    const handleSubmit = async (e) => {

        e.preventDefault();
        axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        setLoading(true)
  
        await axios.post(loginURL, {
        email,
        password,
        })
        .then(response => {
            Cookies.set('token_id', response.data.token_id , { expires: 7 });
            Cookies.set('token_name', response.data.token_name , { expires: 7 });
            Cookies.set('token_email', response.data.token_email , { expires: 7 });
            setToken(Cookies.get('token_name'))
            setLoading(false)
            setError("")
            router.push('/');
            })
        .catch((err) => {
            setLoading(false)
            setError(err.response.data.message)
            setToken('')
            setPassword('')
        })
    }
    

    function handleMessage() {
        setMessage('Loading...')
    }
    
    
    
    return (
        <div className={`${styles.formboxflex} w-100 h-100`}>
            
            <form onSubmit={handleSubmit} className={styles.formbox}>
                <h1 className="fw-lighter text-secondary mt-4" style={{
                    fontFamily: "Pacifico"
                }}>Sign up</h1>
                
                <div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                        <label class="form-check-label" for="inlineRadio1">Student</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                        <label class="form-check-label" for="inlineRadio2">Evaluator</label>
                    </div>
                </div>
                <div className="row w-75">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2"><div class="form-group">
                <input type="email" class="form-control" placeholder="Name" onChange={(e) => setEmail(e.target.value)} value={email} name="email"/>
                </div></div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                        <div class="form-group">
                    <input type="email" class="form-control" placeholder="Surname" onChange={(e) => setEmail(e.target.value)} value={email} name="email"/>
                    </div>
                    </div>
                </div>
                
                <div class="form-group w-75">
                <input type="email" class="form-control" placeholder="Student email" onChange={(e) => setEmail(e.target.value)} value={email} name="email"/>
                </div>
                <div class="form-group w-75">
                <input type="email" class="form-control" placeholder="Cellphone number" onChange={(e) => setEmail(e.target.value)} value={email} name="email"/>
                </div>
                <div class="form-group w-75">
                    <input type="password" class="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} name="password"/>
                </div>
                <div class="form-group w-75">
                    <input type="password" class="form-control" placeholder="Confirm password" onChange={(e) => setPassword(e.target.value)} value={password} name="password"/>
                </div>
                
                {!isLoading &&  <button type="submit" class={`btn btn-outline-primary submit-button`}>{message}</button>}
                {isLoading && 
                <button class="btn btn-secondary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
                </button>
                }
                <p className="error-message">{error}</p>
                <p>{token}</p>
                
            </form>
             
        </div>
    );
}
 
export default Register;