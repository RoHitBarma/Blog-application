

// import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       success: false,
//       message: "No token provided",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { _id: decoded.id }; // { id: ... }
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     });
//   }
// };

// export const authMiddleware = (req, res, next) => {
//   console.log("AUTH HEADER:", req.headers.authorization);

//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = req.headers.authorization.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };


import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: userId }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
