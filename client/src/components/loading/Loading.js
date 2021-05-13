import React from 'react';
import "./loading.css"

export default function Loading() {
    return (
        <div className="loading-container">
        <img src="img/logo1.svg" alt="Happy Day" className="loading-logo"/>
        <div className="wheel-container">
        <img src="img/loading.svg" alt="loading" className="loading-wheel" />
        <p>Loading...</p>
        </div>
        </div>
    )
}
