"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = exports.run = exports.exec = exports.ChildProcessObservable = void 0;
const child_process_1 = require("child_process");
const rxjs_1 = require("rxjs");
class ChildProcessObservable extends rxjs_1.Observable {
    constructor(cmd, options) {
        super((subscriber) => {
            const sub = this._process$.subscribe(subscriber);
            return () => {
                sub.unsubscribe();
            };
        });
        Object.defineProperty(this, "cmd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cmd
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "_process$", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new rxjs_1.Observable((subscriber) => {
                const child = (0, child_process_1.spawn)(this.cmd, this.options);
                child.once("error", (err) => {
                    subscriber.error(err);
                });
                child.once("close", (code) => {
                    subscriber.next({
                        type: "close",
                        code: code ?? 0,
                    });
                    subscriber.complete();
                });
                child.on("message", (message) => {
                    subscriber.next({
                        type: "message",
                        message,
                    });
                });
                child.stdout?.on("data", (data) => {
                    try {
                        const str = Buffer.from(data.filter((b) => !!b)).toString("ascii");
                        subscriber.next({
                            type: "data",
                            data: str,
                        });
                    }
                    catch (e) {
                        console.warn("Failed to parse process std output");
                        console.warn(e);
                    }
                });
                child.stderr?.on("data", (data) => {
                    try {
                        const str = Buffer.from(data.filter((b) => !!b)).toString("ascii");
                        subscriber.next({
                            type: "data",
                            data: str,
                        });
                    }
                    catch (e) {
                        console.warn("Failed to parse process std error output");
                        console.warn(e);
                    }
                });
                return () => {
                    child.unref();
                };
            }).pipe((0, rxjs_1.share)())
        });
        Object.defineProperty(this, "data$", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this._process$.pipe((0, rxjs_1.filter)((d) => d.type === "data"))
        });
        Object.defineProperty(this, "dataComplete$", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.data$.pipe((0, rxjs_1.reduce)((a, b) => {
                a.data += b.data;
                return a;
            }, {
                type: "data",
                data: "",
            }))
        });
    }
    get complete() {
        return (0, rxjs_1.lastValueFrom)(this._process$);
    }
}
exports.ChildProcessObservable = ChildProcessObservable;
async function exec(cmd, { cwd, env } = {}) {
    const child = new ChildProcessObservable(cmd, {
        shell: true,
        stdio: "inherit",
        cwd,
        env: env ?? process.env,
    });
    const result = await child.complete;
    return result.code;
}
exports.exec = exec;
async function run(cmd, { cwd, env } = {}) {
    const child = new ChildProcessObservable(cmd, {
        shell: true,
        stdio: "pipe",
        cwd,
        env: env ?? process.env,
    });
    const result = await (0, rxjs_1.lastValueFrom)(child.dataComplete$);
    const comp = await child.complete;
    if (comp.code !== 0) {
        throw {
            code: comp.code,
            data: result.data,
        };
    }
    return result.data;
}
exports.run = run;
async function start(cmd, { cwd } = {}) {
    const child = (0, child_process_1.spawn)(cmd, {
        shell: true,
        detached: true,
        stdio: "ignore",
        cwd,
        env: process.env,
    });
    child.unref();
}
exports.start = start;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NtZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBa0U7QUFFbEUsK0JBQXdFO0FBa0J4RSxNQUFhLHNCQUF1QixTQUFRLGlCQUE2QjtJQW9EdkUsWUFBb0MsR0FBVyxFQUFtQixPQUFxQjtRQUNyRixLQUFLLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRCxPQUFPLEdBQUcsRUFBRTtnQkFDVixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7Ozs7O21CQU4rQjs7Ozs7O21CQUE4Qjs7UUFuRGxFOzs7O21CQUE2QixJQUFJLGlCQUFVLENBQW9CLENBQUMsVUFBVSxFQUFFLEVBQUU7Z0JBQzVFLE1BQU0sS0FBSyxHQUFHLElBQUEscUJBQUssRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDMUIsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDM0IsVUFBVSxDQUFDLElBQUksQ0FBQzt3QkFDZCxJQUFJLEVBQUUsT0FBTzt3QkFDYixJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUM7cUJBQ1UsQ0FBQyxDQUFDO29CQUM3QixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO2dCQUVILEtBQUssQ0FBQyxFQUFFLENBQUMsU0FB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