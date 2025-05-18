import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import { Slider, Boxinfo, RelatedPost } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'

const { FaLocationDot, MdAttachMoney, RiCrop2Line, LuClock8, HiHashtag } = icons

const DetailPost = () => {

  const {postId} = useParams()
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)
  const navigate = useNavigate()

  // console.log(posts);
  
  useEffect(() => {
    postId && dispatch(getPostsLimit({id: postId}))
  }, [postId])

    const handleFilterLabel = () => {
      const titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`
      navigate({
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({labelCode: posts[0]?.labelData?.code}).toString()
      }, {state: { titleSearch }});
    }
  
    return (
      <div className='w-full flex gap-4'>
          <div className='w-[65%] '>
                <Slider  images={posts && posts?.length > 0 && JSON.parse(posts[0]?.images?.image)} />
                <div className='bg-white rounded-md shadow-md p-4'>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-bold text-red-600'>{posts[0]?.title}</h2>
                    <div className='flex items-center gap-2'>
                      <span>Chuyên mục:</span>
                      <span 
                        className='text-blue-500 underline font-medium hover:text-orange-500 cursor-pointer'
                        onClick={(handleFilterLabel)}
                      >
                        {posts[0]?.labelData?.value}
                      </span>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <FaLocationDot color='#3B82F6' />
                      <span>{posts[0]?.address}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='flex items-center gap-1'>
                        <MdAttachMoney />
                        <span className='font-semibold text-lg text-green-500'>{posts[0]?.attributes?.price}</span>
                      </span>
                      <span className='flex items-center gap-1'>
                        <RiCrop2Line />
                        <span>{posts[0]?.attributes?.acreage}</span>
                      </span>
                      <span className='flex items-center gap-1'>
                        <LuClock8 />
                        <span>{posts[0]?.attributes?.oublished}</span>
                      </span>
                      <span className='flex items-center gap-1'>
                        <HiHashtag />
                        <span>{posts[0]?.attributes?.hashtag}</span>
                      </span>
                    </div>
                  </div>
                  <div className='mt-8'>
                    <h3 className='font-semibold text-xl my-4 text-cyan-500'>Thông tin mô tả</h3>
                    <div className='flex flex-col gap-2'>
                    {(() => {
                      try {
                        const parsedDescription = JSON.parse(posts[0]?.description);
                        // Nếu là mảng thì map, nếu không thì hiển thị chuỗi
                        if (Array.isArray(parsedDescription)) {
                          return parsedDescription.map((item, index) => (
                            <span key={index}>{item}</span>
                          ));
                        } else {
                          return <span>{parsedDescription}</span>;
                        }
                      } catch (error) {
                        // Nếu lỗi parse thì hiển thị chuỗi gốc
                        return <span>{posts[0]?.description}</span>;
                      }
                    })()}
                    </div>
                  </div>
                  <div className='mt-8'>
                    <h3 className='font-semibold text-xl my-4 text-cyan-500'>Đặc điểm tin đăng</h3>
                    <table className='w-full'>
                      <tbody className='w-full'>
                        <tr className='w-full'>
                          <td className='p-2'>Mã tin</td>
                          <td className='p-2'>{posts[0]?.overviews?.code}</td>
                        </tr>
                        <tr className='w-full bg-gray-200'>
                          <td className='p-2'>Khu vực</td>
                          <td className='p-2'>{posts[0]?.overviews?.area}</td>
                        </tr>
                        <tr className='w-full'>
                          <td className='p-2'>Loại tin</td>
                          <td className='p-2'>{posts[0]?.overviews?.type}</td>
                        </tr>
                        <tr className='w-full bg-gray-200'>
                          <td className='p-2'>Đối tượng</td>
                          <td className='p-2'>{posts[0]?.overviews?.target}</td>
                        </tr>
                        <tr className='w-full'>
                          <td className='p-2'>Gói tin</td>
                          <td className='p-2'>{posts[0]?.overviews?.popularity}</td>
                        </tr>
                        <tr className='w-full bg-gray-200'>
                          <td className='p-2'>Ngày đăng</td>
                          <td className='p-2'>{posts[0]?.overviews?.created}</td>
                        </tr>
                        <tr className='w-full'>
                          <td className='p-2'>Ngày hết hạn</td>
                          <td className='p-2'>{posts[0]?.overviews?.expired}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='mt-8'>
                    <h3 className='font-semibold text-xl my-4 text-cyan-500'>Thông tin liên hệ</h3>
                    <table className='w-full'>
                      <tbody className='w-full'>
                        <tr className='w-full'>
                          <td className='p-2'>Liên hệ</td>
                          <td className='p-2'>{posts[0]?.user?.name}</td>
                        </tr>
                        <tr className='w-full bg-gray-200'>
                          <td className='p-2'>Điện thoại</td>
                          <td className='p-2'>{posts[0]?.user?.phone}</td>
                        </tr>
                        <tr className='w-full'>
                          <td className='p-2'>Zalo</td>
                          <td className='p-2'>{posts[0]?.user?.zalo}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
          </div>
          <div className='w-[35%] flex flex-col gap-8'>
              <Boxinfo userData={posts[0]?.user} />
              <RelatedPost />
          </div>
      </div>
    )
}

export default DetailPost