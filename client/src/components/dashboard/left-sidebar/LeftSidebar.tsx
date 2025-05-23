import Logo from "/src/assets/logo.svg?react";
import ListIcon from "/src/assets/list.svg?react";
import ChartIcon from "/src/assets/chart.svg?react";
import { NavLink } from "react-router";
import { useUser } from "../../../contexts/UserContext";
import { useSidebar } from "../../../contexts/SidebarContext";
import styles from "/src/styles/modules/dashboard/left-sidebar/left-sidebar.module.scss";
import Logout from "/src/assets/logout.svg?react";
import CloseIcon from "/src/assets/close.svg?react";

export default function LeftSidebar() {
  const { logout } = useUser();
  const { leftSidebarOpen, closeLeftSidebar } = useSidebar();
  return (
    <div className={leftSidebarOpen ? styles.open : ""}>
      <div className={styles.overflow} onClick={closeLeftSidebar}></div>
      <div className={styles.container}>
        <CloseIcon className={styles.close} onClick={closeLeftSidebar} />
        <div className={styles.logoContainer}>
          <Logo />
          <h1>Habit Cracker</h1>
        </div>
        <div className={styles.linksContainer}>
          <NavLink
            to="/dashboard/all"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            onClick={closeLeftSidebar}
          >
            <ListIcon />
            <h4>All habits</h4>
          </NavLink>
          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            onClick={closeLeftSidebar}
          >
            <ChartIcon />
            <h4>Statistics</h4>
          </NavLink>
        </div>
        <div
          className={styles.signoutContainer}
          onClick={() => {
            closeLeftSidebar();
            setTimeout(() => {
              logout();
            }, 200);
          }}
        >
          <Logout />
          <h4>Sign out</h4>
        </div>
      </div>
    </div>
  );
}
