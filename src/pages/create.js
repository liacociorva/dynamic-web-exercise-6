import { useEffect } from "react";
import { useRouter } from "next/router";
import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUser ({isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) router.push("/");
    }, [isLoggedIn]);

    return (
        <>
        <main>
            <h1>Create User</h1>
            <CreateUserForm />
        </main>
        </>
    );
};