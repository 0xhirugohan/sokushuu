import { Title } from "@/components/flashcards/Title";
import { HomeContent } from "@/components/layouts/HomeContent";
import { AllContentCard } from "@/components/layouts/AllContentCard";

const FlashcardMenu = ({ styleName, searchQueryProps }: { styleName?: string, searchQueryProps?: string }) => {
    return <div className={`${styleName} p-4 w-full h-full flex flex-col gap-y-8 overflow-x-hidden`}>
        <Title searchQueryProps={searchQueryProps} />
        { searchQueryProps ? <AllContentCard /> : <HomeContent /> }
    </div>
}

export { FlashcardMenu };