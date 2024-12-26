import React from 'react';
import { NavLink } from 'react-router';
import ChevronLeft from './bootstrap/ChevronLeft';

export default function Previous(props) {
    const { className = '', previous } = props;

    if (!previous) {
        return null;
    }

    return (
        <NavLink className={className + ' btn'} to={previous.path}><ChevronLeft/></NavLink>
    );
}
