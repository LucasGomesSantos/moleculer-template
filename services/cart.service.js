"use strict";

module.exports = {
	name: "cart",

	actions: {
		addProduct(ctx) {
			const product = {
				id: ctx.params.productId,
				orderId: ctx.params.orderId,
				quantity: ctx.params.quantity
			};

			this.cart.push(product);

			return product;
		},

		removeProducts(ctx) {
			const orderId = ctx.params.orderId;
			this.cart = this.cart.filter(product => product.orderId !== orderId);
			return { status: "removed", orderId };
		}
	},

	created() {
		this.cart = [];
	}
};
