import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/HeroSection';
import SpecialOffer from '@/components/SpecialOffer';
import CodingPackages from '@/components/CodingPackages';
import ChipTuning from '@/components/ChipTuning';
import ServicesGrid from '@/components/ServicesGrid';
import ExpertTips from '@/components/ExpertTips';
import Reviews from '@/components/Reviews';
import QuickActions from '@/components/QuickActions';

export default function Index() {
  return (
    <MainLayout>
      <HeroSection />
      <SpecialOffer />
      <ServicesGrid />
      <CodingPackages />
      <ChipTuning />
      <ExpertTips />
      <Reviews />
      <QuickActions />
    </MainLayout>
  );
}
