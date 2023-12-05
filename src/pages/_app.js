import Header from "@/app/components/Header";
import {initializeApp} from "firebase/app";
import {getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import firebaseConfig from "@/app/components/firebaseConfig";
import { useCallback, useEffect, useState} from "react";


export default function MyApp({Component, pageProps}) {
    const [appInitialized, setAppInitialized]= useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);
    const [error, setError] = useState(null);

    const createUser = useCallback ((e) => {
        e.preventDefault();
        //Assign email and pass to variables from form
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        //create reference to auth object
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = user.userCredential.user;
            setIsLoggedIn(true);
            setUserInformation(user);
            setError(null);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode, errorMessage});
            setError(errorMessage);
        })
    }, [setError, setIsLoggedIn, setUserInformation]);

    const loginUser = useCallback ((e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = user.userCredential.user;
            setIsLoggedIn(true);
            setUserInformation(user);
            setError(null);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode, errorMessage});
            setError(errorMessage); 
        })

    }, [setError, setIsLoggedIn, setUserInformation]);
    const logoutUser = useCallback (() => {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            setUserInformation(null);
            setIsLoggedIn(false);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode, errorMessage});
            setError(errorMessage);  
        })

    }, [setError, setIsLoggedIn, setUserInformation]);

    //Initialize Firebase
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
        <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser} />
        <Component {...pageProps}
        createUser={createUser}
        isLoggedIn={isLoggedIn}
        loginUser={loginUser}
        userInformation={userInformation}
        />
        <p>{error}</p>
        </>
    );
}