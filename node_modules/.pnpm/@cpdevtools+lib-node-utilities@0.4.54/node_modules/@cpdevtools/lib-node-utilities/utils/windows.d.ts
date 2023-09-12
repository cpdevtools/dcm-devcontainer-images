import semver from "semver";
export interface AppxPackage {
    Name: string;
    Publisher: string;
    Architecture: string;
    ResourceId: string;
    Version: string;
    PackageFullName: string;
    InstallLocation: string;
    IsFramework: string;
    PackageFamilyName: string;
    PublisherId: string;
    IsResourcePackage: string;
    IsBundle: string;
    IsDevelopmentMode: string;
    NonRemovable: string;
    IsPartiallyStaged: string;
    SignatureKind: string;
    Status: string;
}
export declare function loadAppxPackages(): Promise<AppxPackage[]>;
export declare function loadAppxPackage(appxPackageName: string): Promise<AppxPackage | undefined>;
export declare function locateInstallationPath(appxPackageName: string): Promise<string | undefined>;
export declare const isWindows: boolean;
export declare const windowsVer: string | null;
export declare const windowsVersion: semver.SemVer | null;
export declare const isWin10: boolean;
export declare const isWin11: boolean;
export declare function runOnceAfterRestart(id: string, script: string): Promise<void>;
export declare function removeRunOnceAfterRestart(id: string): Promise<void>;
export declare function isApplicationRunning(name: string): Promise<boolean>;
export declare function execAsWindowsAdmin(cmd: string[], opts?: {
    cwd?: string;
}): Promise<number>;
export declare function runAsWindowsAdmin(cmd: string[], opts?: {
    cwd?: string;
}): Promise<string>;
