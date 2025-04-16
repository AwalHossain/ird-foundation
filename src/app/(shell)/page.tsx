import { CategoryList } from "@/components/dua/CategoryList";
import { DuaCard } from "@/components/dua/DuaCard";
import { SettingsPanel } from "@/components/dua/SettingsPanel";
import PageContainer from "@/components/layout/PageContainer";
import { TooltipProvider } from "@/components/ui/tooltip";

const categories = [
  {
    id: 1,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a37335c491db102dd4338eb5494fe302ad829491?placeholderIfAbsent=true",
    title: "Introduction to Dua",
    subcategories: 11,
    duas: 15,
    isSelected: true,
    subItems: [
      "What is Dua",
      "Conditions for Dua to be successful",
      "The Methode Of Dua",
      "Before Dua",
      "During Dua",
      "Prerequisites of writing Dua and drinking it's water",
      "The correct way to perform Dua for a small child",
    ],
  },
  {
    id: 2,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a37335c491db102dd4338eb5494fe302ad829491?placeholderIfAbsent=true",
    title: "Introduction to 2nd dua",
    subcategories: 11,
    duas: 15,
    subItems: [
      "What is Dua",
      "Conditions for Dua to be successful",
      "The Methode Of Dua",
      "Before Dua",
      "During Dua",
      "Prerequisites of writing Dua and drinking it's water",
      "The correct way to perform Dua for a small child",
    ],
  },
  {
    id: 3,
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a37335c491db102dd4338eb5494fe302ad829491?placeholderIfAbsent=true",
    title: "Introduction to 3rd dua",
    subcategories: 11,
    duas: 15,
    subItems: [
      "What is Dua",
      "Conditions for Dua to be successful",
      "The Methode Of Dua",
      "Before Dua",
    ],
  },
];

const SectionHeader = () => (
  <div className="bg-white border flex w-full items-center gap-2.5 text-base flex-wrap px-4 py-3 md:px-[30px] md:py-[15px] rounded-[10px] border-gray-200 border-solid mb-4">
    <div className="text-green-700 font-semibold leading-loose self-stretch my-auto">
      Section:
    </div>
    <div className="text-gray-700 font-medium self-stretch my-auto">
      The servant is dependent on his Lord
    </div>
  </div>
);

const MainContent = () => (
  <div className="w-full">
    <SectionHeader />
    <DuaCard
      number={1}
      title="The servant is dependent on his Lord #1"
      content="All human beings depend on Allah for their welfare and prevention of evil in various matters of their religion and world. Allah says (interpretation of the meaning): O mankind, you are those in need of Allah, while Allah is the Free of need, the Praiseworthy."
      reference="Surah Al-Fatir 35:15"
    />
    <DuaCard
      number={2}
      title="Conditions for Dua to be successful"
      content='Prophet (ﷺ) used to say after every compulsory prayer, The servant will ask his Lord for all of his religiously and worldly needs, because the treasure of all things is in the hands of Allah. Allah says (interpretation of the meaning): "And there is not a thing but that with Us are its depositories, and We do not send it down except according to a known measure." (Sura Al-Hijr 15:21) No one can withhold what Allah gives; And, no one can give what he resists.'
      arabicText="لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ"
      transliteration="Laa ilaaha illallahu wahdahu laa sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'alaa kulli shay'in qadir. Allaahumma laa maani'a limaa a'taita wa laa mu'tia limaa mana'ta wa laa yanfa'u dhal-jaddi minka al-jaddu"
      translation="There is none worthy of worship except Allah alone with no partner or associate. He is the Dominion and to Him be all praise, and He is able to do all things. O Allah, one can withhold what You have given and none can give what You have withheld, and no wealth or fortune can benefit anyone for from You comes all wealth and fortune."
      reference="Bukhari: 844"
    />
  </div>
);

export default function Page() {
  return (
    <TooltipProvider>
      <div className="mt-6">
        <PageContainer
          leftColumn={<CategoryList categories={categories} />}
          mainContent={<MainContent />}
          rightColumn={<SettingsPanel />}
        />
      </div>
    </TooltipProvider>
  );
} 