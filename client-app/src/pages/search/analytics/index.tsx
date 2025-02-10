import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartData } from "../../../interfaces/chartData";
import countries from "../../../dictionaries/countries.json";
import { useTranslation } from "react-i18next";

const preparePieChartData = (data: ChartData) => {
  const pieChartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));
  return pieChartData;
};

const prepareLineChartDataByDate = (data: ChartData) => {
  const dates = Object.keys(data).sort();
  const lowestDate = dates[0];
  const highestDate = dates[dates.length - 1];
  const dateRange = [];
  for (
    let date = new Date(lowestDate);
    date <= new Date(highestDate);
    date.setDate(date.getDate() + 1)
  ) {
    dateRange.push(date.toISOString());
  }
  const lineChartData = dateRange.map((date) => ({
    name: new Date(date).toLocaleDateString(),
    value: data[date] || 0,
  }));
  return lineChartData;
};

const prepareCountryChartData = (data: ChartData) => {
  const sortedData = Object.keys(data).sort((a, b) => {
    return data[b] - data[a];
  });
  const firstFive = sortedData.slice(0, 5);
  const other = sortedData.slice(5);
  const otherValue = other.reduce((acc, key) => acc + data[key], 0);
  const countryChartData = firstFive.map((key) => {
    const country = countries.find((country) => country.code === key);
    const name = country ? `${country.name} (${country.emoji})` : key;
    return {
      name,
      value: data[key],
    };
  });
  countryChartData.push({ name: "Other", value: otherValue });
  return countryChartData;
};

const colors = [
  "#3F826D",
  "#7F5A83",
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
  "#92A8D1",
  "#955251",
  "#B565A7",
];
interface AnalyticsProps {
  chartData: { [key: string]: ChartData } | undefined;
  isChartsLoading: boolean;
  setIsAnalytics: (isAnalytics: boolean) => void;
}

const Analytics = ({
  setIsAnalytics,
  chartData,
  isChartsLoading,
}: AnalyticsProps) => {
  const { t } = useTranslation();

  const chartWidth = window.innerWidth < 800 ? window.innerWidth - 50 : 800;
  return (
    <div className="analytics">
      <h4>
        {t("analytics.return")}{" "}
        <a onClick={() => setIsAnalytics(false)}>{t("analytics.tableLink")}</a>
      </h4>
      {isChartsLoading && <div>Loading...</div>}
      <div>{t("analytics.warning")}:</div>
      {chartData && !isChartsLoading && (
        <div className="search-results-table-container">
          <h2>{t("analytics.stealerType")}:</h2>
          <PieChart width={chartWidth} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={preparePieChartData(chartData.dataByStealerType)}
              outerRadius={150}
              label
            >
              {preparePieChartData(chartData.dataByStealerType).map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                )
              )}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <h2>{t("analytics.infectionsByDate")}:</h2>
          <LineChart
            width={chartWidth}
            height={400}
            data={prepareLineChartDataByDate(chartData.dataByDate)}
          >
            <Tooltip />
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="value"
              name="Infections"
              stroke="#16C47F"
              dot={false}
            />
          </LineChart>
          <h2>{t("analytics.infectionsByCountries")}:</h2>
          <BarChart
            width={chartWidth}
            height={400}
            data={prepareCountryChartData(chartData.dataByCountry)}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8">
              {prepareCountryChartData(chartData.dataByCountry).map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                )
              )}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default Analytics;
