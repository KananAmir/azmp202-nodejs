import { Formik, Form, Field } from 'formik';
import { ProductSchema } from '../../validations/product.schema';
import axios from 'axios';
import { BASE_URL } from '../../constants';


const Add = () => (
    <div>
        <h1>Add Product</h1>
        <Formik
            initialValues={{
                title: '',
                description: '',
                price: 0,
            }}
            validationSchema={ProductSchema}
            onSubmit={async (values, { resetForm }) => {
                try {
                    const response = await axios.post(`${BASE_URL}/products`, values)
                    resetForm()
                } catch (error) {
                    console.log(error.message);
                }
            }}
        >

            {({ errors, touched }) => (
                <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    <Field name="title" placeholder={"title"} />
                    {errors.title && touched.title ? (
                        <div style={{ color: "red" }}>{errors.title}</div>
                    ) : null}
                    <Field name="description" placeholder={"description"} />
                    {errors.description && touched.description ? (
                        <div style={{ color: "red" }}>{errors.description}</div>
                    ) : null}
                    <Field name="price" type="number" placeholder={"price"} />
                    {errors.price && touched.price ? <div style={{ color: "red" }}>{errors.price}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Add