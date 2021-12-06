import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import  gif404 from "../assets/giphy.gif";

const ErrorPage = () => {
  return (
    <Wrapper className="page-100">
      <section>
        <iframe
          src={gif404}
          width="480"
          height="270"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <h3>Žao nam je, stranica koju ste tražili nije pronađena.</h3>
        <Link to="/" className="btn">
          Vrati se na početnu
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
