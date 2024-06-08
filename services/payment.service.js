"use strict";

module.exports = {
	name: "payments",

	actions: {
		async pay(ctx) {
			const paymentSuccessful = Math.random() > 0.5; // Simula sucesso ou falha aleatoriamente

			if (paymentSuccessful) {
				this.logger.info(`Pagamento para o pedido ${ctx.params.orderId} foi bem-sucedido.`);
				return { status: "success" };
			} else {
				this.broker.emit("payment.failed", { orderId: ctx.params.orderId });
				throw new Error("Payment failed");
			}
		}
	}
};
