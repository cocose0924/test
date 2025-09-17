import { NextResponse } from "next/server";
import supabase from "../../../utils/database";
import { SignJWT } from "jose";

export async function POST(request){
    const reqBody=await request.json()

    try{
        const{data,error}=await supabase
        .from("users")
        .select().eq("email",reqBody.email)
        .single()
        console.log(data)
        if(!error){
            if(reqBody.password===data.password){
                const secretKey=new TextEncoder().encode("next-market-route-handles")
                const payload={
                    email:reqBody.email,
                }
                const token=await new SignJWT(payload)
                .setProtectedHeader({alg:"HS256"})
                .setExpirationTime("1d")
                .sign(secretKey)
                console.log(token)
                return NextResponse.json({message:"ログイン成功",token:token})
            }else{
                return NextResponse.json({message:"ログイン失敗：パスワードが間違っています"})
            }
        }else{
            return NextResponse.json({message:"ログイン失敗：ユーザー登録をしてください"})
        }

    }catch{
        return NextResponse.json({message:"ログイン失敗"})
    }
}