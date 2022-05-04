// imports
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from './firebase';
import BillForm from './components/BillForm';
import BillDisplay from './components/BillDisplay';
import './styles/sass//App.scss';

function App() {
  // Defining input value states
  const [restaurantName, setRestaurantName] = useState("");
  const [grossBillAmount, setGrossBillAmount] = useState("");
  const [customTipEnabled, setCustomTipEnabled] = useState(false);
  const [grossTipAmount, setGrossTipAmount] = useState(0);
  const [groupSizeInput, setGroupSizeInput] = useState(1);

  // Defining calculation states
  const [grossBillPerPerson, setGrossBillPerPerson] = useState(0);
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalBillPerPerson, setTotalBillPerPerson] = useState(0);
  
  // Defining tip related states
  const [tipRadioButtonValue, setTipRadioButtonValue] = useState(0);
  const [tipTextInputValue, setTipTextInputValue] = useState("");

  // Defining transaction history states
  const [savedTransactions, setSavedTransactions] = useState([]);

  const savedTransactionsArray = [];
  let tipOptionSelectionType;

  // function to store restaurant name in state
  const handleUpdateRestaurant = (event) => {
    setRestaurantName(event.target.value);
  }

  // function to store gross bill amount in state
  const handleUpdateGrossBillAmount = (event) => {
    setGrossBillAmount(parseInt(event.target.value));
  }

  // function to store tip amount in state
  const handleUpdateGrossTipAmount = (event) => {
    tipOptionSelectionType = event.target.type
    setTipTextInputValue(() => "");
    
    tipOptionSelectionType === "radio" ? setTipRadioButtonValue(event.target.value) : setTipTextInputValue(parseInt(event.target.value));
    tipOptionSelectionType === "number" ? setCustomTipEnabled(true) : setCustomTipEnabled(false);
  }

  // function to calculate tip
  const calculateTip = () => {
    customTipEnabled === true ? setGrossTipAmount(tipTextInputValue) : setGrossTipAmount(grossBillAmount * tipRadioButtonValue);
  }

  // function to update group size
  const handleUpdateGroupSize = (event) => {
    setGroupSizeInput(parseInt(event.target.value));
  }

  // function to calculate amounts per person
  const calculateAmountsPerPerson = () => {
    groupSizeInput > 0 ? divideAmountsByGroup() : divideAmountsByOne()
  }

  /// function to divide amounts by group size if group size greater than 0
  const divideAmountsByGroup = () => {
    setGrossBillPerPerson(grossBillAmount / groupSizeInput);
    setTipPerPerson(grossTipAmount / groupSizeInput);
    setTotalBillPerPerson((grossBillAmount + grossTipAmount) / groupSizeInput);
  }


// function to divide amounts by one if group size is less than 0 (default minimum to 1 person)
  const divideAmountsByOne = () => {
    setGrossBillPerPerson(grossBillAmount / 1);
    setTipPerPerson(grossTipAmount / 1);
    setTotalBillPerPerson((grossBillAmount + grossTipAmount) / 1);
  }

  // function to reset form back to default values
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

  // recalculate tip whenever tip % is changed, bill amount is changed, or group size is changed 
  useEffect(() => {
    calculateTip();
  }, [tipRadioButtonValue, tipTextInputValue, grossBillAmount, groupSizeInput])

  // recalculate amounts per person when tip amount is changed, bill amount is changed, or group size is changed 
  useEffect(() => {
    calculateAmountsPerPerson();
  }, [grossBillAmount, grossTipAmount, groupSizeInput])

  // render transaction history from database upon page load
  useEffect(() => {
    renderTransactionHistory();
  }, [])

 
  // update database with bill information when user clicks save
  const handleUpdateDatabase = (event) => {
    event.preventDefault();
    
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const billDataObj = {
      restaurantName: `${restaurantName}`, 
      grossBill: `${grossBillAmount}`,
      tipAmount: `${grossTipAmount}`,
      numOfPeople: `${groupSizeInput}`,
      billPerPerson: `${totalBillPerPerson}`
    }
    
    const addData = push(dbRef, billDataObj);
    renderTransactionHistory();
  }

  // render transaction history from data retrieved from database
  const renderTransactionHistory = (event) => {
    const database = getDatabase(firebase)
    const dbRef = ref(database)
    onValue(dbRef, (response) => {
      const dbRespObj = response.val();
      for (let item in dbRespObj) {
        if (dbRespObj.hasOwnProperty(item)) {
          savedTransactionsArray.push(dbRespObj[item]);
          savedTransactionsArray[0].key=item;
        }
      }
      setSavedTransactions(savedTransactionsArray);
    })
  }
  
  // return statement for rendering purposes
  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h1>Bill Splitter</h1>
        </div>
      </header>
      <section className="bill-splitter-section">
        <div className="wrapper">
          <div className="bill-splitter-container">
            <BillForm
              className="bill-form"
              restaurantNameState={restaurantName}
              updateRestaurantName={(event) => handleUpdateRestaurant(event)}
              grossBillAmountState={grossBillAmount}
              updateGrossBillAmount={(event) => handleUpdateGrossBillAmount(event)}
              grossTipAmountState={grossTipAmount}
              updateGrossTipAmount={(event) => handleUpdateGrossTipAmount(event)}
              groupSizeState={groupSizeInput}
              updateGroupSize={(event) => handleUpdateGroupSize(event)}
              customTipEnabledState={customTipEnabled}
              tipTextInputValueState={tipTextInputValue}
              // checkedStatus={}
            />
            <BillDisplay
              className="bill-display"
              grossBillPerPersonState={roundToTwoDecimalPlaces(grossBillPerPerson).toFixed(2)}
              tipPerPersonState={roundToTwoDecimalPlaces(tipPerPerson).toFixed(2)}
              totalBillPerPersonState={roundToTwoDecimalPlaces(totalBillPerPerson).toFixed(2)}
              groupSizeState={groupSizeInput}
              resetForm={(event) => resetForm(event)}
              updateDatabase={(event) => handleUpdateDatabase(event)}
            />
          </div>
        </div>
      </section>
      <section className="bill-history-section">
        <div className="wrapper">
          <h2>Bill History</h2>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Gross Bill ($)</th>
                <th>Gross Tip ($)</th>
                <th>Group Size</th>
                <th>Bill/Person ($)</th>
              </tr>
            </thead>
            <tbody>
              {savedTransactions.map((transaction) => {
                return (
                  <>
                    <tr key={transaction.key}>
                      <td>{transaction.restaurantName}</td>
                      <td>{transaction.grossBill}</td>
                      <td>{transaction.tipAmount}</td>
                      <td>{transaction.numOfPeople}</td>
                      <td>{transaction.billPerPerson}</td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
      <footer>
        <div className="wrapper">
          <p>Created By Muhammad Wazir at Juno College</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
