import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import CreateProduct from "./pages/Products"
import CreateCategory from "./pages/Category"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import './App.css';

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Store />} />
          <Route path="/product/create-product" element={<CreateProduct />} />
          <Route path="/create-category" element={<CreateCategory />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
