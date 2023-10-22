import axios from "axios";
import { baseUrl } from "../../routes/baseUrl";

async function Connect(db: DB) {
    const url = `${baseUrl()}/api/db/connect`;

    const config = { 
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
        }
    }

    let res = await axios.post(url, db, config);
    return res.data;
}

async function Disconnect() {
    const url = `${baseUrl()}/api/db/disconnect`;

    const config = { 
        headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
        }
    }

    let res = await axios.get(url, config)
    return res.data;
}

async function TestConnection(db: DB) {
    const url = `${baseUrl()}/api/db/test-connection`;
    
    const config = { 
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
    }

    let res = await axios.post(url, db, config)
    return res.data;
}

async function Execute(query: string, limit?:number, page?: number) {
    const url = `${baseUrl()}/api/db/execute`;

    const config = { 
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },

        params: {
            "limit": limit,
            "page": page
        }
    }

    let res = await axios.post(url, {"query": query}, config)
    return res.data;
}

const DBAPI = {
    connect: Connect,
    disconnect: Disconnect,
    testConnection: TestConnection,
    execute: Execute,
}

export default DBAPI;