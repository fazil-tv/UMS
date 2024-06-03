import { useAuthentication } from '@/hook/auth';
import { DialogDemo } from '@/components/demo/DailogDemo';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AlertDemo from '@/components/demo/AlertDemo';


function Home() {

    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.currentUser);
    const { authLoading, isLoggedIn } = useAuthentication();

    console.log(authLoading, "authLoading")
    console.log(isLoggedIn, "isLoggedInsssssssssss")



    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            navigate('/');
        }
    }, [authLoading, isLoggedIn, navigate]);

    if (authLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AlertDemo />
            <div className="login-wrap">
                <div className="login">
                    <div className="avatar">
                        <img
                            alt="img"
                            src={currentUser.imgUrl ? `/userImages/${currentUser.imgUrl || 'user.png'}` : `/userImages/user.png`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <span className="user">
                        <img src={currentUser.imgUrl} alt="" />
                    </span>
                    <h1 className="">{currentUser.name}</h1>
                    <h6 className="pt-4">{currentUser.id}</h6>
                    <h6 className="pt-2 pb-4">{currentUser.email}</h6>
                    <DialogDemo currentUser={currentUser} />
                </div>
            </div>
        </>
    );
}

export default Home;
