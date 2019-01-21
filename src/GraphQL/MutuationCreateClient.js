import gql from "graphql-tag";

export default gql(`
    mutation($picture: String, $name: String, $address: String, $phoneNumber: String, $allegedOffenses: String, $offenseClass: String, $disposition: String, $sentence: String, $sentencingJudge: String) {
        createClient(
            picture: $picture
            name: $name
            address: $address
            phoneNumber: $phoneNumber
            allegedOffenses: $allegedOffenses
            offenseClass: $offenseClass
            disposition: $disposition
            sentence: $sentence
            sentencingJudge: $sentencingJudge
        ) {
            id
            picture
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