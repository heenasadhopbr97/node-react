import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
  _id: number
  title: string
  price: number
  image: string
}

export function StoreItem({ _id, title, price, image }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(_id)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-4">
          <div className="fs-5 mb-2">{title}</div>
          <div className="fs-5">{formatCurrency(price)}</div>
        </Card.Title>
        <div>
          {quantity === 0 ? (
            <Button className="" onClick={() => increaseCartQuantity(_id)}>
              Add To Cart
            </Button>
          ) : (
            <Button className=""  variant="danger" onClick={() => removeFromCart(_id)}>
                Added To Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
