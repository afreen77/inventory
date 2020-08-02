import React from 'react'
import {NextPage} from 'next'
import {InventoryGrid} from '../components/InventoryGrid'
import fetch from 'isomorphic-unfetch'
import { ToastContainer, toast } from 'react-toastify';
import {ErrorComponent} from "../components/ErrorComponent";


const serverUrl: string = 'http://localhost:3000/api/inventory'

const InventoryPage: NextPage<any> = ({rows, error }) => {
    const notify = message => toast(message);
    const update = async (body) => {
        const {id, name, quantity} = body;
        const response = await fetch(serverUrl, {method: 'PUT', body: JSON.stringify({id, quantity})})
        if (response.status === 200) {
            notify(`Product ${name} has been updated to ${quantity}`)
        } else {
            notify(`Something went wrong`)
        }
    }

    return ( !error ?
        <>
            <InventoryGrid rows={rows} updateQuantity={update}
            />
            <ToastContainer />
        </>
            : <ErrorComponent/>
    )
}

InventoryPage.getInitialProps = async () => {
    const response = await fetch(serverUrl);
    let rows = []
    try {
        rows = await response.json();
    } catch(error) {
        return ({ rows, error: error })
    }
    return ({ rows, error: ''})
}

export default InventoryPage
