import { Weather } from "./types.js";

export const places = [
  { city: "Amesbury", country: "UK" },
  { city: "Amsterdam", country: "NL" },
  { city: "Athens", country: "GR" },
  { city: "Bali", country: "ID" },
  { city: "Barcelona", country: "ES" },
  { city: "Beijing", country: "CN" },
  { city: "Berlin", country: "DE" },
  { city: "Brussels", country: "BE" },
  { city: "Budapest", country: "HU" },
  { city: "Cairo", country: "EG" },
  { city: "Cancun", country: "MX" },
  { city: "Dubai", country: "AE" },
  { city: "Fuji", country: "JP" },
  { city: "Hanga Roa", country: "CL" },
  { city: "Istanbul", country: "TR" },
  { city: "Johannesburg", country: "ZA" },
  { city: "Kuala Lumpur", country: "MY" },
  { city: "Kyoto", country: "JP" },
  { city: "London", country: "UK" },
  { city: "Magelang", country: "ID" },
  { city: "Matsumoto", country: "JP" },
  { city: "Miyajima", country: "JP" },
  { city: "Moscow", country: "RU" },
  { city: "Munich", country: "DE" },
  { city: "New Delhi", country: "IN" },
  { city: "New York", country: "US" },
  { city: "Paris", country: "FR" },
  { city: "Patagonia", country: "AR" },
  { city: "Petra", country: "JO" },
  { city: "Phuket", country: "TH" },
  { city: "Pisa", country: "IT" },
  { city: "Rio de Janeiro", country: "BR" },
  { city: "Rome", country: "IT" },
  { city: "Saint Petersburg", country: "RU" },
  { city: "San Francisco", country: "US" },
  { city: "Seattle", country: "US" },
  { city: "Seoul", country: "KR" },
  { city: "Siem Reap", country: "KH" },
  { city: "Singapore", country: "SG" },
  { city: "Sydney", country: "AU" },
  { city: "Venice", country: "IT" },
  { city: "Washington DC", country: "US" },
];

const apiKey = "07b72c930f0d226f7c6866cc753a678c";

export async function fetch(city: string): Promise<Weather> {
  const slug = city.replace(/-/g, "+");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${slug}&appid=${apiKey}&units=metric`;
  return globalThis.fetch(url).then((response) => response.json());
}

export function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

export function toSlug(name: string): string {
  return name.replace(/ /g, "-").toLowerCase();
}

export const gradientColours = [
  "azure",
  "#fffff0",
  "#fff6f0",
  "#fff0f0",
  "#f6fff0",
  "#f0fffe",
  "#f0f3ff",
  "#fff0fe",
];
