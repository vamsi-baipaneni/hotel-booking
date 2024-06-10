import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import Toast from "../components/Toast";
import * as apiClient from '../fetch/api-client'
import { useQuery } from "react-query";

/**
 * @typedef {Object} ToastMessage
 * @property {string} message
 * @property {"SUCCESS" | "ERROR"} status
 */

/**
 * @typedef {Object} UserContext
 * @property {function(ToastMessage): void} showToast
 */

/** @type {React.Context<UserContext | null>} */

const UserContext = createContext(null);

export const AuthContext = ({children})=>{
/** @type {React.State<ToastMessage | null>} */
    const [toast,setToast] = useState(null);

    const { isError } = useQuery("validateToken", apiClient.validateToken,{
        retry: false,
    });

    return(
        <UserContext.Provider value = {{
            showToast: (toastMessage)=> {setToast(toastMessage)},
            isLoggedIn: !isError
        }}>
            {toast && <Toast message={toast.message} status={toast.status} onClose={()=>setToast(null)}/>}
            {children}
        </UserContext.Provider>
    );
}

AuthContext.propTypes = {
    children: PropTypes.node
};

export const useAuthContext = ()=>{
   const context =  useContext(UserContext);
   return context;
}