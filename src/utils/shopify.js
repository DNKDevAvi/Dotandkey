export async function shopifyQuery(query, variables = {}) {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': '',
        'X-Shopify-Storefront-Access-Token': "",
      },
      body: JSON.stringify({ query, variables }),
    });
  
    const result = await response.json();
    return result;
  }
  
