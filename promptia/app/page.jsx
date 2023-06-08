import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col ">
      <h1 className="head_text text-center ">Discover & Share
      <br className=" max-md:hidden" />
      <span className="blue_gradient">AI Powered Prompts</span>
      </h1> 
      <p>
        Promptia is a open-source AI prompting tool for modrn world 
        <br /> to discover, create and share creative prompts
      </p>

      <Feed/>
    </section>
  )
}

export default Home;
