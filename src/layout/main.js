import Topbar from "../components/topbar"
import Botbar from "../components/botbar"
import { Link } from "react-router-dom";

export default function layout({ children }) {

    return (
        <div className="flex flex-col p-24 gap-y-1">
            <Topbar/>
            <div className="flex flex-row-reverse">
                <Link to="/create" className="text-white bg-red-600 rounded px-5 py-2 font-bold">
                    +
                </Link>
            </div>
            <main className="my-1">{children}</main>
            <Botbar/>
        </div>
    )
}