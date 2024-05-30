"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import NavBar from "../navbar";



//Testing:


const Session = () => {
    const [studentEmail, setStudentEmail] = useState('');
    const [criteria1, setCriteria1] = useState(0);
    const [criteria2, setCriteria2] = useState(0);
    const [criteria3, setCriteria3] = useState(0);
    const [criteria4, setCriteria4] = useState(0);
    const [criteria5, setCriteria5] = useState(0);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const sessionURL = '/api/sessions';
    const router = useRouter();



    const required = async (name, class_id) => {
        if (!name) {
            setError('Please enter all details')
            document.getElementById(class_id).classList.add('border-danger')
        }
}


    const evaluatorEmail = Cookies.get('token_email');
    

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        document.querySelectorAll('.form-control').forEach((input) => {
            input.classList.remove('border-danger')
        })

        if (!studentEmail) {
            required(studentEmail, 'email');
            setError('Enter student\'s email');
            setLoading(false);
        } else if (criteria1 === 0 || criteria2 === 0 || criteria3 === 0 || criteria4 === 0 || criteria5 === 0) {
            setError('Give score for each criteria');
            setLoading(false);
        } else {
            await fetch(sessionURL, {
                method:"POST",
                body: JSON.stringify({
                    studentEmail,
                    evaluatorEmail,
                    criteria1,
                    criteria2,
                    criteria3,
                    criteria4,
                    criteria5
                })
            })
            .then(async response => {
                    const body = await response.json();
                    if (body.error) {
                        console.log(body.error);
                        setLoading(false);
                        setError(body.error)

                    } else {
                        console.log(body);
                        setLoading(false);
                        setError("");
                        router.push("/");
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
                    
                    console.log(err);
                    setLoading(false);
                    // setError(err);
                })
        }
  

       

        
    }
    
    return (
        <main>
        <NavBar/>
        {/* <button className="btn" onClick={() => {
            console.log({
                studentEmail,
                evaluatorEmail,
                criteria1,
                criteria2,
                criteria3,
                criteria4,
                criteria5
            })
        }}>Show</button> */}
        <div>
            <h1 className="display-1 text-center text-secondary">Session</h1>
            <p className="lead text-muted text-center fs-6">*to be filled in by evaluator</p>
        </div>
        <div className="d-flex justify-content-center align-items-center" >

            <form className="border p-4 rounded-4 d-flex flex-column justify-content-center align-items-center" style={{
                minWidth: "60vw",
            }}>
                <div class="m-3">
                    <div>
                        <label for="exampleInputEmail1" class="form-label" style={{
                            minWidth: "60vw"
                        }}>Student's email address</label>
                        <input type="email" id="email" class="form-control" aria-describedby="emailHelp" onChange={(e) => {
                            setStudentEmail(e.target.value.toLowerCase());
                        }}/>
                    </div>
                    <div id="emailHelp" class="form-text">Who are you reviewing?</div>
                </div>
                <div class="m-3 mb-0">
                    <label for="exampleInputEmail1" class="form-label">Body language</label>
                </div>
                <form>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria1(1)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio1">1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria1(2)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria1(3)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">3</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option4" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria1(4)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">4</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option5" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria1(5)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">5</label>
                    </div>
                
                </form>
                <div class="m-3 mb-0">
                    <label for="exampleInputEmail1" class="form-label">Engaging with audience</label>
                </div>
                <form>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria2(1)
                                
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio1">1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria2(2)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria2(3)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">3</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria2(4)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">4</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria2(5)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">5</label>
                    </div>
                </form>
                <div class="m-3 mb-0">
                    <label for="exampleInputEmail1" class="form-label">Confidence</label>
                </div>
                <form>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria3(1)
                                
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio1">1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria3(2)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria3(3)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">3</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria3(4)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">4</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria3(5)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">5</label>
                    </div>
                </form>
                <div class="m-3 mb-0">
                    <label for="exampleInputEmail1" class="form-label">Voice modulation</label>
                </div>
                <form>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria4(1)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio1">1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria4(2)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria4(3)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">3</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria4(4)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">4</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria4(5)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">5</label>
                    </div>
                </form>
                <div class="m-3 mb-0">
                    <label for="exampleInputEmail1" class="form-label">Technical presentation</label>
                </div>
                <form>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria5(1)

                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio1">1</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria5(2)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">2</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria5(3)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">3</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria5(4)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">4</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={(e) => {
                            if (e.target.checked) {
                                setCriteria5(5)
                            }
                        }}/>
                        <label class="form-check-label" for="inlineRadio2">5</label>
                    </div>
                </form>
                
                
                <p className="lead text-danger fs-6 mt-2 mb-0">{error}</p>
                <div className="d-flex justify-content-center mt-3">

                
                    {!isLoading &&  <button type="submit" class={`btn btn-outline-primary submit-button`} onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}>Submit</button>}
                    {isLoading && 
                    <button class="btn btn-secondary" type="button" disabled>
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                    </button>
                    }
                </div>
            </form>
        </div>
        </main>
    );
}
 
export default Session;