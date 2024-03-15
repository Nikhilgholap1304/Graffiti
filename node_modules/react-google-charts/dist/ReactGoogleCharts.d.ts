import * as React from "react";
import { GoogleViz, ReactGoogleChartProps, ReactGoogleChartState } from "./types";
export declare class Chart extends React.Component<ReactGoogleChartProps, ReactGoogleChartState> {
    _isMounted: boolean;
    state: {
        loadingStatus: "ready" | "loading" | "errored";
        google: GoogleViz | null;
    };
    static defaultProps: Partial<ReactGoogleChartProps>;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onLoad: (google: GoogleViz) => void;
    onSuccess: (google: GoogleViz) => void;
    onError: () => void;
    isFullyLoaded(google: GoogleViz): any;
}
export default Chart;
