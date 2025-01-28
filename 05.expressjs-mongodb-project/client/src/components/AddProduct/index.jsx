import { useRef, useState } from "react";
import { BASE_URL } from "../../constants";
import { MdCloudUpload } from "react-icons/md";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null,
    });

    const fileInputRef = useRef()

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            // Şəkil yüklənəndə faylı formData-ya əlavə etmək üçün
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("stock", formData.stock);
            data.append("image", formData.image);

            const response = await fetch(`${BASE_URL}products`, {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Məhsul uğurla əlavə edildi!");
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    stock: "",
                    image: null
                });
            } else {
                alert("Xəta baş verdi. Məhsul əlavə edilmədi.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <label>Ad:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Açıqlama:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <div>
                <label>Qiymət:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Kategoriya ID:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Stok:</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Şəkil URL:</label>
                <input
                    style={{ display: "none" }}
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                    ref={fileInputRef}
                />

                <MdCloudUpload onClick={() => {
                    fileInputRef.current.click()
                }} />

            </div>

            <button type="submit">Məhsul Əlavə Et</button>
        </form>
    );
};

export default ProductForm;
