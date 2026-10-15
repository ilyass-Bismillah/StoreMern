const Hero = () => {
  return (
    <div className="2xl:max-w-6xl lg:max-w-5xl md:max-w-2xl mx-auto py-15">
      <div className="bg-white text-black flex justify-evenly rounded-4xl relative">
        <div className="flex flex-col justify-center space-y-5 pl-10">
          <h1 className="text-5xl font-bold tracking-widest uppercase">
            <span className="-ml-8">the t-shirt</span> <br />{" "}
            <span className="-ml-4">design drop that</span> <br />{" "}
            <span>build brands</span>{" "}
          </h1>
          <p className="text-2xl font-medium max-w-md">
            Timeless visual design for those who lead, not follow, Crafted in
            limited drops. Worn by intention.
          </p>
        </div>
        <img src="/ex.png" alt="hero banner" className="w-[700px] -my-5" />
        <button className="absolute -bottom-5 left-40 bg-white px-10 py-3 text-black font-bold text-xl uppercase rounded-2xl cursor-pointer tracking-tighter">Get the drop</button>
      </div>
    </div>
  );
};

export default Hero;
