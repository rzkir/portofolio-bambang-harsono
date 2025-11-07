"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'

interface DeleteModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    handleDeleteConfirm: () => void
    isSubmitting: boolean
}

export function DeleteModal({
    isOpen,
    setIsOpen,
    handleDeleteConfirm,
    isSubmitting,
}: DeleteModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Section</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this section? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteConfirm}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Deleting...
                            </div>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

