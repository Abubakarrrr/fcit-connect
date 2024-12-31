import { Button } from '@/components/ui/button'
import React from 'react'

const DocumentationTab = () => {
  return (
    <div className='py-6 px-4 rounded-lg border shadow-sm'>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-lg font-semibold'>Upload the FYP documentation</h1>
            <p className='text-red-500 text-[12px]'>Please upload in PDF format</p>
            <Button className='mt-4'>Choose File</Button>
            <p className='text-[12px] mt-1 text-gray-500'> less than (1 MB)</p>
        </div>
    </div>
  )
}

export default DocumentationTab