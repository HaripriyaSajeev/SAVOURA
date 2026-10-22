import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4 mb-5">
            <h3>About Us</h3>
            <p className="mb-5">At Savoura, every flavour tells a story. Discover inspiring recipes, explore new tastes, and turn everyday ingredients into unforgettable moments.</p>
           

          </div>
          <div className="col-md-4 mb-5">
            <div className="mb-5">
            </div>
            <div>
              <h3>Contact Info</h3>
              <ul className="list-unstyled footer-link">
                <li className="d-block">
                  <span className="d-block">Address:</span>
                  <span className="text-white">34 Street Name, City Name Here, United States</span></li>
                <li className="d-block"><span className="d-block">Telephone:</span><span className="text-white">+1 242 4942 290</span></li>
                <li className="d-block"><span className="d-block">Email:</span><span className="text-white">info@yourdomain.com</span></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <h3>Quick Links</h3>
            <ul className="list-unstyled footer-link">
              <li><a href="/about">About</a></li>
              <li><a href="/about">Terms of Use</a></li>
              <li><a href="/about">Disclaimers</a></li>
            </ul>
          </div>
          <div className="col-md-4">
          
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-md-center text-left">
           <p>
            <h3>SAVOURA</h3>
        <p>Discover the joy of cooking.</p>
        
            Copyright &copy; {new Date().getFullYear()} All rights reserved 
           </p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
