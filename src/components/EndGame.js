import './EndGame.css'

const EndGame = ({ recomecar, pontuacao }) => {
    return(
        <div className="reiniciar">
            <h1>Fim de Jogo!</h1>
            <h3>A sua Pontuação foi: <span>{pontuacao}!</span></h3>
            <button onClick={() => recomecar()}>Começar Jogo</button>
        </div>
    )
}

export default EndGame