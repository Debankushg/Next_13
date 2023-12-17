import Room from '../models/room.model'


// GET:http://localhost:3000/api/room
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({})
        return res.status(200).json({ success: true, data: rooms })
    } catch (err) { return res.status(400).json({ err }) }
}


// POST:http://localhost:3000/api/room

export const createRoom = async (req, res) => {
    try {
        const len = await (await Room.find({})).length

        const defaultRoom = {
            name: `Room ${len + 1}`,
            message: []
        }
        const chat = await Room.create(defaultRoom)
        return res.status(200).json({ success: true, data: chat })
    } catch (err) {
        return res.status(400).json({ err })
    }
}



// GET:http://localhost:3000/api/room/id
export const getRoom = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: 'No Chat id Present' })
        const room = await Room.findById(id).populate('message')
        if (!room) return res.status(400).json({ error: 'No Room Found' })
        return res.status(200).json({ success: true, data: room })
    } catch (err) {
        return res.status(400).json({ err })
    }
}


// DELETE :http://localhost:3000/api/room/id
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.query
        if (!id) return res.status(400).json({ error: 'No Chat id Present' })

        await Room.findByIdAndDelete(id)
        return res.status(200).json({ success: true, deleted: id })

    } catch (err) {
        return res.status(400).json({ err })
    }
}