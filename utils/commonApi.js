const axios = require("axios");

const parseResponseToJson = (responseData) => {
  const lines = responseData
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const keys = lines[0].split("|").map((key) => key.trim());
  const objects = lines.slice(1).map((line) => {
    const values = line.split("|").map((value) => (value ? value.trim() : ""));
    const obj = {};
    keys.forEach((key, index) => {
      obj[key.replace(/\r$/, "")] = values[index]
        ? values[index].replace(/\r$/, "")
        : "";
    });
    return obj;
  });
  return objects;
};

const matrixApi = async (urlParams) => {
  const url = `http://localhost/cosec/api.svc/v2/${urlParams}`;
  const authHeader = "Basic c2E6QWRtaW5AMTIz";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authHeader,
      },
    });
    const jsonData = parseResponseToJson(response.data);
    return {
      statusCode: 200,
      data: jsonData,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      error: error.response ? error.response.data : error.message,
    };
  }
};
const matrixDeviceApi = async (urlParams) => {
  const url = ` http://192.168.0.162/device.cgi/enrolluser?${urlParams}`;
  const authHeader = "Basic YWRtaW46MTIzNA==";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authHeader,
      },
    });
    return {
      statusCode: 200,
      data: response.data,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      error: error.response ? error.response.data : error.message,
    };
  }
};
module.exports = { matrixApi, matrixDeviceApi };
