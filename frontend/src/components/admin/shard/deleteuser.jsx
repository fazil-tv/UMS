import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "../../../redux/admin/adminApi";
import { useState } from "react";

export function DeleteUser({ userId, onDeleteComplete }) {
    const [deleteUser, { isLoading }] = useDeleteUserMutation();
    const [isOpen, setIsOpen] = useState(false);



    const handleDelete = async () => {
        try {


            const data = await deleteUser(userId).unwrap();

            if (data.status) {
                setIsOpen(false);
                onDeleteComplete();
            }

        } catch (error) {
            console.log('Deletion failed:', error);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button className="bg-white" variant="outline">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will permanently delete the user and their data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-black text-white"
                        disabled={isLoading}
                        onClick={handleDelete}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
