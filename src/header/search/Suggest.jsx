import React, { useEffect, useRef, useState } from 'react'
import "./suggest.scss";
import { Col, Container, Row } from 'react-bootstrap';

function Suggest({ search }) {
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8400/search");
        const data = await response.json();
        setSearchData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    inputRef.current.click();
    fetchData();
  }, [search]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    searchProducts(e.target.value);
  };

  const searchProducts = (term) => {
    const results = searchData.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const uniqueNames = [...new Set(searchResults.map(item => item.product_type))];
  const sortedNames = uniqueNames.sort();

  return (
    <div className='suggest' >
      <input onClick={handleInputChange} value={search} ref={inputRef} className='d-none' />
      {search ?
        <Container>
          <Row>
            <Col md={3}>
              <h6>Search Suggestions</h6>
              <ul className='search-option'>
                {sortedNames?.map((protype, index) => (
                  <li>{protype}</li>
                ))}
              </ul>
            </Col>
            <Col md={9} className='px-0'>
              <Row>
                {searchResults.map((product, index) => 

                  <Col md={4} key={index}>
                    <div className="search-product">
                      <div className="product-img-wrap">
                        <img src={product.image.src} alt="" />
                      </div>
                      <div className="search-pro-txt">
                        <p>{product.title}</p>
                        <span>{product.meta_benefits}</span>
                        <p className="price">Rs. {product.discounted_price}</p>
                      </div>
                    </div>
                  </Col>

                


                )}

              </Row>

            </Col>
          </Row>
        </Container>
        :
        null}
    </div>
  )
}

export default Suggest