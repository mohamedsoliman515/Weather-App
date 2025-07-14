import Container from "@mui/material/Container";
import WeatherDaily from "./components/WeatherDaily";

import { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";

let cancelAxios = null;

function App() {
  //  use  reducer
  const [data, setData] = useState([]);
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Cairo");
  const [lang, setLang] = useState("en");
  //
  const { i18n } = useTranslation();

    function handleSetCity(e) {
      setCity(e);
    }
  const loopDate = data.map((item) => {
    return <WeatherDaily key={item.dt} item={item} city={city} />;
  });

  function handleLanguageClick() {
    if (lang == "en") {
      setLang("ar");
    } else {
      setLang("en");
    }
    i18n.changeLanguage(lang);
  }
  const cities = [
    { name: "Cairo", lat: 30.033333, lon: 31.233334 },
    { name: "Alex", lat: 31.2001, lon: 29.9187 },
    { name: "Giza", lat: 30.0131, lon: 31.2089 },
    { name: "Gaza", lat: 31.5018, lon: 34.4668 },
  ];

  useEffect(() => {
    const selectedCity = cities.find((c) => c.name === city);

    if (!selectedCity) return;

    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&units=metric&appid=24bacb7a29a1084ab91f1cb1192c1812`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )

      .then((response) => {
        const dailyForecast = response.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setData(dailyForecast);
        setLoading(false);
        setError("");
      })
      .catch(() => {
        setData([]);
        setLoading(false);
        setError(" Check your network ! ");
      });
    return () => {
      cancelAxios();
    };
  }, [city]);

  if (loading) {
    return (
      <>
        <Backdrop style={{ color: "#fff", zIndex: 1 }} open={loading}>
          <CircularProgress color="primary" />
        </Backdrop>
      </>
    );
  }
  if (error)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <h1>{error}</h1>
      </div>
    );

  return (
    <>
      <Header
        cities={cities}
        handleLanguageClick={handleLanguageClick}
        city
        handleSetCity={handleSetCity}
      />
      <Container
        fixed
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
          margin: "70px auto",
          direction: `${lang === "ar" ? "ltr" : "rtl"}`,
        }}
      >
        {loopDate}
      </Container>
    </>
  );
}

export default App;
