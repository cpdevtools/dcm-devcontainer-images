/// <reference types="node" />
export interface GithubRepoOptions {
    cwd?: string;
}
export interface GithubRepoCreateOptions extends GithubRepoOptions {
    /**
     * Clone the new repository to the current directory
     */
    clone?: boolean;
    /**
     * Description of the repository
     */
    description?: string;
    /**
     * Disable issues in the new repository
     */
    disableIssues?: boolean;
    /**
     * Disable wiki in the new repository
     */
    disableWiki?: boolean;
    /**
     * Specify a gitignore template for the repository
     */
    gitIgnore?: string;
    /**
     * Repository home page URL
     */
    homepage?: string;
    /**
     * Include all branches from template repository
     */
    includeAllBranches?: boolean;
    /**
     * Make the new repository internal
     */
    internal?: boolean;
    /**
     * Specify an Open Source License for the repository
     */
    license?: string;
    /**
     * Make the new repository private
     */
    private?: boolean;
    /**
     * Make the new repository public
     */
    public?: boolean;
    /**
     * Push local commits to the new repository
     */
    push?: boolean;
    /**
     * Specify remote name for the new repository
     */
    remote?: string;
    /**
     * Specify path to local repository to use as source
     */
    source?: string;
    /**
     * The name of the organization team to be granted access
     */
    team?: string;
    /**
     * Make the new repository based on a template repository
     */
    template?: boolean;
}
export declare function githubLogin(token: string): Promise<boolean>;
/**
 * @deprecated Use githubLogin(token: string) instead
 */
export declare function githubLogin(user: string, token: string): Promise<boolean>;
export interface GithubAuthStatus {
    username: string;
    protocol: string;
    token: string;
    scopes: string[];
}
export declare function githubAuthStatus(env?: NodeJS.ProcessEnv): Promise<GithubAuthStatus>;
export declare function configureGithubCli(): Promise<void>;
export declare function cloneRepo(id: string, path?: string, opts?: GithubRepoOptions): Promise<void>;
export declare function createRepo(id: string, opts?: GithubRepoCreateOptions): Promise<void>;
