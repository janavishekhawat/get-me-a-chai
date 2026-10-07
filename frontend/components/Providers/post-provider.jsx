"use client"

import { createContext, useState } from "react"

// 1️⃣ Create the context
export const PostContext = createContext();

// 2️⃣ Create the provider component
export const PostProvider = ({ children }) => {
    const [ postData, setPostData ] = useState(null);

    return(
        <PostContext.Provider value={{ postData, setPostData }}>
            {children} {/* allow child components to access the context */}
        </PostContext.Provider>
    )
}