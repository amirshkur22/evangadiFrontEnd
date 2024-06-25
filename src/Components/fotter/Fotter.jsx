import React from 'react'
import { Link } from 'react-router-dom'
import evangadiLogoW from '../../assets/images/evangadiLogoW.png'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import fotterStyle from  './fotter.module.css'
const Fotter = () => {
  return (
    <section className={fotterStyle.outerContainer}>
      <section className={`container`}>
        <div className='row'>
          <div className='col'>
            <Link to='/'>
              <img src={evangadiLogoW} alt="" />
            </Link>
            <div className='mt-3'>
             <Link to='https://www.facebook.com/evangaditech'><CiFacebook  size={40}/></Link> 
              <Link to='https://www.instagram.com/evangaditech/'><FaInstagram size={40} /></Link>
              <Link to='https://www.youtube.com/@EvangadiTech' target='_blank'><FaYoutube  size={40}/></Link>
            </div>
          </div>
          <div className='col d-flex flex-column'>
            <h4>Useful Link</h4>
            <Link to='/term' className='text-secondary fw-medium text-decoration-none'>Terms of Service</Link>
            <Link to='/privacy' className='text-secondary fw-medium text-decoration-none'>Privacy policy</Link>
          </div>
          <div className='col d-flex flex-column'>
            <h4>Contact Info</h4>
            <p className='text-secondary fw-medium'>support@evangadi.com</p>
            <p className='text-secondary fw-medium'>+1-202-386-2702</p>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Fotter
