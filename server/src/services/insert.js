import db from '../models'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import chothuecanhochungcu from '../../data/chothuecanhochungcu.json'
import chothuecanhodichvu from '../../data/chothuecanhodichvu.json'
import chothuecanhomini from '../../data/chothuecanhomini.json'
import chothuephongtro from '../../data/chothuephongtro.json'
import nhachothue from '../../data/nhachothue.json'
import generateCode from '../ultis/generateCode'
import { where } from 'sequelize'

require('dotenv').config()
const dataBody = chothuecanhomini.body

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const insertService = () => new Promise(async (resolve, reject) => {
    try {
        for (const item of dataBody) {
            let postId = v4()
            let labelCode = generateCode(item?.header?.star?.classType)
            let attributesId = v4()
            let userId = v4()
            let overviewId = v4()
            let imagesId = v4()

            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                star: item?.header?.star?.rateStar,
                labelCode,
                address: item?.header?.address,
                attributesId,
                categoryCode: 'CHMN',
                description: JSON.stringify(item?.mainContent?.content),
                userId,
                overviewId,
                imagesId
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

            await db.Label.findOrCreate({
                where: { code : labelCode },
                defaults: {
                    code: labelCode,
                    value: item?.header?.star?.classType
                }
            })

            await db.Overview.create({
                id: overviewId,
                overview: JSON.stringify(item?.overview?.content)
            })

            await db.User.create({
                id: userId,
                name: item?.contact?.content?.[0]?.name,
                password: hashPassword('123456'),
                phone: item?.contact?.content?.[0]?.phoneNumber,
                zalo: item?.contact?.content?.[0]?.zalo
            })

        }

        resolve('Done.')
    } catch (error) {
        reject(error)
    }
})

// export const createUser = () => new Promise (async(resolve, reject) => {
//     try {
//         await db.User.create({
//             id: userId,
//             name: item?.contact?.content?.[0]?.name,
//             password: hashPassword('123456'),
//             phone: item?.contact?.content?.[0]?.phoneNumber,
//             zalo: item?.contact?.content?.[0]?.zalo
//         })
//         resolve('OK')
//     } catch (err) {
//         reject(err)
//     }
// })