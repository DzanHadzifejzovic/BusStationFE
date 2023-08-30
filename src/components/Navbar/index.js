import React,{useState,useEffect} from 'react'
import { animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faBars } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button';
import { NavbarContainer, Wrapper } from './Navbar.styles';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { auth,setAuth } = useAuth();
  const isAdmin = auth.arrayRoles && auth.arrayRoles.includes('Admin');
  const isConductor = auth.arrayRoles && auth.arrayRoles.includes('Conductor');
  const isCounterWorker = auth.arrayRoles && auth.arrayRoles.includes('CounterWorker');
  const isDriver = auth.arrayRoles && auth.arrayRoles.includes('Driver');


  const [click,setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () =>setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const logout = (isBtn) =>{
    if(!isBtn){
        closeMobileMenu();
    }
    setAuth({});
    console.log('Logout auth obj: ' + JSON.stringify(auth));
  }


  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <Wrapper className='navbar'>
        <NavbarContainer className='navbar-container'>

            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img className='logo-image App-logo' src='/bus-station-logo.png' alt='logo' />
                BusStat
            </Link>

            <div className='menu-icon' onClick={handleClick}>
                <FontAwesomeIcon className={'icon-' + (click ? 'close':'bars')} icon={click ? faTimes : faBars} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {
                isDriver &&
                <li className='nav-item'>
                  <p className='welcome-msg'>
                  Hello Driver {auth.username}
                  </p>
                </li>
              }
              {
                isConductor &&
                <li className='nav-item'>
                  <p className='welcome-msg'>
                  Hello Conductor {auth.username}
                  </p>
                </li>
              }
              {
                isCounterWorker &&
                <li className='nav-item'>
                  <p className='welcome-msg'>
                  Hello CounterWorker {auth.username}
                  </p>
                </li>
              }
                <li className='nav-item'>
                    <Link to='/' onClickCapture={scrollToTop} className='nav-links' onClick={closeMobileMenu}>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/bus-lines' onClickCapture={scrollToTop} className='nav-links' onClick={closeMobileMenu}>Bus Lines</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/buses' onClickCapture={scrollToTop} className='nav-links' onClick={closeMobileMenu}>Buses</Link>
                </li>
                {
                  isAdmin &&
                  <>
                  <li className='nav-item'>
                    <Link to='/admin-panel/users' onClickCapture={scrollToTop} className='nav-links' onClick={closeMobileMenu}>Users</Link>
                  </li>

                  <li className='nav-item'>
                    <Link to='/admin-panel/requests' onClickCapture={scrollToTop} className='nav-links' onClick={closeMobileMenu}>Requests</Link>
                  </li>
                  </>
                }
                {  
                  isDriver && 
                  <li className='nav-item'>
                    <Link to='/driver-panel/drive-schedule' onClickCapture={scrollToTop} className='nav-links' onClick={closeMobileMenu}> My Schedule</Link>
                  </li>
                }
                {  
                  isConductor && 
                  <li className='nav-item'>
                    <Link to='/conductor-panel/conductor-schedule' onClickCapture={scrollToTop} className='nav-links' onClick={closeMobileMenu}> My Schedule</Link>
                  </li>
                }
                {
                auth.username != null ?
                
                <li >
                    <Link to='/' onClickCapture={scrollToTop} className='nav-links-mobile' onClick={()=>logout(false)}>Logout</Link>
                </li>
                :
                <>
                  <li >
                    <Link to='/register-page'  onClickCapture={scrollToTop} className='nav-links-mobile' onClick={closeMobileMenu}>Sign up</Link>
                  </li>
                  <li >
                    <Link to='/login-page' onClickCapture={scrollToTop} className='nav-links-mobile' onClick={closeMobileMenu}>Sign in</Link>
                  </li>
                </>
                }
            </ul>

            {
              auth.username != null ?
              <>
              {button && <Button location='/' buttonStyle='btn--outline' onClick={() =>logout(true)}>Logout</Button>}
              </>
              :
              <>
              {button && <Button location='/register-page' buttonStyle='btn--outline'>SIGN UP</Button>}
              {button && <Button location='/login-page' buttonStyle='btn--outline'>SIGN IN</Button>}
              </>
            }       
        </NavbarContainer>
  </Wrapper>
  )
}

export default Navbar;