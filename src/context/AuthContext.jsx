import React, { createContext, useContext, useEffect, useState } from 'react'
import ApiManager from '../services/ApiManager';
import Cookies from "js-cookie"

export const AuthContext = createContext(null);


export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	

	

	const login = async (username, password) => {
		try {
			setLoading(true);
			setError("");

			const response = await ApiManager.post("login/", {username, password});
			console.log(response)
			
		} catch (error) {
			setError(error.response.data.message || "Errore durante il login");
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		Cookies.remove("accessToken");
		Cookies.remove("refreshToken");
		setCurrentUser(null);
		
	};

	const register = async (userData) => {
		try {
			setLoading(true);
			setError("");

			const response = await ApiManager.post('register/', userData);
			console.log(response.data)
			return response.data;
		} catch (error) {
			setError(error.response.data.message || "Errore durante la registrazione");
			throw error;
		} finally {
			setLoading(false);
		}
	};


    const refreshToken = async () => {
        const refresh = Cookies.get('refreshToken');
         try{
             const response = await ApiManager.post('token/refresh/', {refresh: refresh});
             const accessToken = response.data.access;
             Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
		 	return true
         }catch(error){
             if(error.response.status === 401){
                 return false
             }
         }
	
    }

	const getCurrentUser = async () => {
		try {
			setLoading(true);
			setError("");

			const response = await ApiManager.get("current-user/");
			const userData = response.data;
			console.log(userData);
			

			Cookies.set("user", JSON.stringify(userData), { expires: 7, secure: true });

			setCurrentUser(userData);
			return userData;
		} catch (error) {
			setError(error.response.data.message || "Errore durante il recupero dei dati dell'utente");
			
		} finally {
			setLoading(false);
		}
	};

	

	const value = {
		currentUser,
		loading,
		error,
		refreshToken,
		login,
		logout,
		register,
		getCurrentUser,
		isAuthenticated: !!Cookies.get("accessToken") || !!Cookies.get("refreshToken"),
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};