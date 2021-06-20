import React, { useState, useEffect, useContext } from "react";
import NewExpense from "./../components/NewExpense/NewExpense";
import Expenses from "./../components/Expenses/Expenses";
import Header from "./../components/Header/Header";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const MainScreen = () => {
  const { loggedIn } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const history = useHistory();
  async function getExpenses() {
    const expenseListTemp = await axios.get(
      "https://mern-budget-bytes.herokuapp.com/expense"
    );
    // console.log(expenseListTemp.data.data.expense);
    // var d = new Date(expenseListTemp.data.data.expense[0].date);
    // console.log(d);
    var expenseList = expenseListTemp.data.data.expense;
    for (var i = 0; i < expenseList.length; i++) {
      const temp = expenseList[i].date;
      expenseList[i].date = new Date(temp);
    }
    setExpenses(expenseList);
  }

  useEffect(() => {
    if (!loggedIn) {
      history.push("/");
    } else {
      getExpenses();
    }
  }, [loggedIn, history]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  return (
    <React.Fragment>
      {loggedIn === true ? (
        <div>
          <Header />
          <NewExpense onAddExpense={addExpenseHandler} />
          <Expenses items={expenses} />
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default MainScreen;
