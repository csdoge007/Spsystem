export default [
  {
    url: "/api/getGroups",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: ["tom", "jerry"]
      };
    }
  }
];