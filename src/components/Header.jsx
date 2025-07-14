import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const Header = ({ cities, handleLanguageClick, city, handleSetCity }) => {
  const { t } = useTranslation();

  return (
    <AppBar component="nav" sx={{ position: "fixed", zIndex: 1000 }}>
      <Toolbar>
        {/* box */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ margin: "20px 0" }}
            onClick={handleLanguageClick}
            variant="contained"
          >
            {t("عربي")}
          </Button>

          <FormControl sx={{ color: "white" }}>
            <InputLabel variant="standard" sx={{ color: "white" }}>
              {t("City")}
            </InputLabel>

            <NativeSelect
              value={city}
              onChange={(e) => handleSetCity(e.target.value)}
            >
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {t(c.name)}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header
