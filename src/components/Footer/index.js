import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button';
import { CustomFooter } from "./Footer.styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons' 

const Footer = () => {
    return (
    <CustomFooter>
     <div className='footer-container'>
        {/*SUBSCRIPTION*/}
          <section className='footer-subscription'>
            <p className='footer-subscription-heading'>
              Join the Adventure newsletter to receive our best vacation deals
            </p>
            <p className='footer-subscription-text'>
              You can unsubscribe at any time.
            </p>
            <div className='input-areas'>
              <form>
                <input
                  className='footer-input'
                  name='email'
                  type='email'
                  placeholder='Your Email'
                />
                <Button buttonStyle='btn--outline'>Subscribe</Button>
              </form>
            </div>
          </section>

        {/*SUBSCRIPTION*/}
          <div className='footer-links'>
            <div className='footer-link-wrapper'>

              <div className='footer-link-items'>
                <h2>About Us</h2>
                <Link to='/sign-up'>How it works</Link>
                <Link to='/'>Testimonials</Link>
                <Link to='/'>Careers</Link>
                <Link to='/'>Investors</Link>
                <Link to='/'>Terms of Service</Link>
              </div>

              <div className='footer-link-items'>
                <h2>Contact Us</h2>
                <Link to='/'>Contact</Link>
                <Link to='/'>Support</Link>
                <Link to='/'>Destinations</Link>
                <Link to='/'>Sponsorships</Link>
              </div>
            </div>

            <div className='footer-link-wrapper'>
              <div className='footer-link-items'>
                <h2>Videos</h2>
                <Link to='/'>Submit Video</Link>
                <Link to='/'>Ambassadors</Link>
                <Link to='/'>Agency</Link>
                <Link to='/'>Influencer</Link>
              </div>

              <div className='footer-link-items'>
                <h2>Social Media</h2>
                <Link to='/'>Instagram</Link>
                <Link to='/'>Facebook</Link>
                <Link to='/'>Youtube</Link>
                <Link to='/'>Twitter</Link>
              </div>
            </div>
          </div>



          <section className='social-media'>
            <div className='social-media-wrap'>
              <div className='footer-logo'>
                <Link to='/' className='social-logo'>
                BusSJ
                <img className='logo-image App-logo' src='/bus-station-logo.png' alt='logo' />
                </Link>
              </div>
              <small className='website-rights'>BusSj © 2020</small>
              <div className='social-icons'>
                <Link
                  className='social-icon-link facebook'
                  to='/'
                  target='_blank'
                  aria-label='Facebook'
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
                <Link
                  className='social-icon-link instagram'
                  to='/'
                  target='_blank'
                  aria-label='Instagram'
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                  className='social-icon-link youtube'
                  to='/'
                  target='_blank'
                  aria-label='Youtube'
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
                <Link
                  className='social-icon-link twitter'
                  to='/'
                  target='_blank'
                  aria-label='Twitter'
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
                <Link
                  className='social-icon-link twitter'
                  to='/'
                  target='_blank'
                  aria-label='LinkedIn'
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </div>
            </div>
          </section>
        </div>
    </CustomFooter>
        
    );
}
export default Footer;