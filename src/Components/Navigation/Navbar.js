import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  const state = useSelector((state) => state?.users);
  const profile = useSelector(state => state?.profile?.profile)
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  const verifiedUser = profile?.isAccountVerified

  return (
    <>
      {isAdmin ? (
        <AdminNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
      {/* Display Alert */}
      { (isAdmin || userAuth ) ? profile && !verifiedUser ? 
      <AccountVerificationAlertWarning/> : null : null }
    </>
  );
};

export default Navbar;
