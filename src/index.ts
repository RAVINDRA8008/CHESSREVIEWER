import express, { Request, Response, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import client from "prom-client"; // Prometheus client
import winston from "winston";
import { LogstashTransport } from 'winston-logstash-transport';


dotenv.config();
import apiRouter from "./api";

const app = express();

// 🔹 Logstash Logger Setup
const logstashHost = process.env.LOGSTASH_HOST || "127.0.0.1";
const logstashPort = parseInt(process.env.LOGSTASH_PORT || "5000");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new LogstashTransport({
            host: logstashHost,
            port: logstashPort,
        }),
    ],
});

// 🔹 Prometheus Metrics Setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collect system-level metrics

// Custom Histogram to measure response time
const httpRequestDurationMicroseconds = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.5, 1, 2, 5, 10], // More granular buckets
});

// Custom Counter to count total HTTP requests
const httpRequestsTotal = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests received",
    labelNames: ["method", "route", "status_code"],
});

// Custom Gauge for active users simulation
const activeUsers = new client.Gauge({
    name: "active_users",
    help: "Number of active users",
});

// Custom Summary for request size
const requestSizeSummary = new client.Summary({
    name: "http_request_size_bytes",
    help: "Size of HTTP requests in bytes",
    labelNames: ["method", "route"],
});

// Custom Gauge for memory usage
const memoryUsageGauge = new client.Gauge({
    name: "memory_usage_bytes",
    help: "Memory usage in bytes",
    labelNames: ["type"],
});

// Additional Gauge for CPU Usage
const cpuUsageGauge = new client.Gauge({
    name: "cpu_usage_percentage",
    help: "CPU usage percentage",
});

// 🔹 Request Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    
    next();
});

// Middleware to track request durations and count requests
app.use((req, res, next) => {
    const start = process.hrtime();
    const requestSize = req.headers["content-length"] ? parseInt(req.headers["content-length"] as string) || 0 : 0;

    res.on("finish", () => {
        const durationInSeconds = process.hrtime(start)[0] + process.hrtime(start)[1] / 1e9;
        httpRequestDurationMicroseconds
            .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
            .observe(durationInSeconds);

        httpRequestsTotal
            .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
            .inc();

        requestSizeSummary
            .labels(req.method, req.route?.path || req.path)
            .observe(requestSize);

<<<<<<< HEAD
        
=======
       
>>>>>>> 8221ebf823216da8465c1994cc7fd616deb572d7
    });

    next();
});

// Simulate active users count
setInterval(() => {
    const users = Math.floor(Math.random() * 100);
    activeUsers.set(users);
}, 5000);

// Update memory usage gauge
setInterval(() => {
    memoryUsageGauge.set({ type: "rss" }, process.memoryUsage().rss);
    memoryUsageGauge.set({ type: "heapTotal" }, process.memoryUsage().heapTotal);
    memoryUsageGauge.set({ type: "heapUsed" }, process.memoryUsage().heapUsed);
}, 5000);

// Update CPU usage gauge
setInterval(() => {
    const cpuUsage = process.cpuUsage();
    const userCpuPercent = (cpuUsage.user / 1e6).toFixed(2);
    cpuUsageGauge.set(parseFloat(userCpuPercent));
}, 5000);

// 🔹 Expose Prometheus Metrics Endpoint
app.get("/metrics", async (req, res) => {
    try {
        res.set("Content-Type", client.register.contentType);
        const metrics = await client.register.metrics();
        res.send(metrics);
    } catch (err) {
        const error = err as Error;
        logger.error("🚨 Error generating metrics:", { message: error.message });
        res.status(500).send(`Error generating metrics: ${error.message}`);
    }
});

app.use(express.json());

// Serve static files
app.use(
    "/static",
    express.static("dist/public"),
    express.static("src/public")
);

app.use("/api", apiRouter);

app.get("/", (req, res) => {
    res.sendFile(path.resolve("src/public/pages/report/index.html"));
});

app.get("/privacy", (req, res) => {
    res.sendFile(path.resolve("src/public/pages/privacy/index.html"));
});

// 🔹 Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error("❌ Internal Server Error", { message: err.message });
    res.status(500).send("Internal Server Error");
});

// 🚀 Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
});
