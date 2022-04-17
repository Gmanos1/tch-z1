//Import bibliotek
const express = require("express");
const axios = require("axios");
const app = express();

//Ustawielenie portu serwera, jezeli zeminna srodowiskowa PORT zostanie ustawiona, serwer na
//jej podstawie okresli port lub domyslnie 3000
const port = process.env.PORT | 3000;

//Utworzenie endpointa
app.get("/", (req, res) => {
  //Pobranie adresu ip klienta z zapytania
  const ip = req.ip;
  res.write(`Adres ip klienta z perspektywy dockera: ${ip}\n`);
  //Wykorzystanie biblioteki axios i api "ipwhois.app" do
  //pobrania informacji o strefie czasowej klienta
  axios
    .get(`https://ipwhois.app/json/`)
    .then((axiosRes) => {
      const data = axiosRes.data;
      if (data.success) {
        //Okreslenie czasu klienta na podstawie strefy czasowej
        let dateTime = new Date().toLocaleString("pl-PL", {
          timeZone: data.timezone,
        });
        res.write(`Adres klienta na podstawie ipwhois: ${data.ip}\n`)
        res.write(`Data, godzina u klienta na podstawie adresu IP (ipwhois): ${dateTime}`);
      } else {
        res.write("Nie udalo sie pobrac daty i godziny\n");
        res.write(`Wiadomsoc bledu zwrocona przez axiosa:\n${data.message}`)
      }
      res.send();
    })
    .catch((error) => {
      console.error(error);
    });
});

//Utworzenie serwera i nasluchiwanie na portcie
app.listen(port, () => {
  console.log("----Autor: Konrad Miziński----");
  console.log(`Data uruchomienia: ${Date()}`);
  console.log(`Serwer nasłuchuje na portcie ${port}`);
});
