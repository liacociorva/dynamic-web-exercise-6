import styles from "./components.module.css";
const LoginForm = ({loginUser}) => {
    return (
        <div>
            <h2>Log in Form</h2>
            <form className={styles.Form} onSubmit={(e) => loginUser(e)}>
                <label htmlFor="name">Email</label>
                <input type='email' name='email'/>

                <label htmlFor="name">Password</label>
                <input type='password' name='password'/>
                
                <button type='submit'>Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;