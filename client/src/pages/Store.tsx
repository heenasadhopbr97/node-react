import { Button, Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
// import storeItems from "../data/items.json"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../utilities/api"

export function Store() {
  const productApi = "/products"
  const categoryApi = "/categories"
  const [storeItems, setProducts] = useState([])

  const handleCategoryClick = async (categoryId:any) => {
    try {
      let productWithCategory = productApi + '?categoryId=' + categoryId
      api.get(productWithCategory).then(res => {
        console.log(res)
        setProducts(res.data)
      })
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };


  useEffect(() => {
    const getProduct = async () => {
      api.get(productApi).then(res => {
        console.log(res)
        setProducts(res.data)
      })
    }
    getProduct()
  }, [])

  const [categories, setCategories] = useState([])
  useEffect(() => {
    const getCategory = async () => {
      api.get(categoryApi).then(res => {
        console.log("res.data", res.data.data);
        setCategories(res.data.data)
      })
    }
    getCategory()
  }, [])

  return (
    <>
      <Row>
        <Col>
          <Link className="nav-link" to="create-product">
            <Button>Add</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          {categories.map(category =>
            <Button onClick={() => handleCategoryClick(category._id)}>{category.name}</Button>
          )}
        </Col>
      </Row>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
          <Col key={item._id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  )
}
