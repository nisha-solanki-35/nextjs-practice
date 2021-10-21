import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const getStaticProps = async() => {
  const response = await axios.get(`https://fakestoreapi.com/products`)
  const data= await response.data ? response.data : []

  return{
    props: {
      data
    }
  }
}

const Products = ({ data }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(data){
      setProducts(data)
    }
  }, [data])

  return (<div>
    <table>
      <thead>     
        <tr>
          <td>Id</td>
          <td>Title</td>
          <td>Price</td>
          <td>Category</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
      {products.map((data, index)=>
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.title}</td>
          <td>{data.price}</td>
          <td>{data.category}</td>
          <td style={{color: 'blue'}}><Link href={`/products/${data.id}`}>View</Link></td>
        </tr>)}
      </tbody>
    </table>
  </div>)
}

export default Products