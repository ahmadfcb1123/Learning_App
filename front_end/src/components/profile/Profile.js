import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Profil.css";
import { IoPersonCircleOutline } from "react-icons/io5";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1337/api/users/me`);
        setUser(data);
        setisUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, []);

  return (
    <div className="profile">
      <div className="avatar">
        <div className="avatar-wrapper">
          {/* {user.avatarUrl ? (
          <img src='/img/writing.jpg' alt=""/>
          ) : (
            <IoPersonCircleOutline />
          )} */}
          {/* <UpoloadAvatar
            userId={user.id}
            username={user.username}
            avatarUrl={user.avatarUrl}
            setisUserUpdated={setisUserUpdated}
          /> */}
          <img src='/img/writing.jpg' alt=""/>
        </div>
      </div>
      <div className="body">
        <p>Name:ahmad</p>
        <p>Email: a@gmail.com</p>
        <p>Code: 123456789</p>
        <p>
          Account created at: 22/8/2023
        </p>
      </div>
    </div>
  );
};

export default Profile;