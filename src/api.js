import { useState, useEffect } from "react";

const API_URL = "http://sefdb02.qut.edu.au:3001";
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

export function getVolcanoById(id) {
  const url = `${API_URL}/volcano/${id}`; //returns JSON only
  if (token !== null) {
    return fetch(url, { headers }).then((res) => res.json());
  }
  return fetch(url).then((res) => res.json());
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
  }, [country]);

  return {
    loading,
    volcanoes,
    error,
  };
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
