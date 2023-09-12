import { PlatformInstallerBase } from "./PlatformInstallerBase";
export declare class YarnInstaller extends PlatformInstallerBase {
    get isInstalled(): Promise<boolean>;
    installOrUpdate(): Promise<void>;
    update(): Promise<void>;
    uninstall(): Promise<void>;
}
