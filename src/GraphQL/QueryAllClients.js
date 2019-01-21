import gql from "graphql-tag";

export default gql(`
    query {
        listClients(limit: 1000) {
            items {
                picture
                id
                name
                address
                phoneNumber
                allegedOffenses
                offenseClass
                disposition
                sentence
                sentencingJudge
            }
        }
    }`);