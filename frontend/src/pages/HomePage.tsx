import About from "../components/About"
import Contact from "../components/Contact"
import LatestPosts from "../components/LatestBlogs"
import Skills from "../components/Skills"

const HomePage = () => {
  return (
    <div>
        <About />
        <div className="w-full h-[1px] bg-gray-800" />
        <LatestPosts />
        <div className="w-full h-[1px] bg-gray-800" />
        <Skills />
        <div className="w-full h-[1px] bg-gray-800" />
        <Contact />
    </div>
  )
}

export default HomePage