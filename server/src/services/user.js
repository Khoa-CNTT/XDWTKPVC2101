import db from '../models'

// Get CURRENT
export const getOne = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.findOne({ 
            where: { id },
            raw: true,
            attributes: {
                exclude: ['password']
            }
         })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Fail to get user.',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updateUser = (payload, id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id }
        })
        resolve({
            err: response[0] > 0 ? 0 : 1,
            msg: response[0] > 0 ? 'Update' : 'Fail to update user.'
        })
    } catch (error) {
        reject(error)
    }
})