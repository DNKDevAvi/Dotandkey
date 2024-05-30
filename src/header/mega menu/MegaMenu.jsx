import React, { useEffect, useState } from "react";
import { Container, Row, Button, Col, Accordion } from "react-bootstrap";
import TopPick from "./TopPick";
import "./megamenu.scss";



function MegaMenu({ onClose }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8300/menu");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="megamenu accordion" id="accordionExample">
      <Container>
        <Row>
          <Col md={6}>
            <TopPick />
            {
              <Accordion className="menu" defaultActiveKey="0">
                {data ? (
                  <ul className="megalist">
                    {data.map((item, index) =>
                      item.submenu ? (
                        <li>
                          <Accordion.Item key={item.id} eventKey={item.id}>
                            <Accordion.Header>
                              <a href="#">{item.nav}</a>
                            </Accordion.Header>
                            <Accordion.Body>
                              <ul>
                                {item.submenu.map((subitem) => (
                                  <li key={subitem.navname}>
                                    <a href={subitem.link}>{subitem.navname}</a>
                                  </li>
                                ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        </li>
                      ) : (
                        <li>
                          <a href={item.url}>{item.nav}</a>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p>Loading...</p>
                )}
              </Accordion>
            }
          </Col>
          <Col md={6}>
            <div className="megaImg">
              <a href="https://www.dotandkey.com/collections/combo-regimes">
                <img src="https://www.dotandkey.com/cdn/shop/files/Artboard_3_1_7028bdb7-783f-4305-9835-e0d10cead6d3.png?v=1709024757" alt="megaImg" />
              </a>              
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MegaMenu;
