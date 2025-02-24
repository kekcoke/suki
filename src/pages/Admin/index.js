import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadMore from '../../components/LoadMore';
import { addProductStart, deleteProductStart, fetchProductsStart } from '../../redux/Products/products.actions';
import { productCategoriesList } from '../../redux/Products/products.categories';
import productsGenderList from '../../redux/Products/products.gender';
import { productStatusList } from '../../redux/Products/products.status';
import Button from './../../components/Forms/Button';
import FormInput from './../../components/Forms/FormInput';
import FormSelect from './../../components/Forms/FormSelect';
import Modal from './../../components/Modal';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const Admin = props => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [productBrandName, setProductBrandName] = useState("");
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productGender, setProductGender] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [productBundle, setProductBundle] = useState(false);
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productFeatures, setProductFeatures] = useState([]);
  const [productSpecifications, setProductSpecifications] = useState([]);


  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data, queryDoc, isLastPage } = products;
  
  useEffect(() => {
    dispatch(
      fetchProductsStart()
    )
  }, []);

  const resetForm = () => {
    setModalOpen(false);
    setProductName("");
    setProductBrandName("");
    setProductCategory("");
    setProductSubCategory("");
    setProductGender("");
    setProductStatus("");
    setProductStock(0);
    setProductBundle(false);
    setProductThumbnail("");
    setProductPrice(0);
    setProductDescription("");
    setProductFeatures("");
    setProductSpecifications("");
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addProductStart( {
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
        productSpecifications
      })
    );
    resetForm(); 

  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <div className="admin">

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={openModal}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new product
            </h2>

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Brand"
              type="text"
              value={productBrandName}
              handleChange={e => setProductBrandName(e.target.value)}
            />

            <FormSelect
              label="Category"
              options={productCategoriesList}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Sub-category"
              type="text"
              value={productSubCategory}
              handleChange={e => setProductSubCategory(e.target.value)}
            />

            <FormSelect
              label="Gender"
              options={productsGenderList}
              handleChange={e => setProductGender(e.target.value)}
            />

            <FormSelect
              label="Product Status"
              options={productStatusList}
              handleChange={e => setProductStatus(e.target.value)}
            />

            <FormInput
              label="Number Stock available"
              type="number"
              value={productStock}
              handleChange={e => setProductStock(e.target.value)}
            />

            <FormInput
              label="Description"
              type="text"
              value={productDescription}
              handleChange={e => setProductDescription(e.target.value)}
            />

            <FormInput
              label="Features (ex: 100% cotton, easy to wash)"
              type="text"
              value={productFeatures}
              handleChange={e => setProductFeatures(e.target.value)}
            />

            <FormInput
              label="Specifications (ex: ISO-9001,MIL-STD-810G)"
              type="text"
              value={productSpecifications}
              handleChange={e => setProductSpecifications(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />

            <Button type="submit">
              Add product
            </Button>

          </form>
        </div>
      </Modal>

      <div className="manageProducts">

        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage Products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            {productPrice}
                          </td>
                          <td>
                            <Button onClick={ () => dispatch(deleteProductStart(documentID))}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>

              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Admin;