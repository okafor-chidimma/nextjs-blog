// import Layout from "../../components/layout";
// import { getAllPostIds, getPostData } from "../../lib/posts";

// export default function Post() {
//   return (
//     <Layout>
//       {" "}
//       {postData.title}
//       <br />
//       {postData.id}
//       <br />
//       {postData.date}
//     </Layout>
//   );
// }

// export async function getStaticPaths() {
//   console.log("get static paths----------------------");

//   const paths = getAllPostIds(); //path is an array of all the post values of id with this structure
//   /*
//         path = [
//             {
//                 params:{
//                    id: "ssg-ssr" // params will contain the dynamic prop as properties. for e.g since in the dynamic route, it is the "id" that is changing. that is why we have added the id props to params and assigned it a value
//                 }
//             },
//             {

//             }
//         ]

//     */
//   return {
//     paths,
//     fallback: false,
//   };
// }
// export async function getStaticProps({ params }) {
//   console.log("get static props---------------");
//   //const { params } = args;
//   const postData = getPostData(params.id);
//   console.log(postData,'postData--------------');

//   return {
//     props: {
//       postData,
//     },
//   };
// }
import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //getstaticprops function can be called with a parameter which is an object which can have params as a property if it is a dynamic route.that is why they destructured the object to have access to the params property.
  //params on its own is an object( that has the dynamic route variable, which in our case is called "id", since that is the name we gave the file), as a prop and what ever we passed in the url as the value
  console.log("params-------------", params);

  const postData = await getPostData(params.id);
  console.log(postData, "post data--------------");
  return {
    props: {
      postData,
    },
  };
}
