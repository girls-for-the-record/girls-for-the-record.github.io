import { WelcomePanel } from '@/components/home/welcome-panel'
import { LaptopNav } from '@/components/home/laptop-nav'
import { IssueCountdown } from '@/components/home/issue-countdown'
import { TopicRequestForm } from '@/components/home/topic-request-form'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      <WelcomePanel />
      <LaptopNav />
      <IssueCountdown />
      <TopicRequestForm />
    </div>
  )
}
