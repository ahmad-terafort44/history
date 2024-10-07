import React, { useEffect, useState } from 'react'
import style from "./DevServer.module.scss"
import axios from 'axios'
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

export default function DevServer() {
  const [tableData, setTableData] = useState([])
  const [nextUrl, setNextUrl] = useState("")
  const [prevUrl, setPrevUrl] = useState("")
  const [openPrompt, setOpenPrompt] = useState(50)
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [order, setOrder] = useState(false)


  useEffect(()=>{
    axios.get(`https://sapi.aspire.pics/api/history/?page=${page}`)
    .then((response) => {
      setTableData(response.data.data.items)
      setNextUrl(response.data.data.next)
      setPrevUrl(response.data.data.previous)
    })
    .catch(error => console.log(error))    
  },[page])

  function getData() {
    axios.get("https://sapi.aspire.pics/api/history/")
      .then((response) => {
        setTableData(response.data.data.items)
        setNextUrl(response.data.data.next)
        setPrevUrl(response.data.data.previous)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    getData()
  }, [])

  function next() {
    if (nextUrl !== null) {
      axios.get(`${nextUrl}`)
        .then((response) => {
          setTableData(response.data.data.items)
          setNextUrl(response.data.data.next)
          setPrevUrl(response.data.data.previous)
          setCurrentPage(currentPage + 1)
        })
        .catch(error => console.log(error))
    }
  }

  function prev() {
    if (prevUrl !== null) {
      axios.get(prevUrl)
        .then((response) => {
          setTableData(response.data.data.items)
          setNextUrl(response.data.data.next)
          setPrevUrl(response.data.data.previous)
          setCurrentPage(currentPage - 1)
        })
        .catch(error => console.log(error))
    }
  }

  function last() {
    axios.get(`https://sapi.aspire.pics/api/history/?page=${90}`)
      .then((response) => {
        setTableData(response.data.data.items)
        setNextUrl(response.data.data.next)
        setPrevUrl(response.data.data.previous)
        setCurrentPage(currentPage - 1)
      })
      .catch(error => console.log(error))
  }

  const data = order ? tableData.slice().reverse() : tableData
  return (
    <div className={style.table}>
    Page Number <input type="text" placeholder='Enter page Number' onChange={(e)=>{setPage(e.target.value)}} value={page} /> 
      <table>
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => { setOrder(!order) }}>{order ? <BiSolidUpArrow /> : <BiSolidDownArrow />}ID</th>
            <th>User</th>
            <th>Anonymous Id</th>
            <th>Prompt</th>
            <th>AWS Show Image</th>
            <th>Celebrity check</th>
            <th>Moderation Level</th>
            <th>Final Score</th>
            {/* <th>Google Score</th> */}
            <th>Google Show Image</th>
            <th>ChatGpt Score</th>
            <th>Seed</th>
            <th>Time</th>
            <th>Url List</th>
          </tr>
        </thead>
        <tbody>

          {data ? data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.user == null ? "Null" : item.user}</td>
                <td>{item.anonymous == null ? "Null" : item.anonymous}</td>
                <td>{item.prompt.length > 20 ? item.prompt.slice(0, openPrompt) + "..." : item.prompt}</td>
                <td>{item.aws_show_img ? item.aws_show_img.map((i) => {
                  return (
                    <>
                      <thead>
                        <tr>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i.toString()}</td>
                        </tr>
                      </tbody>
                    </>
                  )
                }) : ""}</td>
                <td>{item.celebrity_check}</td>
                <td>{item.moderation_level ? item.moderation_level.map((i) => {
                  return (
                    <>
                      <thead>
                        <tr>
                          <th>Moderation_label</th>
                          <th>Moderation_confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i.moderation_label}</td>
                          <td>{i.moderation_confidence}</td>
                        </tr>
                      </tbody>
                    </>
                  )
                }) : ""}</td>
                <td>{item.final_score ? item.final_score.map((i) => {
                  return (
                    <>
                      <thead>
                        <tr>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i.toString()}</td>
                        </tr>
                      </tbody>
                    </>
                  )
                }) : ""}</td>
                <td>{item.google_score ? item.google_score.map((i) => {
                  return (
                    <>
                      <thead>
                        <tr>
                          <th>Racy</th>
                          <th>Adult</th>
                          <th>Medical</th>
                          <th>Spoofed</th>
                          <th>Violence</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i.racy ? i.racy : ""}</td>
                          <td>{i.adult ? i.adult : ""}</td>
                          <td>{i.medical ? i.medical : ""}</td>
                          <td>{i.spoofed ? i.spoofed : ""}</td>
                          <td>{i.violence ? i.violence : ""}</td>
                        </tr>
                      </tbody>
                    </>
                  )
                }) : ""}</td>
                <td>{item.google_show_image ? item.google_show_image.map((i) => {
                  return (
                    <>
                      <thead>
                        <tr>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i.toString()}</td>
                        </tr>
                      </tbody>
                    </>
                  )
                }) : ""}</td>

                {/* <td>{item.chatgpt_score ? item.chatgpt_score.length > 1 ? item.chatgpt_score.map((i) => {
                  return (
                    <>
                      <thead>
                        <tr>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i.toString()}</td>
                          <td>{i.toString()}</td>
                        </tr>
                      </tbody>
                    </>
                  )
                }) : "Null":""}</td> */}

                <td>{item.seed}</td>
                <td>
                  <thead>
                    <tr>
                      <th>Sum of all time</th>
                      <th>Unsafe total time</th>
                      <th>Google vision time</th>
                      <th>Time for image creation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {item.times == null ? "" :
                        <>
                          <td>{item.times.sum_of_all_time}</td>
                          <td>{item.times.unsafe_total_time}</td>
                          <td>{item.times.google_vision_time}</td>
                          <td>{item.times["time for image creation"]}</td>
                        </>
                      }
                    </tr>
                  </tbody>
                </td>
                <td>{item.url_list}</td>
              </tr>
            )
          }) : "Loading...."}
        </tbody>

      </table>
      <div className={style.pagination}>
        <button onClick={() => { getData() }}>First</button>
        <button onClick={() => { prev() }}>Prev</button>
        {/* {Array(page).fill().map((it, index) => {
          return (
            <p>{index}</p>
          )
        })} */}
        <button onClick={() => { next() }}>Next</button>
        <button onClick={() => { last() }}>Last</button>
      </div>
    </div >
  )
}
