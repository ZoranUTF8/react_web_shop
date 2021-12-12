import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const history = useHistory();
  //? get chosen product od
  const { id } = useParams();
  //? get the product state values from the products context
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    getSingleProduct,
  } = useProductsContext();

  //? when we load the single product page get the selected product and when the id changes
  useEffect(() => {
    getSingleProduct(`${single_product_url}${id}`);
  }, [id]);

  //? if error happens than go back to home screen after 3 seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [error]);

  //? check final response and display according to it
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    const {
      name,
      price,
      description,
      stock,
      stars,
      reviews,
      id: productSku,
      company,
      images,
    } = product;
    return (
      <Wrapper>
        <PageHero title={name} product />
        <div className="section section-center page">
          <Link to="/products" className="btn">
            nazad na sve proizvode
          </Link>

          <div className="product-center">
            <ProductImages images={images} />
            <section className="content">
              <h2>{name}</h2>
              <Stars />
              <h5 className="price">{formatPrice(price)}</h5>
              <p className="desc">{description}</p>
              <p className="info">
                <span>Stanje:</span>
                {stock > 0 ? "Dostupno" : "Nije dostupno"}
              </p>
              <p className="info">
                <span>šifra proizvoda:</span>
                {productSku}
              </p>
              <hr />
              {stock > 0 && <AddToCart />}
            </section>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
