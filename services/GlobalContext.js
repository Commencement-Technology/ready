"use client";
import { account, client, ID } from "@/app/appwrite";
import { Databases, OAuthProvider } from "appwrite";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const databases = new Databases(client);

  const isLoggedIn = async () => {
    try {
      setLoading(true);
      const res = await account.get();
      setUser(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      setLoading(true);
      const res = await account.create(ID.unique(), email, password, name);
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const session = await account.createEmailPasswordSession(email, password);
      setUser(await account.get());
    } catch (error) {
      setLoading(true);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const uploadDoc = async (title, description, url, thumbnail, author) => {
    try {
      setLoading(true);
      const res = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
        ID.unique(),
        { title, description, url, thumbnail, author, uploadedBy: user.$id }
      );

      setLoading(false);
      return res;
    } catch (error) {
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
      setLoading(false);
    }
  };

  const oAuth2Login = () => {
    try {
      const res = account.createOAuth2Session(
        OAuthProvider.Google, // provider
        "http://localhost:5001/library", // success (optional)
        "http://localhost:5001/oauth2-failure", // failure (optional)
        [] // scopes (optional)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getOAuth2Session = async () => {
    try {
      const session = await account.getSession("current");
      setSessionId(session.$id);
    } catch (error) {
      return;
    }
  };

  const updateOAuth2Session = async () => {
    try {
      const session = await account.updateSession(sessionId);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    isLoggedIn();
    getOAuth2Session();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        user,
        login,
        signUp,
        logout,
        getDocs,
        getDoc,
        uploadDoc,
        oAuth2Login,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
