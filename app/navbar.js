"use client";
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NavBar = () => {
    const [id, setID] = useState(false);
    const [name, setName] = useState(false);
    const [surname, setSurname] = useState(false);
    const [role, setRole] = useState(false);

    

    useEffect(() => {
        getCookies();
    }, [id, name, surname, role]);

    function getCookies() {
        const id = Cookies.get('token_id');
        const name = Cookies.get('token_name');
        const surname = Cookies.get('token_surname');
        const role = Cookies.get('token_role');

        console.log(id);
        console.log(name);
        console.log(surname);
        console.log(role);

        setID(id);
        setName(name);
        setSurname(surname);
        setRole(role);

    }
    


    return ( 
        <nav className="border-bottom mb-3 navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="btn navbar-brand">
                        <span className="d-flex align-items-center">
                        <h3 className="fw-bold d-inline-block m-0 text-primary" style={{
                          fontFamily: "Pacifico"
                        }}> 
                            BTS
                            </h3>
                        </span>
                        
                        
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="fals" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                
            
                <div id="main-nav" className="me-3 collapse navbar-collapse justify-content-end align-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href={"/login"} className="btn nav-link text-secondary">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={"/register"} className="btn nav-link text-secondary">
                                Register
                            </Link>
                        </li>
                        {
                            id && name && surname && role
                            &&
                        <li className="nav-item">
                            <a className="btn nav-link text-secondary">
                                Attendance
                            </a>
                        </li>
                        }
                        {
                            id && name && surname && role === "evaluator"
                            &&
                        <li className="nav-item">
                            <Link href={"/members"} className="btn nav-link text-secondary">
                                Members
                            </Link>
                        </li>
                        }
                        {
                            id && name && surname && role === "evaluator"
                            &&
                        <li className="nav-item">
                            <Link href={"/session"} className="btn nav-link text-secondary">
                                Session
                            </Link>
                        </li>
                        }
                        
                        
                        <li className="nav-item">
                            
                        </li>
                        
                    </ul>
                </div>
                </div>
            </nav>
     );
}
 
export default NavBar;