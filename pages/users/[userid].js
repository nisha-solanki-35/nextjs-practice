import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/router";

// eslint-disable-next-line @next/next/no-typos
// export const getStaticPaths = async({query}) => {
//   console.log(`query`, query)
//   const page= 1
//   const response = await axios.get(`https://reqres.in/api/users?page=${page}`)
//   const data = await response.data.data

//   const paths = data.map(user=> {
//     return{ 
//       params: { 
//         userid: user.id.toString()
//       }
//     }
//   })

//   return{
//     paths,
//     fallback: false
//   }
// }

export const getServerSideProps = async({query}) => {
  const id = query.userid
  const response = await axios.get(`https://reqres.in/api/users/${id}`)
  const data = await response.data.data
  return{
    props: {
      data
    }
  }
}

const UserId = ({ data }) => {

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
          <CardMedia
            component="img"
            height="140"
            image={data.avatar}
            alt="User Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.first_name + " " + data.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>}
  </>)
}

export default UserId