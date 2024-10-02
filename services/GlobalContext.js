"use client";
import { account, ID } from "@/app/appwrite";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = async () => {
    try {
      setLoading(true);
      const res = await account.get();
      setLoggedInUser(res);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      setLoading(true);
      const res = await account.create(ID.unique(), email, password, name);
      return res;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const session = await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ loading, loggedInUser, login, signUp, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
