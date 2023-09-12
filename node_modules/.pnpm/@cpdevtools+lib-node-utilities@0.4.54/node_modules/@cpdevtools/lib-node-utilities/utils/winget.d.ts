export interface WingetPackage {
    id: string;
    name: string;
    required?: boolean;
    version?: string;
    category?: string;
    description?: string;
}
export declare function isInstalledWsl(id: string): Promise<boolean>;
export interface WingetInfo {
    id: string;
    version: string;
    publisher: string;
    publisherUrl: string;
    publisherSupportUrl: string;
    author: string;
    moniker: string;
    description: string;
    homepage: string;
    license: string;
    copyright: string;
    installer: WingetInstallerInfo;
}
export interface WingetInstallerInfo {
    type: string;
    locale: string;
    downloadUrl: string;
    SHA256: string;
    releaseDate: string;
}
export declare function wingetInfo(id: string): Promise<WingetInfo>;
export declare function isValidInstallFile(filepath: string, id: string): Promise<boolean>;
export declare function installWinget(id: string): Promise<number>;
export declare function uninstallWinget(id: string): Promise<number>;
export declare function updateWinget(id: string, args?: string): Promise<number>;
export declare function updateOrInstallWinget(id: string): Promise<number>;
