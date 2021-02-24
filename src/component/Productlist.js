import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Table, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import confirm from "reactstrap-confirm";
const Productlist = () => {
    const [product, setProduct] = useState([]);

    const updateProduct = () => {
        axios.get("https://api61425048.herokuapp.com/product")
        
            .then((response) => {
                console.log(response)
                setProduct(response.data.product);
                console.log("update");
            });
    };
    useEffect(() => {
        updateProduct();
    }, [])

    const deleteProduct = async (productName, productId) =>{
        let result = await confirm(
            {
                title : <> Confirmation !!</>,
                message : 'คุณต้องการลบผลิตภัณฑ์ไอดี"' + productName + '" ใช่ไหม ?',
                confirmText : "ใช่",
                confirmColor : "primary",
                cancelText : "ไม่ใช่",
                cancelColor:"danger"
            });
            if(result){
                axios.delete("https://api61425048.herokuapp.com/product/"+ productId)
                .then((response) =>{
                    updateProduct();
                })
            }
    };
    return (
        <Container>
            <Row><h3>Produc List</h3></Row>
            <Row>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                                
                        
                            <th>Category</th>
                        
                                
                            <th>Price</th>
                                
                        
                            <th>Action </th>
                                
                       
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product) => { //เรียกข้อมูลออกมาทั้งหมด โดยวนข้อมูลทีละชุด
                            return (
                                <tr key={product._id}>
                                    {/* เลือกจาก id */}
                                    <td>{product.name}</td>
                                    {/* แสดงชื่อ */}
                                    <td>{product.category}</td>
                                    {/* แสดงหมวดหมู่ */}
                                    <td>{product.price}</td>
                                    {/* แสดงราคา */}
                                    <td>
                                        <Button color="info" href={"/edit/" + product._id}>
                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                        </Button>
                                        {/* ปุ่มแก้ไขเลือกจาก id */}
                                        <Button color="danger" onClick={() => deleteProduct(product.name,product._id)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                                        {/* ปุ่มลบเลือกจาก ID */}
                                    </td>
                                </tr>

                            );
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default Productlist;
