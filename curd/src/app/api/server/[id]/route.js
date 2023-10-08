import { user } from "../../../../util/db";
import { NextResponse } from "next/server";



export function GET(req, res) {
    const userData = user.filter((item) => item.id == res.params.id)
    return NextResponse.json(userData.length == 0 ? { result: "No Data Found", success: false } : { result: userData[0], success: true }, { status: 200 })
}

export async function PUT(req, res) {
    let payload = await req.json();
    payload.id = res.params.id;
    if (!payload.id || !payload.name || !payload.phone || !payload.email) {
        return NextResponse.json({ result: "request data is not valid", success: false }, { status: 400 })
    }
    console.log(payload);
    return NextResponse.json({ result: payload, success: true }, { status: 200 })
}

export function DELETE(req, res) {
    let id = res.params.id
    if (id) {
        return NextResponse.json({ result: "User deleted", success: true }, { status: 200 })
    } else {
        return NextResponse.json({ result: "Internal Error please try after Sometime", success: false }, { status: 400 })
    }
}