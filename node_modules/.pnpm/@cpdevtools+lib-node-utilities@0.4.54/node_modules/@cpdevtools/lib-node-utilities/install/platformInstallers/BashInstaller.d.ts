import { PlatformInstallerBase } from "./PlatformInstallerBase";
export declare abstract class BashInstaller extends PlatformInstallerBase {
    get isInstalled(): Promise<boolean>;
    installOrUpdate(): Promise<void>;
    update(): Promise<void>;
    uninstall(): Promise<void>;
    protected abstract readonly uninstallScript: string;
    protected abstract readonly installOrUpdateScript: string;
    protected abstract readonly updateScript: string;
    private execScript;
}
