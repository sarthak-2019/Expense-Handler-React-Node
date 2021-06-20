import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";
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
    date: "Date",
  });
  const id = match.params.id;
  const title = <TitleIcon />;
  const date = <DateRangeIcon />;
  const price = <LocalOfferIcon />;
  const description = <DescriptionIcon />;

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
                cont1={expense_item.date}
              />
            </div>
            <div className="left-content">
              <div className="contact-title">
                <h4>Update Your Expense</h4>
              </div>
              <form className="form">
                <div className="form-field">
                  <label htmlFor="name">Update Your Title</label>
                  <input type="text" id="name" value="sarthak" />
                </div>
                <div className="form-field">
                  <label htmlFor="text-area">Update Your Description</label>
                  <textarea
                    name="textarea"
                    id="textarea"
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div className="form-field">
                  <label htmlFor="email">Update Your Price</label>
                  <input type="email" id="email" />
                </div>
                <div className="form-field">
                  <label htmlFor="subject">Update Your Date</label>
                  <input type="Date" id="subject" />
                </div>
                <PrimaryButton title={"Update"} />
              </form>
              <div className="contact-title">
                <h4>Delete Your Expense</h4>
              </div>
              <PrimaryButton title={"Delete"} />
              <button onClick={deleteButtonHandler}>Delete</button>
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
          border: 1px solid #cbced8;
          outline: none;
          background: transparent;
          height: 50px;
          padding: 0 15px;
          width: 100%;
          color: inherit;
        }
        textarea {
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
