import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Beranda from "./components/Beranda";
import Buku from './components/Buku';
import Daftar from './components/Daftar';
import Peminjaman from './components/Peminjaman';
import Navbar from './components/Navbar';
import NavbarComponent from './components/NavbarComponent';
import Sukses from './components/Sukses';
import Create from './components/Create';
import Edit from './components/Edit';
import History from './components/History';
import Category from './components/Category';
import CreateCategory from './components/CreateCategory';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <NavbarComponent />
      <main>
        <Routes>
          <Route path='/' exact element={<Beranda />} />
          <Route path='/buku' exact element={<Buku />} />
          <Route path='/daftar' exact element={<Daftar />} />
          <Route path='/peminjaman' exact element={<Peminjaman />} />
          <Route path='/sukses' exact element={<Sukses />} />
          <Route path='/create' exact element={<Create />} />
          <Route path='/createCategory' exact element={<CreateCategory />} />
          <Route path='/history' exact element={<History />} />
          <Route path='/category' exact element={<Category />} />
          <Route path='/edit' exact element={<Edit />} />
          {/* <Route path="/sukses" component={Sukses} exact /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
