import React from 'react'

export default function Search({on,setShowCard}) {
    return (
        <form className="card-form">

            <div className="grup">
                <div className="label">
                    <label htmlFor="from">From</label>
                    <input className="form-to" type="text" placeholder="mm/dd" pattern="\d{2}/\d{2}"/>
                </div>
                <div className="label">
                    <label htmlFor="to">To</label>
                    <input className="form-to" type="text" placeholder="mm/dd" pattern="\d{2}/\d{2}"/>
                </div>
            </div>
            <div className="label">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="any" />
            </div>
            
            
            <div className="label">
                <label htmlFor="type">Type</label>
                    <select name="type" required>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                    </select>
            </div>

            <div className="card-form-submit">
                    <button type="submit">Search</button>
            </div>
            
        </form>
    )
}
