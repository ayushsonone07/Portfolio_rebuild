import "../styles/globals.css";
import Home from "./page";
import Nav from "../components/Nav";

export const metadata = {
  title : "Promptia",
  description : "Discover & share AI prompts "
}

const layout = ({Children}) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"/>
        </div>
        <main className="app">
          <Nav />
          {Children}
          <Home/>
        </main>
      </body> 
    </html>
  )
}

export default layout
