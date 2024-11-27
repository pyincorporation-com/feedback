import React, { createContext, useContext, useState, ReactNode } from "react";
import { PieChartValues } from "../type";

interface ChartValueContextType {
    chartValues: PieChartValues[] | null;
    setChartValues: React.Dispatch<React.SetStateAction<PieChartValues[] | null>>;
}


const ChartValuesContext = createContext<ChartValueContextType | undefined>(undefined);

export const ChartValuesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chartValues, setChartValues] = useState<PieChartValues[] | null>(null);

    return (
        <ChartValuesContext.Provider value={{ chartValues, setChartValues }}>
            {children}
        </ChartValuesContext.Provider>
    );
};


export const useChartValues = (): ChartValueContextType => {
    const context = useContext(ChartValuesContext);
    if (context === undefined) {
        throw new Error("useChartValues must be used within a ChartValuesProvider");
    }
    return context;
};
