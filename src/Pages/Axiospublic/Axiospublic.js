import axios from 'axios';
import React from 'react';

const allaxios = axios.create({
    baseURL:'http://localhost:4040'
})

const Axiospublic = () => {
    return allaxios;
};

export default Axiospublic;