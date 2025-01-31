import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BASE_URL } from '../../../constants';
import axios from 'axios';
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/authContext';

const Login = () => {
    const { handleLogin } = useContext(AuthContext)
    // const [show, setShow] = useState(false)
    // const [otp, setOtp] = useState(null)
    // const [email, setEmail] = useState("")
    // const [newPassword, setNewPassword] = useState("")

    return (
        <>
            <Formik
                initialValues={{ password: '', email: '' }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        // .min(8, 'Must be 8 characters or more')
                        .required('Required'),
                    email: Yup.string().email('Invalid email address').required('Required'),
                })}
                onSubmit={async (values) => {
                    const response = await axios.post(`${BASE_URL}login`, values)
                    const token = response.data.token
                    console.log(token);

                    // const decoded = jwtDecode(token);
                    // const expiresInDays = (decoded.exp * 1000 - Date.now()) / (1000 * 60 * 60 * 24);
                    // Cookies.set('token', token, { expires: expiresInDays })

                    handleLogin(token)

                }}
            >
                <Form>
                    <label htmlFor="email">Email Address</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" />

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="text" />
                    <ErrorMessage name="password" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            {/* <hr />
            <button onClick={() => { setShow(!show) }}>reset password</button>
            {
                show && <div id="modal">
                    <form >
                        <input type="email" placeholder='enter ur email' />
                        <button type='submit'>send</button>
                    </form>
                </div>
            }
            <hr />

            <input type="text" placeholder='otp code' />
            <hr />
            <form>
                <input type="password" name="" id="" placeholder='new password' />
                <button>change</button>
            </form> */}
        </>

    );
};

export default Login