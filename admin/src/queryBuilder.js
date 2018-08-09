import gql from 'graphql-tag';

const buildFieldsList = fieldsArray => {
    let temp ='' ;
    fieldsArray.map(field => {
        temp += `${field.name}, \n`
    })
    console.log('Query',temp);
    return temp ;
 }

const queryBuilder = introspectionResults => (
    
    (raFetchType, resourceName, params) => {

        const resource = introspectionResults.types.find(r => r.name === resourceName);

        console.log("IntrospectionResults", introspectionResults);
        console.log("raFetchType", raFetchType);
        console.log("resourceName", resourceName); 
        console.log("params", params);
        console.log("resource", resource);

        switch (raFetchType) {
            case 'GET_LIST':
                return {
                    query: gql`
                        query {
                            data : all${resourceName}s {
                                id, 
                                name, 
                                price, 
                                image, 
                                description, 
                                seller {
                                    name,
                                    id
                                }
                            }
                        }
                    `,
                    // variables: params,
                    parseResponse: (response) => {
                        console.log("Response Data", response.data.data);
                        return { data : response.data.data , total : 5};
                    },
                };
                break;

            case 'GET_ONE':
                return {
                    query: gql`
                        query {
                            data : ${resourceName}(id: "${params.id}") {
                                id, 
                                name, 
                                price, 
                                image, 
                                description, 
                                seller {
                                    name,
                                    id
                                }
                            }
                        }
                    `,
                    // variables: params,
                    parseResponse: (response) => {
                        console.log(response);
                        console.log(response.data);
                        return { data : response.data.data};
                    },
                }


        // ... other types handled here
        }
    }
);

export default queryBuilder;