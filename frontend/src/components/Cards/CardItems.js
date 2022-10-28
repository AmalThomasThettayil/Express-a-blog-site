import DOMPurify from "dompurify";
import React from "react";
import { Link } from "react-router-dom";

const CardItems = (props) => {
  return (
    <>
      <li className='mb-7'>
        <Link className='flex flex-col' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='TravelImage'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info' >
            <h5 className='cards__item__text'
            >{props.text.substr(0, 1000)}</h5>
          </div>
        </Link>
      </li>
    </>
  );
};

export default CardItems;