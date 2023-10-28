import { useState } from "react"
import { useStoreTodoMutation } from '../features/api'
import { toast } from 'react-toastify';
export default function Layout({ children }) {

    const [storeTodo, { isLoading: isUpdating }] = useStoreTodoMutation()
    let [newStr, setNewStr ] = useState('')
    const handleChange = (e) => {
        setNewStr(e.target.value)
    }
    const addHandler = () => {
        storeTodo({ detail: newStr })
        .then(({ data }) => {
            if (data.code === 201) {
                setNewStr('')
                toast.success(data.message[0]);
            }
        })
    }

    return (
        <div className="p-24">
            <div className="flex flex-col px-5 py-2 bg-red-600 min-h-[50%] rounded">
                <div>
                    <p className="text-xl font-semibold text-white">
                        Todo List
                    </p>
                </div>
                <div className="flex flex-row-reverse gap-x-2">
                    <button onClick={addHandler} className="px-5 py-2 font-bold text-red-600 bg-white rounded shadow-lg">
                        +
                    </button>
                    <div>
                        <input type="text" onChange={handleChange} className="px-5 py-2 rounded focus:outline-none"/>
                    </div>
                </div>
                <main className="my-1">{children}</main>
            </div>
        </div>
    )
}