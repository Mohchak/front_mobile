import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultPage from "./pages/defaultPage/DefaultPage";
import Table from "./pages/talbe/Table";
import Menu from "./pages/menu/menu";
import {useEffect, useState} from "react";
import MenuV2 from "./pages/menu/menuV2";
import Commande from "./pages/commande/Commande";
import {Data} from "./data/data";

function App() {

    const [menus, setMenus] = useState(Data)
    const [tableId, setTableId] = useState()
    const [cpt, setCpt] = useState(0)
    const [cptProduct, setCptProduct] = useState(0)
    const [total, setTotal] = useState(0)
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<DefaultPage />} />
                <Route path="/:tableId" element={<Table setTableId={setTableId}/>} />
                <Route path="/menu" element={<Menu tableId={tableId} menus={menus} setMenus={setMenus}  cpt={cpt} setCpt={setCpt} cptProduct={cptProduct} setCptProduct={setCptProduct} total={total} setTotal={setTotal}/>} />
                <Route path="/commande" element={<Commande menus={menus} setMenus={setMenus} cpt={cpt} setCpt={setCpt} cptProduct={cptProduct} setCptProduct={setCptProduct} total={total} setTotal={setTotal}/>} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
