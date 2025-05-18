import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
import { path } from '../ultils/constant'

const indexs = [0,1,2,3]


const {RxStarFilled, GoHeart, GoHeartFill, BsBookmarkStarFill} = icons

const Item = ({ images, user, title, star, description, attributes, address, id }) => {
    const [isHoverHeart,setIsHoverHeart] = useState(false)

    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<RxStarFilled className='star-item' color='#f7e92a' />)
        return stars
    }
    return (
        <div className='w-full flex border-t border-orange-600 py-4'>
            <Link 
                to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`} 
                className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'
            >
                {images.length > 0 && images.filter((i, index) => indexs.some( i => i === index))?.map((i, index) => {
                    return (
                        <img key={index} src={i} alt="preview" className='w-[110px] h-[125px] object-cover' />
                    )
                })}
                <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} ảnh`}</span>
                <span 
                className='text-white absolute right-5 bottom-2'
                onMouseEnter={() => setIsHoverHeart(true)}
                onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <GoHeartFill size={24} color='#f03426' /> : <GoHeart size={24}/>}
                </span>
            </Link>
            <div className='w-3/5'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`} className='text-red-600 font-medium'>
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {title}
                    </Link>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={20} color='orange' />
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between gap-2 text-sm'>
                    <span className='font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
                    <span className='flex-1'>{attributes?.acreage}</span>
                    <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>{`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}</span>
                </div>
                <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden text-base'>
                    {description}
                </p>
                <div className='flex items-center my-5 justify-between'>
                    <div className='flex items-center text-xs'>
                        <img src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                        <a
                            className='bg-blue-700 text-white p-1 rounded-md'
                            href='/'
                        >
                            {`Gọi ${user?.phone}`}
                        </a>
                        <a
                            className='text-blue-700 px-1 rounded-md border border-blue-700'
                            href={`https://zalo.me/${user?.zalo}`}
                            target='_blank'
                        >
                            Nhắn Zalo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)