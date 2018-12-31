import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Client extends Component {
    constructor() {
        super()

        this.state = { 
            name: '', 
            address: '',
            phoneNumber: '',
            allegedOffenses: '',
            offenseClass: '',
            disposition: '',
            sentence:'',
            sentencingJudge:''
        }
    }

    render() {
        return(
            <div className='client'>
                <Form>
                    <FormGroup>
                        <ControlLabel>Name:</ControlLabel>
                        <FormControl 
                            className='input-person' 
                            onChange={event => this.setState({ name: event.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Address:</ControlLabel>
                        <FormControl
                        className='input-person'
                        onChange={event => this.setState( {address: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Phone Number:</ControlLabel>
                        <FormControl
                        className='input-person'
                        onChange={event => this.setState( {phoneNumber: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Alleged Offenses:
                        </ControlLabel>
                        <FormControl
                        className='input-person'
                        onChange={event => this.setState( {allegedOffenses: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Offense Class:
                        </ControlLabel>
                        <FormControl
                        className='input-person'
                        onChange={event => this.setState( {offenseClass: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Disposition
                        </ControlLabel>
                        <FormControl
                        className='input-person'
                        onChange={event => this.setState( {disposition: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sentence: 
                        </ControlLabel>
                        <FormControl
                        className='input-person'
                        onChange={event => this.setState( {sentence: event.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sentencing Judge: 
                        </ControlLabel>
                        <FormControl
                        className='input-person'
                        onChange={event => this.setState( {sentencingJudge: event.target.value})}
                        />
                    </FormGroup>
                </Form>
                <Button
                    className='btn-remove'
                    onClick={() => this.props.removeClient(this.props.client.id)}
                    >
                    Remove Client
                </Button>
            </div>
        )
    }
}

export default Client;