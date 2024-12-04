import React from 'react'
import { motion } from "motion/react"

export default function ErrorCard({error}) {
  return (
 
    <motion.div 
     animate={{ scale: 1 }}
     // Fade in when the element enters the viewport:
     whileInView={{ opacity: 1 }}
     // Animate the component when its layout changes:
     layout
     // Style now supports indepedent transforms:
     style={{ x: 0 }}
     initial={{ scale: 0.5 }}
        
    className=" mt-16 bg-red-500/50 text-red-200 p-6 rounded-xl text-center">
    {error}
  </motion.div>
  )
}
