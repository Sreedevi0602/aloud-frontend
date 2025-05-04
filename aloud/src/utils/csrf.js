// src/utils/csrf.js
import axios from "axios";

export const getCSRFToken = async () => {
  await axios.get("http://localhost:8000/api/csrf/", {
    withCredentials: true,
  });

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const csrfToken = getCookie("csrftoken");

  axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
};
