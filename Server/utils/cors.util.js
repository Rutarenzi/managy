const whitelist = [
  "*",
  "http://localhost:6161",
  "https://invictusRMF.vercel.app",
  "http://localhost:5000",
  "https://client-sigma-one.vercel.app"
];
const options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // console.log("Origin: ", origin);
      callback(null, true);
    } else {
      // console.log("Origin: ", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  credentials: true,
  exposedHeaders: ["*", "Authorization"],
};

module.exports = options;
