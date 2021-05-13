import React,{useEffect, useState} from 'react'
import Add from './Add';
import './cards.css';
import Edit from './Edit';
import Help from './Help';
import Search from './Search';
import Settings from './Settings';

export default function Card({showCard, setShowCard}) {
    const [on, setOn]= useState(false);
    const [title, setTitle]= useState('');
    const [form, setForm]= useState(<Add/>);

    //show cards and animation 
    useEffect(()=>{
        const add=document.getElementById('card');
        
          let matrix= window.getComputedStyle(add, null).transform;
        
        setOn((prevOn)=> !prevOn);

        if(matrix === 'none' && showCard !== 'none'){
            setOn(false);
            setTimeout(()=>{
                switchForm(showCard);
                setOn(true)
            }, 500);
            
        }else if(matrix !== 'none' && showCard !== 'none'){
            switchForm(showCard);
        }


        if(showCard === "none"){
            setOn(false);
        }

      },[showCard]);


      let switchForm=(sc)=>{
          switch(sc){
            case "add":
                  setTitle("Add Event");
                  setForm(<Add />);
                  break;

            case "search":
                    setTitle("Search Event");
                    setForm(<Search/>);
                    break;

            case "settings":
                setTitle("Settings");
                setForm(<Settings/>)
                break;

            case "help":
                setTitle("Help");
                setForm(<Help/>)
                break;

            case "edit":
              setTitle("Edit Event");
              setForm(<Edit/>)
                break;

            default:
                    break;
          }
      }

     


      return (
        <div className={on ? "toolbar-card" : "toolbar-card off"} id="card">

          <div className="card-header">
            <h3>{title}</h3>
            <img src="img/exit.svg" alt="close card"  onClick={()=>setShowCard('none')}/>
          </div>

            {form}
          
        </div>
        );
}
