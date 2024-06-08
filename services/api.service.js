"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,
		ip: "0.0.0.0",

		routes: [
			{
				path: "/",

				whitelist: [
					"users.*",
					"orders.*",
					"payments.*",
					"cart.*"
				],

				autoAliases: true,

				aliases: {
					"GET /users": "users.getAllUsers",
					"POST /orders": "orders.create",
					"POST /payments": "payments.pay",
					"POST /cart/add": "cart.addProduct"
				},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all",
				logging: true
			}
		],

		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null,

		assets: {
			folder: "public",
			options: {}
		}
	}
};
