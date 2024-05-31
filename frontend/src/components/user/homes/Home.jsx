
import { DialogDemo } from '@/components/demo/DailogDemo';
import React, { useEffect } from 'react';
import { useGetuserQuery } from '../../../redux/user/userApi';
import { useSelector } from 'react-redux';
import AlertDemo from '@/components/demo/AlertDemo';



function Home() {

    const currentUser = useSelector(state => state.user.currentUser);

    let currentUserObject = currentUser;
    return (
        <>

            <AlertDemo />
            <div className="login-wrap">
                <div className="login">
                    <div className="avatar">
                    </div>
                    <span className="user"><img src={currentUserObject.imgUrl} alt="" /></span>
                    <h1 className="">{currentUserObject.name}</h1>
                    <h6 className='pt-4'>{currentUserObject.id}</h6>
                    <h6 className='pt-2 pb-4'>{currentUserObject.email}</h6>
                    <DialogDemo currentUser={currentUserObject} />
                </div>
            </div>
        </> 
    );
}


export default Home;
