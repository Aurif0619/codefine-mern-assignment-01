import React, { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products'); 
        const data: Product[] = await response.json(); 
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <img src={product.image} alt={product.title} width={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
