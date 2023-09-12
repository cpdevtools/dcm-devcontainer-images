import { Class } from "type-fest";
import { PlatformInstaller } from "../platform/PlatformInstaller";
import { InstallerPlatforms } from "./InstallerPlatforms";
export interface Installer {
    id: string;
    name: string;
    categories: string[];
    platforms: Class<PlatformInstaller> | InstallerPlatforms;
}
export declare function isInstaller(obj: any): obj is Installer;
export declare function isValidInstaller(obj: any): obj is Installer;
