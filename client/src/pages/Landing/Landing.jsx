import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Images/Logo.png'
import './Landing.css'
import name from '../../Images/icons/byName.png'
import gender from '../../Images/icons/Genres.png'
import platform from '../../Images/icons/plataformas.png'
import edit from '../../Images/icons/edit.png'
import deleteT from '../../Images/icons/delete.png'

const Landing = () => {
    return (
        <div id="landing">
            <section className='info'>
                <div className='logo'>
                    <img className='logoImg' src={ logo } alt="Logo" />
                    <h1 className='logoTitle'> Henry Games </h1>
                </div>
                <div className='description' >
                    <p className='desciption1'> Looking for information about your favorite games? You've come to the right place! </p>
                    <section className='infoList'> 
                        Search and Filter
                        <section className='info2List'>
                            <div className='infoCard'>
                                <img className='icons' src={name} alt="Icon name" />  
                                <p> By Name </p>
                            </div>
                            <div className='infoCard'>
                                <img className='icons' src={gender} alt="Icon gender" />  
                                <p> By Gender </p>
                            </div>
                            <div className='infoCard'>
                                <img className='icons' src={platform} alt="Icon platform" /> 
                                <p> By Platform  </p>
                            </div>
                        </section>
                    </section>
                    <section className='infoList'> 
                        Add Games 
                        <section className='info2List'>
                            <div className='infoCard'>
                                <img className='icons' src={edit} alt="Icon edit" /> 
                                <p> Edit Them </p>
                            </div>
                            <div className='infoCard'>
                                <img className='icons' src={deleteT} alt="Icon delete" /> 
                                <p> Delete Them </p>
                            </div>
                        </section>
                    </section>
                </div>
            </section>
            <section className='img_btn' >
                <img className='imgLanding' src="https://w0.peakpx.com/wallpaper/575/604/HD-wallpaper-video-games-collage-games.jpg" alt="Kids playing" />
                <Link to={'/home'}> 
                    <button className='btnLanding' > Search Games </button>
                </Link>
            </section>
        </div>
    )
}

export default Landing