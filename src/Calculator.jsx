import React, { useState, useEffect } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false)
  const [lastButton, setLastButton] = useState(null)

  useEffect(() => {
    // Add keyboard support
    const handleKeyPress = (e) => {
      const key = e.key
      if (key >= '0' && key <= '9') {
        handleNumberInput(key)
      } else if (key === '.') {
        handleDecimal()
      } else if (key === '+' || key === '-') {
        handleOperator(key)
      } else if (key === '*') {
        handleOperator('*')
      } else if (key === '/') {
        handleOperator('/')
      } else if (key === 'Enter' || key === '=') {
        handleEquals()
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear()
      } else if (key === 'Backspace') {
        handleBackspace()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, firstNumber, operator, waitingForSecondNumber])

  const handleNumberInput = (num) => {
    if (waitingForSecondNumber) {
      setDisplay(num)
      setWaitingForSecondNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
    setLastButton('number')
  }

  const handleDecimal = () => {
    if (waitingForSecondNumber) {
      setDisplay('0.')
      setWaitingForSecondNumber(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
    setLastButton('decimal')
  }

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display)

    if (firstNumber === null) {
      setFirstNumber(inputValue)
    } else if (operator && lastButton !== 'operator') {
      const result = calculate(firstNumber, inputValue, operator)
      setDisplay(String(result))
      setFirstNumber(result)
    }

    setWaitingForSecondNumber(true)
    setOperator(nextOperator)
    setLastButton('operator')
  }

  const calculate = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '*':
        return first * second
      case '/':
        return second !== 0 ? first / second : 0
      default:
        return second
    }
  }

  const handleEquals = () => {
    if (operator && firstNumber !== null && !waitingForSecondNumber) {
      const inputValue = parseFloat(display)
      const result = calculate(firstNumber, inputValue, operator)
      setDisplay(String(result))
      setFirstNumber(null)
      setOperator(null)
      setWaitingForSecondNumber(true)
      setLastButton('equals')
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setFirstNumber(null)
    setOperator(null)
    setWaitingForSecondNumber(false)
    setLastButton('clear')
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
    setLastButton('backspace')
  }

  const formatDisplay = (value) => {
    if (value.length > 12) {
      const num = parseFloat(value)
      if (isNaN(num)) return value
      return num.toExponential(6)
    }
    return value
  }

  return (
    <div className="calculator-container">
      <div className="calculator-wrapper">
        <div className="calculator-header">
          <h1>Calculator</h1>
          <div className="calculator-subtitle">Innovative Design</div>
        </div>
        
        <div className="display-container">
          <div className="display">
            {formatDisplay(display)}
          </div>
          {operator && (
            <div className="operator-indicator">
              {firstNumber} {operator}
            </div>
          )}
        </div>

        <div className="buttons-grid">
          <button 
            className="button button-clear" 
            onClick={handleClear}
            aria-label="Clear"
          >
            C
          </button>
          <button 
            className="button button-operator" 
            onClick={() => handleOperator('/')}
            aria-label="Divide"
          >
            ÷
          </button>
          <button 
            className="button button-operator" 
            onClick={() => handleOperator('*')}
            aria-label="Multiply"
          >
            ×
          </button>
          <button 
            className="button button-operator" 
            onClick={handleBackspace}
            aria-label="Backspace"
          >
            ⌫
          </button>

          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('7')}
          >
            7
          </button>
          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('8')}
          >
            8
          </button>
          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('9')}
          >
            9
          </button>
          <button 
            className="button button-operator" 
            onClick={() => handleOperator('-')}
            aria-label="Subtract"
          >
            −
          </button>

          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('4')}
          >
            4
          </button>
          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('5')}
          >
            5
          </button>
          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('6')}
          >
            6
          </button>
          <button 
            className="button button-operator" 
            onClick={() => handleOperator('+')}
            aria-label="Add"
          >
            +
          </button>

          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('1')}
          >
            1
          </button>
          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('2')}
          >
            2
          </button>
          <button 
            className="button button-number" 
            onClick={() => handleNumberInput('3')}
          >
            3
          </button>
          <button 
            className="button button-equals" 
            onClick={handleEquals}
            aria-label="Equals"
            style={{ gridRow: 'span 2' }}
          >
            =
          </button>

          <button 
            className="button button-number button-zero" 
            onClick={() => handleNumberInput('0')}
          >
            0
          </button>
          <button 
            className="button button-number" 
            onClick={handleDecimal}
            aria-label="Decimal point"
          >
            .
          </button>
        </div>

        <div className="calculator-footer">
          <div className="keyboard-hint">Keyboard shortcuts enabled</div>
        </div>
      </div>
    </div>
  )
}

export default Calculator

