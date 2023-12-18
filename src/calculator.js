import React,{useReducer} from "react"
import "./styles/global.css"
import DigitButton from "./digitButton"
import OperationButton from "./OperationButton"


export const ACTIONS={
    ADD_DIGIT:'add-digit',
    CLEAR:'clear',
    DEL_DIGIT:'delete-digit',
    CHOOSE_OPERATION: 'chose-digit',
    EVALUATE:'evaluate'
}
function reducer(state,{type,payload}){

    switch(type){
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite){
                return{
                ...state,
                currentOperand:payload.digit,
                overwrite:false,}
            }
            if (payload.digit==="0" && state.currentOperand==="0")return state
            if (payload.digit==="." && state.currentOperand.includes("."))return state
            return{
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,

            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand==null && state.prevOperand==null) {return state;}
            if (state.prevOperand==null){
                return{
                    ...state,
                    operation: payload.operation,
                    prevOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            if (state.currentOperand == null){
                return{
                    ...state,
                    operation: payload.operation,
                }
            }
            return {
                ...state,
                prevOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            }
        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currentOperand==null || state.prevOperand == null){
                return state;
            }
            return{
                ...state,
                overwrite:true,
                currentOperand: evaluate(state),
                prevOperand:null,
                operation: null,
            }
        case ACTIONS.DEL_DIGIT:
            if (state.overwrite){
                return{
                    ...state,
                    overwrite:false,
                    currentOperand: null,
                                }
            }
            if (state.currentOperand== null) return state
            if (state.currentOperand.length===1){
                return {
                    ...state,currentOperand:null
                } 
            }
            return{
                ...state,
                currentOperand:state.currentOperand.slice(0,-1)
            } 
            

        

    }

}
function evaluate({currentOperand,prevOperand,operation}){
    let prev=parseFloat(prevOperand)
    let current=parseFloat(currentOperand)
    let computation;
    if (isNaN(prev) || isNaN(current)){
        let computation=""
    }
    switch(operation){
        case "+":
            computation=prev+current;
            break
        case "-":
            computation=prev-current;
            break
        case "*":
            computation=prev*current;
            break
        case "÷":
            computation=prev/current;
            break
    }
    return computation;

}

function Calculator(){


    const [{currentOperand, prevOperand, operation},dispatch]=useReducer(reducer,{})

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{prevOperand}{operation}</div>
                <div className="current-operand">{currentOperand}</div>
            </div>
            <button className="span" onClick={()=>
                dispatch({type:ACTIONS.CLEAR})
            }>AC</button>
            <button onClick={()=>dispatch({type: ACTIONS.DEL_DIGIT})}>DEl</button>
            <OperationButton operation="÷" dispatch={dispatch}/>
            <DigitButton digit="1" dispatch={dispatch}/>
            <DigitButton digit="2" dispatch={dispatch}/>
            <DigitButton digit="3" dispatch={dispatch}/>
            <OperationButton operation="*" dispatch={dispatch}/>
            <DigitButton digit="4" dispatch={dispatch}/>
            <DigitButton digit="5" dispatch={dispatch}/>
            <DigitButton digit="6" dispatch={dispatch}/>
            <OperationButton operation="+" dispatch={dispatch}/>
            <DigitButton digit="7"dispatch={dispatch}/>
            <DigitButton digit="8" dispatch={dispatch}/>
            <DigitButton digit="9" dispatch={dispatch}/>
            <OperationButton operation="-" dispatch={dispatch}/>
            <DigitButton digit="." dispatch={dispatch}/>
            <DigitButton digit="0" dispatch={dispatch}/>
            <button className="span" onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
        </div>
        
    )
}

export default Calculator