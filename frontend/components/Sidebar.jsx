"use client";

import ProfileForm from "./Profile/ProfileForm";
import PaymentHistory from "./PaymentHistory/PaymentHistory"
import LogOut from "./Home/LogOut";
import DeleteAccount from "./DeleteAccount/Delete"

const Sidebar = () => {
  return (
    <div className="w-full h-full px-3 py-1">
      <ProfileForm />
      <LogOut/>
      <DeleteAccount/>
    </div>
  );
};

export default Sidebar;