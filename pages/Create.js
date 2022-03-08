import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send } from '../component/Icons';
const Create = () => {
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [image, setimage] = useState('');
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(name, price, description, image);

    }
    return (
        <>
            <div className="container">
                <form onSubmit={(e)=>{handlesubmit(e)}}>
                    <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} />
                    <input type="text" className="form-control mt-2" placeholder="Price" value={price} onChange={(e) => setprice(e.target.value)} />
                    <div className="mb-3">
                        <label for="formFile" className="form-label">image file</label>
                        <input className="form-control" type="file" id="formFile"
                            accept='image/*' onChange={(e) => setimage(e.target.files[0])} />
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" 
                        style={{height:'100px'}} value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
                        <label for="floatingTextarea2">Comments</label>
                    </div>
                    <img src={
                        image ? URL.createObjectURL(image) : ''
                    } className="rounded float-end" alt='Image preview' style={{width:'100px',height:'100px'}} />
                    <button type="submit" className="btn btn-success mt-2 mb-3">
                        Submit<Send />
                    </button>
                </form>
            </div>
        </>
    );
}

export default Create;