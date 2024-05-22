export default [
  {
    url: "/api/getGroups",
    method: "get",
    statusCode: 200,
    response: () => {
      return  ["tom", "jerry"];
    }
  }
];