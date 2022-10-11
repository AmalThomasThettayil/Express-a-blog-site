import React from 'react'

const homePage = () => {
  return (
    <>
      <section className="pb-10 bg-yellow-500">
        <div className="relative container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              {/* <span className="text-lg font-bold text-yellow-400">
                Create posts to educate
              </span> */}
              <h2 className="max-w-2xl mt-20 mb-12 text-8xl 2xl:text-8xl text-black font-bold font-heading">
                Stay Curious.{" "}
                {/* <span className="text-black">By creating a post</span> */}
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-black font-bold">
                Discover stories, thinking, and expertise from writers on any topic.
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
    </>

  )
}

export default homePage