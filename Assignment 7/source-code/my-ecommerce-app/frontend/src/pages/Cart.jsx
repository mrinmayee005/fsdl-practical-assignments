import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>YOUR <span className='text-gray-700 font-medium'>CART</span></p>
          <p className='w-8 sm:w-12 h-[1px] bg-gray-700'></p>
        </div>
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input 
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                type="number" 
                min={1} 
                defaultValue={item.quantity} 
              />
              <i 
                onClick={() => updateQuantity(item._id, item.size, 0)} 
                className="fa-regular fa-trash-can cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
              ></i>
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <div className='text-2xl'>
            <div className='inline-flex gap-2 items-center mb-3'>
              <p className='text-gray-500'>CART <span className='text-gray-700 font-medium'>TOTALS</span></p>
              <p className='w-8 sm:w-12 h-[1px] bg-gray-700'></p>
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency} {400.00}.00</p> {/* Replace with dynamic calculation later */}
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency} 10.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <b>Total</b>
              <b>{currency} {410.00}.00</b>
            </div>
          </div>

          <div className='w-full text-end'>
            <button 
              onClick={() => navigate('/place-order')} 
              className='bg-black text-white text-sm my-8 px-8 py-3 uppercase active:bg-gray-700 transition'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;