import React from 'react'

const InfoBox = ({ label, value }) => {
    return (
        <>
            <label className="text-xs font-medium text-slate-500 dark:text-gray-300">{label}</label>
            <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5 dark:text-gray-400">
                {value}
            </p>
        </>
    )
}

export default InfoBox