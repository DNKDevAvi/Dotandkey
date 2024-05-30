jsx
import React from 'react';
import data from 'your-json-data'; // Assuming you have imported the JSON data

const ProductList = () => {
  return (
    <div>
      {data.sections.map((section) => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          {section.tabs && section.tabs.map((tab) => (
            <div key={tab.tabName}>
              <h3>{tab.tabName}</h3>
              {tab.variants.map((variant) => (
                <div key={variant.products[0].name}>
                  {variant.products.map((product) => (
                    <div key={product.name}>
                      <p>{product.name} - ${product.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          {section.products && section.products.map((product) => (
            <div key={product.name}>
              <p>{product.name} - ${product.price}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;