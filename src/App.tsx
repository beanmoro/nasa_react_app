import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { SideBar } from "./components/SideBar";

function App() {
  const [data, setData] = useState<JSON>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      const today = new Date().toDateString();
      const localKey = `NASA-${today}`;
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey)!);
        setData(apiData);
        console.log("Fetch from cache today!");
        return;
      }
      localStorage.clear();
      try {
        const resp = await fetch(url);
        const apiData = await resp.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log("Fetch from API today!");
      } catch (error: any) {
        console.error(error.message);
      }
    }
    fetchAPIData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar handleToggleModal={handleToggleModal} data={data} />
      )}
      {data && (
        <Footer
          showModal={showModal}
          handleToggleModal={handleToggleModal}
          data={data}
        />
      )}
    </>
  );
}

export default App;
