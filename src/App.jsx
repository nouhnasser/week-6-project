import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MovieInfo from "./components/MovieInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />}></Route>
        <Route path="/izk/:imdbID" element={<MovieInfo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
