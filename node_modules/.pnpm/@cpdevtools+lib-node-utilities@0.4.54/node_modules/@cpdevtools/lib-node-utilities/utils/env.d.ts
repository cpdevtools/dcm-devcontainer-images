/**
 * Returns a map of all environment variables
 * @returns A map of all environment variables
 * @example
 * const env = await envVars();
 */
export declare function envVars(): Promise<{
    [key: string]: string;
}>;
/**
 * Returns the value of the environment variable
 * @param key The name of the environment variable
 * @returns The value of the environment variable
 * @example
 * const value = await envVars("PATH");
 */
export declare function envVars(key: string): Promise<string>;
/**
 * Deletes the environment variable
 * @param key The name of the environment variable
 * @param value null
 * @example
 * await envVars("PATH", null);
 */
export declare function envVars(key: string, value: null): Promise<undefined>;
/**
 * Sets the value of the environment variable
 * @param key The name of the environment variable
 * @param value The value of the environment variable
 * @example
 * await envVars("PATH", "/usr/bin");
 */
export declare function envVars(key: string, value: string): Promise<undefined>;
export declare function setWindowsEnv(name: string, value: string | null): Promise<void>;
export declare function getEnv(name: string): string | null;
