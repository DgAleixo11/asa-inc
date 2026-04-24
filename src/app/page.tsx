import ResponsiveShell from "@/components/layout/ResponsiveShell";
import HeroSection from "@/components/sections/HeroSection";
import SubjectsSection from "@/components/sections/SubjectsSection";
import FeaturedMentorsSection from "@/components/sections/FeaturedMentorsSection";

export default function HomePage() {
  return (
    <ResponsiveShell mobileActive="home">
      <HeroSection />
      <SubjectsSection />
      <FeaturedMentorsSection />
    </ResponsiveShell>
  );
}