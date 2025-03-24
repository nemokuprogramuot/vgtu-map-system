import React, {useEffect,useState} from 'react'


function TestApi() {

const [data,setData] = useState(null)

useEffect (()=> {
    fetch("/api").then(
        response => response.json()
    ).then(
        data =>{
        setData(data);
        }
    )
}, [])

  return (
    <div>
       {!data ?(
        <p>Loding..</p>
       ):(
        data.data.map((data, i) =>(
            <p key ={i}>{data}</p>
        ))
       )
    }
      
    </div>
  )
}

export default TestApi
