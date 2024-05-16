"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import NavBar from "../navbar";



//Testing:


const Register = () => {
    const [name, setName] =useState("");
    const [surname, setSurname] =useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] =useState("");
    const [message, setMessage] = useState("Submit");
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [phone, setPhone] = useState("");
    const router = useRouter();


    const required = async (name, class_id) => {
        if (!name) {
            setError('Please enter all details')
            document.getElementById(class_id).classList.add('border-danger')
        }
}

    const registerURL =`/api/users`;


    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        document.querySelectorAll('.form-control').forEach((input) => {
            input.classList.remove('border-danger')
        })

        if (!name || !surname || !email || !password || !confirmPassword) {
            required(name, 'name');
            required(surname, 'surname');
            required(phone, 'phone')
            required(email, 'email');
            required(password, 'password');
            required(confirmPassword, 'confirm-password');
            setLoading(false);
        } else if (password.length < 5) {
            setPassword('');
            setConfirmPassword('');
            setError('Password must be at least 5 characters')
            setLoading(false);
            
        } else if (password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')
            setError("Password don't match")
            setLoading(false);
        } else if (!role) {
            setError("Choose your role")
            setLoading(false);
        } else {
            await fetch(registerURL, {
                method:"POST",
                body: JSON.stringify({
                    name,
                    surname,
                    email,
                    phone,
                    password,
                    confirmPassword,
                    role
                })
            })
            .then(async response => {
                    const body = await response.json();
                    if (body.error) {
                        console.log(body.error);
                        setLoading(false);
                        setError(body.error)
                        setToken('')
                        setPassword('');
                        setConfirmPassword('');

                    } else {
                        Cookies.set('token_id', body.id);
                        Cookies.set('token_email', body.email);
                        Cookies.set('token_name', body.name);
                        Cookies.set('token_surname', body.surname);
                        Cookies.set('token_phone', body.phone);
                        Cookies.set('token_role', body.role);

                        console.log(body);
                        setLoading(false);
                        setError("");
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
  

       

        
    }
    
    return (
        <main>
        <NavBar/>
        <div className={`${styles.formboxflex} w-100 h-100`}>
            {/* <button onClick={() => {
                console.log({
                    name,
                surname,
                email,
                phone,
                password,
                confirmPassword,
                role
                })
            }}>Show</button> */}
            <form onSubmit={handleSubmit} className={styles.formbox}>
                <h1 className="fw-lighter text-secondary mt-4" style={{
                    fontFamily: "Pacifico"
                }}>Sign up</h1>
                
                <div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={(e) => {
                            if (e.target.checked) {
                                setRole("student")
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio1">Student</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setRole("evaluator")
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">Evaluator</label>
                    </div>
                </div>
                <div className="row w-75">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2"><div class="form-group">
                <input id="name" type="text" class="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} name="name"/>
                </div></div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-2">
                        <div class="form-group">
                    <input id="surname" type="text" class="form-control" placeholder="Surname" onChange={(e) => setSurname(e.target.value)} value={surname} name="surname"/>
                    </div>
                    </div>
                </div>
                
                <div class="form-group w-75">
                <input id="email" type="email" class="form-control" placeholder="Student email" onChange={(e) => setEmail(e.target.value.toLowerCase())} value={email} name="email"/>
                </div>
                <div class="form-group w-75">
                <input id="phone" type="text" class="form-control" placeholder="Cellphone number" onChange={(e) => setPhone(e.target.value)} value={phone} name="phone"/>
                </div>
                <div class="form-group w-75">
                    <input id="password" type="password" class="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} name="password"/>
                </div>
                <div class="form-group w-75">
                    <input id="confirm-password" type="password" class="form-control" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="password"/>
                </div>
                <p className="lead fs-6 text-danger">{error}</p>

                
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
 
export default Register;