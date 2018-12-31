import React, { Component } from "react";
import { Link } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { graphql } from "react-apollo";
import QueryAllClients from "../GraphQL/QueryAllClients";
import QueryGetClient from "../GraphQL/QueryGetClient";
import MutuationCreateClient from "../GraphQL/MutuationCreateClient"


class NewClient extends Component {

    static defaultProps = {
        createClient: () => null,
    }

    state = {
        client: {
            name: '',
            address: '',
            phoneNumber: '',
            allegedOffenses: '',
            offenseClass: '',
            disposition: '',
            sentence:'',
            sentencingJudge:''
        }
    };

    handleChange(field, { target: { value } }) {
        const { client } = this.state;

        client[field] = value;

        this.setState({ client });
    }

    handleSave = async (c) => {
        c.stopPropagation();
        c.preventDefault();

        const { createClient, history } = this.props;
        const { client } = this.state;

        await createClient({ ...client });

        history.push('/');
    }

    render() {
        const { client } = this.state;

        return (
            <div className="ui container raised very padded segment">
                <h1 className="ui header">Create A Client</h1>
                <div className="ui form">
                    <div className="field required eight wide">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={client.name} onChange={this.handleChange.bind(this, 'name')} />
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="where">Address</label>
                        <input type="text" id="address" value={client.address} onChange={this.handleChange.bind(this, 'address')} />
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="where">Phone Number</label>
                        <input type="text" id="phoneNumber" value={client.phoneNumber} onChange={this.handleChange.bind(this, 'phoneNumber')} />
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="description">Alleged Offenses</label>
                        <input type="text" id="allegedOffenses" rows="10" value={client.allegedOffenses} onChange={this.handleChange.bind(this, 'allegedOffenses')} />
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="description">Offense Class</label>
                        <input type="text" id="offenseClass" rows="10" value={client.offenseClass} onChange={this.handleChange.bind(this, 'offenseClass')} />
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="description">Dispositon</label>
                        <select className='form-group' input id="disposition" rows="10" value={client.disposition} onChange={this.handleChange.bind(this, 'disposition')}>
                            <option>Guilty Plea Before Trial: Most Serious Original Trial</option>
                            <option>Guilty Plea Before Trial: Other Offense</option>
                            <option>Guilty Plea During Trial: Other Offense</option>
                            <option>Trial: Guilty Most Serious Original Charge</option>
                            <option>Trial: Guilty Other Offense</option>
                            <option>Trial: Acquitted</option>
                            <option>Probation Violation Found</option>
                            <option>Dismissed With Leave </option>
                            <option>Dismissed Without Leave</option>
                            <option>FTA/OFA Without Dismissal</option>
                            <option>Deferred/Diverted</option>
                            <option>Held In Criminal Contempt</option>
                            <option>No Probable Cause</option>
                            <option>Attorney Withdrew</option>
                            <option>None (Interim Fee)</option>
                            <option> Other</option>
                        </select>
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="description">Sentence</label>
                        <select className='form-group' input id="disposition" rows="10" value={client.disposition} onChange={this.handleChange.bind(this, 'disposition')}>
                            <option>Active Sentence</option>
                            <option>Split Sentence</option>
                            <option>Supervised Probation</option>
                            <option>Unsupervised Probation</option>
                            <option>Probation Terminated</option>
                            <option>PJC</option>
                            <option>Fines and Costs Only</option>
                            <option>None (Acquitted/Dismissed)</option>
                            <option>None (Deferred/Diverted)</option>
                            <option>None (Attorney Withdrew)</option>
                            <option>None (Interim Fee)</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="field required eight wide form-group">
                        <label htmlFor="description">Sentencing Judge</label>
                        <select className='form-group' input id="sentencingJudge" rows="10" value={client.sentencingJudge} onChange={this.handleChange.bind(this, 'sentencingJudge')}>
                            <option>Hon. Jeannette Reeves</option>
                            <option>Hon. Larry Wilson</option>
                            <option>Hon. Micah Sanderson</option>
                            <option>Hon. Meredeth Shuford</option>
                            <option>Hon. K. Dean Black</option>
                            <option>Hon. Justin K. Brackett</option>
                        </select>
                    </div>
                    <div className="ui buttons">
                        <Link to="/" className="ui button">Cancel</Link>
                        <div className="or"></div>
                        <button className="ui positive button" onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default graphql(
    MutuationCreateClient,
    {
        props: (props) => ({
            createClient: (client) => {
            return props.mutate({
                update: (proxy, { data: { createClient } }) => {
                    //update QueryAllClients
                    const query =  QueryAllClients;
                    const data = proxy.readQuery({ query });

                    data.listClients.items = [...data.listClients.items.filter(c => c.id !== createClient.id), createClient];

                    proxy.writeQuery({ query, data });

                    //Create cache entry for QueryGetClient
                    const query2 = QueryGetClient
                    const variables = { id: createClient.id };
                    const data2 = { getClient: { ...createClient } };

                    proxy.writeQuery({ query: query2, variables, data: data2});
                },
                variables: client,
                optimisticResponse: () => ({
                    createClient: {
                        ...client, id: uuid(), __typename: 'Client'
                    }
                })
            })
        }
    })
}
)(NewClient);