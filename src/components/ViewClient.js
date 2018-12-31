import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

// import moment from 'moment';

import QueryGetClient from "../GraphQL/QueryGetClient";


class ViewClient extends Component {

    render() {
        const { client, loading } = this.props;

        return (
            <div className={`ui container raised very padded segment ${loading ? 'loading' : ''}`}>
                <Link to="/" className="ui button">Back to clients</Link>
                <div className="ui items">
                    <div className="item">
                        {client && <div className="content">
                            <div className="header">{client.name}</div>
                            <div className="description">{client.address}</div>
                            <div className="description">{client.phoneNumber}</div>
                            <div className="description">{client.allegedOffenses}</div>
                            <div className="description">{client.offenseClass}</div>
                            <div className="description">{client.disposition}</div>
                            <div className="description">{client.sentence}</div>
                            <div className="description">{client.sentencingJudge}</div>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }

}

const ViewClientWithData = graphql(
    QueryGetClient,
    {
        options: ({ match: { params: { id } } }) => ({
            variables: { id },
            fetchPolicy: 'cache-and-network',
        }),
        props: ({ data: { getClient: client, loading} }) => ({
            client,
            loading,
        }),
    },
)(ViewClient);

export default ViewClientWithData;