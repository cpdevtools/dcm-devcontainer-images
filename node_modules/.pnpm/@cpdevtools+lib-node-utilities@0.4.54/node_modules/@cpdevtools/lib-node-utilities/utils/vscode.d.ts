export declare function launchVSCode(path?: string): void;
export declare function getContainerLaunchUrl(containerPath: string, workspace?: string): Promise<string>;
export declare function launchContainerUrl(launchUrl: string): void;
export declare function launchVSCodeDevContainer(containerPath?: string, open?: string): Promise<void>;
export declare function installVSCodeExtension(idOrPath: string, options?: {
    preRelease?: boolean;
    force?: boolean;
}): Promise<void>;
export declare function uninstallVSCodeExtension(id: string): Promise<void>;
export declare function killVsCode(): Promise<string | false>;
