// src/redux/productThunks.js
import { shopifyQuery } from '../utils/shopify';
import { setProducts } from './cartSlice';

export const fetchShopifyProducts = () => async (dispatch) => {
  const query = `
    {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    src
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const result = await shopifyQuery(query);
    const products = result?.data?.products?.edges.map((edge) => {
      const product = edge.node;
      const variant = product.variants.edges[0]?.node;

      return {
        id: variant?.id,
        title: product.title,
        handle: product.handle,
        price: variant?.priceV2?.amount,
        currency: variant?.priceV2?.currencyCode,
        compareAtPrice: variant?.compareAtPriceV2?.amount,
        image: variant?.image?.src || product.images.edges[0]?.node?.src || '',
      };
    });

    dispatch(setProducts(products));
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
  }
};
