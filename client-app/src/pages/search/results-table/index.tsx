import { useTranslation } from "react-i18next";
import { SearchResult } from "../../../interfaces/searchResult";

const getEmailDomains = (credentials: SearchResult["credentials"]) => {
  const emailDomains: string[] = [];
  credentials.forEach((c) => {
    c.email_domains.forEach((d) => {
      if (!emailDomains.includes(d)) {
        emailDomains.push(d);
      }
    });
  });
  return emailDomains.join(", ");
};

const getRootDomains = (credentials: SearchResult["credentials"]) => {
  const rootDomains: string[] = [];
  credentials.forEach((c) => {
    if (!rootDomains.includes(c.root_domain)) {
      rootDomains.push(c.root_domain);
    }
  });
  return rootDomains.join(", ");
};

interface ResultsTableProps {
  result: SearchResult[];
  total: number;
  count: number;
  isLoading: boolean;
  setIsAnalytics: (isAnalytics: boolean) => void;
  onSearch: () => void;
}

const ResultsTable = ({
  result,
  total,
  count,
  isLoading,
  setIsAnalytics,
  onSearch,
}: ResultsTableProps) => {
  const { t } = useTranslation();
  return (
    <div className="search-results">
      <div>
        {result && total > 0 && (
          <h4>
            {t("table.analytics.text")}{" "}
            <a onClick={() => setIsAnalytics(true)}>
              {t("table.analytics.link")}
            </a>
          </h4>
        )}
      </div>
      {total > 0 && (
        <div className="search-results-table-container">
          <table className="search-results-table">
            <thead>
              <tr>
                <th>{t("search.table.date")}</th>
                <th>{t("search.table.stealer")}</th>
                <th>{t("search.table.ip")}</th>
                <th>{t("search.table.os")}</th>
                <th>{t("search.table.emailDomains")}</th>
                <th>{t("search.table.rootDomains")}</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item) => (
                <tr key={item.id}>
                  <td>
                    {new Date(
                      item.computer_information.infection_date
                    ).toLocaleDateString()}
                  </td>
                  <td>{item.stealer_type}</td>
                  <td>{item.computer_information.ip}</td>
                  <td>{item.computer_information.os}</td>
                  <td>{getEmailDomains(item.credentials)}</td>
                  <td>{getRootDomains(item.credentials)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isLoading && <div className="main-loading">Loading...</div>}
      {total > count && (
        <div className="search-load-more">
          <h5>
            {result.length} rows of {total} loaded
          </h5>
          <button
            onClick={() => {
              onSearch();
            }}
            disabled={isLoading}
            className="app-submit-btn"
          >
            {t("search.loadMore")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
