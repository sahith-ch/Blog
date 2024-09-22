import React from 'react'
import "./Glowbutton.css"

type buttonprops={
text:String,
onClick:()=>void
}

function Glowbutton({text,onClick}:buttonprops) {
  
    return (
<button onClick={onClick} className=" flex  boxshadow justify-center mt-1 items-center text-cyan-400 w-28 h-10 rounded-2xl">{text}</button>

    )
}
export default Glowbutton
