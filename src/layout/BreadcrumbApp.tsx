import { Breadcrumb } from "antd";
import React, { EventHandler, memo } from "react";
import { ALL_PATH } from "./SideBar";
import { useLocation } from "react-router-dom";
import { omit } from "lodash";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

const loopMap = (nest:string,path:string)=>function (e: Partial<(typeof ALL_PATH)[number]>) {
  const onClick :ItemType['onClick']=(e)=>{
    e.preventDefault()
  }
  const render = {
        title: e.renderBreadcrumb,
        key: e.key,
        path:[nest,e.path].join('/').replace(/\/\//ig,'/'),
        onClick
      } as any
   
      if(e.children?.length){
        Object.assign(render,{
            children :e?.children.map(loopMap(String(render.path),path)).filter((r=>Object.keys(r).length))
        })
      }
      if(!new RegExp('^'+render.path).test(path)){
        return {}
      }
      

      if( !e.key) return {}
  return render;
}
const mapChil = (e:any)=>{
  if(!e.children){
    return omit(e,'path')
  }
  return [e,e?.children.map(mapChil)]
}

export default memo(function BreadcrumbApp(): React.JSX.Element {
  const location =useLocation()
  // console.log((ALL_PATH.map(loopMap('/',location.pathname)).filter((r=>Object.keys(r).length))).map(mapChil).flat(5))
  return (
    <Breadcrumb  items={(ALL_PATH.map(loopMap('/',location.pathname)).filter((r=>Object.keys(r).length))).map(mapChil).flat(5)} />
  );
})
