import React from 'react';
import styles from './ProductCard.module.css';

// PUBLIC_INTERFACE
/**
 * ProductCard component - Displays product information in a card format
 * @param {Object} product - Product data { id, name, category, price, stock, image }
 * @param {Function} onClick - Click handler
 */
function ProductCard({ product, onClick }) {
  const { name, category, price, stock, image } = product;

  const handleImageError = (e) => {
    e.target.style.display = 'none';
  };

  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.imageWrapper}>
        {image && (
          <img
            src={image}
            alt={name}
            className={styles.image}
            onError={handleImageError}
          />
        )}
        {stock < 20 && (
          <span className={styles.lowStock} aria-label="Low stock">
            Low Stock
          </span>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          <span className={styles.stock}>{stock} in stock</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
