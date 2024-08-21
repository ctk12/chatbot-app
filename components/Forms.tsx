"use client"

import { isValidEmail } from '@/utils';
import React, { useState } from 'react';

type FormErrorsType = {
    fullName?: string,
    email?: string,
    message?: string,
}

export type FormDataType = {
    fullName: string,
    email: string,
    message: string,
}

interface OptionsFormType {
    title: string;
    options: string[];
    onSend: (data: string) => void;
    selected?: string;
}

interface InfoFillFormType {
    onFormSubmit: (data: FormDataType) => void;
}

export function OptionsForm({ title, options, onSend, selected }: OptionsFormType) {
  const handleSubmit = (data: string) => {
    onSend(data);
  }

  return (
   <>
    <p className='mb-2'>{title}</p>
    {options.map(option => (
        <div key={option} className={`border border-blue-400 text-black-500 px-2 py-2 my-4 rounded relative ${selected && selected === option ? "bg-gray-300" : "bg-white-100"}`} onClick={() => handleSubmit(option)} role='button'>
            {/* <strong className="font-bold">Holy smokes!</strong> */}
            <span className="block sm:inline">{option}</span>
    </div>
    ))}
   </>
  )
}

export function InfoFillForm({ onFormSubmit }: InfoFillFormType) {
    const [formErrors, setFormErrors] = useState<FormErrorsType>({});
    const handleSubmitData = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        setFormErrors({});
        const formElements = form.elements as typeof form.elements & {
            fullName: {value: string},
            email: {value: string},
            message: {value: string}
        };

        const formData = {
            fullName: formElements.fullName.value,
            email: formElements.email.value,
            message: formElements.message.value,
        }

        if (!formData.fullName) {
            setFormErrors(prev => ({ ...prev, fullName: "Please fill out this field." }));
            return;
        }

        if (!formData.email || !isValidEmail(formData.email)) { 
            setFormErrors(prev => ({ ...prev, email: "Please fill valid email." }));
            return;
        }

        if (!formData.message) {
            setFormErrors(prev => ({ ...prev, message: "Please fill out this field." }));
            return;
        }

        if (formData.message.length > 200) {
            setFormErrors(prev => ({ ...prev, message: "Max 200 Chars for Message." }));
            return;
        }

        form.reset();
        onFormSubmit(formData);
    }

    return (
        <form className="w-full max-w-lg" onSubmit={(e) => handleSubmitData(e)} noValidate>
            <CustomInput inputName='Full Name' inputId='fullName' formErrors={formErrors} />
            <CustomInput inputName='Email' inputId='email' formErrors={formErrors} />
            <CustomInput inputName='Message' inputId='message' formErrors={formErrors} />
        <div className="md:flex md:items-center md:justify-end">
                <div>
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                        Send
                    </button>
                </div>
        </div>
      </form>
    )
}

export function InfoForm({ data }: { data: FormDataType}) {
    return (
        <form className="w-full max-w-lg" noValidate>
            <CustomInput inputName='Full Name' inputId='fullName' value={data.fullName} />
            <CustomInput inputName='Email' inputId='email' value={data.email} />
            <CustomInput inputName='Message' inputId='message' value={data.message} />
      </form>
    )
}

const CustomInput = ({ inputName, inputId, formErrors, value }: { inputName: string, inputId: string, formErrors?: FormErrorsType, value?: string }) => {
    return (
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={inputId}>
              {inputName}
            </label>
            {value ? (
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border`} type="text" value={value} disabled={true} />
            ) : (
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border ${formErrors && formErrors[inputId as keyof FormErrorsType] && 'border-red-500'}`} id={inputId} type="text" placeholder="" />
            )}
            {formErrors && formErrors.hasOwnProperty(inputId) && <p className="text-red-500 text-xs italic">{formErrors[inputId as keyof FormErrorsType]}</p>}
          </div>
        </div>
    )
}