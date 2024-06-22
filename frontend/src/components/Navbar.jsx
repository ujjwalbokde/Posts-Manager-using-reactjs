import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-between py-4 bg-purple-600 text-amber-50 w-full sticky-top'>
      <div className="logo">
        <span className='font-bold text-xl mx-9 my-2'>Post Manager</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li>
          <NavLink exact to="/" activeClassName="font-bold" className='cursor-pointer hover:font-bold transition-all duration-75 text-xl mr-4'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/show" activeClassName="font-bold" className='cursor-pointer hover:font-bold transition-all duration-75 text-xl mr-4'>
            Your Posts
          </NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="font-bold" className='cursor-pointer hover:font-bold transition-all duration-75 text-xl mr-4'>
            Create New Post
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

