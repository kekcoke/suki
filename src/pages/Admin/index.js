import React, { useEffect, useState } from 'react';
import { productCategoriesList } from '../../redux/Products/products.categories';
import productsGenderList from '../../redux/Products/products.gender';
import { productStatusList } from '../../redux/Products/products.status';
import Button from './../../components/Forms/Button';
import FormInput from './../../components/Forms/FormInput';
import FormSelect from './../../components/Forms/FormSelect';
import Modal from './../../components/Modal';
import { firestore } from './../../firebase/utils';
import './styles.scss';

const Admin = props => {
  const [products, setProducts] = useState([]);
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
  
  useEffect(() => {
    firestore.collection('products').get().then(snapshot => {
      const snapshotData = snapshot.docs.map(doc => doc.data());
      setProducts(snapshotData);
    });
  }, []);


  const handleSubmit = e => {
    e.preventDefault();

    firestore.collection('products').doc().set({
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
    }).then(e => {
      // Success
    });

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

    </div>
  );
}

export default Admin;