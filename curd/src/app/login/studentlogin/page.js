// Server side api calling
import { fetchData } from '../../api/getApi'
import { Button } from "./ buttons/page"
import {Cormorant} from "next/font/google"

const cormorant = Cormorant({
    weight:"700",
    subsets:['cyrillic'],
    display:"swap"
})

const StudentLogin = async () => {

    let data = await fetchData()

    return (
        <div className='bg-red-800'>
            <h1 className="text-[30px] text-orange-200 font-bold text-center p-10">Student List</h1>
            {/* {loading ? <p>Loading...</p> : (data.map((item) => (
                <p key={item.id} className='pl-4 text-lg text-sky-500 leading-loose font-bold font-mono'>{item.id}.  {item.title}</p>
            )))} */}
            {data.map((a) => {
                return <div key={a.id} className={`pl-4 text-2xl text-sky-500 leading-loose font-bold ${cormorant.className}`}>
                    <div>
                        {a.id}. {a.title}
                    </div>
                    <div className='flex justify-start'>
                        <Button body={a.body}/>
                    </div>
                </div>
            })}
        </div>
    );
}

export default StudentLogin

export const generateMetadata =() =>{
    return {
        title:"Student login"
    }
}