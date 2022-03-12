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
  const [search, setSearch] = useState("");

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
        <input
          type="text"
          placeholder="Find Journey"
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className={cssModules.cardContainer}>
        {/* card */}
        {diaries
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((item, index) => (
            <DiaryCard item={item} key={index} press={getDiaries} />
          ))}
        {/* end of card */}
      </div>
    </div>
  );
}

export default Home;
