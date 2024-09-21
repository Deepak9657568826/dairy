import React from 'react';
import '../style/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
    const state = useSelector((state) => state);
    
  let role;
  if (state.user) {
    role = state.user.user.role;
  }



    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h2>आमच्याबद्दल</h2>
                    <p>आमचा उद्देश म्हणजे ग्राहकांना निसर्गाच्या जवळ आणणे आणि त्यांच्या आरोग्यासाठी सर्वोत्तम उत्पादनांची उपलब्धता सुनिश्चित करणे. आमच्या सामाजिक मीडियावर आमच्या नवीनतम ऑफर्स आणि उत्पादनांच्या अपडेट्ससाठी आमच्या संपर्कात रहा! आमच्या वेबसाइटवर आपल्याला दर्जेदार दूध, दही, ताजा ताक आणि इतर दुग्धजन्य पदार्थ सहज उपलब्ध होतील.</p>
                </div>
                <div className="footer-section links">
                    <h2>क्विक लिंक</h2>
                    <ul>
                        <li><Link to="/">मुख्यपृष्ठ</Link></li>
                      {role === "admin" &&  <li><Link to="/order">प्राप्त ऑर्डर</Link></li>}
                      {state.isLoggedIn && <li><Link to="/particularOrder">तुमची ऑर्डर</Link></li>}  
                      {state.isLoggedIn &&  <li><Link to="/Profile">युजर प्रोफाइल</Link></li>}  
                      {!state.isLoggedIn &&  <li><Link to="/signup">नोंदणी</Link></li>}  
                      {!state.isLoggedIn && <li><Link to="/login">प्रवेश</Link></li>}  
                        
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>आमच्याशी संपर्क करा</h2>
                    <p>ई-मेल: <a href="mailto:info@dairywebsite.com">dwayzode@gmail.com</a></p>
                    <p>मोबाइल नंबर: +91 9657568826</p>
                    {/* New "Connect with Us" heading */}
                    <h3>आमच्याशी संपर्क साधा</h3>
                    <div className="social-media">
                        {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                        </a> */}
                        <a href="https://www.linkedin.com/in/deepak-wayzode-b06776188/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>

                        <a href="https://www.facebook.com/deepak.wayzode" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 डेअरी वेबसाइट. सर्व हक्क राखीव..</p>
            </div>
        </footer>
    );
}

export default Footer;
