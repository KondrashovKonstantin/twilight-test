import { Trans, useTranslation } from "react-i18next";
import "./index.css";
import {
  useGetChartDataMutation,
  useSearchMutation,
} from "../../redux/api/twilight.api";
import { useState } from "react";
import { SearchResult } from "../../interfaces/searchResult";
import ResultsTable from "./results-table";
import Analytics from "./analytics";
import { ChartData } from "../../interfaces/chartData";

function SearchPage() {
  const { t } = useTranslation();
  const [search, { isLoading }] = useSearchMutation();
  const [getChartData, { isLoading: isChartsLoading }] =
    useGetChartDataMutation();
  const [chartData, setChartData] = useState<{ [key: string]: ChartData }>();
  const [isAnalytics, setIsAnalytics] = useState<boolean>(false);
  const [domain, setdomain] = useState<string>("");
  const [nextToken, setNextToken] = useState<string>();
  const [resDomain, setResDomain] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult[] | null>(null);

  const onSearch = async () => {
    search({ domain, nextToken })
      .unwrap()
      .then((data) => {
        setNextToken(data.next);
        setTotal(data.total);
        setResDomain(data.domain);
        setCount(data.count);
        if (domain !== resDomain) {
          setResult(data.results);
        } else {
          setResult(result ? [...result, ...data.results] : data.results);
        }
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error.data.message);
      });
    if (domain !== resDomain) {
      getChartData({ domain })
        .unwrap()
        .then((data) => {
          setChartData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="search">
      <h1>
        {t("search.head")}{" "}
        <span className="accented">{t("search.head.accent")}</span>!
      </h1>
      <h4>{t("search.description")}</h4>
      <div className="search-form">
        <div className="app-input">
          <input
            value={domain}
            onChange={(e) => setdomain(e.target.value)}
            className="app-input-input"
            type="text"
            placeholder={t("search.placeholder")}
          />
          {error && (
            <span className="app-input-error">{t("search.error")}</span>
          )}
        </div>
        <button
          disabled={isLoading}
          onClick={onSearch}
          className="app-submit-btn"
        >
          {t("search.button")}
        </button>
      </div>
      <div>
        <h3>
          {result &&
            (total === 0 ? (
              t("search.noResults")
            ) : (
              <Trans i18nKey="search.results" values={{ total }} />
            ))}
        </h3>
      </div>
      {result && (
        <>
          {isAnalytics ? (
            <Analytics
              setIsAnalytics={setIsAnalytics}
              chartData={chartData}
              isChartsLoading={isChartsLoading}
            />
          ) : (
            <ResultsTable
              setIsAnalytics={setIsAnalytics}
              result={result}
              total={total}
              count={count}
              isLoading={isLoading}
              onSearch={onSearch}
            />
          )}
        </>
      )}
    </div>
  );
}

export default SearchPage;
