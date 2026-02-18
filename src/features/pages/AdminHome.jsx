import AdminProductList from "../admin/component/AdminProductList";
import NavBar from "../navbar/NavBar";

const AdminHome = () => {
  return (
    <div>
      <NavBar>
        <AdminProductList />
      </NavBar>
    </div>
  );
};

export default AdminHome;
