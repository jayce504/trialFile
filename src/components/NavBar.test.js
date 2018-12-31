import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';



describe('NavBar', () => {
    const navbar = shallow(<NavBar />);
    const request = require('supertest');
    const app = require('./app');

    it('renders properly', () => {
        expect(navbar).toMatchSnapshot();
    })

});

