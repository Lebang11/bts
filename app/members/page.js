"use client";

import { useEffect, useState } from "react";
import NavBar from "../navbar";

const Members = () => {
    const [data, setData] = useState([]);

    const getMembers = async () => {
      const response = await (await fetch("/api/users")).json()
      setData(response);
    }

      useEffect(() => {
        getMembers();
      } , [])

      let count = 0;

    return ( 
      <main>
        <NavBar/>
        <div className="ms-2 container d-flex flex-column justify-content-start align-items-start">
          <h1 className="display-4 text-secondary">
            Members
          </h1>
          <table className="table table-dark table-borderless">
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Surname</th>
                <th scope='col'>Student email</th>
                <th scope='col'>Phone Number</th>
                <th className='text-primary' scope='col'>Role</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((member) => {
                  count += 1;
                  return (
                    <tr>
                      <th scope='row'>{count}</th>
                          <td>{member.name}</td>
                          <td>{member.surname}</td>
                          <td>{member.email}</td>
                          <td>{member.phone}</td>
                          
                          <td>{member.role}
                          </td>
                          
                    </tr>
                  )
                })
              }
            
             
                    
            </tbody>
          </table>
             
        </div>
        </main>
     );
}
 
export default Members;