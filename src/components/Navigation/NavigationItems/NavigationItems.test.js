import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'


configure({adapter: new Adapter() })

describe( '<NavigationItems />', ()=>{
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('It should render 6 <NavigationItems /> elements', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(6);
    });

    it('It should render 6 <NavigationItems /> elements', ()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(6);
    });

    it('Should an exact Logout Button', ()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });

    it('Should an exact Dashboard Button', ()=>{
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link="/dashboard">Dashboard</NavigationItem>)).toEqual(true);
    });

    it('Should an exact Login Button', ()=>{
        expect(wrapper.contains(<NavigationItem link="/login">Login</NavigationItem>)).toEqual(true);
    });

    it('Should an exact Register Button', ()=>{
        expect(wrapper.contains(<NavigationItem link="/register">Register</NavigationItem>)).toEqual(true);
    });

} )
