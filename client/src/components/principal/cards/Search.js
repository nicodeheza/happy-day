import React, { useContext, useState } from 'react'
import {principalContext} from '../Principal';

export default function Search() {
    const {setSearchFilters, setShowCard}= useContext(principalContext);
    const [filds, setFilds]= useState({
        from:'',
        to:'',
        name: '',
        type: 'any'
    });

    const searchEvents=(e)=>{
        e.preventDefault();

        setSearchFilters(filds);
 
        setShowCard('none');

        setFilds({
            from:'',
            to:'',
            name: '',
            type: 'any'
        });
    }
    return (
        <form className="card-form" onSubmit={(e)=>searchEvents(e)}>

            <div className="grup">
                <div className="label">
                    <label htmlFor="from">From</label>
                    <input className="form-to" id="from" type="text" placeholder="mm/dd" pattern="\d{2}/\d{2}" 
                    value={filds.from} onChange={(e)=> setFilds({...filds, from: e.target.value})}/>
                </div>
                <div className="label">
                    <label htmlFor="to">To</label>
                    <input className="form-to" type="text" id="to" placeholder="mm/dd" pattern="\d{2}/\d{2}"
                    value={filds.to} onChange={(e)=>setFilds({...filds, to: e.target.value})}/>
                </div>
            </div>
            <div className="label">
                <label htmlFor="searchName">Name</label>
                <input type="text" placeholder="any" id="searchName" value={filds.name} onChange={(e)=>setFilds({...filds, name: e.target.value})} />
            </div>
            
            
            <div className="label">
                <label htmlFor="searchType">Type</label>
                    <select name="searchType" id="searchType" value={filds.type} onChange={(e)=>setFilds({...filds, type: e.target.value})} required>
                        <option value="any">Any</option>
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
