// import package

// import assets
import thumb from "../../assets/img/thumb.jpg";
import bookmark from "../../assets/img/bookmark.svg";
import bookmarked from "../../assets/img/bookmarked.svg";
import cssModules from "../../assets/css/Home.module.css";

function DiaryCard() {
  return (
    <div className={cssModules.cardContent}>
      <div className={cssModules.bookmark}>
        <img src={bookmark} alt="Bookmark" />
      </div>

      <div className={cssModules.thumbnail}>
        <img src={thumb} alt="Preview" />
      </div>

      <div className={cssModules.cardDesc}>
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
