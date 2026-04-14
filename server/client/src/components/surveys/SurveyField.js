// SurveyField contains logic to render a single label and tex input 
import React from "react";

 const SurveyField = ({input, label, meta: {error, touched}}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>{/* spread all the input handlers like blur */}
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            
        </div>
    )
}

export default SurveyField;