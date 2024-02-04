import axios from "axios";

export default function fetch(params: {
  url: string;
  data?: any;
  headers?: any;
}) {
  const baseURL = "http://localhost:3333/api";

  const { url, data, headers } = params;

  const options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...headers,
    },
  };

  return {
    GET: async () => {
      try {
        const response = await axios.get(`${baseURL}${url}`, options);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    POST: async () => {
      if (data) {
        try {
          const response = await axios
            .post(`${baseURL}${url}`, data, options)
            .then((res) => {
              if (res.status === 200) {
                return res.data;
              }

              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
              return err.response.data;
            });

          return response;
        } catch (error) {
          throw error;
        }
      }
    },

    PUT: async () => {
      if (data) {
        try {
          const response = await axios.put(`${baseURL}${url}`, data, options);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
    },

    DELETE: async () => {
      if (data) {
        try {
          const response = await axios.delete(`${baseURL}${url}`, options);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
    },
  };
}
