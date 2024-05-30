import React, { useEffect, useState } from 'react'
import './toppick.scss';
function TopPick() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8200/topmenu");
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
    
        fetchData();
      }, []);


  return (
      
      <div className='top-menu'>
      <h4 style={{textAlign:"left"}}>Top Pick</h4>
      {data ? (
        <ul>
          {data.map((item, index) =>
            <li>
                <div className="each-top">
                    <a href={item.url}>
                        <div className="img-wrap">
                            <img src={item.menuimg} alt='' />
                        </div>                       
                        <p>{item.menutxt}</p>
                    </a>                   
                </div>
            </li>
          )}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    
  )
}

export default TopPick
