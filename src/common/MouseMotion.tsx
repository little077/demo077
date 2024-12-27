import { cn } from "@/lib/utils"
import { motion, useSpring, useTransform } from "framer-motion"
import React, { useEffect, useRef } from "react"
export interface Profile3dProps {
  children?: React.ReactNode
  className?: string
}
const MouseMotion = (props: Profile3dProps) => {
  const { children, className } = props

  const divRef = useRef<HTMLDivElement>(null)

  const relativeX = useSpring(0, { stiffness: 100, damping: 30 })
  const relativeY = useSpring(0, { stiffness: 100, damping: 30 })

  const rotateX = useTransform(relativeY, [-120, 0, 120], [-37, 0, 37])
  const rotateY = useTransform(relativeX, [-50, 0, 50], [-40, 0, 40])
  const handleMouseLeave = () => {
    relativeX.set(0);
    relativeY.set(0);
  };


  useEffect(() => {
    const mousemove = (event: MouseEvent) => {
      if (divRef?.current) {
        const rect = divRef?.current?.getBoundingClientRect()

        // 计算div中心点的坐标
        const divCenterX = rect.left + rect.width / 2
        const divCenterY = rect.top + rect.height / 2

        // 获取鼠标的坐标
        const { clientX, clientY } = event

        // 计算鼠标相对于div中心点的相对位置
        const _relativeX = clientX - divCenterX
        const _relativeY = -(clientY - divCenterY)
        relativeX.set(_relativeX)
        relativeY.set(_relativeY)
      }
    }

    divRef.current?.addEventListener?.("mousemove", mousemove)

    return () => {
      divRef.current?.removeEventListener?.("mousemove", mousemove)
    }
  }, [])

  return (
    <motion.div
      onMouseLeave={handleMouseLeave}
      ref={divRef}
      style={{ rotateX: rotateX, rotateY: rotateY }}
      className={cn("relative [transform-style:preserve-3d] bg-transparent", className)}>
      {children}
    </motion.div>
  )
}
export default MouseMotion
