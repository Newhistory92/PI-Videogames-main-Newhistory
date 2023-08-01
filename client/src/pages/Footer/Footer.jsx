import React from 'react'
import './Footer.css'
// Images
import github from "../../Images/icons/github.png"
import linkedin from "../../Images/icons/linkedin.png"


const Footer = () => {
    return (
        <footer id='Footer'>
                <ul className="listCredits" >
                </ul>
                <div className="iconsWebs" >
                    <a href="https://github.com/Newhistory92" > 
                        <img 
                            src={ github } 
                            alt="Github"
                            class = "contactMe"
                        /> 
                    </a> 
                    <a href="www.linkedin.com/in/federico-rojo"> 
                        <img 
                            src={ linkedin } 
                            alt="linkedin"
                            class = "contactMe"
                        /> 
                    </a> 
                </div>
        </footer>
    )
}

export default Footer