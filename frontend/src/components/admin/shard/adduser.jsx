import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useAddUserMutation } from "@/redux/admin/adminApi"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { validateUserSignup } from "@/utils/validations/userSignupValidation"
export function Adduser({ onEditComplete }) {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const fileInputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [adduser] = useAddUserMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        imgUrl: ''
    });

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

        const formErrors = validateUserSignup(formData);
        if (Object.values(formErrors).every(error => !error)) {




            const form = new FormData();
            form.append("name", formData.name);
            form.append("email", formData.email);
            form.append("password", formData.password);
            if (selectedAvatar) {
                form.append('imgUrl', selectedAvatar);
            } else {
                form.append('imgUrl', formData.imgUrl);
            }

            console.log([...form]);

            try {
                const data = await adduser(form);


                if (data.data.status) {

                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        imgUrl: ''
                    });
                    setSelectedAvatar(null);
                    setIsOpen(false);
                    onEditComplete();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(formErrors);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="float-right">
                <Button variant="outline" className="">Add user</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <form onSubmit={handleSubmit}>
                    <DialogHeader >
                        <DialogTitle>Add user</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3 py-4">

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
                                    src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : `/userImages/${'user.png ' || 'user.png'}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="name" className="text-left">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-2"
                                value={formData.name} onChange={handleChange}
                            />
                            {errors.name && <div className="error text-xs text-red-500">{errors.name}</div>}

                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="email" className="text-left" >
                                email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                className="col-span-2"
                                value={formData.email} onChange={handleChange}
                            />
                            {errors.email && <div className="error text-xs text-red-500">{errors.email}</div>}

                        </div>
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="password" className="text-left">
                                password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                className="col-span-3 "
                                value={formData.password} onChange={handleChange}
                            />
                            {errors.password && <div className="error text-xs text-red-500">{errors.password}</div>}

                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
