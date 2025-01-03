import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ALL_PATH } from '.';
import Layout from './Layout';
type propsType = {

}

const renderRoute =({path,Component,children,index}:(typeof ALL_PATH)[number])=>{
    if(children?.length){
        if(index){
            return <Route index element={<Outlet/>}/> 
        }
        return <Route path={path} element={<Outlet/>}>
            {children.map(renderRoute)}
        </Route>
    }
    return<Route path={path} element={Component}/>
}
export default function Routers(props:propsType) : React.JSX.Element {
    return (
        <Routes >
            <Route path='/' element={<Layout/>} >
                {ALL_PATH.map(renderRoute)}
            </Route>
        </Routes>
    )
}