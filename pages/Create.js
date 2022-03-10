import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Send } from '../component/Icons';
import baseUrl from '../helpers/baseUrl';
const Create = () => {
    const router= useRouter();
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [imageUrl, setimage] = useState('');
    const handlesubmit =async (e) => {
        e.preventDefault();
        const image = await imageUplaod();
        const res=fetch(`${baseUrl}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({ name, 
                price, 
                description, 
                image
             })
        })
        const res2 = res.then(res => res.json());
        if(res2.error){
            console.log(res2.error);
        }
        else
            router.push('/');
    }
    const imageUplaod = async () => {
        const data = new FormData();
        data.append('file', imageUrl);
        data.append('upload_preset', 'Mystore');
        data.append('cloud_name', 'de5rfdbf8');
        const res = await fetch('https://api.cloudinary.com/v1_1/de5rfdbf8/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        return file.url;
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
                        imageUrl ? URL.createObjectURL(imageUrl) : ''
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