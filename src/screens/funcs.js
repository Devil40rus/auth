import { AsyncStorage } from "react-native";

export function getData( gql, callback ) {

    AsyncStorage.getItem( 'api', (err, data)=> {
        if ( err != null ) {
            throw new Error( err.message );
        }
        
        fetch('http://devapi.sdo.maxus.ru/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
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

    });
}