import { GoogleViz } from "./types";
export declare const loadDataTableFromSpreadSheet: (googleViz: GoogleViz, spreadSheetUrl: string, urlParams?: {
    headers?: number;
    gid?: any;
    sheet?: string;
    query?: string;
    access_token?: string;
}) => Promise<unknown>;
