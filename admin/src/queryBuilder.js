
import gql from 'graphql-tag';

const buildFieldsList = (fieldsArray => {
    let temp ='' ;
    fieldsArray.map(field => {
        temp += `${field.name}, \n`
    })
    return temp ;

 })

const queryBuilder = introspectionResults => ((raFetchType, resourceName, params) => {
    const resource = introspectionResults.types.find(r => r.name === resourceName);

    console.log(introspectionResults);
    console.log(raFetchType, resourceName, params);
    console.log(resource);

    switch (raFetchType) {
        case 'GET_LIST':
            return {
                query: gql`
                    query {
                        data : all${resourceName}s {
                            ${buildFieldsList(resource.fields)}
                        }
                    }
                `,
                // variables: params,
                parseResponse: (response) => {
                    console.log(response);
                    console.log(response.data);
                    return { data : response.data.data , total : 5};
                },
            };
            break;

        case 'GET_ONE':
            return {
                query: gql`
                    query {
                        data : ${resourceName}(id: ${params.id}) {
                            ${buildFieldsList(resource.fields)}
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
});

export default queryBuilder;