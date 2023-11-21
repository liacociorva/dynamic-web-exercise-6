import styles from "./components.module.css";
const LoginForm = () => {
    return (
        <div>
            <h2>Log in Form</h2>
            <form className={styles.Form}>
                <label htmlFor="name">Email</label>
                <input type='email' name='email'/>
                <label htmlFor="name">Password</label>
                <input type='password' name='pass'/>
                <button type='submit'>Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;