import React from 'react'
import { SearchItem } from '../../components'
import icons from '../../ultils/icons'

const { GrNext, IoLocationOutline, MdAttachMoney, RiCrop2Line, PiHouseLine, FiSearch } = icons

const Search = () => {
  return (
    <div className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
      <SearchItem IconBefore={<PiHouseLine />} fontWeight IconAfter={<GrNext />} text='Phòng trọ, nhà trọ' />
      <SearchItem IconBefore={<IoLocationOutline />} IconAfter={<GrNext />} text='Toàn quốc' />
      <SearchItem IconBefore={<MdAttachMoney />} IconAfter={<GrNext />} text='Chọn giá' />
      <SearchItem IconBefore={<RiCrop2Line />} IconAfter={<GrNext />} text='Chọn diện tích' />
      <button
      type='button'
      className='outline-none py-2 px-4 w-full bg-secondary1 text-[13px] flex items-center justify-center gap-2 text-white font-medium rounded-lg'
      >
          <FiSearch />
          Tìm kiếm
      </button>
    </div>
  )
}

export default Search