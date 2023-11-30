import Header from "@/app/components/Header";
import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseConfig from "@/app/components/firebaseConfig";
import { useEffect, useState} from "react";

export default function MyApp({Component, pageProps}) {
    const [appInitialized, setAppInitialized]= useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);


    useEffect(()=> {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);

    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //sign in
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else {
                    //user is signed out
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                //when everything is done
                setIsLoading(false);
            });
        }

    }, [appInitialized]);

    if (isLoading) return null;

    return (
        <>
        <Header />
        <Component {...pageProps}
        isLoggedIn={isLoggedIn}
        userInformation={userInformation}
        />
        </>
    );
}