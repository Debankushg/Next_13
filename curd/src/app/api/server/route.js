import { NextResponse } from "next/server";
import { user } from "../../../util/db";

// export function GET(req){
//     return NextResponse.json({name:"Ram",age:40,city:"Delhi"},{status:200})
// }


export function GET() {
    const data = user;
    return NextResponse.json(data, { status: 200 })
}

export async function POST(req, res) {
    let payload = await req.json()
    if (!payload.formData) {
        return NextResponse.json({ result: "required field not found", success:false }, { status: 400 })
    }
    return NextResponse.json({ result: "new User created", success:true },{status:200})
}