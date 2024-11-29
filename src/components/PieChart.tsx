import { PieChart } from "@mui/x-charts/PieChart";
import { useChartValues } from "../contexts/chartValuesProvider";

const PieChartComponent = () => {
    const { chartValues } = useChartValues();
    const devideWidth = window.innerWidth
    if (devideWidth > 1024) {
        var cx_p = devideWidth - (devideWidth * 0.95)
    } else {
        var cx_p = devideWidth - (devideWidth * 0.83)
    }
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "450px",
                height: "500px",
                margin: "0 auto",
                backgroundColor: "var(--background-color)",
                color: "var(--color)",
                borderRadius: "8px",
                padding: "10px",
                maxWidth: "100%"
            }}
            className="pie-chart"
        >
            {chartValues ? (
                <PieChart
                    series={[
                        {
                            data: chartValues,
                            highlightScope: { fade: "global", highlight: "item" },
                            faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                color: "var(--border-color)",
                            },
                            innerRadius: 39,
                            outerRadius: 113,
                            paddingAngle: 6,
                            cornerRadius: 11,
                            startAngle: -77,
                            endAngle: 225,
                            cx: cx_p,
                            cy: 150,
                        },
                    ]}
                    margin={{
                        top: 50,
                        bottom: 100,
                        left: 100,
                        right: 100,
                    }}
                    sx={{
                        "& .MuiChartsLegend-series text": {
                            fontSize: "0.7em !important",
                            color: "#fff !important",
                        },
                    }}
                    slotProps={{
                        legend: {
                            direction: "row",
                            position: { vertical: "top", horizontal: "middle" },
                            padding: 0,
                            labelStyle: {
                                color: "red !important",
                                fontSize: "30px !important",
                                fill: "var(--color)",
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default PieChartComponent;
