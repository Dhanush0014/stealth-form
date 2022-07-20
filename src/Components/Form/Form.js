import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Card from '../UI/Card';
import Button from '../UI/Button';
import style from '../UI/input.module.css';



function Form() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [message, setMessage] = useState('');
    const [formError, setFormError] = useState({});

    useEffect(() => {
        let Countrydata = require('country-state-city').Country.getAllCountries()
        Countrydata = Countrydata.map(country => ({
            label: country.name,
            ...country
        }))
        setCountries(Countrydata)
        setStates(states);
        setCities(cities);
        setCountry(country);
        setState(state);
        setCity(city);
        setFormError(() => {
            if (Object.keys(formError).length !== 0) {
                console.log(formError)
            }
            return formError
        })
    }, [formError, country, state, city, states, cities]);


    const namechangeHandler = (event) => {
        setName(event.target.value)
    }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    const mobileNoChangeHandler = (event) => {
        setMobileNo(event.target.value)
    }

    const countryChangeHandler = (event) => {
       
        setCountry(event.name);
        let statesData = [];
        let data = require('country-state-city').State.getStatesOfCountry(event.isoCode)
       
        if(data.length===0){
            statesData = [{label:"select the country/ state details unavailable"}];
            setCities([{label:"select the state/cities details unavailable"}]);
        }
        else{
            statesData = data
            statesData = statesData.map((state) => ({
                label: state.name,
                ...state
            }))
        }
     
        setState('');
        setCity('');
        setStates(statesData)
    }

    const cityChangeHandler = (event) => {
        setCity(event.name);
    }

    const stateChangeHandler = (event) => {
        setState(event.name);
        let citiesData = []
        let data = require('country-state-city').City.getCitiesOfState(event.countryCode, event.isoCode);
        
        if(data.length === 0 ){
            citiesData = [{label:"select the state/cities details unavailable"}];
        }
        else{
            citiesData = data
            citiesData = citiesData.map(city => ({
                label: city.name,
                ...city,
            }))
        }
        setCity('')
        setCities(citiesData);

    }

    const MessageChangeHandler = (event) => {
        setMessage(event.target.value);

    }


    const formHandler = (event) => {
        event.preventDefault();
        setFormError(validate());
        let data = {
            name: name,
            email: email, mobileNo: mobileNo,
            country: country,
            state: state,
            city: city,
            message: message
        }
        console.log("form Handled")
        console.log(data);
        setStates('');
        setCities('');
        setCountry('');
        setState('');
        setCity('');
        setName('');
        setEmail('');
        setMobileNo('');
        setMessage('');
    }

    const validate = () => {
        const error = {};
        const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        const mobileRegex = /^[0-9]{10}/
        if (name.trim().length === 0) {
            error.name = "Name is required field";
        }
        if (email.trim().length === 0) {
            error.email = "Email is required field";
        }
        else if (!emailRegex.test(email)) {
            error.email = "Enter valid Email";
        }
        if (!mobileRegex.test(mobileNo) && mobileNo.length !== 0) {
            error.mobileNo = "Enter valid Mobile number";
        }
        return error
    }

    const errorHandler = (key) => {
        const color = formError.hasOwnProperty(key) ? 'red' : '';
        return color
    }

    const styleFn = {
        control: (css,styles) => {
            return {
                ...css,
            }

        },
        option: (styles) => {
            return {
                ...styles,
               
                backgroundColor: "white",
                color: "black",
            };
        },
        menu: () => {
            return {

                color: 'black',
            }

        },
     
    }

    return (
        <>
            <Card className={style.input}>
                <form onSubmit={formHandler}>
                    <div>
                        <label>
                            <span>Name</span><span id={style.required}>*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={namechangeHandler}
                            style={{ 'borderColor': `${errorHandler('name')}` }}
                        />
                    </div>
                    <p>{formError.name}</p>
                    <div>
                        <label><span>Email</span><span id={style.required}>*</span></label>
                        <input
                            type="text"
                            value={email}
                            onChange={emailChangeHandler}
                            style={{ 'borderColor': `${errorHandler('email')}` }}
                        />
                    </div>
                    <p>{formError.email}</p>
                    <div id="mobile">
                        <label>Mobile</label>
                        <input
                            type="tel"
                            value={mobileNo}
                            onChange={mobileNoChangeHandler}
                            style={{ 'borderColor': `${errorHandler('mobileNo')}` }}
                        />
                    </div>
                    <p>{formError.mobileNo}</p>
                    <div id={style.country}>
                        <label >Country</label>
                        <Select
                            type="text"
                            value={{ "label": country }}
                            styles={styleFn}
                            options={countries}
                            onChange={countryChangeHandler}
                        />
                    </div>
                    <br></br>
                    <div >
                        <label>State</label>
                        <Select
                            type="text"
                            value={{ "label": state }}
                            styles={styleFn}
                            options={states}
                            onChange={stateChangeHandler}
                        />
                    </div>
                    <br></br>
                    <div >
                        <label>City</label>
                        <Select
                            type="text"
                            value={{ "label": city }}
                            styles={styleFn}
                            options={cities}
                            onChange={cityChangeHandler}
                        />
                    </div>
                    <br></br>
                    <div id={style.message}>
                        <label>Message</label>
                        <textarea
                            type="text"
                            value={message}
                            onChange={MessageChangeHandler}
                        />
                    </div>
                    <Button
                        type='submit'
                    >Submit
                    </Button>
                </form>
            </Card>
        </>
    )
}

export default Form
