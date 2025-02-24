import React from 'react';
import './styles.scss';

const Checkbox = ({ handleChange, label, ...otherProps }) => {
    const [checked, setChecked] = React.useState(false);
    
    const handleCheckboxChange = event => {
        setChecked(event.target.checked);
        handleChange(event);
    }
    
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}
             <input type="checkbox" className="checkBox" onChange={handleChange} {...otherProps} />
        </div>
    )
}

export default Checkbox;
