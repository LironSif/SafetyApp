import dotenv from "dotenv";
dotenv.config();

const port = process.env.SERVER_PORT;
const baseUrl = process.env.BASE_SERVER_URL;

const environment = process.env.NODE_ENV;

const renderUrl = `${process.env.DEPLOY_SERVER}`;

export const serverApiUrl =
  environment === "production" ? renderUrl : `${baseUrl}:${port}`;

export const clientUrl =
  environment === "production"
    ? process.env.DEPLOY_CLIENT
    : `${baseUrl}:${process.env.CLIENT_PORT}`;
