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
  import { Button } from "@/components/ui/button"
  import {useNavigate } from "react-router-dom";
  import { useLogoutMutation } from "../../../redux/admin/adminApi";
  
  export function Adminlogout() {

    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
          await logout();
          navigate("/adminlogin");

      } catch (error) {
          console.error('Logout failed:', error);
      }
  }
    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-white " variant="outline">Logout</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white " >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will log you out of your account. You will need to log in again to access your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-black text-white "
            disabled={isLoading} onClick={handleLogout}
            >{isLoading ? 'Logging out...' : 'Continue'} </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  