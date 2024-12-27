"use client";
import { Dialog, DialogContent,DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import URLContent from "@/common/URLContent";
export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div onClick={()=>{
        setOpen(true)
      }} className=" size-8 bg-blue-300">按钮</div>
      <Dialog open={open} onOpenChange={setOpen}>
       <div className=" hidden"> <DialogTitle>sss</DialogTitle></div>
        <DialogContent
          aria-describedby={undefined}
          showClose={false}
          className="w-[65.8125rem] flex-col flex  h-[36.25rem] border-none gap-0 rounded-2xl p-0 overflow-hidden bg-[rgba(255,255,255,0.9)]"
        >
          <URLContent />
        </DialogContent>
      </Dialog>
    </div>
  );
}
