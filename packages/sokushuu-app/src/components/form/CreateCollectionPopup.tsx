import type React from "react";

interface CreateCollectionPopupProps {
    onClose: () => void;
}

const CreateCollectionPopup: React.FC<CreateCollectionPopupProps> = ({ onClose }: CreateCollectionPopupProps) => {
    const closeCreateCollectionPopup = () => {
        onClose();
    }

    const handleClosePopup = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if ((event instanceof KeyboardEvent && event.key === "Escape") || (event instanceof MouseEvent && event.button === 0)) {
            closeCreateCollectionPopup();
        }
    }

    return <div>
        <div onKeyUp={handleClosePopup} className="bg-zinc-300 absolute inset-0 opacity-40" />
        <div className="bg-zinc-100 border-2 border-zinc-600 rounded-lg absolute inset-x-4 inset-y-44 md:inset-x-20 md:inset-y-64 lg:inset-x-40 lg:inset-y-60 shadow-lg p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-y-8">
                <span className="text-xl">Create New Collection</span>
                <input type="text" className="w-full border-2 border-zinc-600 rounded-lg p-2" placeholder="Collection Name" />
            </div>
            <div className="flex justify-end gap-x-2">
                <button onClick={closeCreateCollectionPopup} type="button" className="p-2 rounded-lg border-2 border-zinc-600 cursor-pointer">Close</button>
                <button type="submit" className="p-2 rounded-lg border-2 border-zinc-600 cursor-pointer">Submit</button>
            </div>
        </div>
    </div>
}

export { CreateCollectionPopup };