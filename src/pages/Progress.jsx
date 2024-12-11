import Button from "../components/Button"
import { Link } from 'react-router-dom'

const Progress = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center px-3 bg-slate-100">
            <div className="md:w-[375px] w-full bg-white flex flex-col gap-4 items-center justify-center py-10 px-10 rounded-xl">
                <p className="text-sm text-center text-slate-600">
                    Working on the registration form can be tough. Please consider coming back later.
                </p>
                <Button className="bg-slate-800">
                    <Link to='/'>Back home</Link>
                </Button>
            </div>
        </div>
    )
}

export default Progress