import axios from "axios";
import Cookies from "js-cookie";

class ApiManager {
	axiosClient = axios.create();

	initialize = async () => {
		const token = Cookies.get("accessToken")
		// this.axiosClient.defaults.baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
		//this.axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;
		this.axiosClient.defaults.baseURL = 'http://5.189.158.70:8000/api/';
        this.axiosClient.defaults.headers = {
            "Content-Type": "application/json",
            // "Authorization": `Token ${token}`,
        }
		if (token) {
			this.axiosClient.defaults.headers = {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `Bearer ${token}`,
				// "Authorization": `Token ${token}`,
			}
		}
	};

	get = async (URL) => {
		await this.initialize();
		return this.axiosClient.get(URL).then(response => response);
	};
	
	post = async (URL, payload) => {
		await this.initialize();
		console.log(payload);
        console.log(URL);
        
		
		return this.axiosClient.post(URL, payload).then(response => response);
	};
	
	put = async (URL, payload) => {
		await this.initialize();
		return this.axiosClient.put(URL, {payload}).then(response => response);
	};
	
	patch = async (URL, payload) => {
		await this.initialize();
		return this.axiosClient.patch(URL, {payload}).then(response => response);
	};
	
	delete = async (URL) => {
		await this.initialize();
		return this.axiosClient.delete(URL).then(response => response);
	};
}

export default new ApiManager();