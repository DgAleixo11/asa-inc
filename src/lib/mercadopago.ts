import { MercadoPagoConfig, Payment } from "mercadopago";

const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error("MP_ACCESS_TOKEN não está definida.");
}

export const mercadoPagoClient = new MercadoPagoConfig({
  accessToken,
  options: { timeout: 5000 },
});

export const mercadoPagoPayment = new Payment(mercadoPagoClient);

export const ASA_COMMISSION_RATE = Number(
  process.env.ASA_COMMISSION_RATE ?? "0.15"
);

export function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"
  );
}