

import { useState } from 'react'
import { PlusCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const categories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'aiLibraries', label: 'AI Libraries' },
  { id: 'devops', label: 'DevOps' },
  { id: 'testing', label: 'Testing' },
]

export default function TechStackTab() {
  const [techStack, setTechStack] = useState({
    frontend: [],
    backend: [],
    database: [],
    aiLibraries: [],
    devops: [],
    testing: [],
  })
  const [inputs, setInputs] = useState({
    frontend: '',
    backend: '',
    database: '',
    aiLibraries: '',
    devops: '',
    testing: '',
  })
  const [enabledCategories, setEnabledCategories] = useState({
    frontend: true,
    backend: true,
    database: true,
    aiLibraries: true,
    devops: true,
    testing: true,
  })

  const handleInputChange = (category, value) => {
    setInputs(prev => ({ ...prev, [category]: value }))
  }

  const handleAddTech = (category) => {
    if (inputs[category].trim()) {
      setTechStack(prev => ({
        ...prev,
        [category]: [...prev[category], inputs[category].trim()]
      }))
      setInputs(prev => ({ ...prev, [category]: '' }))
    }
  }

  const handleRemoveTech = (category, index) => {
    setTechStack(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }))
  }

  const handleCategoryToggle = (category) => {
    setEnabledCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }
  // console.log(techStack);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Tech Stack</h1>
      
      {categories.map(({ id, label }) => (
        <div key={id} className={`space-y-4 ${enabledCategories[id] ? '' : 'opacity-50'}`}>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`enable-${id}`}
              checked={enabledCategories[id]}
              onCheckedChange={() => handleCategoryToggle(id)}
            />
            <Label htmlFor={`enable-${id}`} className="text-xl font-semibold">{label}</Label>
          </div>
          
          {enabledCategories[id] && (
            <>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder={`Add ${label} technology`}
                  value={inputs[id]}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTech(id)}
                />
                <Button onClick={() => handleAddTech(id)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {techStack[id].map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
                    {tech}
                    <button
                      onClick={() => handleRemoveTech(id, index)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

