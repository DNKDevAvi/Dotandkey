import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PlpBanner from "./PlpBanner";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../store/cartSlice";
import { toggleCartDrawer } from "../store/cartSlice";
import PlpBannerImg from "../images/demo.webp"
import Filter from "../home/Filter";

function Plp() {
  const params = useParams();
  const { name } = params;
  const [data, setData] = useState(null);
  const [api, setAPi] = useState(null);

  const dispatch = useDispatch();


  const jsonString = JSON.stringify({ name });
  // Parse the JSON string to extract the value
  const parsedObj = JSON.parse(jsonString);
  // Extract the value
  const apiValue = parsedObj.name;
  console.log(apiValue)


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (apiValue === "shop-all") {
          response = await fetch("http://localhost:8800/shop-all");
        }
        else if (apiValue === "sunscreen") {
          response = await fetch("http://localhost:8810/sunscreen");
        }
        else if (apiValue === "moisturizer") {
          response = await fetch("http://localhost:8820/moisturizer");
        }
        const jsonData = await response.json();
        dispatch(setAPi(jsonData));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [dispatch, apiValue]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(toggleCartDrawer());
  };


  console.log(api)
  return (
    <>
      <div className="plp-banner">
        {
          api?.map((img) => (
            img[0] !== "" ?
              <img src={img.banImg} alt="" />
              :
              <img src={PlpBannerImg} alt="" />
          ))
        }

      </div>
      <Container className="text-center">
        <Row className="mt-5">
          <Col md={12}><h2 className="mb-4" style={{ textTransform: 'capitalize' }}>{name}</h2></Col>
          <Col md={3}>
            <Filter />
          </Col>
          <Col md={9}>
            <Row>
              {
                apiValue == "shop-all" ?
                  <>
                    <Col md={12}>
                      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        {api?.map((tab, index) => (
                          <li
                            key={tab.id}
                            class="nav-item"
                            role="presentation">
                            <button
                              key={index}
                              className={
                                index === 0
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              id={`pills-${tab.name}-tab`}
                              data-bs-toggle="pill"
                              data-bs-target={`#pills-${tab.name}`}
                              type="button"
                              role="tab"
                              aria-controls={`pills-${tab.name}`}
                              aria-selected="true">{tab.name}</button>
                          </li>
                        ))}
                      </ul>
                    </Col>
                    <div class="tab-content" id="pills-tabContent">

                      {api?.map((tab, index) => (
                        <div
                          key={index}
                          className={
                            index === 0
                              ? "tab-pane fade show active"
                              : "tab-pane fade show"
                          }
                          id={`pills-${tab.name}`}
                          role="tabpanel"
                          aria-labelledby={`pills-${tab.name}-tab`}>
                          <div className="row">
                            {tab.products.map((item) => (
                              <div className="col-md-3">
                                <div className="each-pro">
                                  <div className="product-img-wrap">
                                    <img src={item.image} alt="" />
                                    <span>{item.tag}</span>
                                  </div>
                                  <div className="pro-txt">
                                    <p>{item.name}</p>
                                    <span>{item.altText}</span>
                                    <p className="price">
                                      Rs. {item.price}
                                    </p>
                                  </div>
                                  <div className="variant"></div>
                                  <button onClick={() => handleAddToCart(item)}>Add to cart</button>
                                </div>
                              </div>


                            ))}
                          </div>
                        </div>

                      ))}

                    </div>
                  </>
                  :
                  <>
                    {api?.map((item, index) => (
                      index !== 0 ?
                        <div className="col-md-3">
                          <div className="each-pro">
                            <div className="product-img-wrap">
                              <img src={item.image} alt="" />
                              <span>{item.tag}</span>
                            </div>
                            <div className="pro-txt">
                              <p>{item.name}</p>
                              <span>{item.altText}</span>
                              <p className="price">
                                Rs. {item.price}
                              </p>
                            </div>
                            <div className="variant"></div>
                            <button onClick={() => handleAddToCart(item)}>Add to cart</button>
                          </div>
                        </div>
                        :
                        null
                    ))}
                  </>
              }

            </Row>


          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Plp;
