import styles from "./components.module.css";

const UserProfileCard = ({user}) =>{
    return(
        <div className={styles.UserProfiles}>
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default UserProfileCard;