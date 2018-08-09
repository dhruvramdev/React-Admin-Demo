import gql from 'graphql-tag';

const buildFieldsList = fieldsArray => {
    let temp = '';
    fieldsArray.map(field => {
        if (field.type.kind === "SCALAR") {
            temp += `${field.name}, \n`;
        } else {
            temp += `${field.name} {id }, \n`;

        }
    });
    console.log('Query', temp);
    return temp;
};

const arrayToString = array => {
    let temp = '[';
    array.forEach(item => {
        temp += `"${item}" ,`;
    });
    temp += "]";
    return temp;
};

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
                                ${buildFieldsList(resource.fields)}
                            }
                        }
                    `,
                    // query: gql`
                    //     query {
                    //         data : all${resourceName}s {
                    //             id,
                    //             name,
                    //             price,
                    //             image,
                    //             description,
                    //             seller {
                    //                 name,
                    //                 id
                    //             }
                    //         }
                    //     }
                    // `,
                    // variables: params,
                    parseResponse: (response) => {
                        console.log("Response Data", response.data.data);
                        return {data: response.data.data, total: 5};
                    },
                };

            case 'GET_ONE':
                return {
                    query: gql`
                        query {
                            data : ${resourceName}(id: ${params.id}) {
                            ${buildFieldsList(resource.fields)}
                        }
                        }
                    `,
                    // query: gql`
                    //     query {
                    //         data : ${resourceName}(id: "${params.id}") {
                    //             id,
                    //             name,
                    //             price,
                    //             image,
                    //             description,
                    //             seller {
                    //                 name,
                    //                 id
                    //             }
                    //         }
                    //     }
                    // `,
                    // variables: params,
                    parseResponse: (response) => {
                        console.log(response);
                        console.log(response.data);
                        return {data: response.data.data};
                    },
                };

            case 'GET_MANY' :
                console.log(arrayToString(params.ids));
                return {
                    query: gql`
                        query {
                            data : get${resourceName}s(ids : ${arrayToString(params.ids)}) {
                                ${buildFieldsList(resource.fields)}
                            }
                        }
                    `,
                    parseResponse: (response) => {
                        console.log(response);
                        console.log(response.data);
                        return {data: response.data.data};
                    },
                };

        // ... other types handled here
        }
    }
);

export default queryBuilder;