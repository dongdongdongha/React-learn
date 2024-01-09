"use client";
import Image from "next/image";
import { useState } from "react";

export default function List() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];
  let [수량, 수량변경] = useState([0, 0, 0]);

  return (
    <div>
      <h4 className="title">상품목록</h4>

      {상품.map((i, j) => {
        return (
          <div className="food" key={j}>
            <img src={"/음식" + j + ".png"} className="food-img" />
            <h4>{i} &40</h4>
            <span>{수량[j]}</span>
            <button
              onClick={() => {
                let copy = [...수량];
                copy[j]++;
                수량변경(copy);
              }}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
