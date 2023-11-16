import { useState, useEffect } from "react";
import "./App.css";

// Her bir yazı için kullandığımız component
const Yazi = ({ yazi }) => (
  <li key={yazi.id}>
    <span>
      <a href={yazi.url}>{yazi.baslik}</a>,
    </span>
    <span>
      <b>Yazar:</b> {yazi.yazar},{" "}
    </span>
    <span>
      <b>Yorum Sayısı:</b> {yazi.yorum_sayisi},{" "}
    </span>
    <span>
      <b>Puan:</b> {yazi.puan}
    </span>
  </li>
)

// Liste için kullandığımız component
const Liste = ({ yazilar }) => {
  if (yazilar.length == 0) {
    return <h4>Eşleşen kayıt bulunamadı!</h4>
  }
  else {
    return (
      <ul>
        {yazilar.map(function (yazi) {
          return (
            <Yazi yazi={yazi} key={yazi.id} />
          );
        })}{" "}
      </ul>
    )
  }


}
// Arama yapmak için kullandığımız component
const Arama = ({ searchText, handleSearch }) => {
  const handleChange = (event) => handleSearch(event)
  return (
    <div>
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" onChange={handleChange} value={searchText} />
    </div>
  );
}

function App() {

  const [searchText, setSearchText] = useState(localStorage.getItem("aranan") || "React")

  useEffect(() => {
    localStorage.setItem("aranan", searchText)
  }, [searchText])

  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 2,
    },
    {
      baslik: "Android SQLite Kullanımı - Medium",
      url: "https://medium.com/@zekeriyadonmez/android-sqlite-kullan%C4%B1m%C4%B1-92fb4ff751f",
      yazar: "Zekeriya Dönmez",
      yorum_sayisi: 100,
      puan: 7,
      id: 3,
    },
    {
      baslik: "Android SharedPreferences Kullanımı - Medium",
      url: "https://medium.com/@zekeriyadonmez/android-shared-preferences-kullan%C4%B1m%C4%B1-2d71ea7dbd10",
      yazar: "Zekeriya Dönmez",
      yorum_sayisi: 125,
      puan: 9,
      id: 4,
    },
    {
      baslik: "Android Documents",
      url: "https://developers.android.com",
      yazar: "Google",
      yorum_sayisi: 800,
      puan: 10,
      id: 5,
    },
    
  ];

  const handleSearch = (event) => {
    setSearchText(event.target.value)
  }

  const arananListesi = yaziListesi.filter(
    (yazi) => (yazi.baslik.toLowerCase().includes(searchText.toLowerCase()) || yazi.yazar.toLowerCase().includes(searchText.toLowerCase()))
  )

  return (
    <div>
      <h1>Yazılar</h1>
      <Arama handleSearch={handleSearch} searchText={searchText} />
      {searchText && <p><b>{searchText}</b> aranıyor!</p>}

      <hr />
      <Liste yazilar={arananListesi} />
    </div>
  );
}
export default App;
