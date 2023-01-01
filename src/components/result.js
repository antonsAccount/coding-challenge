const Result = props => {

    return (
        <div id="result-box">                     
            <h3 className="text-center" >Deine ermittelte Risikokennzahl: {props.apiData.calculatedRiskRate}</h3>
            <ul className="list-group list-group-horizontal-lg text-center">
                <li className="list-group-item flex-fill">Anteil Evergreen Fond Yin: {props.apiData.riskValues.yin}% </li>
                <li className="list-group-item flex-fill">Anteil Evergreen Fond Yang: {props.apiData.riskValues.yang}%</li>
                <li className="list-group-item flex-fill">Zu erwartender Betrag pro Jahr: {props.apiData.riskValues.return}%</li>
                <li className="list-group-item flex-fill">Zu erwartende Volatilität: {props.apiData.riskValues.volatility}%</li>
            </ul>
            
        </div>
    )
}

export default Result