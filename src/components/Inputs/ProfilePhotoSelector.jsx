import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (image) {
            if (typeof image === 'string') {
                setPreviewUrl(image);
            } else {
                const preview = URL.createObjectURL(image);
                setPreviewUrl(preview);
                return () => URL.revokeObjectURL(preview);
            }
        } else {
            setPreviewUrl(null);
        }
    }, [image]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleImageError = () => {
        setPreviewUrl(defaultUserImage);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!previewUrl ? (
                <div
                    onClick={onChooseFile}
                    className="w-20 h-20 flex items-center justify-center rounded-full relative cursor-pointer
                               bg-blue-100/50 dark:bg-blue-900/50"
                >
                    <LuUser className="text-4xl text-primary dark:text-cyan-400" />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full absolute -bottom-1 -right-1
                                   bg-primary dark:bg-cyan-600 text-white"
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="profile photo"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                        onError={handleImageError}
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center rounded-full absolute -bottom-1 -right-1
                                   bg-red-500 dark:bg-red-600 text-white"
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
