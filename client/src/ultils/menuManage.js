import icons from "./icons"

const { PiNotePencilFill, LuNotebook, FaRegUserCircle } = icons

const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <PiNotePencilFill />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <LuNotebook />
    },
    {
        id: 3,
        text: 'Thông tin tào khoản',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FaRegUserCircle />
    }
]

export default menuManage