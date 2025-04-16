import React from "react";
import { IconButton } from "./IconButton";

export const ActionButtons: React.FC = () => {
  return (
    <div className="flex min-w-5 items-center gap-[39px] flex-wrap">
      <IconButton 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/835fb21abf3d3f1e8b44720f93c74217f6825498?placeholderIfAbsent=true" 
        className="max-w-[22px]" 
      />
      <IconButton 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0634003d960ea7fb56306612b8a5934c2b2f498?placeholderIfAbsent=true" 
        className="max-w-[22px]" 
      />
      <IconButton 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bba99ad016168cc8fcf7ff79061e437ea70783e?placeholderIfAbsent=true" 
        className="max-w-[22px]" 
      />
      <IconButton 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ea2cc9671023c13cfe9250e1390aa13bf299a43?placeholderIfAbsent=true" 
        className="max-w-[22px]" 
      />
      <IconButton 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f7fc5ec9326d19daa16e4af415167f7ecd7d5f5?placeholderIfAbsent=true" 
        className="max-w-[22px]" 
      />
    </div>
  );
};
