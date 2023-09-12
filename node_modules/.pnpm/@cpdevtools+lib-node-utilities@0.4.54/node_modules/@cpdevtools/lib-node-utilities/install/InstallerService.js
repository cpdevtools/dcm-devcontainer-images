"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalInstallerService = exports.InstallerService = void 0;
const dependency_graph_1 = require("dependency-graph");
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs_1 = require("fs");
const linq_1 = __importDefault(require("linq"));
const posix_1 = __importDefault(require("path/posix"));
const dep_graph_1 = require("../utils/dep_graph");
const hooks_1 = require("./hooks");
const AfterInstallOrUpdate_1 = require("./hooks/AfterInstallOrUpdate");
const AfterUninstall_js_1 = require("./hooks/AfterUninstall.js");
const AfterUpdate_js_1 = require("./hooks/AfterUpdate.js");
const BeforeInstallOrUpdate_1 = require("./hooks/BeforeInstallOrUpdate");
const BeforeUninstall_1 = require("./hooks/BeforeUninstall");
const BeforeUpdate_1 = require("./hooks/BeforeUpdate");
const Installer_1 = require("./installer/Installer");
const detectPlatform_1 = require("./platform/detectPlatform");
const Platform_1 = require("./platform/Platform");
class InstallerService {
    constructor() {
        Object.defineProperty(this, "_init", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_scanDirs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_installers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.scanDir(posix_1.default.join(__dirname, "_installers_"));
    }
    scanDir(path) {
        if (!this._scanDirs.includes(path)) {
            this._scanDirs.push(path);
        }
        return this;
    }
    async scanForInstallers() {
        const files = (await Promise.all(this._scanDirs.filter((d) => (0, fs_1.existsSync)(d)).map((d) => (0, fast_glob_1.default)(["*.installer.js", "*/*.installer.js"].map((p) => posix_1.default.join(d, p)))))).flat();
        const installers = files
            .map((f) => require(f))
            .filter((m) => !!m.default)
            .map((m) => (Array.isArray(m.default) ? m.default : [m.default]))
            .map((m) => {
            return m.filter((i) => (0, Installer_1.isValidInstaller)(i));
        })
            .flat();
        return installers;
    }
    init() {
        if (!this._init) {
            this._init = (async () => {
                const scannedInstallers = await this.scanForInstallers();
                scannedInstallers.forEach((inst) => this._addInstaller(inst));
            })();
        }
        return this._init;
    }
    _addInstaller(installer) {
        if ((0, Installer_1.isValidInstaller)(installer)) {
            this._installers.set(installer.id, installer);
        }
    }
    addInstaller(installer) {
        if (!this._init) {
            this._addInstaller(installer);
        }
        else {
            throw new Error(`Install Service already initialized. Can't add any more installers.`);
        }
    }
    get installers() {
        return (async () => {
            await this.init();
            return linq_1.default.from(this._installers.values());
        })();
    }
    async getInstallerById(id, forPlatform) {
        return (await this.installers).firstOrDefault((i) => i.id === id && (!forPlatform || typeof i.platforms === "function" || !!i.platforms[forPlatform]));
    }
    async getPlatformInstallerById(id, forPlatform) {
        if (!forPlatform) {
            const detected = (0, detectPlatform_1.detectPlatform)();
            if (detected === Platform_1.Platform.UNKNOWN) {
                throw new Error("Could not detect Platform");
            }
            forPlatform = detected;
        }
        const platforms = (await this.getInstallerById(id, forPlatform))?.platforms;
        return typeof platforms === "function" ? platforms : platforms?.[forPlatform];
    }
    async hasInstaller(id, forPlatform) {
        return !!(await this.getInstallerById(id, forPlatform));
    }
    async createInstallerInstance(id) {
        const platform = (0, detectPlatform_1.detectPlatform)();
        if (platform === Platform_1.Platform.UNKNOWN) {
            return undefined;
        }
        const installer = await this.getPlatformInstallerById(id, platform);
        return installer ? new installer() : undefined;
    }
    async isInstalled(id) {
        const inst = await this.createInstallerInstance(id);
        return (await inst?.isInstalled) ?? false;
    }
    async installOrUpdateById(idOrInstaller) {
        const inst = typeof idOrInstaller === "string" ? await this.createInstallerInstance(idOrInstaller) : idOrInstaller;
        const wasInstalled = (await inst?.isInstalled) ?? false;
        if (wasInstalled) {
            if ((0, BeforeUpdate_1.implementsBeforeUpdate)(inst)) {
                if ((await inst.beforeUpdate()) === false) {
                    return;
                }
            }
        }
        else {
            if ((0, hooks_1.implementsBeforeInstall)(inst)) {
                if ((await inst.beforeInstall()) === false) {
                    return;
                }
            }
        }
        if ((0, BeforeInstallOrUpdate_1.implementsBeforeInstallOrUpdate)(inst)) {
            if ((await inst.beforeInstallOrUpdate()) === false) {
                return;
            }
        }
        await inst?.installOrUpdate();
        if (wasInstalled) {
            if ((0, AfterUpdate_js_1.implementsAfterUpdate)(inst)) {
                await inst.afterUpdate();
            }
        }
        else {
            if ((0, hooks_1.implementsAfterInstall)(inst)) {
                await inst.afterInstall();
            }
        }
        if ((0, AfterInstallOrUpdate_1.implementsAfterInstallOrUpdate)(inst)) {
            await inst.afterInstallOrUpdate();
        }
    }
    async uninstallById(idOrInstaller) {
        const inst = typeof idOrInstaller === "string" ? await this.createInstallerInstance(idOrInstaller) : idOrInstaller;
        const wasInstalled = (await inst?.isInstalled) ?? false;
        if (wasInstalled) {
            if ((0, BeforeUninstall_1.implementsBeforeUninstall)(inst)) {
                if ((await inst.beforeUninstall()) === false) {
                    return;
                }
            }
            await inst?.uninstall();
            if ((0, AfterUninstall_js_1.implementsAfterUninstall)(inst)) {
                await inst.afterUninstall();
            }
        }
    }
    async updateById(idOrInstaller) {
        const inst = typeof idOrInstaller === "string" ? await this.createInstallerInstance(idOrInstaller) : idOrInstaller;
        const wasInstalled = (await inst?.isInstalled) ?? false;
        if (wasInstalled) {
            if ((0, BeforeUpdate_1.implementsBeforeUpdate)(inst)) {
                if ((await inst.beforeUpdate()) === false) {
                    return;
                }
            }
            if ((0, BeforeInstallOrUpdate_1.implementsBeforeInstallOrUpdate)(inst)) {
                if ((await inst.beforeInstallOrUpdate()) === false) {
                    return;
                }
            }
            await inst?.update();
            if ((0, AfterUpdate_js_1.implementsAfterUpdate)(inst)) {
                await inst.afterUpdate();
            }
            if ((0, AfterInstallOrUpdate_1.implementsAfterInstallOrUpdate)(inst)) {
                await inst.afterInstallOrUpdate();
            }
        }
    }
    async getListItems(list) {
        return (await this.installers).join(list, (o) => o.id, (i) => i.id, (o, i) => ({
            ...i,
            installer: o,
        }));
    }
    async buildInstallerRunList(list) {
        const graph = new dependency_graph_1.DepGraph();
        for (const i of list) {
            await this.buildInstallerRunListAdd(graph, i.id);
        }
        const order = (0, dep_graph_1.depGraphToArray)(graph);
        return order;
    }
    async buildInstallerRunListAdd(graph, id) {
        const installerClass = await this.getPlatformInstallerById(id);
        if (!installerClass) {
            throw new Error(`Could not find installer with id "${id}"`);
        }
        const inst = new installerClass();
        graph.addNode(id, inst);
        if (inst.dependencies?.length) {
            for (const dep of inst.dependencies) {
                await this.buildInstallerRunListAdd(graph, dep);
                graph.addDependency(id, dep);
            }
        }
    }
    async update(list) {
        const installs = await this.buildInstallerRunList(list);
        for (const inst of installs) {
            await this.updateById(inst);
        }
    }
    async installOrUpdate(list) {
        const installs = await this.buildInstallerRunList(list);
        for (const inst of installs) {
            await this.installOrUpdateById(inst);
        }
    }
    async uninstall(list) {
        const installs = (await this.buildInstallerRunList(list)).reverse();
        for (const inst of installs) {
            await this.uninstallById(inst);
        }
    }
}
exports.InstallerService = InstallerService;
exports.GlobalInstallerService = new InstallerService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zdGFsbGVyU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnN0YWxsL0luc3RhbGxlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdURBQTRDO0FBQzVDLDBEQUE2QjtBQUM3QiwyQkFBZ0M7QUFDaEMsZ0RBQThCO0FBQzlCLHVEQUE4QjtBQUM5QixrREFBcUQ7QUFDckQsbUNBQTBFO0FBQzFFLHVFQUE4RTtBQUM5RSxpRUFBcUU7QUFDckUsMkRBQStEO0FBQy9ELHlFQUFnRjtBQUNoRiw2REFBb0U7QUFDcEUsdURBQThEO0FBQzlELHFEQUFvRTtBQUVwRSw4REFBMkQ7QUFFM0Qsa0RBQStDO0FBRy9DLE1BQWEsZ0JBQWdCO0lBSzNCO1FBSkE7Ozs7O1dBQThCO1FBQzlCOzs7O21CQUE4QixFQUFFO1dBQUM7UUFDakM7Ozs7bUJBQThDLElBQUksR0FBRyxFQUFFO1dBQUM7UUFHdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxLQUFLLENBQUMsaUJBQWlCO1FBQzdCLE1BQU0sS0FBSyxHQUFHLENBQ1osTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLGVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMs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