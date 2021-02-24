import React from 'react'
import EditProductForm from '../component/EditProductForm';

const EditProduct = (props) => {

    return (
        <>
           <main>
            <EditProductForm id={props.match.params.id}/>
           {/* เลือก id ที่ตรงกันมาโชว์ */}
           </main>
        </>
    )
}

export default EditProduct
