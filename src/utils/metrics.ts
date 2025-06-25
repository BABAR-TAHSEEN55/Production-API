import express from "express";
import client from "prom-client";
import { Request, Response } from "express";
import logger from "./logger.ts";

const app = express();
const METRIX_PORT = 9100;
export const RestResponseTimeHistogram = new client.Histogram({
    name: "rest_response_time_duration_seconds",
    help: "REST API response time in Seconds",
    labelNames: ["method", "route", "status_code"],
});
export const DataBaseResponseTimeHistogram = new client.Histogram({
    name: "db",
    help: "DataBase response time in Seconds",
    labelNames: ["operations", "success"],
});

export const StartMetricsServer = () => {
    //NOTE :Collectin default metrics like CPU , Memory usuage extra, or memory spiking
    const CollectDefaultMetrics = client.collectDefaultMetrics;
    CollectDefaultMetrics();
    app.get("/metrics", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", client.register.contentType);
        //NOTE : This is going to expose all metrics
        res.send(await client.register.metrics());
    });
    app.listen(METRIX_PORT, () =>
        logger.info(`Mertrics Server started at ${METRIX_PORT}`),
    );
};
