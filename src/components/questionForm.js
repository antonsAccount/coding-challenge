import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';



const QuestionForm = props => {
    const [ answers, setAnswers ] = useState({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null
    })
    const [ missingData, setMissingData ] = useState(false);

    const options1 = [
        { value: "RetainWealth", label: "Kapitalerhalt" },
        { value: "GrowWealth", label: "Vermögensaufbau" },
        { value: "Retirement", label: "Altersvorsorge" }
    ]
    const options2 = [
        { value: "Below36", label: "unter 36 Jahren" },
        { value: "Below56", label: "36-55 Jahre" },
        { value: "Above55", label: "über 55 Jahre" }
    ]
    const options3 = [
        { value: "Below5", label: "weniger als 5 Jahre" },
        { value: "Below15", label: "5 - 15 Jahre" },
        { value: "Above15", label: "mehr als 15 Jahre" }
    ]
    const options4 = [
        { value: "SellAll", label: "Alles verkaufen" },
        { value: "KeepCool", label: "Cool bleiben" },
        { value: "InvestMore", label: "Mehr investieren" }
    ]
    const options5 = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" }
    ]


    const handleChange = (e, number) => {
        const updatedValue = {[number]: e.value}
        setAnswers({...answers, ...updatedValue})        
    }
    const postURL = "https://sandbox.onboarding-api.evergreen.de/risk-rate/calculate";
    const handleSubmit = () => {
        if (
            answers[1] === null ||
            answers[2] === null || 
            answers[3] === null || 
            answers[4] === null || 
            answers[5] === null
            ){
            setMissingData(true)
        }
        else {
            setMissingData(false);
            const setParent = props.setParentState
       
            const data = {
                goal: answers[1], 
                age: answers[2], 
                selfTest:answers[5], 
                duration: answers[3], 
                behaviour: answers[4] 
            }
            axios.post(postURL, data)
            .then(res => {
                setParent(res.data);
                
            })
            .catch(err=> console.log(err))
        }
        
        
        
    }
      
    return(
        <div>
                <p id="top-font" >Ermittle deine persönliche Risikokennzahl!</p>
                {missingData ? <h5 id="missingData">Bitte fülle alle fünf Fragen aus!</h5> : null}
                <br />
                <form onSubmit={handleSubmit} action="#">
                    <p>Was ist dein Anlageziel?</p>
                    <Select onChange={(e)=>handleChange(e, "1")} className="mt-4 col-md-8 col-offset-4 question" options={options1}/>
                    <p>Wie alt bist du?</p>
                    <Select onChange={(e)=>handleChange(e, "2")} className="mt-4 col-md-8 col-offset-4 question" options={options2} />
                    <p>Wie lange planst du dein Geld anzulegen?</p>
                    <Select onChange={(e)=>handleChange(e, "3")} className="mt-4 col-md-8 col-offset-4 question" options={options3} />
                    <p>Angenommen Deine Anlage verliert 10 % an Wert. Wie reagierst Du?</p>
                    <Select onChange={(e)=>handleChange(e, "4")} className="mt-4 col-md-8 col-offset-4 question" options={options4} />
                    <p>Wie schätzt Du Deine Risikobereitschaft selbst ein (1 - 10)?</p>
                    <Select onChange={(e)=>handleChange(e, "5")} className="mt-4 col-md-8 col-offset-4 question" options={options5} />
                    <br />
                    <input  className="button" type="submit" value="Risikokennzahl ermittlen"/>
                </form>
                            
        </div>
    )
}

export default QuestionForm;