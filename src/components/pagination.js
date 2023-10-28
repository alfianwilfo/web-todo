export default function Pagination({ total, changeOffset, offset }) {
    return (
            <div className="flex justify-center pt-2 gap-x-2">
                <div>
                    <button onClick={() => offset > 0 ?  changeOffset(offset - 5) : ''} className={`px-5 py-2 bg-white rounded ${offset === 0 ? 'opacity-20 cursor-default' : ''}`}>Prev</button>
                </div>
                {(
                    () => {
                        const arr = [];
                        for (let i = 0; i < Math.ceil(total/5); i++) {
                            arr.push(
                                <div>
                                    <button onClick={() => changeOffset(i * 5)} className="px-5 py-2 bg-white rounded">{i + 1}</button>
                                </div>
                            );
                        }
                    return arr;
                    })
                ()}
                <div>
                    <button onClick={() => total > offset + 5 ?  changeOffset(offset + 5): ''} className={`px-5 py-2 bg-white rounded ${offset + 5 >= total ? 'opacity-20 cursor-default' : ''}`}>Next</button>
                </div>
            </div>
    )
}