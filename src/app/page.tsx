import { Hero } from "@/components/home/Hero";
import { MailingList } from "@/components/home/MailingList";
import { Pillars } from "@/components/home/Pillars";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <Pillars />
      <MailingList />
    </>
  );
}
