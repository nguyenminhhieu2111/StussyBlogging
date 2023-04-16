import React from "react";
import Button from "../components/button/Button";
import DashboardHeading from "../components/module/Dashboard/DashBoardHeading";
import { useAuth } from "../contexts/auth-context";
import { userRole } from "../utils/constants";
import UserTable from "./UserTable";
import error from '../image/R.jpg'

const UserManage = () => {
  const { userInfo } = useAuth();
  if (userInfo.role !== userRole.ADMIN)
    return (
    <div>
    <span className="title_error">Sorry, you don't have permission</span>
    <img src={error}/>
    </div>
    );
  else {
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
  }
};

export default UserManage;
