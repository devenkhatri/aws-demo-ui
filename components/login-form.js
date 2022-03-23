const LoginForm = ({
    errorMessage,
    onSubmit,
}) => {
    return (
        <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={onSubmit}>
            {/* <label className="font-semibold text-xs" htmlFor="usernameField">Username</label>
            <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" name="username" /> */}
            <ion-item>
                <ion-label position="floating">Username</ion-label>
                <ion-input name="username"></ion-input>
            </ion-item>
            {/* <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
            <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="password" name="password" /> */}
            <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" name="password"></ion-input>
            </ion-item>
            <button className="flex items-center justify-center h-12 px-6 w-64 bg-primary-500 mt-8 rounded font-semibold text-sm text-primary-100 hover:bg-primary-700">Login</button>
            {errorMessage &&
                <ion-item>
                    <ion-label class="ion-text-wrap my-8" color="danger">
                        {errorMessage}
                    </ion-label>
                </ion-item>
            }
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