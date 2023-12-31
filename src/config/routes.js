import errorMiddleware from "../middlewares/errorMiddleware.js";
import chatsRoutes from "../routes/chatsRoutes.js";
import conversationsRoutes from "../routes/conversationsRoutes.js";
import userRoutes from "../routes/usersRoutes.js";
import authRoutes from "../routes/authRoutes.js";

export default function (app) {
  //Mount Routers
  app.use("/api/v1/chats", chatsRoutes);
  app.use("/api/v1/conversations", conversationsRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/auth", authRoutes);

  // Error Middleware
  app.use(errorMiddleware);
}
