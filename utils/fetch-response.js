import axios from "axios";

const methods = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

async function fetchApiResponse({ url = "", payload = null, method = "get" }) {
	try {
		const token = localStorage.getItem("token")?.trim();
		const config = {
			headers: {
				Authorization: token ? `Bearer ${token}` : undefined,
			},
		};

		let response;

		if (method === "get") {
			response = await methods.get(`http://localhost:8000/${url}`, {
				...config,
				params: payload,
			});
		} else if (method === "delete") {
			response = await methods.delete(`http://localhost:8000/${url}`, {
				...config,
				params: payload,
			});
		} else {
			response = await methods[method](
				`http://localhost:8000/${url}`,
				payload,
				config
			);
		}

		if (response.status < 400) {
			return response;
		} else {
			return null;
		}
	} catch (error) {
		console.error("Error in fetchApiResponse:", error);
		return null;
	}
}

export default fetchApiResponse;
