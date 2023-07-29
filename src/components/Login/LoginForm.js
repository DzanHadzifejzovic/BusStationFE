import React, { useEffect, useRef, useState} from 'react'
import { ContentOfForm } from './Login.styles'
import Button from '../Button'
import {getLogin} from '../../services/AuthenticationService';
import { Link, useNavigate  } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  
  const{setAuth} = useAuth({});
  let navigate = useNavigate();

  //const from = location.state.from.pathname || "/";

  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');
  const[errMsg, setErrMsg] = useState('');

  const userRef = useRef();
  const errRef = useRef();  

  async function ProceedLoginUsingApi(e){
    e.preventDefault();
    try{
      var resp = await getLogin(e,username,password);

      const accessToken = resp.token;
      const arrayRoles = resp.roles;
      const refreshToken = resp.refreshToken;

      setAuth({ username,password,arrayRoles,accessToken,refreshToken })
      setUsername('');
      setPassword('');
      navigate('/buses');
    }catch(err){
      setErrMsg('Something get wrong');
      errRef.current.focus();
    }
  }

  async function HandleEnterDown(event){
    if(event.key==='Enter'){
    await ProceedLoginUsingApi(event);
    }
  }

  // useEffect-s

  useEffect(()=>{
    userRef.current.focus();
  },[]);

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  return (
    <div className='form'>
      <div className="form-body">
      <p ref={errRef} style={errMsg ? 
              {backgroundColor:'lightpink',color:'firebrick',fontWeight:'bold',padding:'0.5rem',marginBottom:'0.5rem',textAlign:'center'} : 
              {position:'absolute',left:'-9999px'}} aria-live="assertive">{errMsg}</p>

        <form>
        <ContentOfForm>
            <input ref={userRef} value={username} onInput={e => setUsername(e.target.value)} 
              className="form__input" type="text" id="username" placeholder="Username" autoComplete='off' required/>
        </ContentOfForm>

        <ContentOfForm>
            <input value={password} onInput={e => setPassword(e.target.value)} 
              className="form__input" type="password"  id="password" placeholder="Password" autoComplete='off' required/>
        </ContentOfForm>

        <ContentOfForm>
            <Button onClick={(event)=>ProceedLoginUsingApi(event)} onKeyDown={(e)=>HandleEnterDown(e)} 
            type="submit" buttonStyle='btn--test' buttonSize='btn--large'>Login</Button>
        </ContentOfForm>

        <ContentOfForm style={{textAlign:'center'}}>
                <p>Don't have account ? <br />
                    <span>
                        <Link to='/register-page'>Sign up</Link>
                    </span>
                </p>
        </ContentOfForm>
        </form>
      </div>
    </div>
  )
}

export default LoginForm