import { useState, useEffect, useRef } from 'react';
import './Calculator.scss';

function Calculator() {
  const [calculation, setCalculation] = useState('0');
  const [result, setResult] = useState('0');
  const [ans, setAns] = useState('0');
  const calculationRef = useRef();
  const resultRef = useRef();

  const handleClick = (value) => {
    let newCalculation = result;
    // Xử lý sự kiện click nút =
    if (value === '=') {
        try {
            if(result.indexOf('Error')!==-1){
              return;
            }
            if(result.indexOf('0/0')!==-1){
              throw new Error('Error')
            }
            const answer=eval(result)
            setResult(answer.toString());
            setCalculation(newCalculation);
            setAns(answer.toString());
      } catch (error) {
        if(result.indexOf('Ans')!==-1){
                const replaceAns=(result.replace(/Ans(?=\d)/g, "Ans*").replace(/(?<=\d)Ans/g, "*Ans").replace(/(Ans)(?=Ans)/g, "$1*").replace(/(\d+|Ans)\(/g, '$1*(').replace(/\)(\d+|Ans)/g, ')*$1'));
                const answer = eval(replaceAns.replace(/Ans/g, ans));
                setResult(answer.toString());
                setCalculation(newCalculation);
                setAns(answer.toString());
        }else{
            setAns('0')
            setResult('Error');
            setCalculation(newCalculation);
        }
      }
      return
    }

    else if (value === 'Ans') {
        if(result=='0'){
            newCalculation = 'Ans';
            setResult(newCalculation)
            return
        }else{
            newCalculation=newCalculation+'Ans';
            setResult(newCalculation)
        }
    }

    // Xử lý sự kiện click nút CE/AC
    else if (value === 'CE') {
      if(result.charAt(result.length-1)==='s'){
        if(result.length===3){
          setResult('0')
          return
        }
        newCalculation = result.slice(0, -3);
        setResult(newCalculation)
        return;
      }
      if(result.charAt(result.length-1)==='y'){
        if(result.length===8){
          setResult('0')
          return
        }
        newCalculation = result.slice(0, -8);
        setResult(newCalculation)
        return;
      }
      if(result.charAt(result.length-1)==='r'){
        if(result.length===5){
          setResult('0')
          return
        }
        newCalculation = result.slice(0, -5);
        setResult(newCalculation)
        return;
      }
      if(result==='Infinity'){
        setResult('0')
        return
      }
      newCalculation = result.slice(0, -1);
      if (result === '') {
        newCalculation = '0';
      }
      if(result.length===1){
        setResult('0')
        return
      }
    } else if (value === 'AC') {
      setResult('0');
      setCalculation(`Ans = ${ans}`)
      return
    }
    // Xử lý sự kiện click các nút toán học và dấu ngoặc
    else {
      if (result === '0') {
        if(value==='.'){
        newCalculation='0.'
        setResult(newCalculation)
        return
        }if(value==='+'){
          newCalculation='0+'
          setResult(newCalculation)
          return
        }if(value==='-'){
          newCalculation='0-'
          setResult(newCalculation)
          return
        }if(value==='*'){
          newCalculation='0*'
          setResult(newCalculation)
          return
        }if(value==='/'){
          newCalculation='0/'
          setResult(newCalculation)
          return
        }
        newCalculation = value;
      }else {
        newCalculation += value;
      }
    }
    setResult(newCalculation);
  };

  //Bàn phím
  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = event.key;
      switch (keyPressed) {
        case 'Enter':
          animation();
          break;
        case 'Backspace':
          handleClick('CE');
          break;
        case 'Escape':
          handleClick('AC');
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          handleClick(keyPressed);
          break;
        case '.':
          handleClick('.');
          break;
        case '(':
          handleClick('(');
          break;
        case ')':
          handleClick(')');
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          handleClick(keyPressed);
          break;
        case 'a':
        case 'A':
          handleClick('Ans');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const animation=()=>{
    calculationRef.current.animate(
      { transform: ["translate(-50%,150%) scale(2)", "translateY(0) scale(1)"]},
      { duration: 200, iterations: 1}
    )
    resultRef.current.animate(
      { transform: ["translateY(100%)", "translateY(0)"]},
      { duration: 200, iterations: 1}
    )
    handleClick('=')
  }
  return (
    <div className="background">
      <div className="calculator">
        <div className="display">
          <div className="calculation" ref={calculationRef}>{calculation}</div>
          <div className="result" ref={resultRef}>{result}</div>
        </div>
        <div className="keypad">
          <button className='color' onMouseDown={() => handleClick('(')}>(</button>
          <button className='color' onMouseDown={() => handleClick(')')}>)</button>
          <button className='color' onMouseDown={() => handleClick('CE')}>CE</button>
          <button className='color' onMouseDown={() => handleClick('AC')}>AC</button>
          <button onMouseDown={() => handleClick('7')}>7</button>
          <button onMouseDown={() => handleClick('8')}>8</button>
          <button onMouseDown={() => handleClick('9')}>9</button>
          <button className='color' onMouseDown={() => handleClick('/')}>/</button>
          <button onMouseDown={() => handleClick('4')}>4</button>
          <button onMouseDown={() => handleClick('5')}>5</button>
          <button onMouseDown={() => handleClick('6')}>6</button>
          <button className='color' onMouseDown={() => handleClick('*')}>*</button>
          <button onMouseDown={() => handleClick('1')}>1</button>
          <button onMouseDown={() => handleClick('2')}>2</button>
          <button onMouseDown={() => handleClick('3')}>3</button>
          <button className='color' onMouseDown={() => handleClick('-')}>-</button>
          <button onMouseDown={() => handleClick('0')}>0</button>
          <button onMouseDown={() => handleClick('.')}>.</button>
          <button onMouseDown={() => handleClick('Ans')}>Ans</button>
         <button className='color' onMouseDown={() => handleClick('+')}>+</button>
          <button className="equal color" onMouseDown={animation}>=</button>
        </div>
      </div>
    </div>
  )
}

export default Calculator;