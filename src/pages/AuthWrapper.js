import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loadingImage from "../assets/preloader.gif";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingImage} alt="loading spinner" className="loading-img" />
      </Wrapper>
    );
  } else if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  } else {
    return <> {children} </>;
  }
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;

  .loading-img {
    width: 20rem;
    height: 20rem;
    display: block;
    margin: 0 auto;
    margin-top: 10rem;
  }
`;

export default AuthWrapper;
