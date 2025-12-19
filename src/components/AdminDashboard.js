import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from '../firebase';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    name: '',
    cardImage: '',              // ✅ card image
    galleryImages: ['', '', '', ''], // ✅ 4 images for detail page
    newPrice: '',
    oldPrice: '',
    onSale: false,
    tag: '',
    category: 'all', // 'featured' or 'all'
    models: [], // Array of model options
    colors: []  // Array of color options
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      setProducts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'cardImage') {
      setFormData({ ...formData, cardImage: value });
    }
    else if (name.startsWith('gallery')) {
      const index = Number(name.replace('gallery', ''));
      const updated = [...formData.galleryImages];
      updated[index] = value;
      setFormData({ ...formData, galleryImages: updated });
    }
    else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const addModel = () => {
    const model = prompt('Enter model name:');
    if (model && !formData.models.includes(model)) {
      setFormData({ ...formData, models: [...formData.models, model] });
    }
  };

  const removeModel = (model) => {
    setFormData({ ...formData, models: formData.models.filter(m => m !== model) });
  };

  const addColor = () => {
    const color = prompt('Enter color name:');
    if (color && !formData.colors.includes(color)) {
      setFormData({ ...formData, colors: [...formData.colors, color] });
    }
  };

  const removeColor = (color) => {
    setFormData({ ...formData, colors: formData.colors.filter(c => c !== color) });
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      cardImage: product.cardImage,
      galleryImages: product.galleryImages || ['', '', '', ''],
      newPrice: product.newPrice.replace('₹', ''),
      oldPrice: product.oldPrice ? product.oldPrice.replace('₹', '') : '',
      onSale: product.onSale || false,
      tag: product.tag || '',
      category: product.featured ? 'featured' : 'all',
      models: product.models || [],
      colors: product.colors || []
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      cardImage: formData.cardImage,
      galleryImages: formData.galleryImages,
      newPrice: `₹${formData.newPrice}`,
      oldPrice: formData.oldPrice ? `₹${formData.oldPrice}` : '',
      onSale: formData.onSale,
      tag: formData.tag,
      featured: formData.category === 'featured',
      models: formData.models,
      colors: formData.colors,
      createdAt: new Date()
    };

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), payload);
      setProducts(products.map(p =>
        p.id === editingId ? { id: editingId, ...payload } : p
      ));
      setEditingId(null);
    } else {
      const docRef = await addDoc(collection(db, "products"), payload);
      setProducts([...products, { id: docRef.id, ...payload }]);
    }

    setFormData({
      name: '',
      cardImage: '',
      galleryImages: ['', '', '', ''],
      newPrice: '',
      oldPrice: '',
      onSale: false,
      tag: '',
      category: 'all',
      models: [],
      colors: []
    });

    setLoading(false);
    setMessage('Product saved successfully!');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="product-form">

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Card Image URL</label>
          <input
            type="url"
            name="cardImage"
            value={formData.cardImage}
            onChange={handleChange}
            placeholder="Card Image URL"
            required
          />
        </div>

        {formData.galleryImages.map((img, i) => (
          <div key={i} className="form-group">
            <label>Gallery Image {i + 1}</label>
            <input
              type="url"
              name={`gallery${i}`}
              value={img}
              onChange={handleChange}
              placeholder={`Gallery Image ${i + 1}`}
            />
          </div>
        ))}

        <div className="form-group">
          <label>New Price</label>
          <input
            type="number"
            name="newPrice"
            value={formData.newPrice}
            onChange={handleChange}
            placeholder="New Price"
            required
          />
        </div>

        <div className="form-group">
          <label>Old Price</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="Old Price"
          />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="onSale"
            checked={formData.onSale}
            onChange={handleChange}
          />
          <label>On Sale</label>
        </div>

        <div className="form-group">
          <label>Product Section</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="all">All Products</option>
            <option value="featured">Featured Products</option>
          </select>
        </div>

        {/* Model Options */}
        <div className="form-group">
          <label>Model Options</label>
          <div className="options-list">
            {formData.models.map((model, index) => (
              <div key={index} className="option-item">
                <span>{model}</span>
                <button type="button" onClick={() => removeModel(model)} className="remove-btn">Remove</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addModel} className="add-option-btn">Add Model</button>
        </div>

        {/* Color Options */}
        <div className="form-group">
          <label>Colour Options</label>
          <div className="options-list">
            {formData.colors.map((color, index) => (
              <div key={index} className="option-item">
                <span>{color}</span>
                <button type="button" onClick={() => removeColor(color)} className="remove-btn">Remove</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addColor} className="add-option-btn">Add Colour</button>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {editingId ? 'Update Product' : 'Add Product'}
        </button>

      </form>

      {message && <p>{message}</p>}

      {/* Product List */}
      <div className="product-list">
        <h2>Manage Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="product-table">
            {products.map((product) => (
              <div key={product.id} className="product-row">
                <div className="product-info">
                  <img src={product.cardImage} alt={product.name} className="product-thumb" />
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.newPrice}</p>
                    <span className="category-badge">{product.featured ? 'Featured' : 'All'}</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
