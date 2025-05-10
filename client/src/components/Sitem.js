import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'

const Sitem = ({ title, price, image, time, createdAt}) => {

  const formatTime = () => {
    return moment(createdAt).fromNow()
  }
  return (
    <div className='w-full flex items-center gap-1 p-2 border-b border-gray-300'>
        <img 
            src={image[0]} 
            alt="anh" 
            className='w-[50px] h-[50px] object-cover flex-none rounded-md'
        />
        <div className='w-full flex-auto flex flex-col justify-between gap-1'>
            <h4 className='text-blue-600 text-[13px]'>{`${title?.slice(0, 40)}...`}</h4>
            <div className='flex items-center justify-between w-full'>
                <span className='font-medium text-green-500 text-[11px]'>{price}</span>
                <span className='text-gray-400 text-[11px]'>{formatTime(createdAt)}</span>
            </div>
        </div>
    </div>
  )
}

export default memo(Sitem)