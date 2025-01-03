import { Breadcrumb, Flex } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { omit } from "lodash";
import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { ALL_PATH } from ".";

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
    <Flex
      align="center"
      style={{
        paddingInline:10,
        background: "white",
        zIndex: 1049,
        position: "sticky",
        top: 0,
        height:30,

      }}
    >
      <Breadcrumb
        items={ALL_PATH.map(loopMap("/", location.pathname))
          .filter((r) => Object.keys(r).length)
          .map(mapChil)
          .flat(5)}
      />
    </Flex>
  );
})
