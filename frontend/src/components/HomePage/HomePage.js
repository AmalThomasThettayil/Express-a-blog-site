import React from 'react'
import Cards from '../Cards/Cards'
import "./HomePage.css"

const homePage = () => {
  return (
    <>
      <section className="videosection bg-black flex justify-center">
        <div className="videodiv relative ">
          <iframe className="video object-cover"
            src="https://www.youtube.com/embed/tliJePo6vYs?autoplay=1&mute=1&controls=0&loop=1"
            title="CAR MUSIC"
            frameborder="0" allow="accelerometer; encrypted-media; 
          gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>
        <div className="relative container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg: ml-20 mb-16 lg:mb-0">
              {/* <span className="text-lg font-bold text-yellow-400">
                Create posts to educate
              </span> */}
              <h2 className="max-w-2xl mt-40 mb-12 text-8xl 2xl:text-8xl text-white font-bold font-heading">
                Stay Curious.{" "}
                {/* <span className="text-black">By creating a post</span> */}
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-white font-bold">
                Discover stories, thinking, and expertise from writers on automobiles.
              </p>
              <a className="inline-block px-12 py-5 text-lg text-white font-bold bg-black hover:bg-yellow-500 hover:text-black rounded-full transition duration-200"
                href="/">
                Start reading
              </a>
            </div>
            {/* <div className="w-full lg:w-1/2 px-4">
              <img className="w-full" src={poster} alt={poster} />
            </div> */}
          </div>
        </div>
      </section>
      <section2>

      </section2>


    </>

  )
}

export default homePage