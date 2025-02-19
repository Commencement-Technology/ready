"use client";
import { account, client, ID } from "@/app/appwrite";
import { Databases, OAuthProvider, Query } from "appwrite";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [docsUploadedBy, setDocsUploadedBy] = useState([]);

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
      setErrorMessage("");
      const res = await account.create(ID.unique(), email, password, name);
      setLoading(false);
      return res;
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setErrorMessage("");
      const session = await account.createEmailPasswordSession(email, password);
      setUser(await account.get());
      setLoading(false);
      return session;
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const uploadDoc = async (
    title,
    description,
    url,
    thumbnail,
    author,
    filename,
    isPrivate
  ) => {
    try {
      setLoading(true);
      const res = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
        ID.unique(),
        {
          title,
          description,
          url,
          thumbnail,
          author,
          uploadedBy: user.$id,
          filename,
          isPrivate,
        }
      );

      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  const updateDoc = async (
    title,
    description,
    url,
    thumbnail,
    author,
    id,
    filename,
    isPrivate
  ) => {
    try {
      setLoading(true);
      const res = await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
        id,
        {
          title,
          description,
          url,
          thumbnail,
          author,
          uploadedBy: user.$id,
          filename,
          isPrivate,
        }
      );

      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteDoc = async (id) => {
    try {
      setLoading(true);
      const res = await databases.deleteDocument(
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

  const getPublicDocs = async () => {
    try {
      setLoading(true);

      // Step 1: Fetch public documents
      const publicDocs = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
        [Query.equal("isPrivate", false)] // Fetch public documents
      );

      let combinedDocs = publicDocs.documents; // Start with public docs

      // Step 2: Check if user is logged in to fetch private docs
      let user = null;
      try {
        user = await account.get(); // Get the current user session
      } catch (err) {
        // No user session exists, set user to null
        user = null;
      }

      // Step 3: If the user is logged in, fetch their private documents
      if (user) {
        const userPrivateDocs = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
          [
            Query.equal("isPrivate", true),
            Query.equal("uploadedBy", user.$id), // Fetch only this user's private docs
          ]
        );

        // Combine public docs and user's private docs
        combinedDocs = [...combinedDocs, ...userPrivateDocs.documents];
        console.log(combinedDocs);
      }

      setLoading(false);
      return combinedDocs; // Return combined list of docs
    } catch (error) {
      setLoading(false);
      console.error(error);
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

  const addToWishlist = async (docId, userId) => {
    try {
      setLoading(true);

      // Step 1: Check if the document already exists in the wishlist
      const existingWishlist = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_WISHLIST_COLLECTION_ID,
        [
          Query.equal("userId", userId), // Filter by userId
          Query.equal("doc", docId),
        ]
      );

      if (existingWishlist.total > 0) {
        // If the document exists, don't add a duplicate
        setLoading(false);
        return { success: false, message: "Item already in wishlist" };
      }

      const res = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_WISHLIST_COLLECTION_ID,
        ID.unique(),
        {
          doc: docId,
          userId,
        }
      );

      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  const getAllWishlistItems = async () => {
    try {
      setLoading(true);
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_WISHLIST_COLLECTION_ID
      );

      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  const getWishlistItemsByUser = async (userId) => {
    try {
      setLoading(true);
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_WISHLIST_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );

      setWishlistedItems(res.documents);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  const getDocsByUploadedUser = async (userId) => {
    try {
      setLoading(true);
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_DOCS_COLLECTION_ID,
        [Query.equal("uploadedBy", userId)]
      );

      setDocsUploadedBy(res.documents);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteWishlistItem = async (docId, userId) => {
    try {
      setLoading(true);

      //1st step - Retrieve the document filtered by the user
      const docRes = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_WISHLIST_COLLECTION_ID,
        [Query.equal("doc", docId), Query.equal("userId", userId)]
      );

      if (docRes.documents.length === 0) {
        throw new Error("No matching wishlist item found");
      }

      const id = docRes.documents[0].$id; // Get the document ID

      //2nd step
      const deleteRes = await databases.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_WISHLIST_COLLECTION_ID,
        id
      );

      setLoading(false);
      return deleteRes;
    } catch (error) {
      setLoading(false);
    }
  };

  const oAuth2Login = () => {
    try {
      const res = account.createOAuth2Session(
        OAuthProvider.Google, // provider
        process.env.NEXT_PUBLIC_GOOGLE_OAUTH_SUCCESS_URI, // success (optional)
        process.env.NEXT_PUBLIC_GOOGLE_OAUTH_FAILURE_URI, // failure (optional)
        [] // scopes (optional)
      );
    } catch (error) {
      return;
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

  useEffect(() => {
    if (!!user) {
      getWishlistItemsByUser(user?.$id);
      getDocsByUploadedUser(user?.$id);
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        user,
        login,
        errorMessage,
        signUp,
        logout,
        getDocs,
        getDoc,
        uploadDoc,
        updateDoc,
        deleteDoc,
        addToWishlist,
        getWishlistItemsByUser,
        deleteWishlistItem,
        oAuth2Login,
        wishlistedItems,
        docsUploadedBy,
        getPublicDocs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
