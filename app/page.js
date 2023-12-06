import Feed from "@/components/Feed";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <div className="container-fluid text-center pt-10">
        <Hero />
        <div className="container-fluid mt-5">
          <Feed />
        </div>
      </div>
    </>
  );
}
