import CreateCustomer from "./CreateCustomer";
import Customer from "./Customer";
import AccountOperations from "./AccountOperations";
import BalanceDisplay from "./BalanceDisplay";
import "./index.css";
import { useSelector } from "react-redux";
function App() {

  const name = useSelector(state => state.customer)



  return (
    <div>
      <h1>🏦 Redux bank task</h1>
      {

        !name.fullName ? (

          <CreateCustomer />
        ) : (
          <>

            <Customer name={name.fullName}/>
            <AccountOperations />
            <BalanceDisplay />
          </>
        )

      }
    </div>
  );
}

export default App;
