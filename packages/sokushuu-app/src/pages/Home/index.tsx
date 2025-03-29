import { FlashcardMenu } from '@/components/layouts/FlashcardMenu'
import { Sidebar } from '@/components/layouts/Sidebar'

const Home = () => {
  return <div className="flex gap-4 h-full w-full">
    <Sidebar styleName="flex-none" />
    <FlashcardMenu styleName="flex-1" />
  </div>;
};

export { Home };
