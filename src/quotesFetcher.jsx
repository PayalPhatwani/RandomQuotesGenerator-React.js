import React,{useState,useEffect} from "react";
import { Button, Modal, ModalBody } from 'reactstrap';
import UseAnimations from "react-useanimations";
import infinity from 'react-useanimations/lib/infinity'
import image from '../src/images/image1.jpg'
import './App.css';


function FetchQuote(){
    const [quoteList,setQuoteList] = useState([]);
    const [author,setAuthor] = useState('');
    const [quote,setQuote] = useState('');
    const [modal, setModal] = useState(false);


    const toggle = () =>{
        if(!modal){
        let randomNumber = Math.floor((Math.random() * 900) + 1);
        setQuote(quoteList[randomNumber].text);
        setAuthor(quoteList[randomNumber].author);
        }
        setModal(!modal);
    }

    useEffect(()=>{
        console.log("useeffect")
        fetch("https://type.fit/api/quotes")
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
            setQuoteList(data)
        });
    },[]);
    return(<>
    <div>
      <Button outline color="dark" onClick={toggle}><UseAnimations animation={infinity} strokeColor="black" /></Button>
      <Modal  size="lg" isOpen={modal} toggle={toggle}  >
        <ModalBody toggle={toggle} style={{backgroundImage:`url(${image})`}} className="modal-body" > 
        <div className="mt-4 p-4">
        <h3 className="mt-4 p-4" style={{textAlign:"center",color:"white"}}>"{quote}"</h3>
     <p className="m-2 p-2" style={{textAlign:"right",color:"white"}}>-{author}</p>
     </div>
        </ModalBody>
      </Modal>
    </div>
    </>)
}

export default FetchQuote;