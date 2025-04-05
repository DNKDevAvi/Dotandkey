export async function shopifyQuery(query, variables = {}) {
    const response = await fetch('https://dot-key.myshopify.com/api/2024-01/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': "05e208a290f74b4b2059923933e124f1",
      },
      body: JSON.stringify({ query, variables }),
    });
  
    const result = await response.json();
    return result;
  }
  