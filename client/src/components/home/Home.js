import React from 'react';
import Form from './Form';
import './home.css';

export default function Home() {
    return (
        <div className="main-container">
            <header style={{ backgroundImage: `url(/img/header.svg)`}}>
                <img src="img/logo1.svg" alt="Happy Day"></img>
                <h2>Birthdays and Anniversaries Reminder</h2>
            </header>
            <main>
            <Form/>
            <div className="card">
                <h3>Start in 3 simple steps:</h3>
                <div className="step">
                    <div className="num">1</div><p>Sing up or log in.</p>
                </div>
                <div className="step">
                    <div className="num">2</div><p>Add the birthdays or anniversaries of your friends and family.</p>
                </div>
                <div className="step">
                    <div className="num">3</div><p>Allows the application to send notifications  
                        (You will also receive the reminders in your email).</p>
                </div>
            </div>
            </main>
            <footer  style={{ backgroundImage: `url(/img/footer.svg)`}}>
            <p>Forgot Your Password? <span className="red">Recover it</span></p> 
            </footer>
        </div>
    )
}
