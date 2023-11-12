import {logo} from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center mb-10 pt-3">
        <nav className="w-full flex flex-row justify-between items-center">
          <img
            src={logo}
          />
          <button className="black_btn" type="button" onClick={()=> window.open("Github link")}>
            Github
          </button>
        </nav>

        <h1 className="head_text">
          Summarize Articles with <br className="max-md:hidden"/> <span className="orange_gradient">OpenAI GPT-4</span>
        </h1>

        <h2 className="desc">
          Simplify your reading with Summize, an open-source article summarizer
          that transforms lengthy articles into clear and concise summaries
        </h2>
    </header>
  )
}

export default Hero;