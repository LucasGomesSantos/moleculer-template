"use strict";

module.exports = {
	name: "orders",

	actions: {
		create(ctx) {
			const order = {
				id: Math.floor(Math.random() * 10000),
				status: "created",
				amount: ctx.params.amount
			};

			this.orders.push(order);

			return order;
		},

		cancel(ctx) {
			const order = this.orders.find(o => o.id === ctx.params.id);
			if (order) {
				order.status = "cancelled";
				return order;
			} else {
				throw new Error("Order not found");
			}
		}
	},

	events: {
		"payment.failed"(payload) {
			this.logger.info(`Recebido evento de pagamento falhado para o pedido ${payload.orderId}`);
			this.actions.cancel({ id: payload.orderId });
			this.broker.call("cart.removeProducts", { orderId: payload.orderId });
		}
	},

	created() {
		this.orders = [];
	}
};
