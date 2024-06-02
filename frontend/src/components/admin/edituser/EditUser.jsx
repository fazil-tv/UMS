import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditUserMutation } from "../../../redux/admin/adminApi";
import React, { useEffect, useRef, useState } from 'react';
import { edituservalidation } from "@/utils/validations/editUservalidation";



function EditUser({ currentUser, onEditComplete }) {

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});



    const [editUser, { isLoading }] = useEditUserMutation();
    const [formData, setFormData] = useState({
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        imgUrl: currentUser.imgUrl
    });

    const [selectedAvatar, setSelectedAvatar] = useState(null);



    const fileInputRef = useRef(null);

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
            form.append("id", formData.id);
            form.append("name", formData.name);
            form.append("email", formData.email);

            if (selectedAvatar) {

                form.append('imgUrl', selectedAvatar);
            } else {
                form.append('imgUrl', formData.imgUrl);
            }


            try {
                const data = await editUser(form);


                if (data.data.status) {
                    setIsOpen(false);
                    onEditComplete();


                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setErrors(formErrors);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
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
                        <div className="grid grid-cols-3 items-center gap-2">
                            <Label htmlFor="name" className="text-left">Name</Label>
                            <Input
                                id="name"
                                defaultValue={currentUser.name}
                                className="col-span-3"
                                onChange={handleChange}
                                name="name"
                            />
                            {errors.name && <div className="error text-xs text-red-500">{errors.name}</div>}

                        </div>
                        <div className="grid grid-cols-3 items-center gap-2">
                            <Label htmlFor="username" className="text-left">Email</Label>
                            <Input
                                id="username"
                                defaultValue={currentUser.email}
                                className="col-span-3"
                                onChange={handleChange}
                                name="email"
                            />
                            {errors.email && <div className="error text-xs text-red-500">{errors.email}</div>}

                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditUser;
