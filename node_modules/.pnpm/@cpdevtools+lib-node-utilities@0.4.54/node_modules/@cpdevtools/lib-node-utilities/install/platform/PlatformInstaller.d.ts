export interface PlatformInstaller {
    readonly id: string;
    readonly args?: string;
    readonly isInstalled: Promise<boolean>;
    readonly dependencies?: readonly string[];
    installOrUpdate(): Promise<void>;
    update(): Promise<void>;
    uninstall(): Promise<void>;
}
export declare function isPlatformInstaller(obj: any): obj is PlatformInstaller;
