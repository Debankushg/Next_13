import { user } from "../../../../util/db";
import { NextResponse } from "next/server";



export function GET(req, res) {
    const userData = user.filter((item) => item.id == res.params.id)
    return NextResponse.json(userData.length == 0 ? { result: "No Data Found", success: false } : { result: userData[0], success: true }, { status: 200 })
}