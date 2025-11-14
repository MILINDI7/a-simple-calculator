# Calculator State Flow Diagram

## 🔄 Visual State Flow

### **Initial State**
```
display: '0'
firstNumber: null
operator: null
waitingForSecondNumber: false
lastButton: null
```

---

### **Flow: 5 + 3 = 8**

#### **Step 1: User clicks "5"**
```
┌─────────────────────────────────┐
│ handleNumberInput('5')          │
├─────────────────────────────────┤
│ display: '0' → '5'              │
│ lastButton: null → 'number'     │
│ waitingForSecondNumber: false   │
└─────────────────────────────────┘
```

#### **Step 2: User clicks "+"**
```
┌─────────────────────────────────┐
│ handleOperator('+')              │
├─────────────────────────────────┤
│ firstNumber: null → 5           │
│ operator: null → '+'            │
│ waitingForSecondNumber: false → true
│ lastButton: 'number' → 'operator'
│ display: '5' (unchanged)        │
└─────────────────────────────────┘
```

#### **Step 3: User clicks "3"**
```
┌─────────────────────────────────┐
│ handleNumberInput('3')          │
├─────────────────────────────────┤
│ display: '5' → '3' (REPLACED!) │
│ waitingForSecondNumber: true → false
│ lastButton: 'operator' → 'number'
└─────────────────────────────────┘
```

#### **Step 4: User clicks "="**
```
┌─────────────────────────────────┐
│ handleEquals()                   │
├─────────────────────────────────┤
│ calculate(5, 3, '+') → 8        │
│ display: '3' → '8'              │
│ firstNumber: 5 → null           │
│ operator: '+' → null            │
│ waitingForSecondNumber: false → true
│ lastButton: 'number' → 'equals' │
└─────────────────────────────────┘
```

---

## 🎯 State Transition Diagram

```
                    [Initial State]
                    display: '0'
                    firstNumber: null
                    operator: null
                           │
                           │ User clicks number
                           ▼
              [Entering First Number]
                    display: '5'
                    firstNumber: null
                           │
                           │ User clicks operator
                           ▼
              [Operator Selected]
                    display: '5'
                    firstNumber: 5
                    operator: '+'
                    waitingForSecondNumber: true
                           │
                           │ User clicks number
                           ▼
              [Entering Second Number]
                    display: '3'
                    firstNumber: 5
                    operator: '+'
                    waitingForSecondNumber: false
                           │
                           │ User clicks '='
                           ▼
              [Result Displayed]
                    display: '8'
                    firstNumber: null
                    operator: null
                    waitingForSecondNumber: true
                           │
                           │ (Ready for new calculation)
```

---

## 🔀 Function Call Flow

```
User Action
    │
    ├─→ Click Number
    │       │
    │       └─→ handleNumberInput()
    │               │
    │               ├─→ if waitingForSecondNumber
    │               │       └─→ Replace display
    │               │
    │               └─→ else
    │                       └─→ Append to display
    │
    ├─→ Click Operator
    │       │
    │       └─→ handleOperator()
    │               │
    │               ├─→ if firstNumber === null
    │               │       └─→ Store first number
    │               │
    │               └─→ else
    │                       └─→ Calculate previous, then set new operator
    │
    ├─→ Click Equals
    │       │
    │       └─→ handleEquals()
    │               │
    │               └─→ calculate()
    │                       └─→ Update display with result
    │
    ├─→ Click Clear
    │       │
    │       └─→ handleClear()
    │               │
    │               └─→ Reset all state to initial
    │
    └─→ Press Keyboard
            │
            └─→ useEffect listener
                    │
                    └─→ Maps key to appropriate handler
```

---

## 📊 State Variable Relationships

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  display                                            │
│    │                                                │
│    ├─→ Shows current number/result                 │
│    └─→ Updated by:                                 │
│          • handleNumberInput()                     │
│          • handleEquals()                          │
│          • handleClear()                           │
│          • handleBackspace()                       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  firstNumber                                        │
│    │                                                │
│    ├─→ Stores first operand                        │
│    └─→ Updated by:                                 │
│          • handleOperator() (set)                  │
│          • handleEquals() (reset)                  │
│          • handleClear() (reset)                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  operator                                           │
│    │                                                │
│    ├─→ Stores current operation                    │
│    └─→ Updated by:                                 │
│          • handleOperator() (set)                  │
│          • handleEquals() (reset)                  │
│          • handleClear() (reset)                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  waitingForSecondNumber                            │
│    │                                                │
│    ├─→ Controls display behavior                   │
│    └─→ Updated by:                                 │
│          • handleOperator() (set to true)          │
│          • handleNumberInput() (set to false)      │
│          • handleEquals() (set to true)            │
│          • handleClear() (set to false)            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎬 Example: Chained Calculations

### **Scenario: 10 + 5 - 3 = 12**

```
Step 1: Click "10"
  display: '10'
  firstNumber: null
  operator: null

Step 2: Click "+"
  display: '10'
  firstNumber: 10
  operator: '+'
  waitingForSecondNumber: true

Step 3: Click "5"
  display: '5'
  firstNumber: 10
  operator: '+'
  waitingForSecondNumber: false

Step 4: Click "-" (before clicking =)
  → handleOperator('-') calculates: 10 + 5 = 15
  display: '15'
  firstNumber: 15
  operator: '-'
  waitingForSecondNumber: true

Step 5: Click "3"
  display: '3'
  firstNumber: 15
  operator: '-'
  waitingForSecondNumber: false

Step 6: Click "="
  → calculate(15, 3, '-') = 12
  display: '12'
  firstNumber: null
  operator: null
```

---

## 🛡️ Edge Cases Handled

### **1. Multiple Operators**
```
User: 5 + - * 
→ Only last operator is used
→ Previous calculation happens first
```

### **2. Division by Zero**
```jsx
case '/': return second !== 0 ? first / second : 0
```

### **3. Multiple Decimal Points**
```jsx
if (display.indexOf('.') === -1) {
  setDisplay(display + '.')
}
```

### **4. Long Numbers**
```jsx
if (value.length > 12) {
  return num.toExponential(6)
}
```

### **5. Backspace on Single Digit**
```jsx
if (display.length > 1) {
  setDisplay(display.slice(0, -1))
} else {
  setDisplay('0')
}
```

---

## 💡 Key Insights

1. **waitingForSecondNumber** is crucial - it determines whether to replace or append
2. **lastButton** prevents operator chaining issues
3. **firstNumber** and **operator** work together to track calculation state
4. **display** is the only state users see directly
5. All functions are pure and predictable

---

Use this diagram to explain the state flow in your video! 🎥

