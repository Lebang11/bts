"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import NavBar from "../navbar";



//Testing:

const loginURL =`/api/auth`;


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Submit");
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        console.log(email);
        console.log(password);

        fetch(loginURL, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email,
                password})
        })
        .then(async response => {
            const body = await response.json();
            if (body.error) {
                console.log(body.error);
                setLoading(false);
                setError(body.error)
                setToken('')
                setPassword('')
            } else {
                Cookies.set('token_id', body.id);
                Cookies.set('token_email', body.email);
                Cookies.set('token_name', body.name);
                Cookies.set('token_surname', body.surname);
                Cookies.set('token_phone', body.phone);
                Cookies.set('token_role', body.role);

                setLoading(false)
                setError("")
            }
            return body;

            
            })
        .then(body => {
            if (!body.error) {
                router.push("/")
            }
            // router.push('/members');
        })
        .catch(async (err) => {
            // const body = await err.json();
            
            console.log(err["error"]);
            setLoading(false);
            setError(err)
            setToken('')
            setPassword('')
        })
    }
    
    
    
    return (
        <main>
        <NavBar/>
        <div className={`${styles.formboxflex} w-100 h-100`}>
            
            <form onSubmit={handleSubmit} className={styles.formbox}>
                <h1 className="fw-lighter text-secondary " style={{
                    fontFamily: "Pacifico"
                }}>Sign in</h1>
                <div class="form-group w-75">
                <input type="email" class="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value.toLowerCase())} value={email} name="email"/>
                </div>
                <div class="form-group w-75">
                    <input type="password" class="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} name="password"/>
                </div>
                <p className="lead text-danger fs-6">{error}</p>

                
                {!isLoading &&  <button type="submit" class={`btn btn-outline-primary submit-button`}>{message}</button>}
                {isLoading && 
                <button class="btn btn-secondary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Loading...
                </button>
                }
                <p>{token}</p>
                
            </form>
             
        </div>
        </main>
    );
}
 
export default Login;