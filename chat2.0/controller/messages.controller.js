import Message from '../models/message.model'
import Room from '../models/room.model';
import OpenAI from 'openai';



// GET:http://localhost:3000/api/chat/roomid

export const getChat = async (req, res) => {
    try {
        const { roomid } = req.query;
        if (!roomid) return res.status(400).json({ error: 'No Room Id Present..!' })

        const messages = await Message.find({ room: roomid }, { __v: 0, room: 0 })
        if (!messages) return res.status(400).json({ error: 'No Message found' })

        return res.status(200).json({ success: true, data: messages })

    } catch (err) {
        return res.status(400).json({ err })
    }
}

// POST:http://localhost:3000/api/chat/roomid

export const createChat = async (req, res) => {
    const { roomid } = req.query;
    const { question, answer } = req.body

    if (!roomid) return res.status(400).json({ error: 'No Room Id Present' })
    if (!question && !answer) res.status(400).json({ error: 'Donot get Data from the user' })

    // get current room 
    const rooms = await Room.findOne({ _id: roomid })
    if (!rooms) return res.status(400).json({ error: 'No Room Found' })

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY // This is also the default, can be omitted
    });

    const completion = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt: "This story begins",
        max_tokens: 100,
      });

    /** specify data to the message model */
    const message = new Message({
        question,
        answer: completion.data.choices[0].text,
        room: roomid
    })

    // save data in DB
    await message.save()

    rooms.message.push(message._id);

    await rooms.save()

    return res.status(200).json({ success: true, data: message })
}


// export async function createChat(req, res){
//     const { roomid } = req.query;
//     const { question, answer } = req.body;

//     if(!roomid) return res.status(400).json({ error : "No room id present...!"});
//     if(!question && !answer) res.status(400).json({ error: "Cannot get data from the user...!"});

//     /** get current room */
//     const rooms = await Room.findOne({ _id : roomid })

//     if(!rooms) return res.status(400).json({ error : "No room found...!"});

//     /** CONFIG OPEN AI API */
//     const config = new Configuration({
//         apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
//     })

//     const openai = new OpenAIApi(config);

//     const completion = await openai.createCompletion({
//         model : "text-davinci-003",
//         prompt : question,
//         temperature : 0.5,
//         max_tokens : 100,
//         top_p : 1
//     })

//     /** specify data to the message model */
//     const message = new Message({
//         question,
//         answer : completion.data.choices[0].text,
//         room : roomid
//     })

//     /** save data in the database */
//     await message.save();

//     /** push message in the room model */
//     rooms.messages.push(message._id);

//     /** save data in the room model */
//     await rooms.save()

//     return res.status(200).json({ success : true, data: message })

// }





// DELETE:http://localhost:3000/api/chat/roomid