// import { useEffect,useState } from "react";
import { useGetTodoQuery } from "../features/api";
import Loader from '../components/loader'
import Layout from '../layout/main'
export default function Home() {
    const { data: todos, isLoading } = useGetTodoQuery()
    if (isLoading) return (
        <div className="h-screen w-screen place-content-center">
            <Loader />
        </div>
    )
    return (
        <Layout>
            <div className="text-red-600 flex flex-col gap-y-1">
                {
                    todos.result.map((todo) => (
                        <div className="bg-rose-400 text-center py-4" key={todo.id}>
                            {todo.name}
                        </div>
                    ))
                }
            </div>
        </Layout>
    )
}