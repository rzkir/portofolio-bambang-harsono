"use client"

import { Plus, X } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'

export function FormModal({
    isOpen,
    setIsOpen,
    selectedContent,
    formData,
    setFormData,
    handleSubmit,
    isSubmitting,
    triggerButton,
}: SkillProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {triggerButton}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>
                        {selectedContent ? 'Edit Section' : 'Add New Section'}
                    </DialogTitle>
                    <DialogDescription>
                        {selectedContent
                            ? 'Update the details below to modify this section.'
                            : 'Fill in the details below to create a new section for your home page.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="title">Title</label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="text">Text</label>
                        <Input
                            id="text"
                            value={formData.text}
                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2 col-span-2">
                        <label>Skills</label>
                        <div className="space-y-3">
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="relative border rounded-md p-3 space-y-2">
                                    <Input
                                        placeholder="Skill title"
                                        value={skill.title}
                                        onChange={(e) => {
                                            const newSkills = [...formData.skills]
                                            newSkills[index].title = e.target.value
                                            setFormData({ ...formData, skills: newSkills })
                                        }}
                                    />
                                    <Textarea
                                        placeholder="Skill description"
                                        value={skill.description}
                                        onChange={(e) => {
                                            const newSkills = [...formData.skills]
                                            newSkills[index].description = e.target.value
                                            setFormData({ ...formData, skills: newSkills })
                                        }}
                                        className="min-h-24"
                                    />
                                    {formData.skills.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                const newSkills = formData.skills.filter((_, i) => i !== index)
                                                setFormData({ ...formData, skills: newSkills })
                                            }}
                                            className="absolute top-2 right-2"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        skills: [...formData.skills, { title: '', description: '' }],
                                    })
                                }}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Skill
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full px-6 py-2.5 font-medium shadow-sm hover:shadow-md transition-all"
                        >
                            {isSubmitting ? 'Saving...' : selectedContent ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

