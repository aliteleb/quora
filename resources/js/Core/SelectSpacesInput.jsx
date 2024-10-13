import { MdDone } from 'react-icons/md'; // Make sure to import MdDone

export default function SelectSpacesInput({ display_name, img, onChange, value }) {
    return (
        <div className={`w-32 h-32 relative`}>
            <input
                value={value}
                onChange={onChange}
                type="checkbox"
                id={`custom-checkbox-${value}`}
                className={`hidden peer`}
            />
            <div className={`absolute left-2 top-2 size-6 bg-green-600 shadow rounded-full z-20 collapse peer-checked:visible`}>
                <MdDone
                    className={`w-6 h-6 text-[#fff] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-in-out`} />
            </div>
            <div className={`absolute left-2 top-2 size-6 bg-black/30 border border-white/50 rounded-full z-10`}></div>

            <label
                htmlFor={`custom-checkbox-${value}`}
                className={`cursor-pointer relative w-full h-full block peer-checked:border peer-checked:border-green-500 shadow`}
            >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <img
                    src={img}
                    alt={display_name}
                    className={`absolute w-full h-full rounded shadow-lg z-0`}
                />
                <span className={`absolute bottom-2 right-2 z-20 text-white`}>{display_name}</span>
            </label>
        </div>
    );
}
