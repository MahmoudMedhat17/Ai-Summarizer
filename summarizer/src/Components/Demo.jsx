import {copy, linkIcon, loader, tick} from "../assets";
import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../Services/article";

const Demo = () => {
  const[article,setArticle] = useState({
    url:"",
    summary:""
  })
  
  const[getSummary, {error, isFetching}] = useLazyGetSummaryQuery();
  
  const[allArticles,setAllArticles] = useState([]);

  const[copied,setCopied] = useState("");

  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"))
    
    articlesFromLocalStorage ? setAllArticles(articlesFromLocalStorage) : "";
  },[])

  async function handleSubmit(e){
    e.preventDefault();
    const {data} = await getSummary({articleUrl:article.url})
    if(data?.summary){
      const newArticle = {...article, summary: data.summary};
      const updatedArticle = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedArticle);
      
      localStorage.setItem("articles",JSON.stringify(updatedArticle));
    }
  }

  const handleCopy = (copyUrl) =>{
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=>setCopied(false),3000);
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/*Search bar*/}
      <div className="w-full flex flex-col gap-2">
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 w-5 my-2 ml-3"
          />

          <input
            className="url_input peer"
            type="url"
            placeholder="Enter Your URL"
            value={article.url}
            onChange={(e)=>setArticle({...article, url:e.target.value})}
          />

          <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            ↵
          </button>
        </form>

      {/*Browse URL History*/}
      <div className="flex flex-col max-h-60 overflow-y-auto gap-1">
        {
          allArticles.map((item,i)=>(
            <div key={`link-${i}`} className="link_card" onClick={()=>setArticle(item)}>
              <div className="copy_btn" onClick={()=>handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi font-medium text-blue-700 text-sm truncate">
                {
                  item.url
                }
              </p>
            </div>
          ))
        }
      </div>
      </div>
      {/*Display Results*/}
        <div className="my-10 max-w-full flex flex-col justify-center items-center">
          {
            isFetching ? (
              <img
                src={loader}
                alt="loader-icon"
                className="w-20 h-20 object-contain"
              />
            )
            :
            error ? (
              <p className="font-inter font-bold text-xl text-black text-center">
                This wasnt supposed to happen...
                <br/>
                <span className="font-satoshi font-normal text-gray-700">
                  {error?.data?.error}
                </span>
              </p>
            )
            :
            (
              article.summary && (
                <div className="flex flex-col">
                  <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                    Article <span className="blue_gradient">Summary</span>
                  </h2>
                  <div className="summary_box">
                    <p className="font-inter font-medium text-gray-700 text-sm">
                      {
                        article.summary
                      }
                    </p>
                  </div>
                </div>
              )
            )
          }
        </div>
    </section>
  )
}

export default Demo;