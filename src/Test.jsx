import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopifyProducts } from './store/productThunks';
import { addToCart } from './store/cartSlice';

const Test = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    dispatch(fetchShopifyProducts());
  }, [dispatch]);

  // Handler to add product to the cart
  const handleAddToCart = (product) => {
    // Dispatch the action with product details required by your cart slice
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product, i) => (
            <li key={i}>
              <strong>{product.title}</strong>
              <br />
              Price: {product.price} {product.currency}
              <br />
              {product.compareAtPrice && (
                <>
                  Compare at: {product.compareAtPrice}
                  <br />
                </>
              )}
              {product.image && (
                <img src={product.image} alt={product.title} width="100" />
              )}
              {/* ATC button */}
              <button onClick={() => handleAddToCart(product)}>ATC</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Test;
