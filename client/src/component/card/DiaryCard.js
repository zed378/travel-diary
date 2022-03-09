// import package
import { useState, useParams } from "react";
import { useNavigate } from "react-router-dom";

// import assets
import thumb from "../../assets/img/thumb.jpg";
import bookmark from "../../assets/img/bookmark.svg";
import bookmarked from "../../assets/img/bookmarked.svg";
import cssModules from "../../assets/css/Home.module.css";

function DiaryCard() {
  let navigate = useNavigate();

  return (
    <div className={cssModules.cardContent}>
      <div className={cssModules.bookmark}>
        <img src={bookmark} alt="Bookmark" />
      </div>

      <div
        className={cssModules.thumbnail}
        onClick={() => navigate("/detail-diary")}
      >
        <img src={thumb} alt="Preview" />
      </div>

      <div
        className={cssModules.cardDesc}
        onClick={() => navigate("/detail-diary")}
      >
        <h2>Bersemayam di tanah Dewata</h2>
        <p>29 July 2020, Cipto</p>

        <h4>
          Liburan di tahun baru 2020 keberangkatan saya menuju Pulau Dewata
          Bali. Sampai lah saya malam itu di Bali Airport menujukan waktu jam
          02.00, dan melanjutkan pejalanan yang menyenangkan..
        </h4>
      </div>
    </div>
  );
}

export default DiaryCard;
