import axios from "axios";
import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();

const cache = new NodeCache({ stdTTL: 600 }); // cache 10 minutos
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const locations = [
  { name: "Ilhéus", state: "Bahia", country: "BR", lat: -14.793889, lon: -39.034444 },
  { name: "Belém", state: "Pará", country: "BR", lat: -1.455833, lon: -48.503889 },
  { name: "Abidjan", state: "", country: "Costa do Marfim", lat: 5.30966, lon: -4.01266 },
  { name: "Accra", state: "", country: "Gana", lat: 5.603717, lon: -0.186964 },
];

let requestCount = 0;
const MAX_REQUESTS_PER_DAY = 900;
let resetTime = Date.now() + 24 * 3600 * 1000;

function checkRateLimit() {
  const now = Date.now();
  if (now > resetTime) {
    requestCount = 0;
    resetTime = now + 24 * 3600 * 1000;
  }
  if (requestCount >= MAX_REQUESTS_PER_DAY) {
    return false;
  }
  requestCount++;
  return true;
}

export async function fetchClimaData() {
  const cached = cache.get("climaData");
  if (cached) {
  return cached;
}

  if (!checkRateLimit()) {
    throw new Error("Limite diário de consultas do clima atingido.");
  }

  const promises = locations.map(async ({ name, state, country, lat, lon }) => {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=pt_br`;
    const res = await axios.get(url);
    const data = res.data;

    return {
      cidade: name,
      estado: state,
      pais: country,
      temp: `${Math.round(data.main.temp)}°C`,
      umidade: `${data.main.humidity}%`,
      condicao: data.weather[0].description,
      icone: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    };
  });

  const results = await Promise.all(promises);
  cache.set("climaData", results);
  return results;
}
