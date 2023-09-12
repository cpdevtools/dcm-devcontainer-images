import { IPackageHandler } from "./IPackageHandler";
export declare class PackageManager {
    static loadPackage(path: string): Promise<IPackageHandler>;
    private static createPackageInstance;
}
