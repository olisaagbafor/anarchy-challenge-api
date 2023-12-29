import errorMiddleware from "../middlewares/errorMiddleware.js";
import userRoutes from "../routes/usersRoutes.js";
import authRoutes from "../routes/authRoutes.js";

export default function (app) {
  //Mount Routers
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/auth", authRoutes);

  // Error Middleware
  app.use(errorMiddleware);
}
