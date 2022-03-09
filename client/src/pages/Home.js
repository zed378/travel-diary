// import package

// import component
import DiaryCard from "../component/card/DiaryCard";

// import assets
import cssModules from "../assets/css/Home.module.css";

function Home() {
  return (
    <div className={cssModules.homeContainer}>
      <h1 className={cssModules.homeTitle}>Journey</h1>

      <div className={cssModules.searchContainer}>
        <form className={cssModules.searchForm}>
          <input
            type="text"
            placeholder="Find Journey"
            name="search"
            className={cssModules.searchInput}
          />
          <button type="submit" className={cssModules.searchBtn}>
            Search
          </button>
        </form>
      </div>

      <div className={cssModules.cardContainer}>
        {/* card */}
        <DiaryCard />
        {/* end of card */}
      </div>
    </div>
  );
}

export default Home;
