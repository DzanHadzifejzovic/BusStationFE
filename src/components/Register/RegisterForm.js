import React, { useEffect, useRef, useState } from 'react'
import { ContentOfForm } from '../Login/Login.styles'
import Button from '../Button'
import { getRegister } from '../../services/AuthenticationService'
import { LabelValidation } from './Register.styles'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RegisterForm = () => {

    const { setAuth } = useAuth();
    let navigate = useNavigate();

    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[passwordError,setPasswordError] = useState(false);
    const[country,setCountry] = useState('');
    const[city,setCity] = useState('');
    const[address,setAddress] = useState('');
    const[phoneNumber,setPhoneNumber] = useState('');
    const[errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errRef = useRef();  

    //functions
    async function ProceedRegisterUsingApi(e){
        e.preventDefault();
        try{
        var resp = await getRegister(e,firstName,lastName,username,email,password,country,city,address,phoneNumber,confirmPassword);
        console.log('procced:' + JSON.stringify(resp))
        const accessToken = resp.token;
        const arrayRoles = resp.roles;
        const refreshToken = resp.refreshToken;
        setAuth({ username,password,arrayRoles,accessToken,refreshToken});
        navigate('/');
        }catch(err){
            setErrMsg('Something get wrong');
            errRef.current.focus();
        }
    }

    async function HandleEnterDown(event){
        if(event.key==='Enter'){
        await ProceedRegisterUsingApi(event);
        }
      }

    // useEffects
    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    }, [firstName,lastName,email,country,city,address,phoneNumber,username, password])

    useEffect(()=>{
        if(password===confirmPassword){
            setPasswordError(false);
        }
        else{
            setPasswordError(true);
        }
    },[password,confirmPassword])


  return (
    <div className="form">
          <div className="form-body">
            <p ref={errRef} style={errMsg ? 
              {backgroundColor:'lightpink',color:'firebrick',fontWeight:'bold',padding:'0.5rem',marginBottom:'0.5rem',textAlign:'center'} : 
              {position:'absolute',left:'-9999px'}} aria-live="assertive">{errMsg}</p>
            <form>
              <ContentOfForm>
                  <input ref={userRef} className="form__input" type="text" id="firstName" placeholder="First Name"
                          value={firstName} onInput={e => setFirstName(e.target.value)} autoComplete='off'/>
              </ContentOfForm>

              <ContentOfForm>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"
                          value={lastName} onInput={e => setLastName(e.target.value)} autoComplete='off'/>
              </ContentOfForm>

              <ContentOfForm>
                  <input  type="text" id="userName" className="form__input" placeholder="Username"
                          value={username} onInput={e => setUsername(e.target.value)} autoComplete='off'/>
              </ContentOfForm>

              <ContentOfForm>
                  <input  type="email" id="email" className="form__input" placeholder="Email"
                          value={email} onInput={e => setEmail(e.target.value)} autoComplete='off'/>
              </ContentOfForm>

              <ContentOfForm>
                  <input  type="text" id="country" className="form__input" placeholder="Country"
                          value={country} onInput={e => setCountry(e.target.value)}/>
              </ContentOfForm>

              <ContentOfForm>
                  <input  type="text" id="city" className="form__input" placeholder="City"
                          value={city} onInput={e => setCity(e.target.value)}/>
              </ContentOfForm>

              <ContentOfForm>
                  <input  type="text" id="address" className="form__input" placeholder="Address"
                          value={address} onInput={e => setAddress(e.target.value)} autoComplete='off'/>
              </ContentOfForm>

              <ContentOfForm>
                  <input  type="text" id="phoneNumber" className="form__input" placeholder="Phone Number"
                          value={phoneNumber} onInput={e => setPhoneNumber(e.target.value)} autoComplete='off'/>
              </ContentOfForm>

              <ContentOfForm>
                  <input className="form__input" type="password" id="password" placeholder="Password"
                        value={password} onChange={(e)=>setPassword(e.target.value)} />                  
              </ContentOfForm>


              <ContentOfForm>
                  <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"
                         value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
              </ContentOfForm>
              {passwordError && <LabelValidation>Ne poklapaju se sifre</LabelValidation>}

              <ContentOfForm>
                <Button  onClick={(event)=>ProceedRegisterUsingApi(event)} onKeyDown={(e)=>HandleEnterDown(e)}
                type="submit" buttonStyle='btn--test' buttonSize='btn--large'>Register</Button> 
              </ContentOfForm>

              <ContentOfForm style={{textAlign:'center'}}>
                <p>Already registered ? <br />
                    <span>
                        <Link to='/login-page'>Sign in</Link>
                    </span>
                </p>
              </ContentOfForm>
            </form> 
          </div>
      </div>      
  )
}

export default RegisterForm


// from this link component https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd
/*
import React from "react";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRegister } from "../../services/AuthenticationService";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const RegisterForm = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default RegisterForm*/