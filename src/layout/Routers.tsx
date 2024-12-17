import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { ALL_PATH } from './SideBar';
type propsType = {

}

const renderRoute =({path,Component,children}:(typeof ALL_PATH)[number])=>{
    if(children?.length){
        
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
                <Route index element={<div></div>} />
                {ALL_PATH.map(renderRoute)}
            </Route>
        </Routes>
    )
}