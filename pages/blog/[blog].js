import { useRouter } from 'next/router'

const blog = () => {
  const router = useRouter();
  const blogNo = router.query.blog;
  return (
    <div>
       <h1>{blogNo}</h1> 
    </div>
  )
}

export default blog
