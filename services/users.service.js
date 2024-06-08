"use strict";

const axios = require("axios");

module.exports = {
	name: "users",

	actions: {
		async getAllUsers() {
			try {
				const response = await axios.get("http://localhost:3001/user/getAllCustomers");
				return response.data;
			} catch (error) {
				throw new Error("Erro ao consultar o serviço externo");
			}
		}
	}
};
