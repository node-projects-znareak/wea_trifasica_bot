const {
  api_bitcoint,
  api_dolartoday,
  api_cat,
  anime_api,
  sexy_anime_api,
} = require("../config");
const { toBs, to$ } = require("./utils");
const axios = require("axios").default;

async function getData() {
  const xhr = await axios.get(api_dolartoday);
  return xhr.data;
}
async function getDataBitcointPrices() {
  const xhr = await axios.get(api_bitcoint);
  return xhr.data;
}

async function getDollarPrice() {
  const priceDollar = await getData();
  return toBs(priceDollar.USD.promedio);
}

async function getEuroPrice() {
  const priceDollar = await getData();
  return toBs(priceDollar.EUR.promedio);
}

async function getpetroleumPrice() {
  const priceDollar = await getData();
  return to$(priceDollar.MISC.petroleo);
}

async function getBitcointPrice() {
  const priceBitcoin = await getDataBitcointPrices();
  let price = priceBitcoin.bpi.USD.rate.replace(",", ".");

  price = price.substring(0, price.lastIndexOf("."));
  return "$" + price;
}

async function getRandomCat() {
  const xhr = await axios.get(api_cat);
  const cat = xhr.data;
  return cat[0].url;
}

//  ------------ ANIME SECTION --------------------

async function getAnimesTop(limit = 50) {
  const xhr = await axios.get(anime_api + "upcoming", {
    headers: {
      "x-rapidapi-host": "jikan1.p.rapidapi.com",
      "x-rapidapi-key": "d4ceadfdb9msh29ad073607e515bp1397f3jsnb655d8656ac7",
    },
  });

  const animeList = xhr.data;
  animeList.top.length = limit;
  return animeList.top;
}

async function getAnimeImageType(tag) {
  const xhr = await axios.get(sexy_anime_api + tag);
  return xhr.data?.images?.[0];
}

//  ------------ END ANIME SECTION --------------------

async function dollarPrice() {
  const dollar = await getDollarPrice();
  return `💵 El dolár está en: ${dollar}`;
}

async function euroPrice() {
  const euro = await getEuroPrice();
  return `💶 El euro está en: ${euro}`;
}

async function petroleumPrice() {
  const petroleum = await getpetroleumPrice();
  return `🛢️ El petróleo está en: ${petroleum}`;
}

async function bitcoinPrice() {
  const bitcoin = await getBitcointPrice();
  return `₿ El bitcoin está en: ${bitcoin}`;
}

async function allPrices() {
  const promises = [
    dollarPrice(),
    euroPrice(),
    petroleumPrice(),
    bitcoinPrice(),
  ];
  const prices = await Promise.all(promises);
  let template = "";
  for (const price of prices) {
    template += price + "\n";
  }

  return template;
}

module.exports = { allPrices, getRandomCat, getAnimesTop, getAnimeImageType };
