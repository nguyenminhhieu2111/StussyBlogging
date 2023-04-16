import error from "../../../image/R.jpg"
import { collection, deleteDoc, doc, onSnapshot, query, startAfter } from 'firebase/firestore';
import React from 'react';
import { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../../contexts/auth-context';
import { db } from '../../../firebase-app/firebase-config';
import { postStatus, userRole } from '../../../utils/constants';
import { ActionDelete, ActionEdit } from '../../action';
import Button from '../../button/Button';
import { LabelStatus } from '../../label';
import { Table } from '../../table';
import DashboardHeading from '../Dashboard/DashBoardHeading';

const TopicManage = () => {
  const {userInfo}=useAuth()
    const [topicList,setTopicList]=useState([])
    useEffect(()=>{
   const colref=collection(db,"topic")
    onSnapshot(colref,(snapshot)=>{
        let results=[]
        snapshot.forEach((doc)=>{
            results.push({
                id:doc.id,
                ...doc.data()
            })
        })
        setTopicList(results)
        console.log(results)
    })
},[])
    const navigate=useNavigate()
    const handleDeleteCategory=async(docId)=>{
        const colRef=doc(db,"topic",docId)
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          await deleteDoc(colRef)
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }

    if(userInfo.role !== userRole.ADMIN){
    return(
      <div>
      <span className="title_error">Sorry, you don't have permission</span>
      <img src={error}/>
      </div>
    )  
  
    }  
    return (
        <div>
            <DashboardHeading
            title='Topic'
            desc='Manage your Topic'
            ></DashboardHeading>
            <div className="flex justify-between mb-10 justify-items-center">
      <Link to="/manage/topicAddNew">
        <Button className="">Add Topic</Button>
      </Link>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {topicList?.length > 0 &&  topicList.map(topic => (
          
          <tr key={topic.id}>
            <td>{topic.id}</td>
            <td>{topic.topic}</td>
            <td>
            {topic.status === postStatus.APPROVED && (
              <LabelStatus type="success">Approved</LabelStatus>
            )}
            {topic.status === postStatus.UNAPPROVED && (
              <LabelStatus type="warning">Unapproved</LabelStatus>
            )}
            </td>
            <td>
              <div className="flex items-center gap-x-3">
                <ActionEdit onClick={()=>navigate(`/manage/topic-update?id=${topic.id}`)}></ActionEdit>
                <ActionDelete onClick={()=>handleDeleteCategory(topic.id)}></ActionDelete>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
        </div>
    );
};

export default TopicManage;