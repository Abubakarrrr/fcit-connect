import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import BasicDetails from './BasicDetails'

export default function AddFyp() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="">
      <div className="flex items-center justify-between py-4 bg-white">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={handleGoBack} >←</Button>
          <h1 className="text-xl font-semibold">Add FYP</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleGoBack} >Close</Button>
          <Link to="/admin/fyps/update/1">
          <Button>
            <Plus className="w-3 h-3" />
            Save Template</Button>
          </Link>
        </div>
      </div>

     <BasicDetails/>

    </div>
  )
}

