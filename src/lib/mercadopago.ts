import { MercadoPagoConfig, Payment } from "mercadopago";

export function getMercadoPagoAccessToken() {
  const token =
    process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    process.env.MP_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      "Token do Mercado Pago não configurado. Defina MERCADO_PAGO_ACCESS_TOKEN ou MP_ACCESS_TOKEN nas variáveis de ambiente."
    );
  }

  return token;
}

export function getMercadoPagoPaymentClient() {
  const client = new MercadoPagoConfig({
    accessToken: getMercadoPagoAccessToken(),
  });

  return new Payment(client);
}