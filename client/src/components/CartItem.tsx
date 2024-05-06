import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const item = storeItems.find(i => i.id === id)
  if (item == null) return null

  return (
    <Stack gap={2} className="d-flex">
      <div className="d-flex">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto ms-4">
        <div> {item.name}{" "}</div>
        <div>
          {item.description}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "1rem" }}>
          <span className="ms-2"><del>{formatCurrency(item.priceWithoutDiscount)}</del></span>
          <span className="ms-2"><strong>{formatCurrency(item.price)}</strong></span>
          <span className="color-green ms-2">12% off 2 offers applied</span>
        </div>
       
      </div>
      </div>
      <div
            className="d-flex align-items-center"
            style={{ gap: ".5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button onClick={() => decreaseCartQuantity(id)} className="cart-quantity-button">-</Button>
              <div>
                <span className="fs-5">{quantity}</span>
              </div>
              <Button onClick={() => increaseCartQuantity(id)} className="cart-quantity-button">+</Button>
            </div>
            <Button
              size="sm"
              className="cart-custom-buttons"
            >
              SAVE FOR LATER
          </Button>
            <Button
              onClick={() => removeFromCart(id)}
              size="sm"
              className="cart-custom-buttons"
            >
              REMOVE
          </Button>
         {/* <div> {formatCurrency(item.price * quantity)}</div> */}
        </div>
    </Stack>
  )
}
