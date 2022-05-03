/* Bill Splitter App */
// ** Purpose of the Application **
// - Application will provide users ability to enter bill information and split the bill including tips amongst # of people

// App Component 
// - Create state to hold data from firebase with regards to bill history
// - Upon page load, call the method to get firebase data containing bill history

// Render the application
// - Form with user input to retrieve bill information
// - Use the imported result component

// Result Component
// Create a component to display bill informattion on tool

// Bill History Component
// - Create a component to display bill history using data from firebase

// Stretch goals
// - Ability for users to add names of people and items to and be able to select whether item to be split evenly or unevenly amongst certain people
// - User auth and account setup so individual bill history is saved


import { useState, useEffect } from 'react';
import BillForm from './components/BillForm';
import BillDisplay from './components/BillDisplay';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebase from './firebase';
import './styles/sass//App.scss';



function App() {
  const [restaurantName, setRestaurantName] = useState("");
  const [grossBillAmount, setGrossBillAmount] = useState("");
  const [customTipEnabled, setCustomTipEnabled] = useState(false);
  const [grossTipAmount, setGrossTipAmount] = useState(0);
  const [groupSizeInput, setGroupSizeInput] = useState(1);
  
  

  const [grossBillPerPerson, setGrossBillPerPerson] = useState(0);
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalBillPerPerson, setTotalBillPerPerson] = useState(0);
  
  const [tipRadioButtonValue, setTipRadioButtonValue] = useState(0);
  const [tipTextInputValue, setTipTextInputValue] = useState(0);
  
  let radioButtonValueVar;
  let tipTextInputValueVar;
  let tipOptionSelectionType;
  let tipPercentage = 0;

  // function to store restaurant name in state
  const handleUpdateRestaurant = (event) => {
    setRestaurantName(event.target.value);
  }

  const handleUpdateGrossBillAmount = (event) => {
    setGrossBillAmount(parseInt(event.target.value));
  }

  const handleUpdateGrossTipAmount = (event) => {
    tipOptionSelectionType = event.target.type
    
    tipOptionSelectionType === "radio" ? radioButtonValueVar = event.target.value : tipTextInputValueVar = event.target.value
    tipOptionSelectionType === "radio" ? setTipRadioButtonValue(event.target.value) : setTipTextInputValue(parseInt(event.target.value));
    tipOptionSelectionType === "radio" ? (radioButtonValueVar === "custom" ? setCustomTipEnabled(true) : setCustomTipEnabled(false)) : console.log("custom box edited but not selected");
  }

  useEffect(() => {
    calculateTip();
  }, [tipRadioButtonValue, tipTextInputValue, grossBillAmount, groupSizeInput])

  const calculateTip = () => {
    customTipEnabled === true ? setGrossTipAmount(tipTextInputValue) : setGrossTipAmount(grossBillAmount * tipRadioButtonValue);
  }

  const handleUpdateGroupSize = (event) => {
    setGroupSizeInput(parseInt(event.target.value));
  }

  useEffect(() => {
    calculateAmountsPerPerson();
  }, [grossBillAmount, grossTipAmount, groupSizeInput])

  const calculateAmountsPerPerson = () => {
    groupSizeInput > 0 ? divideAmountsByGroup() : divideAmountsByOne()    
    
  }

  const divideAmountsByGroup = () => {
    setGrossBillPerPerson(grossBillAmount / groupSizeInput);
    setTipPerPerson(grossTipAmount / groupSizeInput);
    setTotalBillPerPerson((grossBillAmount + grossTipAmount) / groupSizeInput);
  }

  const divideAmountsByOne = () => {
    setGrossBillPerPerson(grossBillAmount / 1);
    setTipPerPerson(grossTipAmount / 1);
    setTotalBillPerPerson((grossBillAmount + grossTipAmount) / 1);
  }

  const resetForm = () => {
    setRestaurantName("");
    setGrossBillAmount("");
    setGrossTipAmount(0);
    setGroupSizeInput(1);
  }

  // Round values to decimal places precisely
  const roundToTwoDecimalPlaces = (num) => {
    return + (Math.round(num + "e+2") + "e-2");
  }

  useEffect(() => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)
    onValue(dbRef, (response) => {
      console.log(response.val());
    })
  })
  
  return (
    <div className="App">
      <h1>Bill Splitter</h1>
      <div className="bill-splitter-container">
        <BillForm className="bill-form"
          restaurantNameState={restaurantName}
          updateRestaurantName={(event) => handleUpdateRestaurant(event)}

          grossBillAmountState={grossBillAmount}
          updateGrossBillAmount={(event) => handleUpdateGrossBillAmount(event)}

          grossTipAmountState={grossTipAmount}
          updateGrossTipAmount={(event) => handleUpdateGrossTipAmount(event)}

          groupSizeState={groupSizeInput}
          updateGroupSize={(event) => handleUpdateGroupSize(event)}
        />
        <BillDisplay className="bill-display"
          grossBillPerPersonState={roundToTwoDecimalPlaces(grossBillPerPerson).toFixed(2)}
          tipPerPersonState={roundToTwoDecimalPlaces(tipPerPerson).toFixed(2)}
          totalBillPerPersonState={roundToTwoDecimalPlaces(totalBillPerPerson).toFixed(2)}
          groupSizeState={groupSizeInput}
          resetForm={(event) => resetForm(event)} />
      </div>
    </div>
  );
}

export default App;
