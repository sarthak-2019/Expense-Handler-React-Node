import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import Title from "../components/Title";
import TitleIcon from "@material-ui/icons/Title";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ExpenseItemScreen from "../components/ExpenseItemScreen";
import DescriptionIcon from "@material-ui/icons/Description";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "./../components/Header/Header";
function ExpenseScreen({ match }) {
  const history = useHistory();
  const [expense_item, setExpense_item] = useState({
    title: "Title",
    description: "Description",
    amount: "Amount",
    year: "Year",
    month: "Month",
    day: "Day",
  });

  const [updatedTitle, setEnteredUpdatedTitle] = useState("");
  const [updatedDescription, setEnteredUpdatedDescirption] = useState("");
  const [updatedPrice, setEnteredUpdatedPrice] = useState("");
  const [updatedDate, setEnteredUpdatedDate] = useState("");

  const updatedTitleChangeHandler = (event) => {
    setEnteredUpdatedTitle(event.target.value);
  };

  const updatedDescriptionChangeHandler = (event) => {
    setEnteredUpdatedDescirption(event.target.value);
  };

  const updatedPriceChangeHandler = (event) => {
    setEnteredUpdatedPrice(event.target.value);
  };

  const updatedDateChangeHandler = (event) => {
    setEnteredUpdatedDate(event.target.value);
  };

  const id = match.params.id;
  const title = <TitleIcon />;
  const date = <DateRangeIcon />;
  const price = <LocalOfferIcon />;
  const description = <DescriptionIcon />;

  async function fetchExpense() {
    const temp = await axios.get(
      `https://mern-budget-bytes.herokuapp.com/expense/${id}`
    );
    const temp1 = {
      title: "Title",
      description: "Description",
      amount: "Amount",
      year: "Year",
      month: "Month",
      day: "Day",
    };
    temp1.title = temp.data.data.expense.title;
    temp1.description = temp.data.data.expense.description;
    temp1.amount = temp.data.data.expense.amount;
    temp1.year = new Date(temp.data.data.expense.date).getFullYear();
    temp1.month = new Date(temp.data.data.expense.date).toLocaleString(
      "en-US",
      { month: "long" }
    );
    temp1.day = new Date(temp.data.data.expense.date).toLocaleString("en-US", {
      day: "2-digit",
    });
    setExpense_item(temp1);
    setEnteredUpdatedTitle(temp1.title);
    setEnteredUpdatedDescirption(temp1.description);
    setEnteredUpdatedPrice(temp1.amount);
  }
  useEffect(() => {
    fetchExpense();
  }, []);

  async function deleteButtonHandler(event) {
    event.preventDefault();

    try {
      await axios.delete(
        `https://mern-budget-bytes.herokuapp.com/expense/${id}`
      );
      history.push("/main");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
    }
  }
  async function updateButtonHandler(event) {
    event.preventDefault();
    try {
      const updatedExpenseData = {
        title: updatedTitle,
        amount: updatedPrice,
        date: updatedDate,
        description: updatedDescription,
      };
      await axios.patch(
        `https://mern-budget-bytes.herokuapp.com/expense/${id}`,
        updatedExpenseData
      );
      history.push("/main");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <MainLayout>
        <Link to="/main">
          <ArrowBackIcon
            style={{
              width: "9vw",
              height: "5vh",
              textAlign: "center",
              display: "inline-block",
            }}
          />
        </Link>
        <h2>Press To Go Back</h2>
        <Title title={"Expense Info"} span={"Update&Delete"} />
        <ContactPageStyled>
          <InnerLayout className={"contact-section"}>
            <div className="right-content">
              <ExpenseItemScreen
                title={"Title"}
                icon={title}
                cont1={expense_item.title}
              />
              <ExpenseItemScreen
                title={"Description"}
                icon={description}
                cont1={expense_item.description}
              />
              <ExpenseItemScreen
                title={"Price"}
                icon={price}
                cont1={expense_item.amount}
              />
              <ExpenseItemScreen
                title={"Date"}
                icon={date}
                cont1={`Year: ${expense_item.year}`}
                cont2={`Month: ${expense_item.month}`}
                cont3={`Date: ${expense_item.day}`}
              />
            </div>
            <div className="left-content">
              <div className="contact-title">
                <h4>Update Your Expense</h4>
              </div>
              <form className="form" onSubmit={updateButtonHandler}>
                <div className="form-field">
                  <label htmlFor="name">Update Your Title</label>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={updatedTitleChangeHandler}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="text-area">Update Your Description</label>
                  <textarea
                    name="textarea"
                    cols="30"
                    rows="5"
                    value={updatedDescription}
                    onChange={updatedDescriptionChangeHandler}
                  ></textarea>
                </div>
                <div className="form-field">
                  <label htmlFor="email">Update Your Price</label>
                  <input
                    type="text"
                    value={updatedPrice}
                    onChange={updatedPriceChangeHandler}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">Update Your Date</label>
                  <input
                    type="Date"
                    value={updatedDate}
                    onChange={updatedDateChangeHandler}
                  />
                </div>
                <button className="expense-btn-update">Update</button>
              </form>
              <div className="contact-title">
                <h4>Delete Your Expense</h4>
              </div>
              <button
                className="expense-btn-delete"
                onClick={deleteButtonHandler}
              >
                Delete
              </button>
            </div>
          </InnerLayout>
        </ContactPageStyled>
      </MainLayout>
    </React.Fragment>
  );
}

const ContactPageStyled = styled.section`
  .contact-section {
    font-size: 1.1rem;
    padding: 3rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
    @media screen and (max-width: 978px) {
      grid-template-columns: repeat(1, 1fr);
      .f-button {
        margin-bottom: 3rem;
      }
    }
    .right-content {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      @media screen and (max-width: 502px) {
        width: 70%;
      }
    }
    .contact-title {
      h4 {
        color: #151515;
        padding: 1rem 0;
        font-size: 1.8rem;
      }
    }
    .expense-btn-update {
      border-radius: 20px;
      border: 7px solid #ffffff;
      background-color: #008000;
      color: #ffffff;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
    }
    .expense-btn-delete {
      border-radius: 20px;
      border: 1px solid #ff4b2b;
      background-color: #ff4b2b;
      color: #ffffff;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 80ms ease-in;
    }
    .form {
      width: 100%;
      @media screen and (max-width: 502px) {
        width: 100%;
      }
      .form-field {
        margin-top: 2rem;
        position: relative;
        width: 100%;
        label {
          position: absolute;
          left: 20px;
          top: -19px;
          display: inline-block;
          background-color: #f1f1f1;
          padding: 0 0.5rem;
          color: inherit;
        }
        input {
          font-size: 20px;
          border: 1px solid #cbced8;
          outline: none;
          background: transparent;
          height: 50px;
          padding: 0 15px;
          width: 100%;
          color: inherit;
        }
        textarea {
          font-size: 30px;
          background-color: transparent;
          border: 1px solid #cbced8;
          outline: none;
          color: inherit;
          width: 100%;
          padding: 0.8rem 1rem;
        }
      }
    }
  }
`;

export default ExpenseScreen;
