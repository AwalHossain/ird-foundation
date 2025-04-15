import { CategoryList } from "@/components/dua/CategoryList";
import { DuaCard } from "@/components/dua/DuaCard";
import { SettingsPanel } from "@/components/dua/SettingsPanel";
import Header from "@/components/nav/Header";
import Sidebar from "@/components/nav/Sidebar";
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

const Page = () => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[rgba(247,248,250,1)]">
        <div className="sticky top-0 hidden h-screen pt-2 pb-5 pr-4 md:block">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-20 md:p-4 md:pl-0 md:pb-10">
          <Header />

          <div className="mt-[27px]">
            <div className="gap-5 flex flex-col md:flex-row"> {/* Adjusted flex direction */}
              <div className="sticky top-4 w-full max-h-[calc(100vh-100px)] overflow-y-auto lg:w-[25%]"> {/* Adjusted width */}
                <CategoryList categories={categories} />
              </div>

              <div className="w-full lg:w-[50%] md:ml-5"> {/* Adjusted width/margin */}
                <div className="w-full">
                  {/* Section Header */}
                  <div className="bg-white border flex w-full items-center gap-2.5 text-base flex-wrap px-4 py-3 md:px-[30px] md:py-[15px] rounded-[10px] border-gray-200 border-solid mb-4"> {/* Added margin-bottom */}
                    <div className="text-green-700 font-semibold leading-loose self-stretch my-auto">
                      Section:
                    </div>
                    <div className="text-gray-700 font-medium self-stretch my-auto">
                      The servant is dependent on his Lord
                    </div>
                  </div>

                  {/* Dua Cards */}
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
              </div>

              <div className="w-full lg:w-[25%] md:ml-5"> {/* Adjusted width/margin */}
                <SettingsPanel />
              </div>
            </div>
          </div>
        </div> {/* End Main Content Area */} 

        {/* Sidebar container (for mobile layout - rendered outside main content flow) */}
        {/* Shown only on mobile (md:hidden) */}
        <div className="md:hidden"> 
          <Sidebar />
        </div>

      </div> {/* End Flex Container */}
    </TooltipProvider>
  );
};

export default Page;
