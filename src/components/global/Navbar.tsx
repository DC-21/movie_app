import { Link } from "react-router-dom";
import * as styles from "../../styles/navbar";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <Link to="/" className={styles.logoLink}>
        Movie App
      </Link>
      <div className={styles.navLinksContainer}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/liked" className={styles.navLink}>
          Liked
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
