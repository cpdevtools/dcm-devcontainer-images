export declare function readJsonFile<T = unknown>(path: string): Promise<T>;
export declare function writeJsonFile(path: string, data: any, indent?: number): Promise<void>;
