import React from 'react';
import { shallow } from 'enzyme';
import Client from "./Client";

describe('Client', () => {
    const mockRemove = jest.fn()
    const id = 1
    const props = { client: { id }, removeClient: mockRemove }
    const client = shallow(<Client {...props} />);

    it('renders properly', () => {
        expect(client).toMatchSnapshot();
    });

    it('initializes a client and related info in the `state`', () => {
        expect(client.state()).toEqual({ name: '', address:'', phoneNumber:'', allegedOffenses:'' })
    });

    describe('when typing into client input', () => {
        const name = ''
        const address = 'Address 1'
        const phoneNumber = '111-111-1111'
        const allegedOffenses = 'some'
        const client = shallow(<Client {...props} />);

        beforeEach(() => {
            client.find('.input-person').simulate('change', { target: {value: name } })
        })

        beforeEach(() => {
            client.find('.input-person').simulate('change', { target: {value: address } })
        })

        beforeEach(() => {
            client.find('.input-person').simulate('change', { target: {value: phoneNumber } })
        })

        beforeEach(() => {
            client.find('.input-person').simulate('change', { target: {value: allegedOffenses } })
        })

        it('updates the client name in `state`', () => {
            expect(client.state().name).toEqual(name)
        })
    });

    describe('when clicking the `Remove Client` button', () => {
        client.find('.btn-remove').simulate('click')
    });
        
    it('calls the removeClient callback', () => {
            expect(mockRemove).toHaveBeenCalledWith(id)
        });
});   
