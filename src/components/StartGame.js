import './StartGame.css'

const StartGame = ({ iniciar }) => {
    return(
        <div>
            <h1>StartGame</h1>
            <p className='informacao'>clique no botão para começar a jogar</p>
            <button onClick={()=> iniciar()}>Começar Jogo</button>
        </div>
    )
}

export default StartGame