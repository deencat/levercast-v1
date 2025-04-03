"use client";

import { useState, useEffect } from 'react';

export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
};

export type ValidationErrors = {
  [key: string]: string | null;
};

export type FormValues = {
  [key: string]: any;
};

export type FormRules = {
  [key: string]: ValidationRules;
};

export function useFormValidation(initialValues: FormValues, rules: FormRules) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDirty, setIsDirty] = useState<{[key: string]: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Validate a single field
  const validateField = (name: string, value: any): string | null => {
    if (!rules[name]) return null;
    
    const fieldRules = rules[name];
    
    if (fieldRules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'This field is required';
    }
    
    if (fieldRules.minLength && typeof value === 'string' && value.length < fieldRules.minLength) {
      return `Must be at least ${fieldRules.minLength} characters`;
    }
    
    if (fieldRules.maxLength && typeof value === 'string' && value.length > fieldRules.maxLength) {
      return `Cannot exceed ${fieldRules.maxLength} characters`;
    }
    
    if (fieldRules.pattern && typeof value === 'string' && !fieldRules.pattern.test(value)) {
      return 'Invalid format';
    }
    
    if (fieldRules.custom && !fieldRules.custom(value)) {
      return 'Invalid value';
    }
    
    return null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let formValid = true;
    
    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      newErrors[fieldName] = error;
      if (error) formValid = false;
    });
    
    setErrors(newErrors);
    return formValid;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setIsDirty(prev => ({ ...prev, [name]: true }));
    
    // Validate field if it's already been touched
    if (isDirty[name]) {
      setErrors(prev => ({ 
        ...prev, 
        [name]: validateField(name, value) 
      }));
    }
  };

  // Set field value programmatically
  const setValue = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Don't mark programmatically set values as dirty by default
  };

  // Manually touch a field to validate it
  const touchField = (name: string) => {
    setIsDirty(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ 
      ...prev, 
      [name]: validateField(name, values[name]) 
    }));
  };

  // Touch all fields and validate
  const touchAll = () => {
    const newIsDirty: {[key: string]: boolean} = {};
    Object.keys(rules).forEach(fieldName => {
      newIsDirty[fieldName] = true;
    });
    setIsDirty(newIsDirty);
    validateForm();
  };

  // Handle form submission
  const handleSubmit = (onSubmit: (values: FormValues) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    touchAll();
    
    const formValid = validateForm();
    if (formValid) {
      onSubmit(values);
    }
    
    setIsSubmitting(false);
  };

  // Check form validity on values change
  useEffect(() => {
    const formValid = Object.keys(errors).every(fieldName => !errors[fieldName]);
    setIsValid(formValid);
  }, [errors]);

  return { 
    values, 
    errors, 
    isDirty,
    isValid,
    isSubmitting,
    handleChange, 
    setValue,
    touchField,
    touchAll,
    handleSubmit 
  };
} 