import { useState, useEffect, useCallback } from 'react'
import './App.css';
import EndGame from './components/EndGame';
import Game from './components/Game';
import StartGame from './components/StartGame';
import { wordsLista } from './List/words'

const states = ['start','end','reset'];

function App() {

  
  const [LISTA] = useState(wordsLista)
  const [estados, setEstados] = useState(states[0])
  const [categoria, setCategoria] = useState('');
  const [palavraCategoria, setPalavraCategoria] = useState('');
  const [letras, setLetras] = useState([]);
  
  const [pontuacao, setPontuacao] = useState(0);
  const [tentativa, setTentativa] = useState(3);
  const [letrasCertas, setLetrasCertas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);




  const CategoryLetter = useCallback(() => {
    
    const categoryLista = Object.keys(LISTA);

    const categoryRandom = categoryLista[Math.floor(Math.random() * Object.keys(categoryLista).length)];
    const palavraCategory = LISTA[categoryRandom][Math.floor(Math.random() * LISTA[categoryRandom].length)];

    //console.log(categoryLista)
    //console.log(categoryRandom)
    //console.log(palavraCategory)
    return { categoryRandom, palavraCategory }
  }, [LISTA])

  //console.log(categoria)

  const handleStart = useCallback(() =>{

    const {categoryRandom, palavraCategory} = CategoryLetter();

    const palavraMin = palavraCategory.toLowerCase();
    console.log(palavraMin);
    const letterList = palavraMin.split('');
    //console.log(letterList);

    setCategoria(categoryRandom);
    setPalavraCategoria(palavraCategory);
    setLetras(letterList);

    setEstados(states[1])
  },[CategoryLetter]) 

  const handleEnd = (letraDigitada) => {

    letraDigitada = letraDigitada.toLowerCase();

    if(letrasCertas.includes(letraDigitada) || letrasErradas.includes(letraDigitada)){
      return;
    }
    
    if(letras.includes(letraDigitada)){
      setLetrasCertas((e) => [...e, letraDigitada])
    }else{
      setLetrasErradas((e) => [...e, letraDigitada])
      setTentativa((e)=> e -= 1)
    }
  }

  //3 erros
  useEffect(() => {
    if(tentativa <= 0){
      setEstados(states[2])
    }
  }, [tentativa])

  //acerto  
  useEffect(() =>{
    const letrasSemRepeticao = [...new Set(letras)];
    
    if(letrasSemRepeticao.length === letrasCertas.length && estados === "end"){
      setPontuacao((e) => e+=100);
      setLetrasCertas([]);
      setLetrasErradas([]);      
      handleStart();
    }

  }, [letrasCertas, handleStart, letras, estados])

  //console.log(letrasCertas)
  //console.log(letrasErradas)

  const handleReset = () => {

    setPontuacao(0);
    setLetrasCertas([]);
    setLetrasErradas([]);
    setTentativa(3); 
    setEstados(states[0]);
  }

  return (
    <div className="App">
       {estados === "start" && <StartGame
        iniciar= {handleStart}

       />}
       {estados === "end" && <Game
        fim={handleEnd}
        
        categoria = {categoria}
        palavraCategoria = {palavraCategoria}
        letras = {letras}

        pontuacao = {pontuacao}
        tentativa = {tentativa}
        letrasCertas = {letrasCertas}
        letrasErradas = {letrasErradas}
       />}
       {estados === "reset" && <EndGame
        recomecar = {handleReset}
        pontuacao = {pontuacao}
       />}
    </div>
  );
}

export default App;
