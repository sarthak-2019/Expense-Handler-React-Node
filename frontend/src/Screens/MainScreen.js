import React, { useState, useEffect } from "react";
import NewExpense from "./../components/NewExpense/NewExpense";
import Expenses from "./../components/Expenses/Expenses";
import Header from "./../components/Header/Header";
import axios from "axios";

const MainScreen = () => {
  const [expenses, setExpenses] = useState([]);

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
    getExpenses();
  }, []);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };
  return (
    <div>
      <Header />
      <React.Fragment>
        <NewExpense onAddExpense={addExpenseHandler} />
        <Expenses items={expenses} />
      </React.Fragment>
    </div>
  );
};
export default MainScreen;
