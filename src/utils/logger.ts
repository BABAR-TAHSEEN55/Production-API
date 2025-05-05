import logger from "pino";
// import dayjs from "dayjs";

//Can include the entire object if in need
const log = logger({
  transport: {
    target: "pino-pretty",
  },
});
export default log;
