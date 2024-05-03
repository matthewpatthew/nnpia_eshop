import React from "react";

const FormComponent = ({formData, handleDataChange, handleSubmit}) => {
    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="card col-md-4 offset-md-4">
                    {formData.map((field, index) => (
                        <div className="mb-3" key={index}>
                            <label className="form-label">{field.label}</label>
                            <input
                                type={field.type}
                                className="form-control"
                                name={field.name}
                                value={field.value || ""}
                                onChange={(e) => handleDataChange(e, field.name)}
                            />
                        </div>
                    ))}
                    <button
                        className="btn btn-primary width110 offset-md-4 mb-3"
                        onClick={handleSubmit}
                    >Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;
