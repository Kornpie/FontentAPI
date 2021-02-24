import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Button, Form, FormGroup, Label, Input, FormText ,Alert} from 'reactstrap';
const EditProductForm = ({id}) => {
    const initProduct = {
        _id:"",
        name:"",
        category:"",
        price:"",
        tags:[],
    }
    const [product, setProduct] = useState(initProduct);
    const [submitted , setSubmitted] = useState(false);
    
useEffect(() => {
    console.log(id)
    axios.get("https://api61425048.herokuapp.com/product/"+ id)
    .then((response) => {
        
        setProduct(response.data)
    })

}, [id]);

    const handleInputChange = (event) => {
        let {name, value} = event.target;
        if(name === "tags"){
            value = value.split(",");
        }
        setProduct({...product,[name]: value});
    }
    const saveProduct = () => {
        var data = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags
        }
        axios
            .put("https://api61425048.herokuapp.com/product/" + product._id, data)
            .then((response) => {
                console.log(response.data);
                setProduct({ ...product, data });
                setSubmitted(true)
            })
            .catch((error) => {
                console.log(error);

            });

    };
     
    const newProduct=()=>{
        setSubmitted(false);
        
    }
    return (
        <Container>
            <Row>
                <h3>Edit Product</h3>
            </Row>
            <Row>
                {submitted ? (
                    <Alert color="success">
                        {/* เงื่อนไขเมื่อแก้ไขเสร็จ */}
                        Product is update !! <dr />
                        <Button color="success" onClick={newProduct}>
                            OK
                        </Button>
                    </Alert>
                ):(
                    <Form>
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input type="text" name="name" id="productName" value={product.name || ""} onChange={handleInputChange} placeholder="ระบุชื้อสินค้า" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productCategory">Product Category</Label>
                        <Input type="text" name="category" id="productCategory" value={product.category || ""} onChange={handleInputChange} placeholder="ระบุหมวดหมู่สินค้า" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productPrice">Product Price</Label>
                        <Input type="text" name="price" id="productPrice" value={product.price || ""} onChange={handleInputChange} placeholder="ระบุราคา" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productTags">Product Tags (หากมีมากกว่า 1  tag ให้คั่นด้วยเครื่องหมาย ",")</Label>
                        <Input type="text" name="tags" id="productTags" value={product.tags || ""} onChange={handleInputChange} placeholder="ระบุ tag" />
                    </FormGroup>
                    <Button className="btn btn-success"onClick={saveProduct} >Update product</Button>
                {/* เรียกใช้ฟังชั่น saveProduct */}
                </Form>
                )}
                
            </Row>
        </Container>
    )
}

export default EditProductForm
