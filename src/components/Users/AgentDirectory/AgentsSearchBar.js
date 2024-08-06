import React, { useEffect, useState } from 'react'

const AgentsSearchBar = ({ search, setSearch }) => {

    return (
        <div className='w-full flex items-center justify-center flex-row'>
            <div className='sm:w-[400px] w-[270px] bg-red-400 h-[40px] rounded-lg'>
                <input value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }} type="text" placeholder='search agents' className='w-full rounded-lg' />
            </div>
        </div>
    )
}

export default AgentsSearchBar