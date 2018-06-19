// Survey Field contains logic to render single label
//and text input

import React from 'react';

//props being passed through redux form, take input off props
export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom:'5px' }}/>
            <div className="red-text" style={{ marginBottom:'20px' }}>
                {touched && error};
            </div>
            }
        </div>
    );
};