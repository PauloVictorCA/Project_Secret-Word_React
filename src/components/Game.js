import { useState, useRef } from 'react'
import './Game.css'

const Game = ({ fim, categoria, palavraCategoria, letras, pontuacao, tentativa, letrasCertas, letrasErradas }) => {

    const [letraDigitada, setLetraDigitada] = useState('');
    const focus = useRef(null);

    const submit = (t) => {
        t.preventDefault();

        fim(letraDigitada)
        setLetraDigitada('');        
        
        focus.current.focus();
    }

    return(
        <div className="jogo">
            <p>pontuação: <span>{pontuacao}</span></p>
            <h1>Adivinhe a palavra!</h1>
            <h3>Dica sobre a palavra: <span>{categoria}</span></h3>
            <p>Você ainda tem <span>{tentativa}</span> tentativa(s)</p>

            <div className="word">
                {letras.map((letra, i) => (
                     letrasCertas.includes(letra) ? <span key={i} className='letter'>{letra}</span>:<span key={i} className='blacksquare'></span>
                ))}
            </div>

            <div className="jogador">
                <p>Tente adivinhar uma letra da palavra</p>
                <form onSubmit={submit}>
                    <label>
                        <input type="text" name="nome" maxLength={1} required onChange={(e)=> setLetraDigitada(e.target.value)} ref={focus} value={letraDigitada}/>
                    </label>
                    <button>jogar!</button>
                </form>
            </div>

            <div className="erros">
                <p>Letras já utilizadas:</p>
                {letrasErradas.map((letra, i)=>(<span key={i}> {letra},</span>))}
            </div>           
        </div>
    )
}

export default Game