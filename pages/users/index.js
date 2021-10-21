import { Pagination } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

// export const getStaticPaths = async({params}) => {
//   console.log(`params`, params)
//   const page= 1
// //   const response = await axios.get(`https://reqres.in/api/users?page=${page}`)
// //   const data = await response.data.data

//   const paths = {
//       params:
//         page
//     }

//   return{
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps = async() => {
//   let page = 1
//   const response = await axios.get(`https://reqres.in/api/users?page=${page}`)
//   const data= await response.data.data ? response.data.data : []
//   const count = await response.data.total
//   return{
//     props: {
//       data,
//       count
//     }
//   }
// }

export const getServerSideProps = async({query}) => {
  const page = query.page ? query.page : 1
  const response = await axios.get(`https://reqres.in/api/users?page=${page}`)
  const data= await response.data.data ? response.data.data : []
  const count = await response.data.total
  return{
    props: {
      data,
      count
    }
  }
}

const Users = ({ data, count }) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1);
  const previousProps = useRef({ page }).current

  useEffect(() => {
    if(data){
      setUsers(data)
      setPageCount(count/data.length)
    }
  }, [data])

  useEffect(() => {
    const getList = async()=> {
      if(previousProps.page !== page){
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`)
      const data= await response.data.data ? response.data.data : []
      setUsers(data)
      router.push({pathname: '/users', query: `page=${page}`})
      }
    }
    page <= pageCount && getList()
    return()=> {
      previousProps.page = page
    }
  }, [page])

  const handleChange = (e, value)=> {
    setPage(value)
  }

  return (<div>
    <table>
      <thead>     
        <tr>
          <td>Id</td>
          <td>Email</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
      {users.map((data, index)=>
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.email}</td>
          <td>{data.first_name}</td>
          <td>{data.last_name}</td>
          <td style={{color: 'blue'}}><Link href={`/users/${data.id}`}>View</Link></td>
        </tr>)}
      </tbody>
    </table>
    <Pagination count={pageCount} onChange={handleChange} />
  </div>)
}

export default Users