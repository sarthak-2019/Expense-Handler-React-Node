import React from "react";
import styled from "styled-components";

function PrimaryButton({ title }) {
  return (
    <div>
      <button>
        <PrimaryButtonStyled>{title}</PrimaryButtonStyled>
      </button>
    </div>
  );
}

const PrimaryButtonStyled = styled.a`
  font-size: 1.1rem;
  background-color: #007bff;
  padding: 0.8rem 2.5rem;
  color: white;
  cursor: pointer;
  display: inline-block;
  text-transform: uppercase;
  position: relative;
  transition: all 0.4s ease-in-out;
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0.2rem;
    transition: all 0.4s ease-in-out;
    left: 0;
    bottom: 0;
    opacity: 0.7;
  }
  &:hover::after {
    width: 100%;
    background-color: #151515;
  }
`;
export default PrimaryButton;
