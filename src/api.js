import { useState, useEffect } from "react";

const API_URL = "http://volcanoesapi.aarun.info";
const token = localStorage.getItem("token");
const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export function getVolcanoesByCountry(country) {
  const url = `${API_URL}/volcanoes?country=${country}`; //returns an array of JSON
  return fetch(url).then((res) => res.json());
}

export function getVolcanoesByCountryPop(country, population) {
  const url = `${API_URL}/volcanoes?country=${country}&populatedWithin=${population}km`; //returns an array of JSON
  return fetch(url).then((res) => res.json());
}

export function getVolcanoById(id) {
  const url = `${API_URL}/volcano/${id}`; //returns JSON only
  //if logged in, send the fetch request with the authorisation header
  // if (token !== null) {
  //   return fetch(url, { headers }).then((res) => res.json());
  // }
  // return fetch(url).then((res) => res.json());
  return token !== null ? fetch(url, {
    headers
  })
  .then((res => res.json())) : 
  fetch(url).then((res) => res.json())
}

export function getCountries() {
  const url = `${API_URL}/countries`; //returns an array only
  return fetch(url).then((res) => res.json());
}

export function useVolcanoesByCountry(country) {
  const [loading, setLoading] = useState(true);
  const [volcanoes, setVolcanoes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country === undefined) {
      setLoading(false);
    } else {
      getVolcanoesByCountry(country)
        .then((volcanoes) => {
          setVolcanoes(volcanoes);
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [country]);
  return { loading, volcanoes, error };
}

export function useVolcanoesByCountryPop(country, population) {
  const [loading2, setLoading] = useState(true);
  const [volcanoesPop, setVolcanoes] = useState([]);
  const [error2, setError] = useState(null);

  useEffect(() => {
    if (
      country === undefined ||
      population === undefined ||
      population === ""
    ) {
      setLoading(false);
    } else {
      getVolcanoesByCountryPop(country, population)
        .then((volcanoes) => {
          setVolcanoes(volcanoes);
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [country, population]);
  return { loading2, volcanoesPop, error2 };
}

export function useVolcanoesById(id) {
  const [loading, setLoading] = useState(true);
  const [volcano, setVolcano] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getVolcanoById(id)
      .then((volcano) => {
        setVolcano(volcano);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return { loading, volcano, error };
}

export function useCountries() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCountries()
      .then((countries) => {
        setCountries(countries);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { loading, countries, error };
}
