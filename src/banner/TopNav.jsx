import React, { useEffect, useState } from "react";
import "./topnav.scss";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function TopNav() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8600/topnav");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="text-center d-flex justify-content-center">
      <div className="home-topnav">
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li>
                <div className="each-top">
                  <NavLink to={item.url}>
                    <div className="img-wrap">
                      <img src={item.menuimg} alt="" />
                    </div>
                    <p>{item.menutxt}</p>
                  </NavLink>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
}

export default TopNav;
