import React from "react";

const Die =(props)=>{

    const styles ={
        backgroundColor:props.held ? "#59E391" : "white"
    }
    return (
        <div className="shadow-xl flex items-center  justify-center w-10 rounded-md cursor-pointer p-1 " 
        style={styles}
        onClick={props.holdDice}
        >
            <h2 className="text-3xl font-bold">{props.value}</h2>
        </div>
    )
}

export default Die