import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductsData } from "../../type/type";
import { Header } from "../../components/Header/Header";
import "./CategoryPage.css";

const fetchProductsByCategory = async (category: string) => {
  const response = await axios.get(
    `https://fakestoreapi.com/products/category/${category}`
  );
  return response.data;
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductsData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        {
          const data = await fetchProductsByCategory(category);
          setProducts(data);
        }
      }
    };

    fetchProducts();
  }, [category]);

  //no useQuery?

  return (
    <>
      <Header />
      <div className="categories">
        <h2 className="categoryTitle">{category}</h2>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className="product-item">
              <h3 className="title">{product.title}</h3>
              <img src={product.image} alt={product.title} />
              <p className="description">{product.description}</p>
              <p>{product.price} €</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
// sistemare css
