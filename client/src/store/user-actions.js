import axios from "axios";
import { userActions } from "./user";

export const authUser = (userData) => {
  return async (dispatch) => {
    const res = await axios.post(
      "http://localhost:5000/user/authenticate",
      userData
    );
    const token = res.data.token;
    localStorage.setItem("token", token);
    const user = res.data.user;
    const profile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      gender: user.gender,
      mobileNumber: user.mobileNumber,
    };
    dispatch(
      userActions.login({
        profile: profile,
        token: token,
        deliveryExecutive: user.deliveryExecutive
          ? user.deliveryExecutive
          : null,
        role: user.role,
      })
    );
  };
};

export const setUserData = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const headers = {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.get("http://localhost:5000/user/getuser", {
        headers: headers,
      });
      const user = res.data;
      const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        birthDate: user.birthDate,
        gender: user.gender,
      };
      dispatch(
        userActions.setUser({
          isAuthenticated: true,
          profile: profile,
          deliveryExecutive: user.deliveryExecutive
            ? user.deliveryExecutive
            : null,
          role: user.role,
        })
      );
    } catch (error) {}
  };
};
export const updateProfile = (userUpdatedData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const headers = {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/user/updateprofile",
        userUpdatedData,
        {
          headers: headers,
        }
      );
      const profile = {
        firstName: userUpdatedData.firstName,
        lastName: userUpdatedData.lastName,
        mobileNumber: userUpdatedData.mobileNumber,
      };
      dispatch(
        userActions.updateProfile({
          profile: profile,
          deliveryExecutive: userUpdatedData.deliveryExecutive,
        })
      );
    } catch (error) {}
  };
};
