import { MercadoPagoConfig, Payment } from "mercadopago";

export function getMercadoPagoAccessToken() {
  const token =
    process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    process.env.MP_ACCESS_TOKEN;

  return token || null;
}

export function createMercadoPagoPaymentClient() {
  const accessToken = getMercadoPagoAccessToken();

  if (!accessToken) {
    throw new Error(
      "Token do Mercado Pago não configurado. Defina MERCADO_PAGO_ACCESS_TOKEN ou MP_ACCESS_TOKEN nas variáveis de ambiente."
    );
  }

  const client = new MercadoPagoConfig({
    accessToken,
  });

  return new Payment(client);
}