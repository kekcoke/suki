import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductResults = ({}) => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    useEffect(() => {
        dispatch(fetchProductsStart());
    }, []);

    if (!Array.isArray(products)) return null;
    if (products.length < 1) {
        return (
            <div className="products">
                <p>
                    No search results.
                </p>
            </div>
        );
    }

    return (
        <div>
            ProductResults
        </div>
    )
}

export default ProductResults;