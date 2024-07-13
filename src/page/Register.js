import { Form, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function handleOnChange(e) {
        const { name, value } = e.target;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function toggleShowPassword() {
        setShowPassword(prev => !prev);
    }

    function toggleConfirmShowPassword() {
        setConfirmShowPassword(prev => !prev);
    }

    useEffect(() => {
        console.log("data: ", data);
    }, [data]);

    async function handleOnSubmit(e) {
        e.preventDefault();

        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const responseData = await response.json();
            console.log(responseData);
            alert('Registration successful');
            navigate('/Login');
        } catch (error) {
            console.error('Error registering:', error.message);
            // Handle error registering
        }
    }

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6">
                    <div className="card p-3 bg-body-secondary shadow">
                        <h3>Register</h3>
                        <div className="card-body">
                            <Form className="d-flex flex-column gap-2" onSubmit={handleOnSubmit}>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Username</label>
                                    <input className="form-control" type="text" name="name" value={data.name} placeholder="Your username" onChange={handleOnChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Email</label>
                                    <input className="form-control" type="text" name="email" value={data.email} placeholder="Your Email" onChange={handleOnChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Password</label>
                                    <div className="d-flex justify-content-center align-items-center gap-3">
                                        <input className="form-control" type={showPassword ? "text" : "password"} name="password" value={data.password} onChange={handleOnChange} placeholder="Your password" required />
                                        {/* <div style={{ cursor: "pointer" }} onClick={toggleShowPassword}>
                                            <span>
                                                Show Password
                                            </span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label d-flex flex-start">Confirm Password</label>
                                    <div className="d-flex justify-content-center align-items-center gap-3">
                                        <input className="form-control" type={confirmShowPassword ? "text" : "password"} name="confirmPassword" value={data.confirmPassword} onChange={handleOnChange} placeholder="Confirm your password" required />
                                        {/* <div style={{ cursor: "pointer" }} onClick={toggleConfirmShowPassword}>
                                            <span>
                                                Show Confirm Password
                                            </span>
                                        </div> */}
                                    </div>
                                </div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </Form>
                            <p>Already have an account? <span className="text-primary"><Link to="/Authan/Login">Sign In</Link></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
