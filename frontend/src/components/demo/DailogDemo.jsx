import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react";
import { useEditUserMutation } from "../../redux/user/userApi";
import { signInSuccess } from "../../redux/user/userslice";
import { useDispatch } from "react-redux";
import { edituservalidation } from "@/utils/validations/editUservalidation";


export function DialogDemo({ currentUser }) {

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});


  const [isOpen, setIsOpen] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const fileInputRef = useRef(null);


  const [formData, setFormData] = useState({
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    imgUrl: currentUser.imgUrl,
  });

  const [editUser, { isLoading }] = useEditUserMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setSelectedAvatar(file);
    setFormData({ ...formData, imgUrl: file.name });
  };


  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };




  const handleSubmit = async (e) => {
    e.preventDefault();


    const formErrors = edituservalidation(formData);
    if (Object.values(formErrors).every(error => !error)) {


      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("id", formData.id);
      if (selectedAvatar) {
        form.append('imgUrl', selectedAvatar);
      } else {
        form.append('imgUrl', formData.imgUrl);
      }


      try {
        const data = await editUser(form);
        if (data.data.status) {
          const userData = data.data.userData;
          dispatch(signInSuccess(userData));
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      setErrors(formErrors);
    }
  }





return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild className="">
      <Button variant="outline" className="border-black">Edit Profile</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] bg-white text-black">
      <DialogHeader>
        <DialogTitle className="padd">Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              name="imgUrl"
            />
            <div className="avatar cursor-pointer bg-cover" onClick={handleAvatarClick}>
              <img
                alt="img"
                src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : `/userImages/${currentUser.imgUrl || 'user.png'}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-2 pr-3">
            <Label htmlFor="username" className="text-left">Name</Label>
            <Input
              id="username"
              name="name"

              value={formData.name}
              className="col-span-3"
              onChange={handleChange}
            />
            {errors.name && <div className="error text-xs text-red-500">{errors.name}</div>}


          </div>
          <div className="grid grid-cols-3 items-center gap-2 pr-3">
            <Label htmlFor="email" className="text-left">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              className="col-span-3"
              onChange={handleChange}
            />
            {errors.email && <div className="error text-xs text-red-500">{errors.email}</div>}


          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)
}
