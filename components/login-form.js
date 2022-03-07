const LoginForm = ({
    errorMessage,
    onSubmit,
}) => {
    return (
        <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={onSubmit}>
            <label className="font-semibold text-xs" htmlFor="usernameField">Username</label>
            <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" name="username" />
            <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
            <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="password" name="password" />
            <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
            {errorMessage && <p className="text-red-500 my-8">{errorMessage}</p>}
            <div className="flex mt-6 justify-center text-xs">
                <span className="mx-2 text-gray-400 text-center">
                    <i>HINT:</i><br />
                    <b>Username: </b>{process.env.NEXT_PUBLIC_DEMO_USERNAME}<br />
                    <b>Password: </b>{process.env.NEXT_PUBLIC_DEMO_PASSWORD}
                </span>
            </div>
        </form>
    );
}

export default LoginForm;