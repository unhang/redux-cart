
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY = [
  {
    id: "p1",
    title: "Product 1",
    price: 6,
    description: "This is a first product - amazing!"
  },
  {
    id: "p2",
    title: "Product 2",
    price: 8.99,
    description: "This is a first product - amazing!"
  },
  {
    id: "p3",
    title: "Product 3",
    price: 4.99,
    description: "This is a first product - amazing!"
  }
];

const Products = (props) => {




  const products = (
    <ul>
      {DUMMY.map((product) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        );
      })}
    </ul>
  );

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {products}
    </section>
  );
};

export default Products;
