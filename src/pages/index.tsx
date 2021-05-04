import Head from 'next/head'
import { getAllPosts } from '../lib/api'
import { PostType } from '../types/post'
import Frame from '../components/frame'
import ArticleCard from '../components/articleCard'
import Ogp from '../components/ogp'
import 'highlight.js/styles/github.css'

type Props = {
  allPosts: PostType[]
}

const Index = ({ allPosts }: Props) => {
  const tagsAll = allPosts.flatMap(post => post.tags ?? []);
  return (
    <>
    <Head>
        <title>memo.basd4g.net - 常に完成形</title>
        <Ogp title="memo.basd4g.net" path="/" description="常に完成形" ogImage={
          'https://res.cloudinary.com/basd4g/image/upload/co_rgb:505050,l_text:Sawarabi%20Gothic_64_align_center:memo.basd4g.net,w_800,c_fit/v1608780036/memo-basd4g-net-ogp.png'
        } ogType="website"/>
    </Head>
    <Frame titleIsH1={true}>
      <>
          {allPosts.sort((a,b)=>{
            return a.date < b.date ? 1 : -1
          }).map((post) => (
            <ArticleCard post={post} key={post.slug} tagsEmphasizing={tagsAll}/>
          ))}
      </>
    </Frame>
    </>
    )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'tags',
    'description',
  ])
  return {
    props: { allPosts },
  }
}
