import React, { Suspense, lazy, useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton/Skeleton';
import { mockProducts } from '../utils/mockData';
import styles from './Page.module.css';

// Lazy load ProductCard for code splitting
const ProductCard = lazy(() => import('../components/ProductCard/ProductCard'));

// PUBLIC_INTERFACE
/**
 * Products page - Product catalog with card grid layout
 * Native React implementation with ProductCard components
 */
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      setLoading(true);
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 400));
      setProducts(mockProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const handleProductClick = (product) => {
    console.log('Product clicked:', product);
    // In production, navigate to product detail page
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Products</h1>
        <div className={styles.pageContent}>
          <div className={styles.productsGrid}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} variant="rectangular" width="100%" height={320} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Products</h1>
      <div className={styles.pageContent}>
        <div className={styles.productsGrid}>
          <Suspense fallback={
            <>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} variant="rectangular" width="100%" height={320} />
              ))}
            </>
          }>
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
