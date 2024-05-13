import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
// import ShowResultName from "../component/showresultname";
import { DataContext } from "../data/DataContext";


export default function Eveing() {
  const [users, setUsers] = useState([]);
  // const [checkmoing, setCheckmoing] = useState([]);
  // const [checkevening, setCheckeveing] = useState([]);
  const [userID, setUserID] = useState(0);
  // const [summary, setSummary] = useState([]);
  // const [selectedSelectOptions, setSelectedSelectOptions] = useState({});
  const { setEveningUser } = useContext(DataContext); //ค่อยลบ
  const [state, setState] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUsers(data);
        // setCheckmoing(data.map(item => ({ Id: item.number })));
        // setCheckeveing(data.map(item => ({ Id: item.number })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/check/" + 0, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setState(data);
        console.log("State: " , state);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);



  // function handleOptionChange(index, value) {
  //     setCheckeveing(preCheckevening => {
  //       const updateCheckEvening = preCheckevening.map((item) => (item.Id === index+1 ? { ...item , status: value} : item ));
  //       return updateCheckEvening;
  //     })
  //   }


    // useEffect(() => {
    //   const updateSummary = async () => {
    //     // const updatedSummary = {
    //     //   checkmoing: [...checkmoing],
    //     //   checkeveing: [...checkeveing]
    //     // };
    //     // setSummary(updatedSummary);
    //     console.log("checkevening in update: ", checkevening);
    //     setEveningUser(checkevening);
    //   };
  
    //   const fetchDataAndUpdateSummary = async () => {
    //     await updateSummary();
    //   };
  
    //   fetchDataAndUpdateSummary();
    // }, [checkevening]);


    function handleOptionChange(index, value) {
      console.log("index: ", index)
      //ทำแคสสถานะ
      setState(pre => {
        return pre.map((item , i) => {
          if(i+1 === index){
            return {...item , Evening: value}
          }
          return item;
        })
      })
      const body = JSON.stringify({ Id: index, evening: value });
  
      const DoUpdate = async () => {
  
        const response = await fetch("http://localhost:8080/updateEvening",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: body
          }
  
        )
        // if(response.ok){
        //   window.location = "/app"
        // }
      }
      DoUpdate();
    }

  // console.log("summary: " , summary);



  return (
    <>
      <div className="container-fluid" >
        <div className="row d-flex justify-content-between mt-5">
            <div className="row">
              <select className="col-md-2" value={userID} onChange={(e) => setUserID(e.target.value)}>
                <option value={0}>ทุกคน</option>
                <option value={1}>ชาย</option>
                <option value={2}>หญิง</option>
              </select>
              <select className="col-md-2">
                <option value={0}>ทุกชั้น</option>
                <option value={0}>ม.4</option>
                <option value={0}>ม.5</option>
                <option value={0}>ม.6</option>
              </select>
              <div className="col-md-8 d-flex justify-content-end">
                <form role="search">
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </div>
            </div>
            <table className="table table-striped table-sm">
              <thead>
                <tr className="text-center">
                  <th scope="col" style={{ width: "10%" }}>เลขที่</th>
                  <th scope="col" style={{ width: "10%" }}>คำนำหน้าชื่อ</th>
                  <th scope="col" style={{ width: "20%" }}>ชื่อ</th>
                  <th scope="col" style={{ width: "10%" }}>ระดับชั้น</th>
                  <th scope="col" style={{ width: "20%" }}>เช็คชื่อแล้ว</th>
                  <th scope="col" style={{ width: "20%" }}>ยังไม่เช็คชื่อ</th>
                  <th scope="col" style={{ width: "20%" }}>แจ้งเข้าสาย</th>
                  <th scope="col" style={{ width: "20%" }}>ลาหอพัก</th>
                  <th scope="col" style={{ width: "10%" }}>เพิ่มเติม</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.number}</td>
                    <td>{user.prefix}</td>
                    <td>{user.name}</td>
                    <td>{user.year}</td>
                    <td className="text-center">
                      <input 
                        type="radio" 
                        value="เช็คชื่อแล้ว"
                        checked={state[index].Evening === "เช็คชื่อแล้ว"}  
                        onChange={() => handleOptionChange(index+1 , "เช็คชื่อแล้ว")}     
                      />
                    </td>
                    <td className="text-center">
                      <input 
                        type="radio" 
                        value="ยังไม่เช็คชื่อ"
                        checked={state[index].Evening === "ยังไม่เช็คชื่อ"}  
                        onChange={() => handleOptionChange(index+1 , "ยังไม่เช็คชื่อ")}     
                      />
                    </td>
                    <td className="text-center">
                      <input 
                        type="radio" 
                        value="แจ้งเข้าสาย"
                        checked={state[index].Evening === "แจ้งเข้าสาย"}  
                        onChange={() => handleOptionChange(index+1 , "แจ้งเข้าสาย")}     
                      />
                    </td>
                    <td className="text-center">
                      <input 
                        type="radio" 
                        value="ลาหอพัก"
                        checked={state[index].Evening === "ลาหอพัก"}  
                        onChange={() => handleOptionChange(index+1 , "ลาหอพัก")}     
                      />
                    </td>
                    <td className="text-center"><input type="text" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </>
  );
}
