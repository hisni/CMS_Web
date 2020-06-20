import React from 'react';
import './Input.css';

const input = ( props ) => {
    let inputElement = null;

    let InputClass = "Input";
    let inputClasses = ["InputElement"];
    let labelClass = "Label";

    if( props.class ){
        InputClass = "ClearFlex";
        inputClasses = ["ClearWidth"];
        labelClass = "ClearMargrin";
    }

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid");
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={InputClass}>
            <label className={labelClass}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;