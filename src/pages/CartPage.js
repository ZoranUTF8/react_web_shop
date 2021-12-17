import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

const CartPage = () => {
  //? get cart
  const { cart } = useCartContext();
  //? check cart amount
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Vaša korpa je prazna</h2>
          <Link to="/products" className="btn">
            Nazad na ponudu
          </Link>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <main>
        <PageHero title="Korpa" />
        <Wrapper className="page">
          <CartContent />
        </Wrapper>
      </main>
    );
  }
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
