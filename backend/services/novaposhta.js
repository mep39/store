import fetch from "node-fetch";

const API = "https://api.novaposhta.ua/v2.0/json/";

async function request(modelName, calledMethod, methodProperties = {}) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: process.env.NP_KEY,
      modelName,
      calledMethod,
      methodProperties
    })
  });
  return res.json();
}

export async function createTTN(order) {
  const result = await request("InternetDocument", "save", {
    PayerType: "Sender",
    PaymentMethod: "Cash",
    DateTime: new Date().toISOString().slice(0, 10),
    CargoType: "Parcel",
    Weight: "1",
    Cost: order.total,
    CitySender: process.env.NP_CITY_REF,
    Sender: process.env.NP_SENDER_REF,
    SenderAddress: process.env.NP_SENDER_ADDRESS_REF,
    RecipientCityName: order.delivery.city,
    RecipientAddressName: order.delivery.warehouse,
    RecipientName: order.user.email,
    RecipientType: "PrivatePerson",
    SeatsAmount: "1"
  });

  if (!result.success) {
    throw new Error("Nova Poshta error");
  }

  return result.data[0].IntDocNumber;
}

