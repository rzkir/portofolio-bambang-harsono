"use client"

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting: boolean;
}

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
}: DeleteModalProps) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-lg sm:text-xl font-bold">
                        Delete gallery item?
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4 text-sm sm:text-base">
                    <p className="text-muted-foreground">
                        This action cannot be undone. The selected gallery item will be permanently removed.
                    </p>
                </div>
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-6"
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="px-6"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}