import React, { ReactNode } from 'react';
import CardOrder from '../card';
type propsType = {
    count?: number,
    title?:ReactNode|string,
}
export default function Category(props:propsType) : React.JSX.Element {
    return (
        <div className='category'>
            <div className='category-head'>
                {props.title??'No content'}
            </div>
            <div className='category-body'>
                <CardOrder/>
                <CardOrder/>
                <CardOrder/>
                <CardOrder/>
                <CardOrder/>
            </div>
        </div>
    )
}