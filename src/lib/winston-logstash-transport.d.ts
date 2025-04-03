declare module "winston-logstash-transport" {
    import TransportStream from "winston-transport";

    export interface LogstashTransportOptions {
        host?: string;
        port?: number;
        node_name?: string;
        timeout_connect_retries?: number;
        retryInterval?: number;
    }

    export class LogstashTransport extends TransportStream {
        constructor(options: LogstashTransportOptions);
    }
}
