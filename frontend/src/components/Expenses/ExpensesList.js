import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";
const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found No Expenses!!</h2>;
  }
  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.title + expense._id}
          id={expense._id}
          title={expense.title}
          date={expense.date}
        />
      ))}
    </ul>
  );
};
export default ExpensesList;
