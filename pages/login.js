import React, { useState } from "react";
import useUser from "../lib/useUser";
import PageLayout from '../components/page-layout'
import LoginForm from "../components/login-form";
import fetchJson, { FetchError } from "../lib/fetchJson";

export default function Login() {
    // here we just check if user is already logged in and redirect to index page
    const { user, mutateUser } = useUser({
        redirectTo: "/",
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState("");

    return (
        <PageLayout>
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
                <h1 className="font-bold text-2xl">{process.env.NEXT_PUBLIC_BRANDNAME}</h1>
                <LoginForm
                    errorMessage={errorMsg}
                    onSubmit={async function handleSubmit(event) {
                        event.preventDefault()

                        const body = {
                            username: event.currentTarget.username.value,
                            password: event.currentTarget.password.value,
                        }

                        try {
                            mutateUser(
                                await fetchJson('/api/login', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(body),
                                })
                            )
                        } catch (error) {
                            if (error instanceof FetchError) {
                                setErrorMsg(error.data.message)
                            } else {
                                console.error('An unexpected error happened:', error)
                            }
                        }
                    }}
                />

            </div>
        </PageLayout>
    );
}
