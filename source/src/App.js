import './App.css';
import React, { useState } from 'react';

function App() {

  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [date, setDate] = useState(['2월 17일 발행', '2월 17일 발행', '2월 17일 발행']);
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [status, setStatus] = useState(0);
  let [text, setText] = useState('');

    function addTitle(){
        if( text.trim() === "" ){
            alert("제목을 입력하세요");
            document.querySelector("#textinput").focus();
            return;
        }

        let copy = [...title];
        copy.unshift(text);
        setTitle(copy);

        let copy2 = [...like];
        copy2.unshift(0);
        setLike(copy2);

        let copy3 = [...date];
        let dt = new Date();
        let month = dt.getMonth()+1;
        let day = dt.getDate();
        copy3.unshift(`${month}월 ${day}일 발행`);
        setDate(copy3);

        document.querySelector("#textinput").value = "";
        setText("");
    }

    function removeTitle(i){
        let copy = [...title];
        copy.splice(i,1);
        setTitle(copy);

        let copy2 = [...date];
        copy2.splice(i,1);
        setDate(copy2);
        
        let copy3 = [...like];
        copy3.splice(i,1);
        setLike(copy3);
    }

    return (
        <div className="App">

            <header>
                <h1 onClick={()=>{window.location.href="/"}}>ReactBlog</h1>
            </header>

            <article>
                <div className="sort">
                    <button onClick={()=>{
                        let sort = [...title].sort();
                        setTitle(sort);
                    }}>가나다 순 정렬</button>
                </div>
                
                <ul className="list">
                {
                    title.map((item, index)=>{
                        return (
                        <li key={index}>
                            <h3 onClick={()=>{
                                setModal(true);
                                setStatus(index);
                            }}> { title[index] } <span onClick={(e)=>{
                                e.stopPropagation();
                                let copy = [...like];
                                copy[index]++;
                                setLike(copy) 
                            }}>👍 {like[index]}</span></h3>

                            <p>{date[index]}</p>

                            <button onClick={()=>{ removeTitle(index) }}>삭제</button>
                        </li>
                        )
                    })
                }
                </ul>

                <div className="inputBox">
                    <input id="textinput" type="text" onChange={(e)=>{
                        setText(e.target.value);
                    }} />
                    <button onClick={addTitle}>글 발행</button>
                </div>

            </article>

            {
                modal === true
                ? <Modal title={title} status={status} date={date} setModal={setModal} />
                : null
            }
        
        </div>
    );
}


function Modal(props){
    return (
        <div className="modal">
            <h3>{ props.title[props.status] }</h3>
            <p>{ props.date[props.status] }</p>
            <span>상세내용</span>
            <button>글수정</button>
            <button onClick={()=>{props.setModal(false)}}>닫기</button>
        </div>
    );
}

export default App;
