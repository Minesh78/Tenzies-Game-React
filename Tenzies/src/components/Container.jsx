import React from "react";
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import useWindowSize from "react-use-window-size"


const Container =()=>{

    const[dice,setDice] = React.useState(allNewDice())
    const[tenzies, setTenzies]= React.useState(false)

    const{width , height} = useWindowSize();

    console.log(width, height)
  

    React.useEffect(() =>{

        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every((die)=> die.value === firstValue)

        if(allHeld && allSameValue){
            setTenzies(true)
            
        }

    })
    
    function generateNewDie(){
       return { 
            value: Math.ceil(Math.random() * 6),
            isHeld:false,
            id:nanoid()
        }
    }

    function allNewDice(){
         const newDice =[]
        for(let i = 0; i < 10; i++){
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice(){

        if(!tenzies){ 
        setDice(oldDice => oldDice.map(die =>{
            return die.isHeld ? die : generateNewDie()
        }))
       }else{
        setTenzies(false)
        setDice(allNewDice())
       }
     }

    function holdDice(id){
        setDice(oldDice =>oldDice.map( die =>{
            return die.id === id ?
            {...die,isHeld: !die.isHeld} :
            die
        }))
    } 

    const dieElements = dice.map(die => <Die key={die.id} value={die.value} held={die.isHeld}  holdDice ={() => holdDice(die.id)}/>)

   

    return(
        <>
           <main className="w-[400px] flex flex-col bg-slate-200 rounded-lg mt-12 m-auto justify-center items-center shadow-inner ring-indigo-400 ring-1">
            {tenzies && <Confetti width={width} height={height} /> }
            <h1 className="text-4xl font-bold my-4 ">Tenzies</h1>
            <p className="text-xl mx-5 text-center "> Roll until all values are the same. Click each one to freeze it at its current value between rolls.</p>
            <div className="grid justify-center items-center grid-cols-5 gap-14 m-8 "> 
                {dieElements}
            </div>

            <button className="ring-2 py-1 px-10 bg-blue-600 rounded-md m-10 text-white text-2xl focus:outline-0 active:shadow-inner active:bg-blue-900 " 
            onClick={rollDice}>
            {tenzies? "New Game" : "Roll"}
            </button>
           </main> 
        </>
    )
}

export default Container