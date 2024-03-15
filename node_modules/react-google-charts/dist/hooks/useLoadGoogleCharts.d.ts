import { GoogleChartVersion, GoogleChartPackages, GoogleViz } from "../types";
export interface IUseLoadGoogleChartsParams {
    chartVersion?: GoogleChartVersion;
    chartPackages?: GoogleChartPackages[];
    chartLanguage?: string;
    mapsApiKey?: string;
}
export declare function useLoadGoogleCharts({ chartVersion, chartPackages, chartLanguage, mapsApiKey, }: IUseLoadGoogleChartsParams): readonly [GoogleViz | null, boolean];
export interface ILoadGoogleChartsProps extends IUseLoadGoogleChartsParams {
    onLoad?(googleCharts: GoogleViz): void;
    onError?(): void;
}
export declare function LoadGoogleCharts({ onLoad, onError, ...params }: ILoadGoogleChartsProps): null;
