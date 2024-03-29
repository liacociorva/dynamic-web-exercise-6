import styles from "./components.module.css";
const CreateUserForm = ({createUser}) => {
    return (
        <div>
            <h2>Create User Form</h2>
            <form className={styles.Form} onSubmit={(e) => createUser(e)}>
                <label htmlFor="name">Email</label>
                <input type='email' name='email'/>

                <label htmlFor="name">Password</label>
                <input type='password' name='password'/>

                <button type='submit'>Create User </button>
            </form>
        </div>
    );
};

export default CreateUserForm;