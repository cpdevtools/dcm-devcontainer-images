import { PlatformInstaller } from "../platform/PlatformInstaller";
export declare abstract class PlatformInstallerBase implements PlatformInstaller {
    readonly id: string;
    readonly name: string;
    readonly args?: string | undefined;
    readonly dependencies: string[];
    constructor(id: string, name: string, args?: string | undefined, dependencies?: string[]);
    abstract isInstalled: Promise<boolean>;
    abstract installOrUpdate(): Promise<void>;
    abstract update(): Promise<void>;
    abstract uninstall(): Promise<void>;
}
