import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AdminLayout from "./staffPages/AdminLayout";
import Home from "./pages/Home";
import Places from "./pages/Places";
import Detail from "./pages/Detail";
import NoPage from "./pages/NoPage";
import Dashboard from "./staffPages/Dashboard";
import Bookings from "./staffPages/Bookings";
import Enquries from "./staffPages/Enquries";
import Packages from "./staffPages/Packages";
import Hotels from "./staffPages/Hotels"
import Registration from './pages/Registration';
import Login from './pages/Login';
import Enquiry from './pages/Enquiry'
import Profile from './pages/Profile';
import About from './pages/About';
import Blog from './pages/Blog';
import CreateBlog from './pages/CreateBlog';
import Hotel from './pages/Hotel';
import HotelDetails from './pages/HotelDetails';
import BlogDetail from './pages/BlogDetail';
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/hotelDetail/:id" element={<HotelDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/blogDetail/:id" element={<BlogDetail />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place/detail/:id" element={<Detail />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="admin/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="hotel" element={<Hotels />} />
          <Route path="enquries" element={<Enquries />} />
          <Route path="packages" element={<Packages />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
