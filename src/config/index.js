export function getData( gql, callback ) {
  let URL = 'https://sdoapi.home.svyaznoy.ru/api';
  let Token = '0da52ff314e6e100d9b09f5782bf40da';
  let RefToken = '490dd5dceb956e8805200394c7861734';

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