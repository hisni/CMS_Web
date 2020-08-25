import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SidebarItems from './SidebarItems'
import SidebarItem from './SidebarItem/SidebarItem'


configure({adapter: new Adapter() })

describe( '<NavigationItems />', ()=>{
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SidebarItems />);
    })

    it('It should render 4 <SidebarItems /> elements', ()=>{
        wrapper.setProps({role: "Author"});
        expect(wrapper.find(SidebarItem)).toHaveLength(4);
    });

    it('It should render 6 <SidebarItems /> elements', ()=>{
        wrapper.setProps({role: "Reviewer"});
        expect(wrapper.find(SidebarItem)).toHaveLength(5);
    });

    it('It should render 6 <SidebarItems /> elements', ()=>{
        wrapper.setProps({role: "SuperAdmin"});
        expect(wrapper.find(SidebarItem)).toHaveLength(6);
    });

    it('Should an exact "User Management" Button', ()=>{
        wrapper.setProps({role: "Admin"});
        expect(wrapper.contains(<SidebarItem link="/dashboard/users" >User Management</SidebarItem>)).toEqual(true);
    });

    it('Should an exact "Past Conferences" Button', ()=>{
        wrapper.setProps({role: "Admin"});
        expect(wrapper.contains(<SidebarItem link="/dashboard/conferences" >Past Conferences</SidebarItem>)).toEqual(true);
    });

    it('Should an exact "Past Conferences" Button', ()=>{
        wrapper.setProps({role: "Reviwer"});
        expect(wrapper.contains(<SidebarItem link="/dashboard/review" >Review Papers</SidebarItem>)).toEqual(true);
    });

} )
