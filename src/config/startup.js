import colors from "colors";
import express from "express";
import cors from "cors";

export default function (app) {
  //invoking imported dependencies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
}
