// import { useEffect,useState } from "react";
import { useGetTodoQuery, useDeleteTodoMutation, usePatchDoneMutation, useEditMutation } from "../features/api";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Pagination from "../components/pagination";
import Loader from '../components/loader'
import Layout from '../layout/main'
import Delete from '../assets/delete.svg'
import isItDone from '../assets/isItDone.svg'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import Edit from '../assets/edit.svg'


export default function Home() {
    const order = [
        { name: 'created' },
        { name: 'detail' },
    ]
    const sort = [
        {name: 'asc'},
        {name: 'desc'},
    ]
    let [isOpen, setIsOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(order[0])
    const [selectedSort, setSelectedSort] = useState(sort[0])
    const [offset, setOffset] = useState(0)
    const { data: todos, isLoading } = useGetTodoQuery({ order: selectedOrder.name, sort: selectedSort.name, offset })
    const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodoMutation()
    const [edit, { isLoading: isEditLoading }] = useEditMutation()
    const [patchDone, { isLoading: ispatchLoading }] = usePatchDoneMutation()
    const [ selectedData, setSelectedData ] = useState({})
    const deleteHandler = (e) => {
        deleteTodo({ id: e })
    }
    
    const togModal = (todo) => {
        if (isOpen === false) {
            setSelectedData(todo)
        }
        setIsOpen(!isOpen)
    }

    const patchDoneHandler = (e) => {
        patchDone({ id: e })
    }

    const editChangeHandler = (e) => {
        setSelectedData({...selectedData, detail: e.target.value})
    }

    const submitEditHandler = () => {
        edit(selectedData)
        .then(({ data }) => {
            if (data.code === 200) {
                togModal()
            }
        })
    }

    const changeOffset = (e) => {
        setOffset(e)
    }
    if (isLoading) return (
        <div className="w-screen h-screen place-content-center">
            <Loader />
        </div>
    )
    return (
        <Layout>
            <div className="flex flex-col gap-y-1">
                <div className="flex flex-row gap-x-2">
                    <div className="w-72">
                        <Listbox value={selectedOrder} onChange={setSelectedOrder}>
                            <div className="">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block capitalize truncate">{selectedOrder.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronUpDownIcon
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg w-72 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {order.map((person, personIdx) => (
                                    <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                    >
                                    {({ selected }) => (
                                        <>
                                        <span
                                            className={`block truncate capitalize ${
                                            selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                            {person.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                        </>
                                    )}
                                    </Listbox.Option>
                                ))}
                                </Listbox.Options>
                            </Transition>
                            </div>
                        </Listbox>
                    </div>
                    
                    <div className="w-72">
                    <Listbox value={selectedSort} onChange={setSelectedSort}>
                        <div className="">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block capitalize truncate">{selectedSort.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronUpDownIcon
                                    className="w-5 h-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                </span>
                            </Listbox.Button>
                            <Transition
                                 as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg w-72 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {sort.map((person, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                }`}
                                            value={person}
                                            >
                                                {({ selected }) => (
                                            <>
                                                        <span
                                                            className={`block truncate capitalize ${
                                                            selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                        >
                                                            {person.name}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                            </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                    </div>
                </div>
                {
                    todos.result.map((todo) => (
                        <div className="grid grid-cols-12 px-5 py-4 text-center bg-white bg-opacity-50 gap-y-2" key={todo.id}>
                            <div className="col-span-10">
                                <p className="text-sm truncate">
                                    {todo.detail}
                                </p>
                            </div>
                            <div className="flex justify-center col-span-2 col-start-11">
                                <button onClick={() => togModal(todo)}>
                                    <img className="w-5"  src={Edit} alt={Edit} />
                                </button>
                                {
                                    todo.status ? <div className="text-green-500">Done</div>  : 
                                        <button onClick={() => patchDoneHandler(todo.id)}>
                                            <img className="w-5" src={isItDone} alt={isItDone} />
                                        </button>
                                }
                                <button onClick={ () => deleteHandler(todo.id)}>
                                    <img className="w-5" src={Delete} alt={Delete} />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                todos.total > 5 ? (
                    <div>
                        <Pagination offset={offset} changeOffset={changeOffset} total={todos.total} />
                    </div>
                ) : null
            }
            {
                isOpen ? (
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={togModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black/25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Edit
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <input type="text" className="px-5 py-2 border focus:outline-none" onChange={editChangeHandler} value={selectedData.detail} />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={submitEditHandler}
                                        >
                                            Save
                                        </button>
                                    </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                ) : null
            }
        </Layout>
    )
}