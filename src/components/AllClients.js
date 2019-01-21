import React, { Component } from "react";
import { Link } from "react-router-dom";

import { graphql, compose, withApollo } from "react-apollo";
import QueryAllClients from "../GraphQL/QueryAllClients";
import MutationDeleteClient from "../GraphQL/MutationDeleteClient";

import { Auth } from 'aws-amplify';

// import moment from "moment";

class AllClients extends Component {

    state = {
        busy: false,
    }

    static defaultProps = {
        clients: [],
        deleteClient: () => null,
    }

    async handleDeleteClick(client, c) {
        c.preventDefault();

        if (window.confirm(`Are you sure you want to delete client ${client.name}`)) {
            const { deleteClient } = this.props;

            await deleteClient(client);
        }
    }

    signout = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));

        // By doing this, you are revoking all the auth tokens(id token, access token and refresh token)
        // which means the user is signed out from all the devices
        // Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)
        Auth.signOut({ global: true })
            .then(data => console.log(data))
            .catch(err => console.log(err));
        
        window.location.href = "/";
    }

    handleSync = async () => {
        const { client } = this.props;
        const query = QueryAllClients;

        this.setState({ busy: true });

        await client.query({
            query,
            fetchPolicy: 'network-only',
        });

        this.setState({ busy: false });
    }

    renderClient = (client) => (
        <Link to={`/client/${client.id}`} className="card" key={client.id}>
            <div className="content">
                <div className="ui image">
                    <img src="../images/new-york.jpeg" class="visible content" />
                </div>
                <hr />
                <div className="header">{client.name}</div>
            </div>
            <div className="content">
                <p>{client.address}</p>
                <p>{client.phoneNumber}</p>
                <p>{client.allegedOffenses}</p>
                <p>{client.offenseClass}</p>
                <p>{client.disposition}</p>
                <p>{client.sentence}</p>
                <p>{client.sentencingJudge}</p>
            </div>
            {/* <div className="content">
                <div className="description"><i className="icon info circle"></i>{event.description}</div>
            </div> */}
            {/* <div className="extra content">
                <i className="icon comment"></i> {event.comments.items.length} comments
            </div> */}
            <button className="ui bottom attached button" onClick={this.handleDeleteClick.bind(this, client)}>
                <i className="trash icon"></i>
                Delete
            </button>
        </Link>
    );

    User = () => Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => console.log(user))
        .catch(err => console.log(err));

    Session = () => Auth.currentSession()
        .then(data => console.log(data))
        .catch(err => console.log(err));

    render() {
        const { busy } = this.state;
        const { clients } = this.props;

        return (
            <div>
                <div className="ui clearing basic segment">
                    <h1 className="ui header center aligned">All Clients</h1>
                    <button className="ui icon center aligned basic button" onClick={this.handleSync} disabled={busy}>
                        <i aria-hidden="true" className={`refresh icon ${busy && "loading"}`}></i>
                        Sync with Server
                    </button>
                    <button className="ui icon center aligned basic button" onClick={this.signout} disabled={busy}>
                        Signout
                    </button>
                </div>
                <div className="ui link cards">
                    <div className="card blue">
                        <Link to="/newClient" className="new-event content center aligned">
                            <i className="icon add massive"></i>
                            <p>Create New Client</p>
                        </Link>
                    </div>
                    {[].concat(clients).sort((a, b) => a.name.localeCompare(b.name)).map(this.renderClient)}
                </div>
            </div>
        );
    }

}

export default withApollo(compose(
    graphql(
        QueryAllClients,
        {
            options: {
                fetchPolicy: 'cache-first',
            },
            props: ({ data: { listClients = { items: [] } } }) => ({
                clients: listClients.items
            })
        }
    ),
    graphql(
        MutationDeleteClient,
        {
            options: {
                update: (proxy, { data: { deleteClient } }) => {
                    const query = QueryAllClients;
                    const data = proxy.readQuery({ query });

                    data.listClients.items = data.listClients.items.filter(client => client.id !== deleteClient.id);

                    proxy.writeQuery({ query, data });
                }
            },
            props: (props) => ({
                deleteClient: (client) => {
                    return props.mutate({
                        variables: { id: client.id },
                        optimisticResponse: () => ({
                            deleteClient: {
                                ...client, __typename: 'Client'
                            }
                        }),
                    });
                }
            })
        }
    )
)(AllClients));
