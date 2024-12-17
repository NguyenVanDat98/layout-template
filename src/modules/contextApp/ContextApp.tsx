import React, { createContext, PropsWithChildren, useContext, useState } from 'react';


const wSB =300;
const Context = createContext({
    setWithSidebar(value:number){},
    withSideBar: wSB,
});
export const useGetContextApp = ()=>useContext(Context);
type propsType = {

}

export default function ContextApp() : React.JSX.Element {
    return (
        <div>ContextApp</div>
    )
}
ContextApp.Provider = function Provider(props:PropsWithChildren){
    const [withSideBar,setWithSidebar] = useState(wSB)

    return <Context.Provider value={{
        setWithSidebar,
        withSideBar

    }}>{props.children}</Context.Provider>
}
ContextApp.Consumer = Context.Consumer
