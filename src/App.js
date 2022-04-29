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



import BillForm from './components/BillForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <BillForm />
    </div>
  );
}

export default App;
