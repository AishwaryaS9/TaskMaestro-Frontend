import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    };

    const handleDeleteOption = (index) => {
        const updatedArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updatedArr);
    };

    return (
        <div>
            {attachments.map((item, index) => (
                <div
                    className="flex justify-between bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-3 py-2 rounded-md mb-3 mt-2"
                    key={item}
                >
                    <div className="flex-1 flex items-center gap-3">
                        <LuPaperclip className="text-gray-400 dark:text-gray-300" />
                        <p className="text-xs text-black dark:text-white">{item}</p>
                    </div>
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            handleDeleteOption(index);
                        }}
                    >
                        <HiOutlineTrash className="text-lg text-red-500 dark:text-red-400" />
                    </button>
                </div>
            ))}
            <div className="flex items-center gap-5 mt-4">
                <div className="flex-1 flex items-center gap-3 border border-gray-100 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-800">
                    <LuPaperclip className="text-gray-400 dark:text-gray-300" />
                    <input
                        type="text"
                        placeholder="Add File Link"
                        value={option}
                        onChange={({ target }) => setOption(target.value)}
                        className="w-full text-[13px] text-black dark:text-white outline-none bg-white dark:bg-gray-800 py-2"
                    />
                </div>
                <button
                    className="card-btn text-nowrap dark:bg-gray-700 dark:text-white"
                    onClick={handleAddOption}
                >
                    <HiMiniPlus className="text-lg" /> Add
                </button>
            </div>
        </div>
    );
};

export default AddAttachmentsInput;
