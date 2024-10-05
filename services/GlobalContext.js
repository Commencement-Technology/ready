"use client";
import { account, client, ID } from "@/app/appwrite";
import { Databases } from "appwrite";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const databases = new Databases(client);

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

  const uploadDoc = async (title, description, url, thumbnail = null) => {
    try {
      setLoading(true);
      const res = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
        ID.unique(),
        { title, description, url, thumbnail }
      );

      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getDocs = async () => {
    try {
      setLoading(true);
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID
      );

      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getDoc = async (id) => {
    try {
      setLoading(true);
      const res = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
        id
      );

      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        loggedInUser,
        login,
        signUp,
        logout,
        getDocs,
        getDoc,
        uploadDoc,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
