import { Observable } from "rxjs";
export interface FileDownloadEvent {
    type: "connecting" | "connected" | "progress" | "complete" | "error";
    time: Date;
}
export interface FileDownloadConnectedEvent extends FileDownloadEvent {
    type: "connected";
    bytesTotal: number;
    contentType: string;
}
export interface FileDownloadErrorEvent extends FileDownloadEvent {
    type: "error";
    error: Error;
}
export interface FileDownloadCompleteEvent extends FileDownloadEvent {
    type: "complete";
    duration: number;
    rate: number;
    bytesTotal: number;
}
export interface ProgressEvent extends FileDownloadEvent {
    type: "progress";
    bytesTotal: number;
    bytesReceived: number;
    percent: number;
    bytesRate: number;
    eta: number;
    duration: number;
}
export interface FormattedProgressEvent extends FileDownloadEvent {
    type: "progress";
    size: string;
    received: string;
    percent: string;
    rate: string;
    timeRemaining: string;
    duration: string;
}
export declare class FileDownload {
    readonly sourceUrl: string;
    readonly filePath: string;
    private _downloadPromise?;
    private _started?;
    private _progressHistory;
    private _events$$;
    constructor(sourceUrl: string, filePath: string);
    readonly events$: Observable<FileDownloadEvent>;
    readonly progress$: Observable<ProgressEvent>;
    readonly progressFormatted$: Observable<FormattedProgressEvent>;
    download(showProgressBar?: boolean): Promise<void>;
    private pruneHistory;
    private calcProgressStats;
}
