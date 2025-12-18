'use client'
import React, { useState } from 'react'
import Tiptap from './TipTap'
import GlowButton from './GlowButton'

const WritingBox = () => {
  const [text, setText] = useState<string | null>(null)
  return (
    <div className='w-full max-w-136'>
        <Tiptap content={text} onChange={setText} />
        
        <div className='w-full flex items-center justify-end py-6'>
          <GlowButton className='font-semibold text-white'>Save</GlowButton>
        </div>
    </div>
  )
}

export default WritingBox