import NavBar from "../navbar/NavBar";
import ProductList from "../product-list/component/ProductList";

const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList />
      </NavBar>
    </div>
  );
};

export default Home;
