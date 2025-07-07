import React from "react";
import NavBar from "../navbar/NavBar";

import UserProfile from "../user/component/userProfile";

const UserProfilePage = () => {
  return (
    <div>
      {" "}
      <NavBar>
        <UserProfile />
      </NavBar>
    </div>
  );
};

export default UserProfilePage;
