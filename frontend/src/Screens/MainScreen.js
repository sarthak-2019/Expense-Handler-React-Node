import React, { useState } from "react";
import NewExpense from "./../components/NewExpense/NewExpense";
import Expenses from "./../components/Expenses/Expenses";
import Header from "./../components/Header/Header";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
  {
    id: "e4",
    title: "Bike",
    amount: 253,
    date: new Date(2019, 2, 28),
  },
];

const MainScreen = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

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
