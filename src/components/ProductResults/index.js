import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import FormSelect from "./../../components/Forms/FormSelect";
import LoadMore from "./../LoadMore";
import Product from "./Product";
import "./styles.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Available",
        value: "available",
      },
      {
        name: "Unavailable",
        value: "unavailable",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <div className="products">
      <h1>Products</h1>

      <FormSelect {...configFilters} />
      <div className="productResults">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;

          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          )
            return null;

          const configProduct = {
            ...product,
          };

          return <Product {...configProduct} key={pos} />;
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
