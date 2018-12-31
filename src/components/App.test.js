import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {

    const app = shallow(<App />)

    it('renders correct', () => {
        expect(app).toMatchSnapshot();
    });
    
    it('initializes the `state` with an empty list of clients', () => {
        expect(app.state().clients).toEqual([]);
    });



    describe('When clicking the `add client` button', () => {
        const id = 1

        beforeEach(() => {
            app.find('.btn-add').simulate('click');
        });

        afterEach(() => {
            app.setState({ clients: [] });
        });

        it('adds a new client to `state`', () => {
            expect(app.state().clients).toEqual([{ id }]);
        });

        it('adds a new client to the rendered list', () => {
            expect(app.find('.client-list').children().length).toEqual(1);
        })

        it('creates a Client component', () => {
            expect(app.find('Client').exists()).toBe(true);
        })

        describe('and the user wants to remove the added client', () => {
            beforeEach(() => {
                app.instance().removeClient(id)
            })

            it('removes a Client from the `state`', () => {
                expect(app.state().clients).toEqual([])
            });

        });

    });    

});


