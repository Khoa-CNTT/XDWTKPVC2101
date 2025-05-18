import React, { memo } from 'react'
import noneAvatar from '../assets/none-avatar.jpg'
import icons from '../ultils/icons'

const { BsDot, FaPhoneVolume, SiZalo } = icons

const Boxinfo = ( { userData } ) => {
  return (
    <div className='w-full bg-yellow-300 rounded-md flex flex-col items-center p-4 gap-4'>
        <img src={noneAvatar} alt='avatar' className='w-16 h-16 object-contain rounded-full' />
        <h3 className='font-medium text-xl'>{userData?.name}</h3>
        <span className='flex items-center'>
            <BsDot color='green' size={35} />
            <span>Đang hoạt động</span>
        </span>
        <a 
            className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold' 
            href='/'><FaPhoneVolume />{userData?.phone}
        </a>
        <a 
            className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold' 
            href={`https://zalo.me/${userData?.zalo}`}><SiZalo color='blue' size={25} />
        </a>
    </div>
  )
}

export default memo(Boxinfo)