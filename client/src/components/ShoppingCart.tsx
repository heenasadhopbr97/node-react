import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
// import storeItems from "../data/items.json"
import { useEffect, useState } from "react"
import api from "../utilities/api"

type ShoppingCartProps = {
  isOpen: boolean
}


export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const productApi = "/products"
  const [storeItems, setProducts] = useState([])
  useEffect(() => {
    const getProduct = async () => {
      api.get(productApi).then(res => {
        console.log(res)
        setProducts(res.data)
      })
    }
    getProduct()
  }, [])
  const { closeCart, cartItems } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item}/>
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i._id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
