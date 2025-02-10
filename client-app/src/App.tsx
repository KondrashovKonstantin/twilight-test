import "./App.css";
import Header from "./components/header";
import Router from "./components/router";
import SearchPage from "./pages/search";
import LogoutButton from "./components/header/logout-button";
import "./i18n/index";

function App() {
  return (
    <>
      <Header />
      <Router>
        <SearchPage />
      </Router>
      <div className="bottom-loggout">
        <LogoutButton />
      </div>
    </>
  );
}

export default App;
