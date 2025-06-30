import React, { memo } from 'react'

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity, maxQuantity }) => {

    return (
        <div className='flex items-center'>
            <span onClick={() => handleChangeQuantity('minus')} className='p-2 cursor-pointer border-r border-black'>-</span>
            <input
                className='py-2 outline-none w-[50px] text-black text-center'
                type="text"
                value={quantity}
                onChange={e => {
                  let val = Number(e.target.value);
                  if (!val || val < 1) val = 1;
                  if (maxQuantity && val > maxQuantity) val = maxQuantity;
                  handleQuantity(val);
                }}
            />
            <span onClick={() => handleChangeQuantity('plus')} className='p-2 cursor-pointer border-l border-black'>+</span>
        </div>
    )
}

export default memo(SelectQuantity)