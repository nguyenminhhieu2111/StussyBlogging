import React from "react";
import Button from "../components/button/Button";
import DashboardHeading from "../components/module/Dashboard/DashBoardHeading";
import { useAuth } from "../contexts/auth-context";
import { userRole } from "../utils/constants";
import UserTable from "./UserTable";

const UserManage = () => {
  const {userInfo}=useAuth();
  if(userInfo.role !== userRole.ADMIN)return null
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
       <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;