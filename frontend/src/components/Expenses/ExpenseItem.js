import React from "react";
import { Link } from "react-router-dom";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <Link to={`/main/expense/${props.id}`}>
          <button className="expense-item__price">Click To View</button>
        </Link>
      </div>
    </Card>
  );
};

export default ExpenseItem;
