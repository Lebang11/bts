"use client";
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "./navbar";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";


export default function Home() {
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

    if (id && name && surname && role === "student") {
      return (
        <main>
            <NavBar/>
    
            <h1 className="text-center display-3 text-muted">Welcome to <span>BTS</span></h1> 
              <h4 className="lead text-center mt-4"> Signed in as {name} {surname}</h4>
              <p className="text-center">More features coming soon...</p>
    
        </main>
      );
    } else {
      return (
    <main>
        <NavBar/>

        <h1 className="text-center display-3 text-muted">Welcome to <span>BTS</span></h1> 
        <div className="container-fluid d-flex flex-column w-25 justify-content-center ">
          
        <Link href={"/login"} className="w-100 btn btn-outline-dark my-3">
        <button className="btn">Login</button>
        </Link>
        <Link href={"/register"} className="btn btn-outline-dark my-3">
        <button className="btn">Register</button>     
        </Link>
        {/* <Link href={"/attendance"} className="btn btn-outline-dark my-3">
        <button className="btn">Attendance</button>     
        </Link> */}
        {
          role === "evaluator" &&

          <Link href={"/session"} className="btn btn-outline-dark my-3">
          <button className="btn">Start session</button>
          </Link>
        }
        {
          role === "evaluator" &&

          <Link href={"/members"} className="btn btn-outline-dark my-3">
          <button className="btn">View members</button>     
          </Link>
        }




          </div> 
    </main>
  );
    }

  
}
