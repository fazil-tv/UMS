import { useEffect, useState } from "react";
import { useGetUserDataMutation } from "@/redux/user/userApi";
import { useAdminAuthMutation } from "@/redux/admin/adminApi";


export const useAuthentication = () => {
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userauth] = useGetUserDataMutation(); 

    useEffect(() => {
        const checkUserAuthentication = async () => {
            try {
                setAuthLoading(true);
                const response = await userauth().unwrap();

                if (response.status) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error('Error checking authentication:', error);
            } finally {
                setAuthLoading(false);
            }
        };

        checkUserAuthentication();
    }, []);

    return { authLoading, isLoggedIn };
};



export const useAdminAuthentication = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminAuth] = useAdminAuthMutation();

    useEffect(() => {
        const checkAdminAuthentication = async () => {
            try {
                setIsFetching(true);
                
                const response = await adminAuth().unwrap();

                console.log(response,'authResponse$$$$$$$$$$$$$$$$');
                
                if (response.status) {

                    setIsLoggedIn(true);

                } else {

                    setIsLoggedIn(false);
                    
                }
                
            } catch (error) {
                setIsLoggedIn(false);
                console.error('Error checking authentication:', error);
            } finally {
                setIsFetching(false); 
            }
        };

        checkAdminAuthentication();

    }, []);

    return { isFetching, isLoggedIn };
};