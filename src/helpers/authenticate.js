// pages/api/authenticate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const tokenEndpoint = 'https://iam-datahub.visitfinland.com/auth/realms/Datahub/protocol/openid-connect/token';

  try {
    const authResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'client_id': 'datahub-api',
               client_secret: 'ed7cd94f-727e-4cf7-879c-1c26f798bcc0',

        'grant_type': 'password',
        'username': req.body.username,
        'password': req.body.password,
      }),
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      return res.status(authResponse.status).json(authData);
    }

    // Use the obtained token for the GraphQL request
    const graphqlQuery = `query ExperienceDescriptions {
      product(where: {type: {_eq: experience}}) {
        id
        productInformations {
          # Add your fields here
        }
      }
    }`;

    const graphqlResponse = await fetch('https://api-datahub.visitfinland.com/graphql/v1/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    const graphqlData = await graphqlResponse.json();

    if (!graphqlResponse.ok) {
      return res.status(graphqlResponse.status).json(graphqlData);
    }

    return res.json(graphqlData);
  } catch (error) {
    console.error('Error during authentication or GraphQL request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
