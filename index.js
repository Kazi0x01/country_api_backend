const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
// Content Type application/json
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

const PORT = 3000 || env.PORT;

const getBorders = async (borders) => {
  try {
    const borderList = await Promise.all(
      borders.map(async (country_code) => {
        try {
          const response = await fetch(
            process.env.API_endpoint_countryCode + country_code
          );
          if (!response.ok)
            throw new Error("Cannot find country with given code");
          const data = await response.json();
          return data[0].name.common;
        } catch (err) {
          throw err;
        }
      })
    );

    return borderList;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const extractData = async (data) => {
  const countryInfo = {
    name: data.name.common,
    official_name: data.name.official_name,
    country_code: data.cca2,
    is_independent: data.independent,
    is_unMember: data.unMember,
    currencies: data.currencies,
    capital: data.capital,
    region: data.region,
    sub_region: data.subregion,
    continents: data.continenets,
    timezone: data.timezones,
    population: data.population,
    traffic_side: data.car.side,
    languages: Object.values(data.languages),
    borders: await getBorders(data.borders),
    geo_loc: { lat: data.latlng[0], lng: data.latlng[1] },
    flags: data.flags.svg ? data.flags.svg : data.flags.alt,
    coatOfArms: data.coatOfArms.svg ? data.coatOfArms.svg : data.coatOfArms.png,
    startOfWeek: data.startOfWeek,
  };
  return countryInfo;
};

const validateQuery = (req, res, next) => {
  const validParams = ["country", "lat", "lng"];

  const invalidParams = Object.keys(req.query).filter(
    (param) => !validParams.includes(param)
  );

  if (invalidParams.length > 0) {
    return res.status(400).json({
      error: `Invalid query parameter(s): ${invalidParams.join(", ")}`,
    });
  }

  next();
};
app.use(validateQuery);

// root route
app.get("/", (req, res) => {
  if (!req.query.country) {
    res.status(404).json({
      error: "Please pass in the query parameter",
    });
  }

  const { country } = req.query;
  const getCountryInfo = fetch(
    process.env.API_endpoint + country.toString() + "?fullText=true"
  )
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(`No country found with name ${country} found.`);
      }
    })
    .then((data) => {
      return data;
    })
    .then(async (data) => {
      const filtered_data = await extractData(data[0]);
      res.send(filtered_data);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).json({
        error: err.message,
      });
    });
});

app.get("/embed-map", (req, res) => {
  const { lat, lng } = req.query;
  const redirect_uri = `https://www.google.com/maps/embed/v1/view?key=${process.env.API_KEY}&center=${lat},${lng}&zoom=5`;
  res.status(200).redirect(redirect_uri);
});

//handle invalid route

app.get("*", (req, res) => {
  res.status(404).json({
    error: "invalid route ",
  });
});

app.listen(PORT, () => {
  console.log(`Countries API listening at http://localhost:${PORT}`);
});

console.log("Server up and Running ");
