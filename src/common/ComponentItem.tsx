import React, { useRef, useCallback, useState } from "react";
import MouseMotion from "./MouseMotion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {useThrottleFn} from "ahooks"

const PlusOneANIMATION = "plus-one-animation-show";
const ComponentItem = ({ item }) => {
  const liRef = useRef<HTMLLIElement>(null);
  const oneAddRef = useRef<HTMLDivElement>(null);
  const [loading,setLoading] =useState(false)
  const rippleEffect = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    const li = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(li.clientWidth, li.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - li.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      event.clientY - li.getBoundingClientRect().top - radius
    }px`;
    circle.classList.add("ripple");

    const ripple = li.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    li.appendChild(circle);
  }, []);
  const handleAddClick = ()=>{
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
    },3000)
  }
  const { run: debouncedHandleAddClick } = useThrottleFn(handleAddClick, {
    wait: 3000
  })
  return (
    <>
      <li
        onClick={async (e) => {
          oneAddRef.current.classList.add(PlusOneANIMATION);
          if (loading) return
          await debouncedHandleAddClick()
          oneAddRef.current.classList.remove(PlusOneANIMATION);
        }}
        ref={liRef}
        className="w-[11.25rem] group cursor-pointer  z-50 relative h-[11.25rem] p-4 rounded-[1.125rem] bg-[#FDFDFE] hover:shadow-[0px_8px_24px_0px_rgba(0,3,21,0.1)]"
      >
        {/**这里包一层的原因是父元素不能设置overflow-hidden，因为要显示+1的动效 */}
        <li
          onMouseMove={(e) => {
            e.preventDefault();
          }}
          onClick={(e) => {
            rippleEffect(e);
          }}
          className="absolute w-full z-10 h-full left-0 top-0 overflow-hidden "
        >
          <MouseMotion>
            <div className="w-[3.75rem] relative z-50 pointer-events-none h-[3.75rem] mt-[46px] flex justify-center items-center mx-auto rounded-[.875rem] shadow-[0px_8px_24px_0px_rgba(0,3,21,0.1)] overflow-hidden object-contain">
              <img src={item.icon} className=" pointer-events-none" alt="avater" />
            </div>
          </MouseMotion>
        </li>
        <div
          ref={oneAddRef}
          className="plus-one-animation z-[100] w-[15px] h-[21px] right-[18px] text-[#30C470] font-normal text-[14px]"
        >
          +1
        </div>
        <div className="hidden group-hover:block">
          <Button
            className={cn(
              "absolute top-[.625rem] z-50 text-xs font-sans flex justify-center items-center h-[1.25rem] w-[2rem] right-[.625rem] rounded-[1.625rem] font-normal"
            )}
            onClick={() => void 0}
          >
            <div className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="h-[3.75rem] mt-[1.875rem]"></div>
        <p className="w-full line-clamp-1 relative z-50 text-center mt-2 font-sans font-medium text-sm text-black/90">
          {item.name}
        </p>
        <div className="w-full flex items-center relative z-50 justify-center"></div>
      </li>
    </>
  );
};

export default ComponentItem;
