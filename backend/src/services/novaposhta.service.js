import axios from "axios";

const API_URL = "https://api.novaposhta.ua/v2.0/json/";

export const createTTN = async (order) => {
  const { data } = await axios.post(API_URL, {
    apiKey: process.env.NP_API_KEY,
    modelName: "InternetDocument",
    calledMethod: "save",
    methodProperties: {
      PayerType: "Sender",
      PaymentMethod: "Cash",
      CargoType: "Parcel",
      Weight: "1",
      ServiceType: "WarehouseWarehouse",
      SeatsAmount: "1",
      Description: "Замовлення",
      Cost: order.total,
      CitySender: process.env.NP_CITY_REF,
      Sender: process.env.NP_SENDER_REF,
      CityRecipient: order.delivery.city,
      RecipientAddress: order.delivery.warehouse
    }
  });

  return data.data[0].IntDocNumber;
};
