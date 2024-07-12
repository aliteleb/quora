import React from 'react'
import Select from "react-select";

export default function ReactSelect({options, handleSelectChange, selectedSpaces, errors}) {

    const cssVariables = getComputedStyle(document.documentElement);

    const customStyles = {
        control: (styles, { isFocused, isDisabled }) => ({
            ...styles,
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'ease-in-out',
            boxShadow: 'none',
            border: '0 solid transparent',
            outline: '2px solid',
            outlineColor: errors ? cssVariables.getPropertyValue('--theme-react-select-error-color') : cssVariables.getPropertyValue('--theme-secondary-bg-color-hover'),
            '&:hover': {
                borderColor: isDisabled ? 'transparent' : 'none',
            },
        }),

        indicatorSeparator: (defaultStyles) => ({
            ...defaultStyles,
            display: "none",
        }),

        dropdownIndicator: (defaultStyles, {isFocused}) => ({
            ...defaultStyles,
            color: cssVariables.getPropertyValue('--theme-body-color'),

        }),

        input: (defaultStyles) => ({
            ...defaultStyles,
            color: 'white',
        }),

        singleValue: (defaultStyles) => ({
            ...defaultStyles,
            color: 'white',
        }),

        menu: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: 'black',
            border: '1px solid #4a4a4a',
        }),

        option: (defaultStyles, state) => ({
            ...defaultStyles,
            backgroundColor: cssVariables.getPropertyValue('--theme-body-bg'),
            '&:hover': {backgroundColor: cssVariables.getPropertyValue('--theme-nav-bg-color-hover')},
            cursor: 'pointer',
        }),

        menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
                width: "4px",
                height: "0px",
            },
            "::-webkit-scrollbar-track": {
                background: "#1a1a1a"
            },
            "::-webkit-scrollbar-thumb": {
                background: cssVariables.getPropertyValue('--theme-nav-bg-color-hover'),
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: cssVariables.getPropertyValue('--theme-nav-bg-color-hover')
            }
        }),

        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: cssVariables.getPropertyValue('--theme-nav-bg-color-hover'),
                borderRadius: '20px',
                padding: '1px 10px'
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: cssVariables.getPropertyValue('--theme-body-color'),
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: cssVariables.getPropertyValue('--theme-body-color'),
            ':hover': {
                backgroundColor: cssVariables.getPropertyValue('--theme-secondary-bg-color-hover'),
                color: cssVariables.getPropertyValue('--theme-body-color'),
            },
            borderRadius: '50%',
            padding: '0 6px'
        }),

        clearIndicator: (defaultStyles) => ({
            ...defaultStyles,
            color: cssVariables.getPropertyValue('--theme-body-color'),
        }),

        noOptionsMessage: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: cssVariables.getPropertyValue('--theme-body-bg'),
            color: cssVariables.getPropertyValue('--theme-body-color'),
            padding: '8px',
        }),
    }



    return (
        <Select
            isClearable={false}
            isMulti
            value={selectedSpaces}
            options={options}
            styles={customStyles}
            onChange={handleSelectChange}
        />
    )
}
