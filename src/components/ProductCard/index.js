import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import Button from '../Forms/Button';
import './styles.scss';

const mapState = ( state ) => ({
    product: state.productsData.product
});

const ProductCard = ({ }) => {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const { product } = useSelector(mapState);

    const {
        productName,
        productBrandName,
        productCategory,
        productSubCategory,
        productGender,
        productStatus,
        productStock,
        productBundle,
        productThumbnail,
        productPrice,
        productDescription,
        productFeatures,
        productYear,
        productSpecifications 
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        );

        return () => {
            dispatch(
                setProduct({})
            );
        }
    }, []);

    const configAddToCardBtn = {
        type: 'button'
    };

    const configAddToWishlistBtn = {
        type: 'button'
    };

    return (
        <div className='productCard'>
            <div className='hero'>
                <img src={productThumbnail} alt={productName} />
            </div>
        <div className='productDetails'>
            <table>
                <thead>
                    <th>{productName}</th>
                    <th>{productPrice}</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Brand</td>
                        <td>{productBrandName}</td>
                    </tr>
                    <tr>
                        <td>Category/Subcategory</td>
                        <td>{productCategory}/{productSubCategory}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{productGender}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{productDescription}</td>
                    </tr>
                    <tr>
                        <td>Features</td>
                        <td>{productFeatures}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{productStatus}</td>
                    </tr>
                    <tr>
                        <td>Number Remaining</td>
                        <td>{productStock}</td>
                    </tr>
                    <tr>
                        <td>Product Year Created</td>
                        <td>{productYear}</td>
                    </tr>
                    <tr>
                        <td>Specifications</td>
                        <td>{productSpecifications}</td>
                    </tr>
                    <tr>
                        <td>Bundle Item</td>
                        <td>{productBundle ? 'YES' : 'NO' }</td>
                    </tr>
                </tbody>

            </table>
            <div className='productButtons'>
                <Button {...configAddToCardBtn}>
                    Add to cart
                </Button>
                <br/>
                <Button {...configAddToWishlistBtn}>
                    Add to wishlist
                </Button>
            </div>
        </div>

    </div>
    );

}

export default ProductCard;