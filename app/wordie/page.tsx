import { Metadata } from "next";
import Wordie from "./wordie";

export const metadata: Metadata = {
    title: 'Wordie',
};

const Page = () => {
    return (
        <div className='container mx-auto p-3 flex flex-col h-full'>
            <Wordie />
        </div>
    )
}


export default Page