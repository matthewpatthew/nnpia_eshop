const FormComponent = ({ formData, handleDataChange, handleSubmit, formErrors }) => {
    return (
        <>
            <br/>
            <div className="row">
                <div className="card">
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
                            {formErrors[field.name] && (
                                <div className="text-danger">{formErrors[field.name]}</div>
                            )}
                        </div>
                    ))}
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <button
                            className="btn btn-primary width110 "
                            onClick={handleSubmit}
                        >Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormComponent;