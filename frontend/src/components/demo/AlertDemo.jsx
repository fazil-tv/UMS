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
} from "@/components/ui/alert-dialog"


import { logoutSuccess } from '../../redux/user/userslice';
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/user/userApi";


import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";

function AlertDemo() {
    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {

            await logout();
            dispatch(logoutSuccess());
            navigate("/");

        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger style={{
                    backgroundColor: 'white',
                    border: '2px solid  black',
                    float: "right",
                    padding: '15px',
                    color: 'black',
                    marginRight: '40px',
                    marginTop: "30px"
                }}>logout</AlertDialogTrigger>
                <AlertDialogContent style={{ backgroundColor: 'white' }}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel style={{ marginTop: "0px" }}>Cancel</AlertDialogCancel>
                        <AlertDialogAction disabled={isLoading} onClick={handleLogout}>
                            {isLoading ? 'Logging out...' : 'Continue'} 
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default AlertDemo