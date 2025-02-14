import IntroductionSection from "@/components/IntroductionSection";
import { Search } from "@/components/Search";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <IntroductionSection />
      <Search />
    </div>
  );
}
