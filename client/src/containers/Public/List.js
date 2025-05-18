import React, { useEffect, useState } from 'react'
import { Button, Item } from '../../components'
import { getPosts, getPostsLimit } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const List = ({ categoryCode }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)

    useEffect(() => {
        
        let searchParamsObject = {}
        for (let [key, value] of searchParams.entries()) {
          if (searchParamsObject[key]) {
            // Nếu đã có key, push thêm vào mảng
            searchParamsObject[key] = [...searchParamsObject[key], value]
          } else {
            // Nếu là page, parse sang số
            if (key === 'page') {
              searchParamsObject[key] = +value
            } else {
              searchParamsObject[key] = [value]
            }
          }
        }
      
        if (categoryCode) {
          searchParamsObject.categoryCode = [categoryCode]
        }
      
        dispatch(getPostsLimit(searchParamsObject))
      }, [searchParams, categoryCode])

    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: 20:27 22/5/2025</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <span className='bg-gray-200 p-2 rounded-md' >Mới nhất</span>
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Item 
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            description={JSON.parse(item?.description)}
                            images={JSON.parse(item?.images.image)}
                            star={+item?.star}
                            title={item?.title}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default List