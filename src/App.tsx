import { Route, Routes } from "react-router-dom";
import PrayList from "./page/prayPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrayList />} />
    </Routes>
  );
}

export default App;
