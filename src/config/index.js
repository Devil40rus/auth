export function getData( gql, callback ) {
  let URL = '';
  let Token = '';
  let RefToken = '';

  fetch(URL, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Auth-Token': Token,
      'X-Refr-Token': RefToken
    }),
    body: gql,
    responseType: 'application/json'
  })

  .then(response => {
    return response.json();
  })

  .catch(error => console.error('Error:', error))
  .then(response => {
    if ( response.err == true ) {
      throw new Error( response.err );
    } else {
      callback( response );
    }
  });
}