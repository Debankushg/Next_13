


export const getAllRooms = async () => {
    const { success, data } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/room`)).json()
    if (!success) throw new Error('Error fetching rooms');
    return data;
}


export const getMessages = async (roomid) => {
    const { success, data } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/${roomid}`)).json()
    if (!success) throw new Error('Error fetching messages');
    return data;
}


export const createRoom = async () => {
    const { success, data } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/room`, {
        method: 'POST'
    })).json()
    if (!success) throw new Error('Error creating room');
    return data;
}

export const deleteRoom = async (roomid) => {
    const { success, data } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/room/${roomid}`, {
        method: 'DELETE'
    })).json()
    if (!success) throw new Error('Error deleting  Room');
    return data;
}


export const sentMessages = async ({ roomid, message }) => {

    if (!roomid && !message) throw new Error('Invalid argument')
    `Authorization: Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    const { success, data } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/${roomid}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: message })
    })).json()

    if (!success) throw new Error('Error sending messages');
    return { success, data };
}

