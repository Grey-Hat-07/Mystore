import React from 'react'
import baseUrl from '../helpers/baseUrl';
import { useEffect, useState } from 'react';
export const Cartproduct = (props) => {
    const { product } = props;
    const id = product.product;
    const [productData, setProductData] = useState({});
    useEffect(async () => {
        const res = await fetch(`${baseUrl}/api/product/${id}`);
        const data = await res.json();
        setProductData(data);
    }, [id]);
    
    return (
        <div>
            <div className="card">
                
                <div className="card-header">
                <h2>{productData.name}</h2>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                    <img src={productData.image} className=" cartimage" alt={productData.name} />
                        <p>{productData.description}.</p>
                        <p>{product.quantity}  x  {productData.price}</p>
                        <p>
                            total: {product.quantity * productData.price}
                            {/* {props.total} */}
                        </p>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}
