import React from 'react';
import { Link } from 'react-router';
import { ChevronRight } from './ChevronRight';

export function StyledLinkRight(props) {
    return (
        <Link className="btn btn-block btn-light mb-0 right-align-cell" to={props.to} >
            {props.children} &nbsp;<ChevronRight/>
        </Link>
    );
}
