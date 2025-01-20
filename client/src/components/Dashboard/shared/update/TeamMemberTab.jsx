
import { useState } from 'react'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TeamMemberTab() {
  const [members, setMembers] = useState([])
  const [currentMember, setCurrentMember] = useState({
    id: null,
    name: '',
    rollNo: '',
    email: '',
    role: '',
    github: '',
    linkedin: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentMember({ ...currentMember, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      setMembers(members.map(member => 
        member.id === currentMember.id ? currentMember : member
      ))
      setIsEditing(false)
    } else {
      setMembers([...members, { ...currentMember, id: Date.now() }])
    }
    // console.log(members)
    setCurrentMember({
      id: null,
      name: '',
      rollNo: '',
      email: '',
      role: '',
      github: '',
      linkedin: ''
    })
  }

  const handleEdit = (member) => {
    setCurrentMember(member)
    setIsEditing(true)
  }

  const handleDelete = (id) => {
    setMembers(members.filter(member => member.id !== id))
    setDeleteId(null)
  }
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentMember.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll No</Label>
                <Input
                  id="rollNo"
                  name="rollNo"
                  value={currentMember.rollNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={currentMember.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={currentMember.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  value={currentMember.github}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={currentMember.linkedin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Add'} Team Member
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>GitHub</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.rollNo}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        GitHub
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        LinkedIn
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(member)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setDeleteId(member.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this team member?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteId(null)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(deleteId)}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

