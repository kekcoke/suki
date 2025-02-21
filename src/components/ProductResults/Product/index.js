import React from "react";
import Button from "../../Forms/Button";

const Product = ({
    productThumbnail,
    productName,
    productPrice
}) => {
    if (!productThumbnail || !productName || typeof productPrice === "undefined") return null;

    return (
        <div className="product">
            <div className="thumb">
                <img src={productThumbnail} alt={productName} />
            </div>

            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            {productName}
                        </span>
                    </li>
                    <li>
                        <span className="price">
                            {productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button>
                                Add to cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Product;