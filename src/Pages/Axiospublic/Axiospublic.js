import axios from 'axios';
import React from 'react';

const allaxios = axios.create({
    baseURL: 'https://tools-server-aok2.onrender.com'
})

const Axiospublic = () => {
    return allaxios;
};

export default Axiospublic;