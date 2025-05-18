import db from '../models'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import chothuecanhochungcu from '../../data/chothuecanhochungcu.json'
import chothuecanhodichvu from '../../data/chothuecanhodichvu.json'
import chothuecanhomini from '../../data/chothuecanhomini.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import nhachothue from '../../data/nhachothue.json'
import generateCode from '../ultis/generateCode'
import { dataPrice, dataArea } from '../ultis/data'
import { getNumberFromString, getNumberFromStringV2 } from '../ultis/common'

require('dotenv').config()
const dataBody = [
    {
        body: chothuephongtro.body,
        code: 'PT'
    },
    {
        body: nhachothue.body,
        code: 'NNC'
    },
    {
        body: chothuecanhochungcu.body,
        code: 'CHCC'
    },
    {
        body: chothuecanhomini.body,
        code: 'CHMN'
    },
    {
        body: chothuecanhodichvu.body,
        code: 'CHDV'
    } 
]

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const insertService = () => new Promise(async (resolve, reject) => {
    try {
        const provinceCodes = []
        const labelCodes = []
        dataBody.forEach(cate => {
            cate.body.forEach(async (item) => {
                let postId = v4()
                let labelCode = generateCode(item?.header?.star?.classType).trim()
                labelCodes?.every(item => item?.code !== labelCode) && labelCodes.push({
                    code: labelCode,
                    value: item?.header?.star?.classType?.trim()
                })
                let provinceCode = generateCode(item?.header?.address?.split(',')?.slice(-1)[0]).trim()
                provinceCodes?.every(item => item?.code !== provinceCode) && provinceCodes.push({
                    code: provinceCode,
                    value: item?.header?.address?.split(',')?.slice(-1)[0].trim()
                })
                let attributesId = v4()
                let userId = v4()
                let imagesId = v4()
                let overviewId = v4()
                let reviewId = v4()
                let desc =  JSON.stringify(item?.mainContent?.content)
                let currentArea = getNumberFromString(item?.header?.attributes?.acreage)
                let currentPrice = getNumberFromString(item?.header?.attributes?.price)

                await db.Post.create({
                    id: postId,
                    title: item?.header?.title,
                    star: item?.header?.star?.rateStar,
                    labelCode,
                    address: item?.header?.address,
                    attributesId,
                    categoryCode: cate.code,
                    description: desc,
                    userId,
                    overviewId,
                    imagesId,
                    priceNumber: getNumberFromStringV2(item?.header?.attributes?.price),
                    areaNumber: getNumberFromStringV2(item?.header?.attributes?.acreage),
                    areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea )?.code,
                    priceCode: dataPrice.find(area => area.max > currentPrice && area.min <= currentPrice )?.code,
                    provinceCode
                })

                await db.Attribute.create({
                    id: attributesId,
                    price: item?.header?.attributes?.price,
                    acreage: item?.header?.attributes?.acreage,
                    oublished: item?.header?.attributes?.oublished,
                    hashtag: item?.header?.attributes?.hashtag
                })

                await db.Image.create({
                    id: imagesId,
                    image: JSON.stringify(item?.images)
                })

                await db.Overview.create({
                    id: overviewId,
                    code: item?.overview?.content.find(i => i.name === "Mã tin:")?.content,
                    area: item?.overview?.content.find(i => i.name === "Khu vực:")?.content,
                    type: item?.overview?.content.find(i => i.name === "Loại tin rao:")?.content,
                    target: item?.overview?.content.find(i => i.name === "Đối tượng thuê:")?.content,
                    popularity: item?.overview?.content.find(i => i.name === "Gói tin:")?.content,
                    created: item?.overview?.content.find(i => i.name === "Ngày đăng:")?.content,
                    expired: item?.overview?.content.find(i => i.name === "Ngày hết hạn:")?.content,
                })

                await db.User.create({
                    id: userId,
                    name: item?.contact?.content?.[0]?.name,
                    password: hashPassword('123456'),
                    phone: item?.contact?.content?.[0]?.phoneNumber,
                    zalo: item?.contact?.content?.[0]?.zalo
                })

                await db.Review.create({
                    id: reviewId,
                    userId,
                    content: 'Đánh giá',
                    date: 'Hôm nay',
                    postId
                })
            })
        })

        provinceCodes?.forEach(async (item) => {
            await db.Province.create(item)
        })
        labelCodes?.forEach(async (item) => {
            await db.Label.create(item)
        })

        resolve('Done.')
    } catch (error) {
        reject(error)
    }
})

export const createPricesAndAreas = () => new Promise ((resolve, reject) => {
    try {
        dataPrice.forEach(async (item, index) => {
            await db.Price.create({
                code: item.code,
                value: item.value,
                order: index + 1
            })
        })
        dataArea.forEach(async (item, index) => {
            await db.Area.create({
                code: item.code,
                value: item.value,
                order: index + 1
            })
        })
        resolve('OK')
    } catch (err) {
        reject(err)
    }
})