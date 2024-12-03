import React from 'react';
import { motion } from 'framer-motion';

const FormInput = ({ 
    label, 
    type, 
    name, 
    value, 
    onChange, 
    error, 
    placeholder,
    ...rest 
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? 'error' : ''}
                {...rest}
            />
            {error && (
                <motion.p 
                    className="error-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default FormInput;