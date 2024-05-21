import React from 'react'
export default function Footer() {
  return <div>
    <>
        <div className='Footer-container'>
          <div className="F-content">
            <div className='F-Left'> 
              <div>ODT Learning</div>
              <div>ảnh nè</div>
            </div> 
            <div className='F-Right'> 
               <ul className='F-R-C'>
                <li>Resource</li>
                <li><a href=''>Home</a></li>
                <li><a href=''>Become a tutor</a></li>
                <li><a href=''>Find tutor</a></li>
               </ul>
               <ul className='F-R-C'>
                <li>Tutoriton</li>
                <li><a href=''>Featured tutor</a></li>
                <li><a href=''>About us</a></li>
                <li><a href=''>Support</a></li>
               </ul>
               <ul className='F-R-C'>
                <li>References</li>
                <li><a href=''>Contact us</a></li>
                <li><a href=''>Blog</a></li>
                <li><a href=''>Page</a></li>
               </ul>
            </div>
          </div>
          <div className='F-Bot'>
          © 2024 Tutorition All rights reserved.
          </div>
          
        </div>

    </>
  </div>
}
