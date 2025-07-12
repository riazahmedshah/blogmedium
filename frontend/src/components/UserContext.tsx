// // UserContext.tsx
// //import React, { createContext, useState, useContext, ReactNode } from 'react';

// import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react";
// import { BACKEND_URL } from "../config";
// import axios from "axios";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // Add other properties as needed
// }

// interface UserContextType {
//   loggedInUser: User | null;
//   setLoggedInUser: Dispatch<SetStateAction<User | null>>;
// }

// const UserContext = createContext<UserContextType>({
//   loggedInUser: null,
//   setLoggedInUser: () => {}
// });

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const UserProvider = ({ children } : any) => {
//   const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token"); // Get token from storage
//       if (!token) return;
//       try {
//         const response = await axios.get(`${BACKEND_URL}/api/v1/user/user`,{
//           headers: {
//             Authorization: `${token}` // Send token in header
//           }
//         });
//         const userData: User = response.data.user;
//         setLoggedInUser(userData);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };
//     fetchUser();
//   }, [setLoggedInUser]);

//   return (
//     <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;
