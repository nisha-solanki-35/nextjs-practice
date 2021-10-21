import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/router";
import Image from 'next/image'

export const getStaticPaths = async() => {
  const response = await axios.get(`https://fakestoreapi.com/products`)
  const data = await response.data

  const paths = data.map(product=> {
    return{ 
      params: { 
        productid: product.id.toString()
      }
    }
  })

  return{
    paths,
    fallback: false
  }
}

export const getStaticProps = async({params}) => {
  const id = params.productid
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
  const data = await response.data
  return{
    props: {
      data
    }
  }
}

const ProductId = ({ data }) => {

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(data){
      setLoading(false);
    }
  }, [data])

  return(<>
    <ArrowBackIcon onClick={()=> router.back()} />
    {loading ?
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={118}
      />
      : <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          {/*<CardMedia
            component="img"
            height="140"
            image={data.image}
            alt="Product Image"
          />*/}
          <Image
            src={data.image}
            height='150'
            width='200'
            alt='Product Image'
          ></Image>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.category}<br></br>{data.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>Title: </b>{data.title}<br></br>
              <b>Description: </b>{data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>}
  </>)
}

export default ProductId