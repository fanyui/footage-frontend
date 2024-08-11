import { HomePageBody } from "@/src/features/home/home-page-body";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: 'Footage | Intant Security footage analysis',
    description: 'Analyis of security footage by AI',
  };
}

export default function HomePage() {
  return (
    <HomePageBody />
  );
}
