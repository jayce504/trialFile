import gql from "graphql-tag";

export default gql(`
    query($id: ID!) {
        getClient(id: $id) {
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
`);