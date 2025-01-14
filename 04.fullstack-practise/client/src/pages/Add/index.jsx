import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Container from '@mui/material/Container';
import styles from "./index.module.scss"
import axios from 'axios';
import { BASE_URL } from '../../constants';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';


const wineSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number().required('Required'),
    imageUrl: Yup.string().required('Required'),
});

const Add = () => {
    const [wines, setWines] = useState([])

    const getWines = async () => {
        try {
            const res = await axios(`${BASE_URL}wines`)
            setWines(res.data)
        } catch (error) {
            console.log(error);
        }
    }


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}wines/${id}`)
            console.log(res);
            if (res.status === 200) {
                setWines([...wines].filter((q) => q._id !== id))
            }

        } catch (error) {
            console.log(error);


        }
    }
    useEffect(() => {
        getWines()
    }, [])

    return <div id={styles["add"]}>

        <Container maxWidth="sm">


            <h1>Add Wine</h1>

            <Formik
                initialValues={{
                    title: '',
                    price: '',
                    description: '',
                    imageUrl: '',
                }}
                validationSchema={wineSchema}
                onSubmit={async (values, { resetForm }) => {
                    console.log(values);

                    const wine = { ...values, raiting: 5, oldPrice: null }
                    const res = await axios.post(`${BASE_URL}wines`, wine)
                    // console.log(res);
                    resetForm()
                    // window.alert("added successfully!")

                }}
            >
                {({ errors, touched }) => (
                    <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <Field name="title" />
                            {errors.title && touched.title ? (
                                <div>{errors.title}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="price" type={"number"} />
                            {errors.price && touched.price ? (
                                <div>{errors.price}</div>
                            ) : null}
                        </div>
                        <div>
                            <Field name="description" type="text" />
                            {errors.description && touched.description ? <div>{errors.description}</div> : null}
                        </div>
                        <div>
                            <Field name="imageUrl" type="url" />
                            {errors.imageUrl && touched.imageUrl ? <div>{errors.imageUrl}</div> : null}
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>


            <hr />
            <TableContainer >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wines.length > 0 && wines.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right"><img src={row.imageUrl} alt="" style={{ width: "100px" }} /></TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">
                                    <button onClick={() => { window.confirm("are u sure to delete?") && handleDelete(row._id) }}>Delete</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </div>

};

export default Add