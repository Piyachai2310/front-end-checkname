import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button, Form } from 'react-bootstrap';

const Day = () => {
    const [totalday, setTotalday] = useState([])

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleCloseModal1 = () => setShowModal1(false);
    const handleShowModal1 = () => setShowModal1(true);
    const handleCloseModal2 = () => setShowModal2(false);

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [Sum, setSum] = useState("")

    const [todayId, setTodayId] = useState();

    useEffect(() => {
        async function fetchData() {
            try {

                const response = await fetch("https://precious-exploration-production.up.railway.app/day", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "content-Type": "application/json"
                    },
                });
                const data = await response.json();
                setTotalday(data);
                console.log(totalday);
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData();
    }, [])



    useEffect(() => {
        const sum = `${day}/${month}/${year}`
        function Dday() {
            // console.log("day: ", day)
            // console.log("day: ", month)
            // console.log("day: ", year)
            console.log("sum: ", sum)
            setSum(sum);
        }

        Dday();
    }, [day, month, year])

    const handleSubmit = (event) => {
        event.preventDefault();
        const DoCreate = async () => {
            const response = await fetch("https://precious-exploration-production.up.railway.app/createday",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        day: Sum
                        
                    })
                }
            )
            let json = await response.json();
            if (json.result) {
                window.location = "/"
            }
        }

        DoCreate();
    }

    const ToDelete = (index) => {
        // แสดงหน้าต่างยืนยันด้วย alert
        const isConfirmed = window.confirm("Are you sure you want to delete this day?");
        if (isConfirmed) {
            console.log("index today: ", index);
            const Delete = async () => {
                const response = await fetch(`https://precious-exploration-production.up.railway.app/deleteday/${index}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "content-type": "application/json"
                    }
                });
                if (response.ok) {
                    fetchDataAfterDetele();
                }
            };

            const fetchDataAfterDetele = async () => {
                const response = await fetch("https://precious-exploration-production.up.railway.app/day", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "content-Type": "application/json"
                    },
                });
                const data = await response.json();
                setTotalday(data);
            };

            Delete();
        }
    };
    const Test = (index) => {
        console.log("index today: ", index);
    };


    return (
        <>
            <div className='container-fuild'>
                <div className='row mb-4'>
                    <div className='col-10'>

                    </div>
                    <div className="col-2">
                        <Button variant="primary" onClick={handleShowModal1}>
                            Create
                        </Button>

                        <Modal show={showModal1} onHide={handleCloseModal1} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>From day</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicDay">
                                        <Form.Label>Day</Form.Label>
                                        <Form.Control type="text" placeholder="Enter day" onChange={(e) => setDay(e.target.value)} />
                                        {/* <Form.Text className="text-muted">
                                            We'll never share your day with anyone else.
                                        </Form.Text> */}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicMonth">
                                        <Form.Label>Month</Form.Label>
                                        <Form.Control type="text" placeholder="Enter month" onChange={(e) => setMonth(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicYear" onChange={(e) => setYear(e.target.value)}>
                                        <Form.Label>Year</Form.Label>
                                        <Form.Control type="text" placeholder="Enter year" />
                                    </Form.Group>
                                    <div className='row d-flex justify-content-end gap-2'>
                                        <Button className='col-2' variant="secondary" onClick={handleCloseModal1}>
                                            Close
                                        </Button>
                                        <Button className='col-2' variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>

                            </Modal.Body>
                            <Modal.Footer>

                            </Modal.Footer>
                        </Modal>

                        <Modal show={showModal2} onHide={handleCloseModal2} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Modal 2</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Hide this modal and show the first with the button below.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal2}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleShowModal1}>
                                    Back to first
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className='row'>
                    <table>
                        <thead>
                            <tr className='text-center'>
                                <th className='col-6 border' >วันที่</th>
                                <th className='col-2 border' >เช้า</th>
                                <th className='col-2 border' >ค่ำ</th>
                                <th className='col-2 border' >ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalday.map((item, index) => (
                                <tr key={index}>
                                    <th className='col-4 border ps-4' scope='col'>{item.day}</th>
                                    {/* <th className='col-2 border text-center' scope='col'><button className='btn border bg-success' onClick={() => Test(item.Id)}>แก้ไข</button    utton></th> */}
                                    <th className='col-2 border text-center' scope='col'><Link to={"/app"}><button className='btn border bg-success'>แก้ไข</button></Link></th>
                                    <th className='col-2 border text-center' scope='col'><Link to={"/eveing"}><button className='btn border bg-success'>แก้ไข</button></Link></th>
                                    <th className='col-4 border text-center' scope='col'><button className='btn border bg-danger' onClick={() => ToDelete(item.Id)}>ลบ</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Day
