import React, { memo, useState } from 'react'
import icons from '../ultils/icons'

const images = [
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2019/05/15/34b73384-df05-4c31-bbeb-00c8c22d025e_1557916814.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2025/02/26/img-1520_1740529266.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2025/03/19/z5939630673642-1875682956718a77ef937c41e5a5d3aa_1742370758.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/04/06/img-0561_1680780296.jpg"
]

const {RxStarFilled, GoHeart, GoHeartFill, BsBookmarkStarFill} = icons

const Item = () => {
    const [isHoverHeart,setIsHoverHeart] = useState(false)
    return (
        <div className='w-full flex border-t border-orange-600 p-4'>
            <div className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'>
                <img src={images[0]} alt="preview" className='w-[110px] h-[125px] object-cover' />
                <img src={images[1]} alt="preview" className='w-[110px] h-[125px] object-cover' />
                <img src={images[2]} alt="preview" className='w-[110px] h-[125px] object-cover' />
                <img src={images[3]} alt="preview" className='w-[110px] h-[125px] object-cover' />
                <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-1'>4 ảnh</span>
                <span 
                className='text-white absolute right-5 bottom-2'
                onMouseEnter={() => setIsHoverHeart(true)}
                onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <GoHeartFill size={24} color='#f03426' /> : <GoHeart size={24}/>}
                </span>
            </div>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <div className='text-red-600 font-medium'>
                        <RxStarFilled className='star-item' color='#f7e92a' />
                        <RxStarFilled className='star-item' color='#f7e92a' />
                        <RxStarFilled className='star-item' color='#f7e92a' />
                        <RxStarFilled className='star-item' color='#f7e92a' />
                        <RxStarFilled className='star-item' color='#f7e92a' />
                    Ký túc xá quận 7 trọn gói 1tr gần Lotte Mart
                    </div>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={20} color='orange' />
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between'>
                    <span className='font-bold text-green-600'>2.3 triệu/tháng</span>
                    <span>23 m²</span>
                    <span>Quận 7, Hồ Chí Minh</span>
                </div>
                <p className='text-gray-500'>
                Đến Homestay Hoàng Phúc - hệ thống Kytucxa Q7 rẻ nhất Sài Gòn với những căn phòng đẹp lung linh, đa dạng tiện nghi và bao trọn toàn bộ các chi…
                </p>
                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center'>
                        <img src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>Nhi Nguyễn</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                        type='button'
                        className='bg-blue-700 text-white p-1 rounded-md'
                        >
                            Gọi 0817823871
                        </button>
                        <button
                        type='button'
                        className='text-blue-700 px-1 rounded-md border border-blue-700'
                        >
                            Nhắn Zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)