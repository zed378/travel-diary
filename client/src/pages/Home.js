// import package
import { useState, useEffect } from "react";

// import component
import DiaryCard from "../component/card/DiaryCard";

// import assets
import cssModules from "../assets/css/Home.module.css";

// import config
import { API } from "../config/api";

function Home() {
  const [diaries, setDiaries] = useState([]);

  const getDiaries = async () => {
    try {
      const response = await API.get("/posts");

      setDiaries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiaries();
  }, []);

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
        {diaries?.map((item, index) => (
          <DiaryCard item={item} key={index} click={getDiaries} />
        ))}
        {/* end of card */}
      </div>
    </div>
  );
}

export default Home;
