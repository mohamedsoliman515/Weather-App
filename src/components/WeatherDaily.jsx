import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
const WeatherDaily = ({ item, city }) => {
  const { t } = useTranslation();

  const dayName = new Date(item.dt * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });
console.log("re render");

  return (
    /* card */
    <div
      className="card"
      style={{
        width:"420px",
        background: "rgb(28 52 91 / 36%)",
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "0px 11px 1px rgba(0, 0, 0 ,0.5)",
        margin: "20px 0",
      }}
    >
      <div className="content">
        {/*  start header*/}
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "start",
          }}
          className="city-time"
        >
          <Typography
            variant="h2"
            style={{ marginRight: "20px", fontWeight: "600" }}
          >
            {t(city)}
          </Typography>
          <Typography style={{ margin: "0 5px" }} variant="h5">
            {item.dt_txt.split(" ")[0].trim()}
          </Typography>
          <Typography variant="h5">{t(dayName.toLowerCase())}</Typography>
        </div>

        {/* end header */}
        <hr />
        {/* start degree-description + cloud image*/}

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="degree-description">
            <div>
              <Typography style={{ textAlign: "center" }} variant="h2">
                {Math.round(item.main.temp)}
              </Typography>
            </div>

            <Typography style={{ textAlign: "center" }} variant="h4">
              {t(item.weather[0].description).trim()}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <h4>
                {t("Maximum")} : {Math.round(item.main.temp_max)}
              </h4>
              <h4 style={{ margin: "0 3px" }}> | </h4>
              <h4>
                {t("Minimum")} : {Math.round(item.main.temp_min)}
              </h4>
            </div>
          </div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="sa"
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
          </div>
        </div>
        {/* end degree-description + cloud image*/}
      </div>
    </div>
    /* card */
  );
};

export default WeatherDaily;
