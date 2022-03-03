import React from 'react'
import { Form, Field } from 'react-final-form'
import { render } from 'react-dom'
import {sendData} from '../api/sendData-api' 


const onSubmit = async (values) => {
    
    sendData(JSON.stringify(values))
}

const required = (value) => (value ? undefined : 'Required')
const dateCorrect = (value) => /^\d{2}[/]\d{4}$/.test(value) ? undefined : 'enter in firmat MM/YYYY'
const mustBeNumber = (value) => (isNaN(value) ? 'Must be a number' : undefined)
const lengthValue = (quantity) => (value) => String(value).length == quantity ? undefined : 'Incorrect code format'
const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined)


export function Card() {
    return (
        <div className="card">
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, valid }) => (
                    <form onSubmit={handleSubmit}>

                        <Field
                            name="cardNumber"
                            validate={composeValidators(required, mustBeNumber, lengthValue(16))}>
                            {({ input, meta }) => (
                                <div>
                                    <input {...input} type="text" placeholder="Card Number" />
                                    {meta.error && meta.touched && <span class = 'required'>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="name" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <input {...input} type="text" placeholder="Name" />
                                    {meta.error && meta.touched && <span class = 'required'>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="experationDate"
                            validate={composeValidators(required, dateCorrect)}
                        >
                            {({ input, meta }) => (
                                <div>
                                    <input {...input} type="text" placeholder="Experation Date" />
                                    {meta.error && meta.touched && <span class = 'required'>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field
                            name="cvv"
                            validate={composeValidators(required, mustBeNumber, lengthValue(3))}
                        >
                            {({ input, meta }) => (
                                <div>
                                    <input {...input} type="text" placeholder="Cvv" />
                                    {meta.error && meta.touched && <span class = 'required'>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <Field
                            name="amount"
                            validate={mustBeNumber}
                        >
                            {({ input, meta }) => (
                                <div>
                                    <input {...input} type="text" placeholder="Amount" />
                                    {meta.error && meta.touched && <span class = 'required'>{meta.error}</span>}
                                </div>
                            )}
                        </Field>

                        <div className="buttons">
                            <button type="submit" disabled={submitting ||pristine||!valid}>
                                Оплатить
                            </button>
                            
                        </div>

                    </form>
                )}
            />
        </div>

    )
}