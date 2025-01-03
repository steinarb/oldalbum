import React from 'react';
import { Link } from 'react-router';
import { ChevronLeft } from './ChevronLeft';

export function StyledLinkLeft(props) {
    return (
        <Link className="btn btn-block btn-light mb-0 left-align-cell" to={props.to} >
            <ChevronLeft/>&nbsp; {props.children}
        </Link>
    );
}
