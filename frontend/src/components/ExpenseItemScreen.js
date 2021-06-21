import React from "react";
import styled from "styled-components";

function ContactItem({ title, icon, cont1, cont2, cont3 }) {
  return (
    <ContactItemStyled>
      <div className="left-content">{icon}</div>
      <div className="right-content">
        <h6>{title}</h6>
        <p>{cont1}</p>
        <p>{cont2}</p>
        <p>{cont3}</p>
      </div>
    </ContactItemStyled>
  );
}

const ContactItemStyled = styled.div`
  font-size: 1.1rem;
  padding: 1.5rem 2rem;
  background-color: #e4e4e4;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
  .left-content {
    padding: 1.5rem;
    border: 1px solid #cbced8;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    svg {
      font-size: 2.3rem;
    }
  }

  .right-content {
    h6 {
      font-weight: bold;
      color: #151515;
      font-size: 1.5rem;
      padding-bottom: 0.6rem;
    }
    p {
      padding: 0.1rem 0;
    }
  }
`;

export default ContactItem;
