import * as postService from '../services/post'
import { Op } from 'sequelize'

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at post controller: ' + error
        })
    }
}

export const getPostsLimit = async (req, res) => {
    let { page, priceNumber, areaNumber, ...query } = req.query

    // 👉 Bỏ dấu [] và chuyển về format Sequelize hiểu được
    const filters = {}
    Object.entries(query).forEach(([key, value]) => {
        const cleanKey = key.replace(/\[\]$/, '') // xóa dấu []
        if (cleanKey === 'priceNumber' || cleanKey === 'areaNumber') {
            const [min, max] = (Array.isArray(value) ? value : value.split(',')).map(Number)
            filters[cleanKey] = { [Op.between]: [min, max] }

        // Trường hợp dùng IN (dùng các mã code)
        } else {
            filters[cleanKey] = {
                [Op.in]: Array.isArray(value) ? value : [value]
            }
        }
    })

    try {
        const response = await postService.getPostsLimitService(page, filters, { priceNumber, areaNumber })
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at post controller: ' + error
        })
    }
}

export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at post controller: ' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { categoryCode, title, priceNumber, areaNumber, label } = req.body
        const { id } = req.user
        if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await postService.createNewPostService(req.body, id)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at post controller: ' + error
        })
    }
}

export const getPostsLimitAdmin = async (req, res) => {
    const { page, ...query } = req.query
    const { id } = req.user
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await postService.getPostsLimitAdminService(page, id, query)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const updatePost = async (req, res) => {
    const { postId, overviewId, imagesId, attributesId, ...payload } = req.body
    const { id } = req.user
    try {
        if (!postId || !id || !overviewId || !imagesId || !attributesId) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await postService.updatePost(req.body)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}

export const deletePost = async (req, res) => {
    const { postId } = req.query
    const { id } = req.user
    try {
        if (!postId || !id ) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs'
        })
        const response = await postService.deletePost(postId)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}