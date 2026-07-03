import { useEffect, useState } from "react";
import API from "../api";

function Home() {

    const [parts, setParts] = useState([]);

    useEffect(() => {
        loadParts();
    }, []);

    const loadParts = async () => {

        try {

            const res = await API.get("/public/approved-parts");

            setParts(res.data);

        } catch (err) {

            console.log(err);

            alert("Unable to load approved parts.");

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Approved Inventory Parts</h2>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
            >

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Supplier ID</th>
                        <th>Supplier Name</th>
                        <th>Part Name</th>
                        <th>Quantity</th>
                        <th>Manufacturing Date</th>
                        <th>Expiry Date</th>

                    </tr>

                </thead>

                <tbody>

                    {parts.length === 0 ? (

                        <tr>

                            <td
                                colSpan="7"
                                align="center"
                            >
                                No approved parts found.
                            </td>

                        </tr>

                    ) : (

                        parts.map((part) => (

                            <tr key={part.id}>

                                <td>{part.id}</td>
                                <td>{part.supplier_id}</td>
                                <td>{part.supplier_name}</td>
                                <td>{part.part_name}</td>
                                <td>{part.quantity}</td>
                                <td>{part.manufacturing_date}</td>
                                <td>{part.expiry_date}</td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Home;