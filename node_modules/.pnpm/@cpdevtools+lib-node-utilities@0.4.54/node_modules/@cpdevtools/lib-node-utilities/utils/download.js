"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDownload = void 0;
const cli_progress_1 = __importDefault(require("cli-progress"));
const date_fns_1 = require("date-fns");
const fs_1 = __importDefault(require("fs"));
const rxjs_1 = require("rxjs");
const axios_1 = __importDefault(require("axios"));
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function toFormattedEvent(evt) {
    try {
        const eta = (0, date_fns_1.intervalToDuration)({ start: 0, end: evt.eta * 1000 });
        const duration = (0, date_fns_1.intervalToDuration)({ start: 0, end: evt.duration * 1000 });
        return {
            type: "progress",
            timeRemaining: (0, date_fns_1.formatDuration)(eta, {
                format: ["hours", "minutes", "seconds"],
            }),
            duration: (0, date_fns_1.formatDuration)(duration, {
                format: ["hours", "minutes", "seconds"],
            }),
            percent: `${Math.floor(evt.percent * 10000) / 100}%`,
            time: evt.time,
            size: formatBytes(evt.bytesTotal),
            received: formatBytes(evt.bytesReceived),
            rate: formatBytes(evt.bytesRate) + "/s",
        };
    }
    catch {
        return {
            type: "progress",
            timeRemaining: "",
            duration: "",
            percent: "",
            time: evt.time ?? new Date(),
            rate: "",
            received: "",
            size: "",
        };
    }
}
class FileDownload {
    constructor(sourceUrl, filePath) {
        Object.defineProperty(this, "sourceUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: sourceUrl
        });
        Object.defineProperty(this, "filePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePath
        });
        Object.defineProperty(this, "_downloadPromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_started", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_progressHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_events$$", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new rxjs_1.Subject()
        });
        Object.defineProperty(this, "events$", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this._events$$.asObservable()
        });
        Object.defineProperty(this, "progress$", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.events$.pipe((0, rxjs_1.filter)((e) => e.type === "progress"))
        });
        Object.defineProperty(this, "progressFormatted$", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.progress$.pipe((0, rxjs_1.map)(toFormattedEvent))
        });
    }
    download(showProgressBar) {
        let bar = showProgressBar
            ? new cli_progress_1.default.SingleBar({
                format: "{bar} {percent} - {timeRemaining} @ {rate}",
                barsize: 40,
            })
            : null;
        if (!this._downloadPromise) {
            this._started = new Date();
            this._downloadPromise = new Promise(async (res, rej) => {
                this._events$$.next({
                    type: "connecting",
                    time: new Date(),
                });
                const response = await axios_1.default.request({
                    method: "get",
                    responseType: "stream",
                    url: this.sourceUrl,
                });
                const bytesTotal = +response.headers["content-length"] ?? -1;
                let bytesReceived = 0;
                bar?.start(bytesTotal, 0);
                this._events$$.next({
                    type: "connected",
                    time: new Date(),
                    contentType: response.headers["content-type"],
                    bytesTotal,
                });
                this._progressHistory.push([new Date(), 0]);
                const message = response.data;
                message.pipe(fs_1.default.createWriteStream(this.filePath));
                message.on("data", (data) => {
                    bytesReceived += data.length;
                    this._progressHistory.push([new Date(), bytesReceived]);
                    const stats5Sec = this.calcProgressStats(bytesReceived, bytesTotal, 5);
                    const stats30Sec = this.calcProgressStats(bytesReceived, bytesTotal, 30);
                    const event = {
                        ...stats30Sec,
                        bytesRate: stats5Sec.bytesRate,
                    };
                    this._events$$.next(event);
                    bar?.update(event.bytesReceived, toFormattedEvent(event));
                    this.pruneHistory();
                });
                message.on("end", () => {
                    bytesReceived = bytesTotal;
                    const stats5Sec = this.calcProgressStats(bytesReceived, bytesTotal, 5);
                    const stats30Sec = this.calcProgressStats(bytesReceived, bytesTotal, 30);
                    const event = {
                        ...stats30Sec,
                        bytesRate: stats5Sec.bytesRate,
                    };
                    this._events$$.next(event);
                    bar?.update(event.bytesReceived, toFormattedEvent(event));
                    bar?.stop();
                    const now = new Date();
                    this._events$$.next({
                        type: "complete",
                        time: now,
                        bytesTotal,
                        rate: stats5Sec.bytesRate,
                        duration: (0, date_fns_1.differenceInMilliseconds)(now, this._started) / 1000,
                    });
                    this._started = undefined;
                    this._progressHistory = [];
                    this._downloadPromise = undefined;
                    res();
                });
                message.on("error", (err) => {
                    this._events$$.next({
                        type: "error",
                        time: new Date(),
                        error: err,
                    });
                    this._started = undefined;
                    this._progressHistory = [];
                    this._downloadPromise = undefined;
                    bar?.stop();
                    rej(err);
                });
            });
        }
        return this._downloadPromise;
    }
    pruneHistory() {
        const now = new Date();
        this._progressHistory = this._progressHistory.filter((d) => (0, date_fns_1.differenceInSeconds)(now, d[0]) <= 30);
    }
    calcProgressStats(loaded, total, timeSpan = 5) {
        const now = new Date();
        const data = this._progressHistory.find((d) => (0, date_fns_1.differenceInSeconds)(now, d[0]) <= timeSpan);
        if (data) {
            const [sTime, sBytes] = data;
            const deltaTime = (0, date_fns_1.differenceInMilliseconds)(now, sTime);
            const deltaBytes = loaded - sBytes;
            const bytesRemaining = total - loaded;
            const rate = (deltaBytes / deltaTime) * 1000;
            const eta = bytesRemaining / rate;
            return {
                type: "progress",
                bytesRate: rate,
                bytesReceived: loaded,
                bytesTotal: total,
                eta: eta,
                percent: loaded / (total || -1),
                time: now,
                duration: (0, date_fns_1.differenceInMilliseconds)(now, this._started) / 1000,
            };
        }
        else {
            return {
                type: "progress",
                bytesRate: 0,
                bytesReceived: loaded,
                bytesTotal: total,
                eta: 0,
                percent: loaded / (total || -1),
                time: now,
                duration: (0, date_fns_1.differenceInMilliseconds)(now, this._started) / 1000,
            };
        }
    }
}
exports.FileDownload = FileDownload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZG93bmxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0VBQXVDO0FBQ3ZDLHVDQUE2RztBQUM3Ryw0Q0FBb0I7QUFFcEIsK0JBQXdEO0FBRXhELGtEQUF5QztBQTJDekMsU0FBUyxXQUFXLENBQUMsS0FBYSxFQUFFLFdBQW1CLENBQUM7SUFDdEQsSUFBSSxLQUFLLEtBQUssQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFDO0lBRWxDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNmLE1BQU0sRUFBRSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV4RSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBELE9BQU8sVUFBVSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFrQjtJQUMxQyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsSUFBQSw2QkFBa0IsRUFBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcs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