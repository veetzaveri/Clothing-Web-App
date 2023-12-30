import { useEffect, useState } from "react";
import { useURLID } from "./useURLID";
import { useColor } from "./useURLID";
import { useNavigate } from "react-router-dom";
import React, { Component } from 'react';
import useDocumentTitle from "./DocumentTitle";


export default function ProductItem() {
  const { id } = useURLID();
  const {color} = useColor();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useDocumentTitle(`${singleProduct.type}-${singleProduct.itemName}`);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:9000/products/${id}`);

        const data = await res.json();

        setSingleProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  function onColorChange(number) {
    let color;
    if(number == "1") 
    {
      color = singleProduct.color.color1;
    }
    if(number == "2") 
    {
      color = singleProduct.color.color2;
    }
    if(number == "3") 
    {
      color = singleProduct.color.color3;
    }
    if(number == "4") 
    {
      color = singleProduct.color.color4;
    }
    navigate(`/product?id=${singleProduct.id}&color=${color}`)
  }

  //const navigate = useNavigate();

  // If loading, display the loading div
  if (loading) return <div>Loading...</div>;

  // If not loading, display the product details
  return (
    <div className="single__product">
      <h1>
        <span onClick={() => navigate("/")}>🔙 </span>
        <span>
          {singleProduct.itemName} Page id: {id}
        </span>
      </h1>
      <section>
        <figure className="product__img-container">
          <img
            loading="lazy"
            className="product__img"
            src={singleProduct.imageUrl}
            alt="Image"
          />
        </figure>
        <aside>
          <h2>{singleProduct.itemName}</h2>
          <h3>{singleProduct.notes}</h3>
          <h4>
            Category: <span>{singleProduct.type}</span>
          </h4>
          <p>
            Width: <strong>{singleProduct?.size?.width}</strong>
          </p>
          <p>
            Length: <strong>{singleProduct?.size?.length}</strong>
          </p>
          
          <button onClick={()=> onColorChange("1")}>Color: {singleProduct?.color?.color1}</button>
          <button onClick={()=> onColorChange("2")}>Color: {singleProduct?.color?.color2}</button>
          <button onClick={()=> onColorChange("3")}>Color: {singleProduct?.color?.color3}</button>
          <button onClick={()=> onColorChange("4")}>Color: {singleProduct?.color?.color4}</button>
        </aside>
      </section>
    </div>
  );
}
