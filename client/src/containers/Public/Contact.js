import React, { useState } from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2'

const Contact = () => {

    const [ payload, setPayload ] = useState({
        name: '',
        phone: '',
        content: ''
    })

    const handleSubmit = () => {
        Swal.fire(`Cảm ơn ${payload.name ? payload.name : ''}`, 'Nội dung của bạn đã gửi thành công', 'success').then(() => {
            setPayload({
                name: '',
                phone: '',
                content: ''
            })
        })
    }
    
    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
            <div className='flex gap-4'>
                <div className='flex-1 flex flex-col gap-4 h-fit rounded-3xl p-4 text-white bg-gradient-to-br from-blue-600 to-cyan-400'>
                    <h4 className='font-medium text-lg'>Thông tin liên hệ</h4>
                    <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn Phongtro123</span>
                    <span>Điện thoại: 0765 511 503</span>
                    <span>Email: cskh.phongtro123@gmail.com</span>
                    <span>Zalo: 0765 511 503</span>
                    <span>Viber: 0765 511 503</span>
                    <span>Địa chỉ: ****, Số ** Trưng Nữ Vương, Phường Hoà Thuận Tây, Quận Hải Châu, Tp. Đà Nẵng</span>
                </div>
                <div className='flex-1 bg-white shadow-md rounded-md p-4 mb-6'>
                    <h4 className='font-medium text-lg mb-4'>Liên hệ trực tuyến</h4>
                    <div className='flex flex-col gap-4'>
                        <InputForm
                            label='HỌ VÀ TÊN CỦA BẠN'
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload='name'
                        />
                        <InputForm
                            label='SỐ ĐIỆN THOẠI'
                            value={payload.phone}
                            setValue={setPayload}
                            keyPayload='phone'
                        />
                        <div>
                            <label htmlFor="desc">NỘI DUNG MÔ TẢ</label>
                            <textarea 
                                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                                value={payload.content}
                                onChange={e => setPayload(prev => ({...prev, content: e.target.value}))}
                                name='content'
                                id="desc"
                                cols="30"
                                rows="3">
                            </textarea>
                        </div>
                        <Button
                            text='Gửi liên hệ'
                            bgColor='bg-blue-400'
                            textColor='text-white'
                            fullWidth
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact