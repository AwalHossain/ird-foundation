import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

interface SettingOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  subSettings?: SubSetting[];
}

interface SubSetting {
  id: string;
  label: string;
  type: 'toggle' | 'select';
  value?: boolean;
}

export const SettingsPanel: React.FC = () => {
  const [activeSettingId, setActiveSettingId] = useState<string>("appearance");
  const [expandedSettings, setExpandedSettings] = useState<Record<string, boolean>>({
    appearance: true // Appearance settings expanded by default
  });
  const [nightMode, setNightMode] = useState(false);
  
  const toggleExpand = (id: string) => {
    setExpandedSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setActiveSettingId(id);
  };

  const settings: SettingOption[] = [
    { 
      id: "language", 
      icon: <LanguageIcon />, 
      label: "Language Settings",
      subSettings: [
        { id: "lang-select", label: "Select Language", type: "select" }
      ]
    },
    { 
      id: "general", 
      icon: <GeneralIcon />, 
      label: "General Settings",
      subSettings: [
        { id: "auto-scroll", label: "Auto Scroll", type: "toggle" }
      ]
    },
    { 
      id: "font", 
      icon: <FontIcon />, 
      label: "Font Settings",
      subSettings: [
        { id: "font-size", label: "Font Size", type: "select" }
      ]
    },
    { 
      id: "appearance", 
      icon: <AppearanceIcon />, 
      label: "Appearance Settings",
      subSettings: [
        { id: "night-mode", label: "Night Mode", type: "toggle", value: nightMode }
      ]
    },
  ];

  return (
    <div className="p-5 xl:p-0 w-full">
      <div className="space-y-2">
        {settings.map((setting) => (
          <div key={setting.id} className="flex flex-col">
            {/* Main setting item */}
            <div 
              className={`flex items-center gap-3 p-3 bg-custom-white-gray rounded-md cursor-pointer transition-colors duration-200 ${
                activeSettingId === setting.id ? "text-green-600" : "text-gray-500 "
              }`}
              onClick={() => toggleExpand(setting.id)}
            >
              {activeSettingId === setting.id && (
                <div className="w-1 self-stretch bg-green-600 rounded-l mr-1"></div>
              )}
              <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-custom-blue-light ${
                activeSettingId === setting.id ? "text-green-600" : "text-gray-500"
              }`}>
                {setting.icon}
              </div>
              <span className={`font-medium ${
                activeSettingId === setting.id ? "text-green-600" : "text-gray-600"
              }`}>
                {setting.label}
              </span>
            </div>
            
            {/* Sub-settings */}
            {setting.subSettings && expandedSettings[setting.id] && (
              <div className="ml-11 mt-2 space-y-3 overflow-hidden transition-all duration-300 ease-in-out">
                {setting.subSettings.map(subSetting => (
                  <div key={subSetting.id} className="flex items-center justify-between py-2 px-3 text-gray-700">
                    <span>{subSetting.label}</span>
                    {subSetting.type === 'toggle' && (
                      <Switch 
                        checked={subSetting.id === 'night-mode' ? nightMode : false}
                        onCheckedChange={value => {
                          if (subSetting.id === 'night-mode') {
                            setNightMode(value);
                          }
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Icons
const LanguageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 8 6 6"></path>
    <path d="m4 14 6-6 2-3"></path>
    <path d="M2 5h12"></path>
    <path d="M7 2h1"></path>
    <path d="m22 22-5-10-5 10"></path>
    <path d="M14 18h6"></path>
  </svg>
);

const GeneralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
  </svg>
);

const FontIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18V6"></path>
    <path d="M12 18V6"></path>
    <path d="M20 18V6"></path>
    <path d="M4 9h8"></path>
    <path d="M12 15h8"></path>
  </svg>
);

const AppearanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M3 9h18"></path>
    <path d="M3 15h18"></path>
    <path d="M9 3v18"></path>
    <path d="M15 3v18"></path>
  </svg>
);
