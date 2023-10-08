import { NextResponse } from "next/server"


export async function GET(req, res){
    const studentDetails = res.params.student
    console.log(studentDetails);
    return NextResponse.json({result:studentDetails},{status:200})
}