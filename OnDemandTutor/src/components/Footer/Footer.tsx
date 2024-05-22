import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
        <div className='Footer-container'>
          <div className="F-content">
            <div className='F-Left'> 
              <div>ODT Learning</div>
              <div>
                  <a href=''><i className='fa fa-facebook' aria-hidden='true'></i></a>
                  <a href=''></a>
                  <a href=''></a>
              </div>
            </div> 
            <div className='F-Right'> 
               <ul className='F-R-C'>
                <li>Resource</li>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Become a tutor</Link></li>
                <li><Link to={'/'}>Find tutor</Link></li>
               </ul>
               <ul className='F-R-C'>
                <li>Tutoriton</li>
                <li><Link to={'/'}>Featured tutor</Link></li>
                <li><Link to={'/'}>About us</Link></li>
                <li><Link to={'/'}>Support</Link></li>
               </ul>
               <ul className='F-R-C'>
                <li>References</li>
                <li><Link to={'/'}>Contact us</Link></li>
                <li><Link to={'/'}>Blog</Link></li>
                <li><Link to={'/'}>Page</Link></li>
               </ul>
            </div>
          </div>
          <div className='F-Bot'>
          © 2024 Tutorition All rights reserved.
          </div>
          
        </div>
    
  )
}
