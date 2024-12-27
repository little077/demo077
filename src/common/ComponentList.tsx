import React, { useRef } from 'react'
import { Loader2 } from "lucide-react"
import { cn } from '@/lib/utils'
import test from "@/utils/test"
import {useRequest} from  "ahooks"
import ComponentItem from './ComponentItem'


const request = async () => {
 return new Promise((resolve)=>{
  setTimeout(()=>{
    resolve(test)
  },2000)
 })
}
const ComponentList = () => {
  const ulRef = useRef(null)
 const {data,loading} = useRequest(async()=>{
  const res = await request()
  return res
 })
  return (
    <div
      className={cn(
        "w-full h-full relative overflow-hidden flex pl-6 pr-1.5"
      )}>
      <ul
        ref={ulRef}
        className="hover-scrollbar overflow-auto flex-1 pb-6 flex flex-wrap gap-6">
        {loading ? (
          <div className="left-1/2 absolute top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Loader2 className="animate-spin w-8 h-8  " />
          </div>
        ) : (
          data?.map((item) => {
            return (
              <ComponentItem
                key={Math.random()}
                item={item}
                cashbackData={true}
              />
            )
          })
        )}
      </ul>
    </div>
  )
}

export default ComponentList